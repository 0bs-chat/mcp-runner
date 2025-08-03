import { getWsConnection } from "./ws";
import { getTabManager } from "./tab";

class Relay {
  private connection = getWsConnection();
  private tabManager = getTabManager();

  constructor() {
    this.setupListeners();
    this.initializeConnection();
  }

  private initializeConnection() {
    // Automatically connect to the WebSocket server on startup
    console.log("Initializing WebSocket connection to localhost:8080");
    this.connection.connect("ws://localhost:8080");
  }

  private setupListeners() {
    // Setup Chrome extension listeners
    chrome.tabs.onRemoved.addListener((tabId) => {
      // Clean up tab references when tabs are closed
      this.tabManager.listTabs().then((tabs) => {
        for (const [name, id] of tabs) {
          if (id === tabId) {
            this.tabManager.removeTab(name);
            break;
          }
        }
      });
    });

    // Unified Chrome runtime message listener
    chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
      this.handleMessage(message, sendResponse);
      return true; // Keep the message channel open for async response
    });
  }

  private async handleMessage(
    message: any,
    sendResponse: (response: any) => void,
  ) {
    try {
      switch (message.target) {
        case "TabManager":
          await this.tabManager.handleMessage(message, sendResponse);
          break;
        case "WsConnection":
          await this.connection.handleMessage(message, sendResponse);
          break;
        default:
          sendResponse({ success: false, error: "Unknown target" });
      }
    } catch (error) {
      sendResponse({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}

// Global instance for testing
let relayInstance: Relay | null = null;

export default defineBackground(() => {
  relayInstance = new Relay();
});
