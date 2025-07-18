import { store } from '@/lib/store'

export async function getActiveTabId(): Promise<number | undefined> {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
  return tabs.length > 0 ? tabs[0].id : undefined
}

export async function assignTab(tabName: string) {
  let resolvedTabId: number | undefined;

  if (tabName === 'default') {
    resolvedTabId = await getActiveTabId();
  } else if (!resolvedTabId) {
    resolvedTabId = (await chrome.tabs.create({ url: 'about:blank' })).id;
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

export async function getOrCreateTab(tabName: string): Promise<number | undefined> {
  const state = await store.get();
  const tabs = state.tabs || {};
  let tabId: number | undefined = tabs[tabName];

  if (!tabId) {
    tabId = (await chrome.tabs.create({ url: 'about:blank' })).id!;
  }

  return tabId;
}
