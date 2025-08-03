export class TabManager {
  private tabs: Map<string, number> = new Map();

  public async getOrCreateTab(tabName: string) {
    // If tab name is "default", use the active tab
    const tabId = this.tabs.get(tabName);
    if (tabId) {
      return tabId;
    }

    let newTabId: number | undefined;
    if (tabName === "default") {
      const activeTabs = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (activeTabs.length > 0 && activeTabs[0].id) {
        newTabId = activeTabs[0].id;
      }
    } else {
      const newTab = await chrome.tabs.create({ url: `http://example.com` });
      newTabId = newTab.id;
    }
    if (!newTabId) {
      throw new Error("Failed to create tab");
    }
    this.tabs.set(tabName, newTabId);
    return newTabId;
  }

  public async removeTab(tabName: string) {
    const tabId = this.tabs.get(tabName);
    if (tabId) {
      await chrome.tabs.remove(tabId);
      this.tabs.delete(tabName);
    }
  }

  public async openTab(tabName: string) {
    const tabId = await this.getOrCreateTab(tabName);
    await chrome.tabs.update(tabId, { active: true });
  }

  public async listTabs() {
    return Array.from(this.tabs.entries());
  }

  public async handleMessage(
    message: any,
    sendResponse: (response: any) => void,
  ) {
    switch (message.method) {
      case "getOrCreateTab":
        const tabId = await this.getOrCreateTab(message.params.tabName);
        sendResponse({ success: true, result: tabId });
        break;
      case "removeTab":
        await this.removeTab(message.params.tabName);
        sendResponse({ success: true });
        break;
      case "openTab":
        await this.openTab(message.params.tabName);
        sendResponse({ success: true });
        break;
      case "listTabs":
        const tabs = await this.listTabs();
        sendResponse({ success: true, result: tabs });
        break;
      default:
        sendResponse({ success: false, error: "Unknown TabManager method" });
    }
  }
}

let tabManager: TabManager | null = null;

export function getTabManager(): TabManager {
  if (!tabManager) {
    tabManager = new TabManager();
  }
  return tabManager;
}
