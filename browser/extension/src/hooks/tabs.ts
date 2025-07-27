import { useState, useEffect } from "react";
import { store } from "@/lib/store";
import { TabsState } from "@/lib/types";

export function useTabs(): TabsState {
  const [tabs, setTabs] = useState<TabsState>({ tabs: {} });

  useEffect(() => {
    const loadTabs = async () => {
      const result = await store.get("tabs");
      setTabs({ tabs: result.tabs || {} });
    };
    loadTabs();
    const unsubscribe = store.onChange((changes) => {
      if ("tabs" in changes) {
        setTabs({ tabs: changes.tabs || {} });
      }
    });
    return unsubscribe;
  }, []);

  return tabs;
}
