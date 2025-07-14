// shared/types.ts
export interface SelectorParam {
  element: string;
  ref: string;
}

export interface TypeParam extends SelectorParam {
  text: string;
  submit?: boolean;
}

export interface SelectOptionParam extends SelectorParam {
  values: string[];
}

export interface SessionInfo {
  id: string;
  tabId: number;
  isHeadless: boolean;
  url?: string;
  title?: string;
  createdAt: number;
}

export interface WebSocketStatus {
  connected: boolean;
  connecting: boolean;
  url: string;
}

export interface ConsoleLog {
  type: "log" | "error" | "warn";
  timestamp: number;
  args: any[];
}

export interface NavigateParams {
  url: string;
  sessionId?: string;
}

export interface SessionParams {
  sessionId?: string;
}

export interface WaitParams {
  time: number;
}

export interface PressKeyParams {
  key: string;
  sessionId?: string;
}

export interface ScreenshotResult {
  screenshot: string;
}

export interface ToolResponse {
  content: Array<{ type: "text"; text: string }>;
}
