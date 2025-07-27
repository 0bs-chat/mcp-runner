import { getTabManager } from "./tab";
import { getMCPCommandHandler, MCPMessage } from "./mcp";

export type ConnectionStatus = "idle" | "connecting" | "connected" | "error";

export class WsConnection {
  private ws: WebSocket | null = null;
  private status: ConnectionStatus = "idle";
  private tabManager = getTabManager();
  private mcpHandler = getMCPCommandHandler();

  connect(url: string) {
    if (this.status === "connected") {
      this.disconnect();
    }

    this.status = "connecting";
    this.ws = new WebSocket(url);
    this.ws.onopen = () => {
      console.log("WebSocket connected");
      this.status = "connected";
      this.tabManager.getOrCreateTab("default");
    };
    this.ws.onmessage = async (event) => {
      try {
        const message: MCPMessage = JSON.parse(event.data);
        console.log("WebSocket received message:", message);

        // Process the message through MCP handler
        const response = await this.mcpHandler.handleCommand(message);

        // Send response back through WebSocket
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify(response));
        }
      } catch (error) {
        console.error("Error processing WebSocket message:", error);

        // Send error response if possible
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
          const errorResponse = {
            id: "unknown",
            method: "unknown",
            error: error instanceof Error ? error.message : "Failed to process message"
          };
          this.ws.send(JSON.stringify(errorResponse));
        }
      }
    };
    this.ws.onclose = () => {
      console.log("WebSocket disconnected");
      this.status = "idle";
    };
    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      this.status = "error";
    };
  }

  disconnect() {
    this.ws?.close();
  }

  getStatus(): ConnectionStatus {
    return this.status;
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