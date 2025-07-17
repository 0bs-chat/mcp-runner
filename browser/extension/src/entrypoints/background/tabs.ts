import { store } from '@/lib/store'

/**
 * Get the currently active tab in the current window.
 * Returns a Promise that resolves to the tab ID, or null if not found.
 */
export async function getActiveTabId(): Promise<number | undefined> {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs.length > 0 && tabs[0].id !== undefined) {
        resolve(tabs[0].id)
      } else {
        resolve(undefined)
      }
    })
  })
}

/**
 * Assign a tab with a given name and tabId in storage.
 * If tabId is not provided, open a new tab and use its id.
 * If tabName is 'default', override tabId and use the current active tab.
 * The tabs object will be { [tabName]: tabId }.
 */
export async function assignTab(tabName: string, tabId?: number) {
  let resolvedTabId: number | undefined = tabId;

  if (tabName === 'default') {
    resolvedTabId = await getActiveTabId();
  } else if (typeof tabId === 'undefined') {
    // Open a new tab and use its id
    resolvedTabId = await new Promise<number | undefined>((resolve) => {
      chrome.tabs.create({}, (tab) => {
        resolve(tab.id);
      });
    });
  }

  const state = await store.get();
  const tabs = { ...(state.tabs || {}) };
  if (resolvedTabId !== null && typeof resolvedTabId !== 'undefined') {
    tabs[tabName] = resolvedTabId;
  } else {
    delete tabs[tabName];
  }
  await store.set({ tabs });
}

/**
 * Close all tracked tabs and reset the tabs mapping in storage.
 */
export async function resetAndCloseAllTabs() {
  const state = await store.get();
  const tabs = state.tabs || {};
  // Close all tracked tabs
  await Promise.all(
    Object.values(tabs).map(tabId =>
      typeof tabId === 'number'
        ? new Promise(resolve => {
            chrome.tabs.remove(tabId, () => resolve(undefined));
          })
        : Promise.resolve()
    )
  );
  // Reset tabs in storage
  await store.set({ tabs: {} });
}
