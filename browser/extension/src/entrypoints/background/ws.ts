import { getTabManager } from "./tab";

export type ConnectionStatus = "idle" | "connecting" | "connected" | "error";

export class WsConnection {
  private ws: WebSocket | null = null;
  private status: ConnectionStatus = "idle";
  private tabManager = getTabManager();

  connect(url: string) {
    if (this.status === "connected") {
      this.disconnect();
    }

    this.status = "connecting";
    console.log("Connecting to WebSocket", url);
    this.ws = new WebSocket(url);
    
    this.ws.onopen = () => {
      console.log("WebSocket connected");
      this.status = "connected";
      this.tabManager.getOrCreateTab("default");
    };
    
    this.ws.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      const tab = await this.tabManager.getOrCreateTab(message.tabName);

      // detach all debuggers
      await this.detachAllDebuggers();

      // attach chrome debugger to tab
      chrome.debugger.attach({ tabId: tab }, "1.3", async () => {
        console.log("Message", message);
        const response = await chrome.debugger.sendCommand({ tabId: tab }, message.method, message.params);
        console.log("Response", response);
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify(response));
        }
      });
    };
    
    this.ws.onclose = (event) => {
      console.log("WebSocket disconnected", event.code, event.reason);
      this.status = "idle";
      this.ws = null;
    };
    
    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      this.status = "error";
      // Close the connection on error
      if (this.ws) {
        this.ws.close();
        this.ws = null;
      }
    };
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.status = "idle";
  }

  getStatus(): ConnectionStatus {
    return this.status;
  }

  private async detachAllDebuggers(): Promise<void> {
    try {
      // Get all tabs and try to detach debuggers from each one
      const tabs = await chrome.tabs.query({});
      
      for (const tab of tabs) {
        if (tab.id) {
          try {
            await new Promise<void>((resolve) => {
              chrome.debugger.detach({ tabId: tab.id! }, () => {
                // Ignore any errors - just continue
                resolve();
              });
            });
          } catch (error) {
            // Ignore detach errors - this is expected if no debugger was attached
            console.log(`No debugger attached to tab ${tab.id} (expected)`);
          }
        }
      }
    } catch (error) {
      // Ignore any errors in the detach process
      console.log("Detach all debuggers completed (some may not have been attached)");
    }
  }

  async handleMessage(message: any, sendResponse: (response: any) => void) {
    switch (message.method) {
      case 'connect':
        this.connect(message.params.url);
        sendResponse({ success: true });
        break;
      case 'disconnect':
        this.disconnect();
        sendResponse({ success: true });
        break;
      case 'getStatus':
        const status = this.getStatus();
        sendResponse({ success: true, result: status });
        break;
      default:
        sendResponse({ success: false, error: 'Unknown MCPWebSocketConnection method' });
    }
  }
}

// Global instance
let wsConnection: WsConnection | null = null;

export function getWsConnection(): WsConnection {
  if (!wsConnection) {
    wsConnection = new WsConnection();
  }
  return wsConnection;
}