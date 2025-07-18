export async function waitNetworkIdle(tabId: number, idleTime = 500): Promise<void> {
  return new Promise<void>((resolve) => {
    const listener = (updatedTabId: number, changeInfo: chrome.tabs.OnUpdatedInfo) => {
      if (updatedTabId === tabId && changeInfo.status === 'complete') {
        chrome.tabs.onUpdated.removeListener(listener);
        setTimeout(resolve, idleTime);
      }
    };
    chrome.tabs.onUpdated.addListener(listener);
  });
}