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

export interface StorageState extends WebSocketState, TabsState { }
