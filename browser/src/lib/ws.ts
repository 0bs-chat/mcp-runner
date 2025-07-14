// lib/ws.ts
import { useCallback, useEffect, useState } from "react";
import { createTRPCClient } from '@trpc/client';
import { chromeLink } from 'trpc-chrome/link';
import type { AppRouter } from '../shared/router';
import type { WebSocketStatus, SessionInfo } from '../shared/types';

interface WebSocketMessage {
  type: string;
  [key: string]: any;
}

// Create tRPC client
const port = chrome.runtime.connect();
const trpcClient = createTRPCClient<AppRouter>({
  links: [chromeLink({ port })],
});

/**
 * Custom hook for managing WebSocket connection with the background script
 * Now using tRPC for type-safe communication
 */
export function useWebSocket() {
  const [status, setStatus] = useState<WebSocketStatus>({
    connected: false,
    connecting: false,
    url: "ws://localhost:8080"
  });
  const [sessions, setSessions] = useState<SessionInfo[]>([]);

  // Listen for status updates from background script (legacy)
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

    // Get initial status using tRPC
    trpcClient.wsGetStatus.query().then((response) => {
      setStatus(response);
    }).catch(() => {
      // Fallback to legacy message handling
      chrome.runtime.sendMessage({ type: "getStatus" }, (response) => {
        if (response) {
          setStatus({
            connected: response.connected,
            connecting: response.connecting,
            url: response.url
          });
        }
      });
    });

    // Get initial sessions using tRPC
    refreshSessions();

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  const connect = useCallback(async () => {
    setStatus(prev => ({ ...prev, connecting: true }));
    try {
      await trpcClient.wsConnect.mutate();
    } catch {
      // Fallback to legacy
      chrome.runtime.sendMessage({ type: "connect" });
    }
  }, []);

  const disconnect = useCallback(async () => {
    try {
      await trpcClient.wsDisconnect.mutate();
    } catch {
      // Fallback to legacy
      chrome.runtime.sendMessage({ type: "disconnect" });
    }
  }, []);

  const setUrl = useCallback(async (newUrl: string) => {
    try {
      await trpcClient.wsSetUrl.mutate({ url: newUrl });
      setStatus(prev => ({ ...prev, url: newUrl }));
    } catch {
      // Fallback to legacy
      chrome.runtime.sendMessage({ type: "setUrl", url: newUrl }, () => {
        setStatus(prev => ({ ...prev, url: newUrl }));
      });
    }
  }, []);

  const refreshSessions = useCallback(async () => {
    try {
      const sessions = await trpcClient.getSessions.query();
      setSessions(sessions);
    } catch {
      // Fallback to legacy
      chrome.runtime.sendMessage({ type: "getSessions" }, (response) => {
        if (response?.sessions) {
          setSessions(response.sessions);
        }
      });
    }
  }, []);

  const closeSession = useCallback(async (sessionId: string) => {
    try {
      await trpcClient.closeSession.mutate({ sessionId });
      refreshSessions();
    } catch {
      // Fallback to legacy
      chrome.runtime.sendMessage({ type: "closeSession", sessionId }, () => {
        refreshSessions();
      });
    }
  }, [refreshSessions]);

  const showSession = useCallback(async (sessionId: string) => {
    try {
      await trpcClient.showSession.mutate({ sessionId });
    } catch {
      // Fallback to legacy
      chrome.runtime.sendMessage({ type: "showSession", sessionId });
    }
  }, []);

  const hideSession = useCallback(async (sessionId: string) => {
    try {
      await trpcClient.hideSession.mutate({ sessionId });
    } catch {
      // Fallback to legacy
      chrome.runtime.sendMessage({ type: "hideSession", sessionId });
    }
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