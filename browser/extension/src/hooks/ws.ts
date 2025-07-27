import { useState, useEffect, useCallback } from "react";
import { WebSocketState, WebSocketActions } from "@/lib/types";
import { store } from "@/lib/store";

export function useWebSocket(): [WebSocketState, WebSocketActions] {
  const [state, setState] = useState<WebSocketState>({
    isConnected: false,
    error: null,
    serverUrl: null,
  });

  // Load initial state from storage
  useEffect(() => {
    const loadInitialState = async () => {
      const initialState = await store.get();
      setState({
        isConnected: initialState.isConnected ?? false,
        error: initialState.error ?? null,
        serverUrl: initialState.serverUrl ?? null,
      });
    };
    loadInitialState();
  }, []);

  // Listen to storage changes
  useEffect(() => {
    const unsubscribe = store.onChange((changes) => {
      setState((prev: WebSocketState) => ({ ...prev, ...changes }));
    });
    return unsubscribe;
  }, []);

  const connect = useCallback(async (url: string) => {
    try {
      await chrome.runtime.sendMessage({
        type: "WEBSOCKET_CONNECT",
        url,
      });
    } catch (error) {
      console.error("Failed to connect:", error);
    }
  }, []);

  const disconnect = useCallback(async () => {
    try {
      await chrome.runtime.sendMessage({
        type: "WEBSOCKET_DISCONNECT",
      });
    } catch (error) {
      console.error("Failed to disconnect:", error);
    }
  }, []);

  return [state, { connect, disconnect }];
}
