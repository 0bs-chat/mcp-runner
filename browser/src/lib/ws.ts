// lib/ws.ts
import { useCallback, useEffect, useState } from "react";

interface WebSocketStatus {
  connected: boolean;
  connecting: boolean;
  url: string;
}

interface WebSocketMessage {
  type: string;
  [key: string]: any;
}

interface SessionInfo {
  id: string;
  tabId: number;
  isHeadless: boolean;
  url?: string;
  title?: string;
  createdAt: number;
}

/**
 * Custom hook for managing WebSocket connection with the background script
 */
export function useWebSocket() {
  const [status, setStatus] = useState<WebSocketStatus>({
    connected: false,
    connecting: false,
    url: "ws://localhost:8080"
  });
  const [sessions, setSessions] = useState<SessionInfo[]>([]);

  // Listen for status updates from background script
  useEffect(() => {
    const handleMessage = (message: WebSocketMessage) => {
      if (message.type === "wsStatus") {
        setStatus({
          connected: message.connected,
          connecting: message.connecting,
          url: message.url
        });
      }
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    // Get initial status on mount
    chrome.runtime.sendMessage({ type: "getStatus" }, (response) => {
      if (response) {
        setStatus({
          connected: response.connected,
          connecting: response.connecting,
          url: response.url
        });
      }
    });

    // Get initial sessions
    refreshSessions();

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  const connect = useCallback(() => {
    setStatus(prev => ({ ...prev, connecting: true }));
    chrome.runtime.sendMessage({ type: "connect" });
  }, []);

  const disconnect = useCallback(() => {
    chrome.runtime.sendMessage({ type: "disconnect" });
  }, []);

  const setUrl = useCallback((newUrl: string) => {
    chrome.runtime.sendMessage({ type: "setUrl", url: newUrl }, () => {
      setStatus(prev => ({ ...prev, url: newUrl }));
    });
  }, []);

  const refreshSessions = useCallback(() => {
    chrome.runtime.sendMessage({ type: "getSessions" }, (response) => {
      if (response?.sessions) {
        setSessions(response.sessions);
      }
    });
  }, []);

  const closeSession = useCallback((sessionId: string) => {
    chrome.runtime.sendMessage({ type: "closeSession", sessionId }, () => {
      refreshSessions();
    });
  }, [refreshSessions]);

  const showSession = useCallback((sessionId: string) => {
    chrome.runtime.sendMessage({ type: "showSession", sessionId });
  }, []);

  const hideSession = useCallback((sessionId: string) => {
    chrome.runtime.sendMessage({ type: "hideSession", sessionId });
  }, []);

  return {
    connected: status.connected,
    connecting: status.connecting,
    url: status.url,
    sessions,
    connect,
    disconnect,
    setUrl,
    refreshSessions,
    closeSession,
    showSession,
    hideSession,
  };
}

/**
 * Legacy function for compatibility - returns null as WebSocket is managed by background script
 */
export function getWebSocket(): null {
  return null;
}