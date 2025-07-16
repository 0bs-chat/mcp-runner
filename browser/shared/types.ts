// shared/types.ts

export type CDPCommand = {
  id: number;
  sessionId?: string;
  method: string;
  params?: any;
};

export type CDPResponse = {
  id?: number;
  sessionId?: string;
  method?: string;
  params?: any;
  result?: any;
  error?: { code?: number; message: string };
};

export type PopupMessage = {
  type: 'getStatus' | 'connect' | 'disconnect';
  tabId: number;
  bridgeUrl?: string;
};