export interface WebSocketState {
  isConnected: boolean
  error: string | null
  serverUrl: string | null
}

export interface WebSocketActions {
  connect: (url: string) => Promise<void>
  disconnect: () => Promise<void>
}

export type TabsState = {
  tabs: Record<string, number>
}

export interface StorageState extends WebSocketState, TabsState {}

// WebSocket message types for background/ws.ts
export type WebSocketMethod =
  | 'navigate'
  | 'goBack'
  | 'goForward'
  | 'getUrl'
  | 'getTitle'
  | 'wait'
  | 'snapshot'
  | 'click'
  | 'hover'
  | 'type'
  | 'selectOption'
  | 'pressKey'
  | 'getConsoleLogs';

export interface WebSocketBaseMessage {
  id: string | number;
  method: WebSocketMethod;
  params: Record<string, any>;
}

// Per-method params (for stricter typing, can be extended)
export interface NavigateParams { url: string; tabName?: string }
export interface WaitParams { seconds?: number; tabName?: string }
export interface TabNameParams { tabName?: string }

export function isWebSocketBaseMessage(msg: any): msg is WebSocketBaseMessage {
  return (
    msg && typeof msg === 'object' &&
    ('id' in msg) &&
    typeof msg.method === 'string' &&
    'params' in msg && typeof msg.params === 'object'
  )
}
