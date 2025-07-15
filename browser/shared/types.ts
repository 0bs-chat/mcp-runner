// shared/types.ts
export interface CDPMessage {
  id?: number;
  tabName?: string;
  method: string;
  params?: any;
  result?: any;
  error?: any;
}

export interface ExtensionConfig {
  serverUrl: string;
}

export type ExtensionMessage =
  | { type: 'connection.status' }
  | { type: 'connection.connect' }
  | { type: 'connection.disconnect' }
  | { type: 'config.update'; payload: Partial<ExtensionConfig> }
  | { type: 'tab.attach'; payload: { name: string } }
  | { type: 'tab.remove'; payload: { name: string } };