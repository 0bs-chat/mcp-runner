// entrypoints/background.ts
import { createChromeHandler } from 'trpc-chrome/adapter';
import { createAppRouter } from '../shared/router';
import type {
  SelectorParam,
  TypeParam,
  SelectOptionParam,
  SessionInfo,
} from '../shared/types';

export default defineBackground(() => {
  const wsManager = new WebSocketManager();
  const handlers = new CommandHandlers();

  // Create tRPC router with command handlers
  const appRouter = createAppRouter({
    // Browser automation methods
    navigate: handlers.navigate.bind(handlers),
    goBack: handlers.goBack.bind(handlers),
    goForward: handlers.goForward.bind(handlers),
    snapshot: handlers.snapshot.bind(handlers),
    click: handlers.click.bind(handlers),
    hover: handlers.hover.bind(handlers),
    type: handlers.type.bind(handlers),
    selectOption: handlers.selectOption.bind(handlers),
    pressKey: handlers.pressKey.bind(handlers),
    getConsoleLogs: handlers.getConsoleLogs.bind(handlers),
    screenshot: handlers.screenshot.bind(handlers),
    getUrl: handlers.getUrl.bind(handlers),
    getTitle: handlers.getTitle.bind(handlers),

    // Session management
    getSessions: handlers.getSessions.bind(handlers),
    closeSession: handlers.closeSession.bind(handlers),
    showSession: handlers.showSession.bind(handlers),
    hideSession: handlers.hideSession.bind(handlers),

    // WebSocket management
    wsConnect: wsManager.connect.bind(wsManager),
    wsDisconnect: wsManager.disconnect.bind(wsManager),
    wsGetStatus: () => wsManager.status,
    wsSetUrl: wsManager.setUrl.bind(wsManager),
  });

  // Set up tRPC Chrome handler
  createChromeHandler({
    router: appRouter,
    createContext: () => ({}),
    onError: ({ error, path }: { error: any; path: string }) => {
      console.error(`tRPC error on ${path}:`, error);
    },
  });

  // Legacy message handling for backward compatibility
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    switch (message.type) {
      case 'connect':
        wsManager.connect();
        sendResponse({ success: true });
        return true;
      case 'disconnect':
        wsManager.disconnect();
        sendResponse({ success: true });
        return true;
      case 'getStatus':
        sendResponse(wsManager.status);
        return true;
      case 'setUrl':
        wsManager.setUrl(message.url as string);
        sendResponse({ success: true });
        return true;
      case 'getUrl':
        sendResponse({ url: wsManager.status.url });
        return true;
      case 'getSessions':
        sendResponse({ sessions: handlers.getSessions() });
        return true;
      case 'closeSession':
        handlers.closeSession(message.sessionId);
        sendResponse({ success: true });
        return true;
      case 'showSession':
        handlers.showSession(message.sessionId);
        sendResponse({ success: true });
        return true;
      case 'hideSession':
        handlers.hideSession(message.sessionId);
        sendResponse({ success: true });
        return true;
      default:
        return false;
    }
  });

  wsManager.setCommandHandler((method: string, params: any) => {
    return handlers.execute(method, params);
  });

  // Set target tab when connection is established
  wsManager.setConnectionCallback(async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.id) {
      handlers.setTargetTab(tab.id);
    }
  });
});

/**
 * Handles all browser automation commands with proper type safety and session management
 */
class CommandHandlers {
  private targetTabId: number | null = null;
  private sessions = new Map<string, SessionInfo>();
  private defaultSessionId: string | null = null;

  setTargetTab(tabId: number) {
    this.targetTabId = tabId;
    // Create default session if not exists
    if (!this.defaultSessionId) {
      this.defaultSessionId = 'default';
      this.sessions.set(this.defaultSessionId, {
        id: this.defaultSessionId,
        tabId,
        isHeadless: false,
        createdAt: Date.now()
      });
    }
  }

  getSessions(): SessionInfo[] {
    return Array.from(this.sessions.values());
  }

  async closeSession(sessionId: string) {
    const session = this.sessions.get(sessionId);
    if (session) {
      try {
        if (session.isHeadless) {
          // For headless sessions, close the entire dedicated window
          const tab = await chrome.tabs.get(session.tabId);
          await chrome.windows.remove(tab.windowId!);
        } else {
          // For normal sessions, just close the tab
          await chrome.tabs.remove(session.tabId);
        }
      } catch (error) {
        // Tab/window might already be closed
      }
      this.sessions.delete(sessionId);
      if (this.defaultSessionId === sessionId) {
        this.defaultSessionId = null;
        this.targetTabId = null;
      }
    }
  }

  async showSession(sessionId: string) {
    const session = this.sessions.get(sessionId);
    if (session) {
      if (session.isHeadless) {
        // For headless sessions, restore the window and bring it to focus
        const tab = await chrome.tabs.get(session.tabId);
        await chrome.windows.update(tab.windowId!, {
          state: 'normal',
          focused: true
        });
        await chrome.tabs.update(session.tabId, { active: true });
      } else {
        // For normal sessions, just activate the tab and focus the window
        await chrome.tabs.update(session.tabId, { active: true });
        const tab = await chrome.tabs.get(session.tabId);
        await chrome.windows.update(tab.windowId!, { focused: true });
      }
    }
  }

  async hideSession(sessionId: string) {
    const session = this.sessions.get(sessionId);
    if (session && session.isHeadless) {
      // For headless tabs, minimize their dedicated window
      const tab = await chrome.tabs.get(session.tabId);
      await chrome.windows.update(tab.windowId!, {
        state: 'minimized',
        focused: false
      });
    }
  }

  private async getTargetTab(sessionId?: string) {
    // If sessionId is provided, get or create that session
    if (sessionId) {
      let session = this.sessions.get(sessionId);

      if (!session) {
        // Create new session
        const isHeadless = sessionId.startsWith('headless-');

        let tab;
        if (isHeadless) {
          // Create a new minimized window for headless sessions
          const window = await chrome.windows.create({
            url: 'about:blank',
            focused: false,
            state: 'minimized',
            type: 'normal'
          });

          if (!window?.tabs?.[0]?.id) throw new Error("Failed to create headless window");
          tab = window.tabs[0];

          // Pin the tab in the headless window
          await chrome.tabs.update(tab.id, { pinned: true });
        } else {
          // Create tab in current window for normal sessions
          tab = await chrome.tabs.create({
            url: 'about:blank',
            active: true
          });
        }

        if (!tab.id) throw new Error("Failed to create tab for session");

        // Store session info
        session = {
          id: sessionId,
          tabId: tab.id,
          isHeadless,
          url: tab.url,
          title: tab.title,
          createdAt: Date.now()
        };
        this.sessions.set(sessionId, session);
      }

      try {
        const tab = await chrome.tabs.get(session.tabId);
        return tab;
      } catch (error) {
        // Session tab was closed, remove from sessions
        this.sessions.delete(sessionId);
        throw new Error(`Session ${sessionId} tab was closed`);
      }
    }

    // Use default target tab
    if (this.targetTabId) {
      try {
        const tab = await chrome.tabs.get(this.targetTabId);
        return tab;
      } catch (error) {
        // Tab might have been closed, fall back to active tab
      }
    }

    // Fallback to active tab if no target tab set or tab is invalid
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) throw new Error("No target tab found");
    this.targetTabId = tab.id;
    return tab;
  }

  private async sendToContentScript(tabId: number, message: any) {
    try {
      return await chrome.tabs.sendMessage(tabId, message);
    } catch (error) {
      // If content script is not injected, inject it and retry
      await chrome.scripting.executeScript({
        target: { tabId },
        files: ["content-scripts/content.js"],
      });
      await new Promise(resolve => setTimeout(resolve, 200));
      return await chrome.tabs.sendMessage(tabId, message);
    }
  }

  async execute(method: string, params: any): Promise<any> {
    switch (method) {
      case 'navigate':
        return this.navigate(params);
      case 'goBack':
        return this.goBack(params);
      case 'goForward':
        return this.goForward(params);
      case 'snapshot':
        return this.snapshot(params);
      case 'click':
        return this.click(params);
      case 'hover':
        return this.hover(params);
      case 'type':
        return this.type(params);
      case 'selectOption':
        return this.selectOption(params);
      case 'pressKey':
        return this.pressKey(params);
      case 'getConsoleLogs':
        return this.getConsoleLogs(params);
      case 'screenshot':
        return this.screenshot(params);
      case 'getUrl':
        return this.getUrl(params);
      case 'getTitle':
        return this.getTitle(params);
      default:
        throw new Error(`Unknown command: ${method}`);
    }
  }

  async navigate({ url, sessionId }: { url: string; sessionId?: string }) {
    const tab = await this.getTargetTab(sessionId);
    await chrome.tabs.update(tab.id!, { url });

    // Wait for navigation to complete
    await this.waitForNavigation(tab.id!);

    return { success: true, url };
  }

  async goBack({ sessionId }: { sessionId?: string } = {}) {
    const tab = await this.getTargetTab(sessionId);
    await chrome.tabs.goBack(tab.id!);

    // Wait for navigation to complete
    await this.waitForNavigation(tab.id!);

    return { success: true };
  }

  async goForward({ sessionId }: { sessionId?: string } = {}) {
    const tab = await this.getTargetTab(sessionId);
    await chrome.tabs.goForward(tab.id!);

    // Wait for navigation to complete
    await this.waitForNavigation(tab.id!);

    return { success: true };
  }

  async snapshot({ sessionId }: { sessionId?: string } = {}) {
    const tab = await this.getTargetTab(sessionId);
    const result = await this.sendToContentScript(tab.id!, {
      action: "getAccessibilitySnapshot",
    });
    return result.snapshot;
  }

  async click({ element, ref, sessionId }: SelectorParam & { sessionId?: string }) {
    const tab = await this.getTargetTab(sessionId);
    return await this.sendToContentScript(tab.id!, {
      action: "click",
      selector: ref,
    });
  }

  async hover({ element, ref, sessionId }: SelectorParam & { sessionId?: string }) {
    const tab = await this.getTargetTab(sessionId);
    return await this.sendToContentScript(tab.id!, {
      action: "hover",
      selector: ref,
    });
  }

  async type({ element, ref, text, submit, sessionId }: TypeParam & { sessionId?: string }) {
    const tab = await this.getTargetTab(sessionId);
    return await this.sendToContentScript(tab.id!, {
      action: "type",
      selector: ref,
      text,
      submit,
    });
  }

  async selectOption({ element, ref, values, sessionId }: SelectOptionParam & { sessionId?: string }) {
    const tab = await this.getTargetTab(sessionId);
    return await this.sendToContentScript(tab.id!, {
      action: "selectOption",
      selector: ref,
      values,
    });
  }

  async pressKey({ key, sessionId }: { key: string; sessionId?: string }) {
    const tab = await this.getTargetTab(sessionId);
    return await this.sendToContentScript(tab.id!, {
      action: "pressKey",
      key,
    });
  }

  async getConsoleLogs({ sessionId }: { sessionId?: string } = {}) {
    const tab = await this.getTargetTab(sessionId);
    const result = await this.sendToContentScript(tab.id!, {
      action: "getConsoleLogs",
    });
    return result.logs;
  }

  async screenshot({ sessionId }: { sessionId?: string } = {}) {
    const tab = await this.getTargetTab(sessionId);
    const dataUrl = await chrome.tabs.captureVisibleTab(tab.id!, {
      format: "png",
    });
    return { screenshot: dataUrl };
  }

  async getUrl({ sessionId }: { sessionId?: string } = {}) {
    const tab = await this.getTargetTab(sessionId);
    if (!tab.url) throw new Error("No target tab URL found");
    return tab.url;
  }

  async getTitle({ sessionId }: { sessionId?: string } = {}) {
    const tab = await this.getTargetTab(sessionId);
    if (!tab.title) throw new Error("No target tab title found");
    return tab.title;
  }

  /**
   * Wait for navigation to complete
   */
  private async waitForNavigation(tabId: number): Promise<void> {
    return new Promise((resolve) => {
      const onUpdated = (updatedTabId: number, changeInfo: any) => {
        if (updatedTabId === tabId && changeInfo.status === 'complete') {
          chrome.tabs.onUpdated.removeListener(onUpdated);
          // Additional wait to ensure content is loaded
          setTimeout(resolve, 3000);
        }
      };

      chrome.tabs.onUpdated.addListener(onUpdated);

      // Timeout after 10 seconds
      setTimeout(() => {
        chrome.tabs.onUpdated.removeListener(onUpdated);
        resolve();
      }, 10000);
    });
  }
}

/**
 * Manages the WebSocket connection to the MCP server.
 */
class WebSocketManager {
  private ws: WebSocket | null = null;
  private connecting = false;
  private url = 'ws://localhost:8080';
  private commandHandler: ((method: string, params: any) => Promise<any>) | null = null;
  private connectionCallback: (() => void | Promise<void>) | null = null;

  get status() {
    return {
      connected: this.ws?.readyState === WebSocket.OPEN,
      connecting: this.connecting,
      url: this.url,
    };
  }

  setCommandHandler(handler: (method: string, params: any) => Promise<any>) {
    this.commandHandler = handler;
  }

  setConnectionCallback(callback: () => void | Promise<void>) {
    this.connectionCallback = callback;
  }

  private notifyStatus() {
    chrome.runtime.sendMessage({ type: 'wsStatus', ...this.status });
  }

  connect() {
    if (this.ws?.readyState === WebSocket.OPEN || this.connecting) return;
    this.connecting = true;
    this.notifyStatus();

    this.ws = new WebSocket(this.url);
    this.ws.addEventListener('open', async () => {
      this.connecting = false;
      this.notifyStatus();

      // Call connection callback to set target tab
      if (this.connectionCallback) {
        await this.connectionCallback();
      }
    });
    this.ws.addEventListener('message', (evt) => this.handleMessage(evt));
    this.ws.addEventListener('close', () => {
      this.ws = null;
      this.connecting = false;
      this.notifyStatus();
      setTimeout(() => this.connect(), 5000);
    });
    this.ws.addEventListener('error', () => {
      this.connecting = false;
      this.notifyStatus();
    });
  }

  disconnect() {
    if (!this.ws) return;
    this.ws.close();
    this.ws = null;
    this.connecting = false;
    this.notifyStatus();
  }

  setUrl(newUrl: string) {
    this.url = newUrl;
    if (this.ws) this.disconnect();
    this.notifyStatus();
  }

  private async handleMessage(event: MessageEvent) {
    try {
      const { id, method, params } = JSON.parse(event.data as string);
      if (!this.commandHandler) {
        throw new Error('No command handler set');
      }
      const result = await this.commandHandler(method, params ?? {});
      this.ws?.send(JSON.stringify({ id, result }));
    } catch (err: any) {
      const { id } = JSON.parse(event.data as string);
      this.ws?.send(JSON.stringify({ id, error: err.message }));
    }
  }
}