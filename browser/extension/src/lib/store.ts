import { StorageState } from "./types";

export const store = {
  /**
   * Get one or more keys
   */
  async get<K extends keyof StorageState>(
    keys?: K | K[] | Partial<StorageState>
  ): Promise<Pick<StorageState, K>> {
    const result = await chrome.storage.local.get(keys);
    return result as Pick<StorageState, K>;
  },

  /**
   * Set one or more keys
   */
  async set(items: Partial<StorageState>): Promise<void> {
    return chrome.storage.local.set(items);
  },

  /**
   * Remove keys
   */
  async remove(keys: keyof StorageState | (keyof StorageState)[]): Promise<void> {
    return chrome.storage.local.remove(keys);
  },

  /**
   * Listen to changes (works in every context)
   */
  onChange(
    cb: (
      changes: Partial<StorageState>,
      areaName: chrome.storage.AreaName
    ) => void
  ): () => void {
    const listener = (
      changes: { [key: string]: chrome.storage.StorageChange },
      areaName: chrome.storage.AreaName
    ) => {
      const typed: Partial<StorageState> = {};
      for (const [k, v] of Object.entries(changes)) {
        (typed as any)[k] = v.newValue;
      }
      cb(typed, areaName);
    };
    chrome.storage.onChanged.addListener(listener);
    return () => chrome.storage.onChanged.removeListener(listener);
  },
};