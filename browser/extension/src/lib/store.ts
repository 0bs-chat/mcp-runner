import { StoreState } from "./types";

type ChangeListener = (changes: Partial<StoreState>) => void;

class Store {
  private listeners: ChangeListener[] = [];

  async get(key?: keyof StoreState): Promise<any> {
    if (key) {
      const result = await chrome.storage.local.get(key);
      return result[key];
    }
    return await chrome.storage.local.get();
  }

  async set(data: Partial<StoreState>): Promise<void> {
    await chrome.storage.local.set(data);
    this.notifyListeners(data);
  }

  onChange(listener: ChangeListener): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notifyListeners(changes: Partial<StoreState>): void {
    this.listeners.forEach((listener) => listener(changes));
  }
}

export const store = new Store();
