export default defineBackground(() => {
  interface CDPMessage {
    id?: number;
    method: string;
    params?: any;
    result?: any;
    error?: any;
  }

  class BrowserExtensionRelay {
    private ws: WebSocket | null = null;
    private tabId: number | null = null;
    private debuggerAttached = false;
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 10;
    private reconnectDelay = 1000;
    private isConnecting = false;
    private serverUrl = 'ws://localhost:3000/ws';

    constructor() {
      console.log('[BrowserExtensionRelay] 🚀 Initializing...');
      this.setupChromeListeners();
      this.connect();
    }

    private connect() {
      if (this.isConnecting) {
        console.log('[BrowserExtensionRelay] Already connecting, skipping...');
        return;
      }

      this.isConnecting = true;

      try {
        console.log(`[BrowserExtensionRelay] 🔌 Connecting to ${this.serverUrl} (attempt ${this.reconnectAttempts + 1})`);
        this.ws = new WebSocket(this.serverUrl);

        this.ws.onopen = () => {
          console.log('[BrowserExtensionRelay] ✅ Connected to server');
          this.reconnectAttempts = 0;
          this.isConnecting = false;

          // Send initial handshake
          this.sendToServer({
            method: 'extension.connected',
            params: {
              extensionId: chrome.runtime.id,
              timestamp: Date.now()
            }
          });
        };

        this.ws.onmessage = (event) => {
          console.log('[BrowserExtensionRelay] 📨 Received from server:', event.data);
          this.handleServerMessage(event.data);
        };

        this.ws.onclose = (event) => {
          console.log(`[BrowserExtensionRelay] ❌ Connection closed (code: ${event.code}, reason: ${event.reason})`);
          this.isConnecting = false;
          this.scheduleReconnect();
        };

        this.ws.onerror = (error) => {
          console.error('[BrowserExtensionRelay] ⚠️ WebSocket error:', error);
          this.isConnecting = false;
        };
      } catch (error) {
        console.error('[BrowserExtensionRelay] Failed to create WebSocket connection:', error);
        this.isConnecting = false;
        this.scheduleReconnect();
      }
    }

    private scheduleReconnect() {
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectAttempts++;
        const delay = Math.min(this.reconnectDelay * Math.pow(1.5, this.reconnectAttempts - 1), 10000);
        console.log(`[BrowserExtensionRelay] 🔄 Scheduling reconnect in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);

        setTimeout(() => {
          if (!this.ws || this.ws.readyState === WebSocket.CLOSED) {
            this.connect();
          }
        }, delay);
      } else {
        console.error('[BrowserExtensionRelay] 💀 Max reconnect attempts reached. Giving up.');
      }
    }

    private setupChromeListeners() {
      // Listen for debugger events and forward them to server
      chrome.debugger.onEvent.addListener((source, method, params) => {
        if (source.tabId === this.tabId) {
          console.log(`[BrowserExtensionRelay] 🔍 Debugger event: ${method}`, params);
          this.sendToServer({
            method: `debugger.${method}`,
            params: { ...params, tabId: this.tabId }
          });
        }
      });

      // Handle debugger detach
      chrome.debugger.onDetach.addListener((source, reason) => {
        if (source.tabId === this.tabId) {
          console.log(`[BrowserExtensionRelay] 🔓 Debugger detached from tab ${this.tabId}, reason: ${reason}`);
          this.debuggerAttached = false;

          this.sendToServer({
            method: 'tab.debuggerDetached',
            params: { tabId: this.tabId, reason }
          });

          this.tabId = null;
        }
      });

      // Listen for tab updates
      chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (this.tabId === tabId) {
          console.log(`[BrowserExtensionRelay] 📄 Tab ${tabId} updated:`, changeInfo);
          this.sendToServer({
            method: 'tab.updated',
            params: { tabId, changeInfo, tab }
          });
        }
      });

      // Listen for tab removal
      chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
        if (this.tabId === tabId) {
          console.log(`[BrowserExtensionRelay] ❌ Tab ${tabId} removed`);
          this.debuggerAttached = false;
          this.tabId = null;

          this.sendToServer({
            method: 'tab.removed',
            params: { tabId, removeInfo }
          });
        }
      });
    }

    private async handleServerMessage(data: string) {
      try {
        const message: CDPMessage = JSON.parse(data);
        console.log(`[BrowserExtensionRelay] 🎯 Handling command: ${message.method}`, message.params);

        let result: any = null;
        let error: any = null;

        try {
          switch (message.method) {
            case 'createTab':
              result = await this.createTab(message.params?.url || 'about:blank');
              break;

            case 'attachToTab':
              result = await this.attachToTab(message.params?.tabId);
              break;

            case 'closeTab':
              result = await this.closeTab();
              break;

            case 'getActiveTab':
              result = await this.getActiveTab();
              break;

            default:
              // Forward CDP command to debugger
              result = await this.sendCDPCommand(message);
              break;
          }
        } catch (err) {
          console.error(`[BrowserExtensionRelay] ❌ Error executing ${message.method}:`, err);
          error = {
            message: (err as Error).message,
            stack: (err as Error).stack
          };
        }

        // Send response back to server
        this.sendResponse(message, result, error);

      } catch (error) {
        console.error('[BrowserExtensionRelay] ❌ Error parsing server message:', error);
      }
    }

    private async createTab(url: string): Promise<any> {
      try {
        console.log(`[BrowserExtensionRelay] 🆕 Creating new tab with URL: ${url}`);

        // Close existing tab if we have one
        if (this.tabId) {
          await this.closeTab();
        }

        // Create the tab
        const tab = await chrome.tabs.create({ url, active: true });

        if (!tab.id) {
          throw new Error('Failed to create tab - no tab ID received');
        }

        console.log(`[BrowserExtensionRelay] ✅ Created tab ${tab.id}`);

        // Wait for tab to load
        await this.waitForTabComplete(tab.id);

        // Attach debugger to the new tab
        await this.attachToTab(tab.id);

        return { success: true, tabId: this.tabId, tab };

      } catch (error) {
        console.error('[BrowserExtensionRelay] ❌ Error creating tab:', error);
        throw error;
      }
    }

    private async waitForTabComplete(tabId: number, timeout: number = 15000): Promise<void> {
      return new Promise((resolve, reject) => {
        const startTime = Date.now();

        const checkTab = async () => {
          try {
            const tab = await chrome.tabs.get(tabId);

            if (tab.status === 'complete') {
              console.log(`[BrowserExtensionRelay] ✅ Tab ${tabId} loading complete`);
              resolve();
              return;
            }

            if (Date.now() - startTime > timeout) {
              console.warn(`[BrowserExtensionRelay] ⏰ Timeout waiting for tab ${tabId}, proceeding anyway`);
              resolve(); // Don't reject, just proceed
              return;
            }

            setTimeout(checkTab, 200);
          } catch (error) {
            console.error(`[BrowserExtensionRelay] ❌ Error checking tab ${tabId}:`, error);
            reject(error);
          }
        };

        checkTab();
      });
    }

    private async attachToTab(tabId?: number): Promise<any> {
      try {
        // Detach from current tab if attached
        if (this.debuggerAttached && this.tabId) {
          console.log(`[BrowserExtensionRelay] 🔓 Detaching from current tab ${this.tabId}`);
          try {
            await chrome.debugger.detach({ tabId: this.tabId });
          } catch (error) {
            console.warn('[BrowserExtensionRelay] ⚠️ Error detaching from previous tab:', error);
          }
        }

        // Determine target tab
        if (tabId) {
          this.tabId = tabId;
        } else {
          const activeTab = await this.getActiveTab();
          if (!activeTab?.id) {
            throw new Error('No active tab found and no tabId provided');
          }
          this.tabId = activeTab.id;
        }

        console.log(`[BrowserExtensionRelay] 🔗 Attaching debugger to tab ${this.tabId}`);

        // Attach debugger with retry logic
        let attached = false;
        let attempts = 0;
        const maxAttempts = 3;

        while (!attached && attempts < maxAttempts) {
          try {
            await chrome.debugger.attach({ tabId: this.tabId }, '1.3');
            attached = true;
            this.debuggerAttached = true;
            console.log(`[BrowserExtensionRelay] ✅ Debugger attached to tab ${this.tabId}`);
          } catch (error) {
            attempts++;
            console.warn(`[BrowserExtensionRelay] ⚠️ Attach attempt ${attempts} failed:`, error);
            if (attempts < maxAttempts) {
              await new Promise(resolve => setTimeout(resolve, 1000));
            }
          }
        }

        if (!attached) {
          throw new Error(`Failed to attach debugger after ${maxAttempts} attempts`);
        }

        // Enable necessary CDP domains
        await this.enableCDPDomains();

        return { success: true, tabId: this.tabId };

      } catch (error) {
        console.error('[BrowserExtensionRelay] ❌ Error attaching to tab:', error);
        this.debuggerAttached = false;
        this.tabId = null;
        throw error;
      }
    }

    private async enableCDPDomains(): Promise<void> {
      if (!this.debuggerAttached || !this.tabId) {
        throw new Error('Debugger not attached');
      }

      const domains = ['Runtime', 'Page', 'DOM', 'Input', 'Network'];

      for (const domain of domains) {
        try {
          console.log(`[BrowserExtensionRelay] 🔧 Enabling ${domain} domain`);
          await chrome.debugger.sendCommand(
            { tabId: this.tabId },
            `${domain}.enable`
          );
        } catch (error) {
          console.warn(`[BrowserExtensionRelay] ⚠️ Failed to enable ${domain} domain:`, error);
          // Don't throw, some domains might not be available
        }
      }
    }

    private async closeTab(): Promise<any> {
      if (!this.tabId) {
        console.warn('[BrowserExtensionRelay] ⚠️ No tab to close');
        return { success: true };
      }

      try {
        console.log(`[BrowserExtensionRelay] ❌ Closing tab ${this.tabId}`);

        // Detach debugger first
        if (this.debuggerAttached) {
          try {
            await chrome.debugger.detach({ tabId: this.tabId });
          } catch (error) {
            console.warn('[BrowserExtensionRelay] ⚠️ Error detaching debugger:', error);
          }
        }

        await chrome.tabs.remove(this.tabId);

        this.tabId = null;
        this.debuggerAttached = false;

        return { success: true };
      } catch (error) {
        console.error('[BrowserExtensionRelay] ❌ Error closing tab:', error);
        throw error;
      }
    }

    private async getActiveTab(): Promise<chrome.tabs.Tab | null> {
      try {
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        return tabs[0] || null;
      } catch (error) {
        console.error('[BrowserExtensionRelay] ❌ Error getting active tab:', error);
        return null;
      }
    }

    private async sendCDPCommand(message: CDPMessage): Promise<any> {
      if (!this.debuggerAttached || !this.tabId) {
        throw new Error('Debugger not attached - cannot send CDP command');
      }

      try {
        console.log(`[BrowserExtensionRelay] 📤 Sending CDP command: ${message.method}`);

        const result = await chrome.debugger.sendCommand(
          { tabId: this.tabId },
          message.method,
          message.params
        );

        console.log(`[BrowserExtensionRelay] ✅ CDP command result for ${message.method}:`, result);
        return result;

      } catch (error) {
        console.error(`[BrowserExtensionRelay] ❌ CDP command error for ${message.method}:`, error);
        throw error;
      }
    }

    private sendResponse(originalMessage: CDPMessage, result?: any, error?: any): void {
      const response: CDPMessage = {
        id: originalMessage.id,
        method: originalMessage.method
      };

      if (error) {
        response.error = error;
      } else {
        response.result = result;
      }

      this.sendToServer(response);
    }

    private sendToServer(message: CDPMessage): void {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        const messageStr = JSON.stringify(message);
        console.log('[BrowserExtensionRelay] 📤 Sending to server:', messageStr);
        this.ws.send(messageStr);
      } else {
        console.warn('[BrowserExtensionRelay] ⚠️ WebSocket not open, cannot send message:', message);
      }
    }
  }

  // Initialize the browser extension relay
  console.log('[Extension] 🚀 Starting Browser Extension Relay...');
  new BrowserExtensionRelay();
});
