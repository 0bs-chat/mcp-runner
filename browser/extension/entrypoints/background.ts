// background.ts
import type { CDPMessage, ExtensionConfig, ExtensionMessage } from "../../shared/types";

export default defineBackground(() => {
  class Relay {
    private ws: WebSocket | null = null;
    private tabMap = new Map<string, number>();
    private config: ExtensionConfig = { serverUrl: "ws://localhost:3000" };

    constructor() {
      this.loadConfig();
      this.setupMessages();
    }

    private async loadConfig() {
      const stored = await chrome.storage.local.get("browserAutomationConfig");
      if (stored.browserAutomationConfig)
        Object.assign(this.config, stored.browserAutomationConfig);
    }

    private setupMessages() {
      chrome.runtime.onMessage.addListener((msg: ExtensionMessage, _, send) => {
        this.handle(msg).then(send, (e) => send({ error: e.message }));
        return true;
      });
    }

    private async handle(msg: ExtensionMessage) {
      switch (msg.type) {
        case "connection.status":
          return {
            connected: this.ws?.readyState === WebSocket.OPEN,
            config: this.config,
            tabs: Object.fromEntries(this.tabMap),
          };

        case "config.update":
          this.config = { ...this.config, ...msg.payload };
          await chrome.storage.local.set({ browserAutomationConfig: this.config });
          return { success: true };

        case "connection.connect":
          return this.start();

        case "connection.disconnect":
          this.ws?.close();
          return { success: true };

        case "tab.attach":
          await this.getOrCreate(msg.payload.name);
          return { success: true };

        case "tab.remove":
          await this.removeTab(msg.payload.name);
          return { success: true };
      }
    }

    private async start() {
      if (this.ws) return;
      this.ws = new WebSocket(this.config.serverUrl);
      this.ws.onopen = () => this.getOrCreate("default", true);
      this.ws.onclose = () => {
        this.ws = null;
        this.tabMap.clear();
      };
      this.ws.onmessage = (e) => this.onMsg(e.data);
    }

    private async onMsg(data: string) {
      const msg: CDPMessage = JSON.parse(data);
      let result, error;
      try {
        const tabName = msg.tabName ?? "default";
        const tabId = await this.getOrCreate(tabName);
        const { tabName: _, ...cdpParams } = msg.params || {};
        result = await chrome.debugger.sendCommand({ tabId }, msg.method, cdpParams);
      } catch (e) {
        error = { message: (e as Error).message };
      }
      this.send({ id: msg.id, method: msg.method, result, error, tabName: msg.tabName });
    }

    private async getOrCreate(name: string, useActive: boolean = false): Promise<number> {
      let tabId: number | undefined = this.tabMap.get(name);
      if (name.startsWith("headless-")) {
        const win = await chrome.windows.create({ state: "minimized" });
        const tab = await chrome.tabs.create({ windowId: win?.id, url: "about:blank" });
        await chrome.tabs.update(tab.id!, { pinned: true });
        tabId = tab.id!;
        this.tabMap.set(name, tabId!);
      } else if (!tabId) {
        tabId = useActive ?
          (await chrome.tabs.query({ active: true, currentWindow: true }))[0]?.id! :
          (await chrome.tabs.create({ url: "about:blank" })).id!;
        this.tabMap.set(name, tabId!);
      } else if (tabId) {
        await Promise.all(Array.from(this.tabMap.entries()).map(async ([_name, tabId]) => {
          await chrome.debugger.detach({ tabId });
        }));
      }

      await chrome.debugger.attach({ tabId: tabId! }, "1.3");
      return tabId!;
    }

    private async removeTab(name: string) {
      const id = this.tabMap.get(name);
      if (id) {
        try {
          await chrome.debugger.detach({ tabId: id });
          await chrome.tabs.remove(id);
        } catch { }
        this.tabMap.delete(name);
      }
    }

    private send(msg: CDPMessage) {
      this.ws?.send(JSON.stringify(msg));
    }
  }

  new Relay();
});