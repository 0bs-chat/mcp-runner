import { useState, useEffect } from "react";

interface TabInfo {
  name: string;
  id: number;
}

interface ConnectionStatus {
  status: "idle" | "connecting" | "connected" | "error";
}

export default function App() {
  const [activeTab, setActiveTab] = useState<"connection" | "tabs">(
    "connection",
  );
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus["status"]>("idle");
  const [tabs, setTabs] = useState<TabInfo[]>([]);
  const [wsUrl, setWsUrl] = useState("ws://localhost:8080");
  const [isConnecting, setIsConnecting] = useState(false);

  // Load initial data
  useEffect(() => {
    loadConnectionStatus();
  }, []);

  // Load tabs when switching to tabs tab
  useEffect(() => {
    if (activeTab === "tabs") {
      loadTabs();
    }
  }, [activeTab]);

  const sendMessage = (target: string, method: string, params: any = {}) => {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ target, method, params }, (response) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else if (response.success) {
          resolve(response.result);
        } else {
          reject(new Error(response.error));
        }
      });
    });
  };

  const loadConnectionStatus = async () => {
    try {
      const status = (await sendMessage(
        "WsConnection",
        "getStatus",
      )) as ConnectionStatus["status"];
      setConnectionStatus(status);
    } catch (error) {
      console.error("Failed to load connection status:", error);
    }
  };

  const loadTabs = async () => {
    try {
      const tabsData = (await sendMessage("TabManager", "listTabs")) as [
        string,
        number,
      ][];
      setTabs(tabsData.map(([name, id]) => ({ name, id })));
    } catch (error) {
      console.error("Failed to load tabs:", error);
    }
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await sendMessage("WsConnection", "connect", { url: wsUrl });
      setConnectionStatus("connected");
    } catch (error) {
      console.error("Connection failed:", error);
      setConnectionStatus("error");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await sendMessage("WsConnection", "disconnect");
      setConnectionStatus("idle");
    } catch (error) {
      console.error("Disconnect failed:", error);
    }
  };

  const handleRemoveTab = async (tabName: string) => {
    try {
      await sendMessage("TabManager", "removeTab", { tabName });
      await loadTabs();
    } catch (error) {
      console.error("Failed to remove tab:", error);
    }
  };

  const handleOpenTab = async (tabName: string) => {
    try {
      await sendMessage("TabManager", "openTab", { tabName });
    } catch (error) {
      console.error("Failed to open tab:", error);
    }
  };

  const getStatusColor = (status: ConnectionStatus["status"]) => {
    switch (status) {
      case "connected":
        return "bg-green-500";
      case "connecting":
        return "bg-yellow-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: ConnectionStatus["status"]) => {
    switch (status) {
      case "connected":
        return "Connected";
      case "connecting":
        return "Connecting...";
      case "error":
        return "Error";
      default:
        return "Disconnected";
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4 min-w-[320px] max-w-[400px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-2">
        <h1 className="text-lg font-semibold">MCP Browser Extension</h1>
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${getStatusColor(connectionStatus)}`}
          ></div>
          <span className="text-sm text-muted-foreground">
            {getStatusText(connectionStatus)}
          </span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab("connection")}
          className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
            activeTab === "connection"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Connection
        </button>
        <button
          onClick={() => setActiveTab("tabs")}
          className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
            activeTab === "tabs"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Tabs
        </button>
      </div>

      {/* Connection Tab */}
      {activeTab === "connection" && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              WebSocket URL
            </label>
            <input
              type="text"
              value={wsUrl}
              onChange={(e) => setWsUrl(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background"
              placeholder="ws://localhost:8080"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleConnect}
              disabled={connectionStatus === "connected" || isConnecting}
              className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed transition-colors"
            >
              {isConnecting ? "Connecting..." : "Connect"}
            </button>
            <button
              onClick={handleDisconnect}
              disabled={connectionStatus === "idle"}
              className="flex-1 bg-destructive text-destructive-foreground px-4 py-2 rounded-md hover:bg-destructive/90 disabled:bg-muted disabled:cursor-not-allowed transition-colors"
            >
              Disconnect
            </button>
          </div>
        </div>
      )}

      {/* Tabs Tab */}
      {activeTab === "tabs" && (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Managed Tabs</h3>
            {tabs.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">
                No tabs created yet
              </p>
            ) : (
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <div
                    key={tab.name}
                    className="flex items-center justify-between p-3 bg-muted rounded-md"
                  >
                    <div>
                      <p className="text-sm font-medium">{tab.name}</p>
                      <p className="text-xs text-muted-foreground">
                        ID: {tab.id}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleOpenTab(tab.name)}
                        className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded hover:bg-primary/90 transition-colors"
                      >
                        Open
                      </button>
                      <button
                        onClick={() => handleRemoveTab(tab.name)}
                        className="px-2 py-1 bg-destructive text-destructive-foreground text-xs rounded hover:bg-destructive/90 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={loadTabs}
            className="w-full bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80 transition-colors"
          >
            Refresh Tabs
          </button>
        </div>
      )}
    </div>
  );
}
