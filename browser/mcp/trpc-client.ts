// mcp/trpc-client.ts
import { createTRPCClient } from '@trpc/client';
import { chromeLink } from 'trpc-chrome/link';
import type { AppRouter } from '../src/shared/router';
import type { ToolResponse } from '../src/shared/types';

/**
 * tRPC-based MCP client for direct communication with the Chrome extension
 * This provides a type-safe alternative to the WebSocket-based approach
 */
export class TRPCMcpClient {
  private client: ReturnType<typeof createTRPCClient<AppRouter>>;

  constructor() {
    // Note: This would need to be initialized differently in a non-extension context
    // For now, this is a reference implementation
    const port = chrome.runtime.connect();
    this.client = createTRPCClient<AppRouter>({
      links: [chromeLink({ port })],
    });
  }

  // Helper function to format tool responses consistently
  private async formatToolResponse(status: string, sessionId?: string): Promise<ToolResponse> {
    try {
      const [url, title, snapshot] = await Promise.all([
        this.client.getUrl.query({ sessionId }),
        this.client.getTitle.query({ sessionId }),
        this.client.snapshot.query({ sessionId }),
      ]);

      return {
        content: [
          {
            type: "text",
            text: `${status ? `${status}\n` : ""}- Page URL: ${url}\n- Page Title: ${title}\n- Page Snapshot\n\`\`\`yaml\n${snapshot}\n\`\`\``,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `${status}\nError getting page details: ${error}`,
          },
        ],
      };
    }
  }

  // Browser automation methods
  async navigate(url: string, sessionId?: string): Promise<ToolResponse> {
    try {
      await this.client.navigate.mutate({ url, sessionId });
      return this.formatToolResponse("Navigated to " + url, sessionId);
    } catch (error) {
      return this.formatToolResponse("Error navigating to " + url, sessionId);
    }
  }

  async goBack(sessionId?: string): Promise<ToolResponse> {
    try {
      await this.client.goBack.mutate({ sessionId });
      return this.formatToolResponse("Navigated back", sessionId);
    } catch (error) {
      return this.formatToolResponse("Error navigating back", sessionId);
    }
  }

  async goForward(sessionId?: string): Promise<ToolResponse> {
    try {
      await this.client.goForward.mutate({ sessionId });
      return this.formatToolResponse("Navigated forward", sessionId);
    } catch (error) {
      return this.formatToolResponse("Error navigating forward", sessionId);
    }
  }

  async snapshot(sessionId?: string): Promise<ToolResponse> {
    try {
      await this.client.snapshot.query({ sessionId });
      return this.formatToolResponse("Snapshot captured", sessionId);
    } catch (error) {
      return this.formatToolResponse("Error capturing snapshot", sessionId);
    }
  }

  async click(element: string, ref: string, sessionId?: string): Promise<ToolResponse> {
    try {
      await this.client.click.mutate({ element, ref, sessionId });
      return this.formatToolResponse("Clicked element", sessionId);
    } catch (error) {
      return this.formatToolResponse("Error clicking element", sessionId);
    }
  }

  async hover(element: string, ref: string, sessionId?: string): Promise<ToolResponse> {
    try {
      await this.client.hover.mutate({ element, ref, sessionId });
      return this.formatToolResponse("Hovered over element", sessionId);
    } catch (error) {
      return this.formatToolResponse("Error hovering over element", sessionId);
    }
  }

  async type(element: string, ref: string, text: string, submit?: boolean, sessionId?: string): Promise<ToolResponse> {
    try {
      await this.client.type.mutate({ element, ref, text, submit, sessionId });
      return this.formatToolResponse("Typed text into element", sessionId);
    } catch (error) {
      return this.formatToolResponse("Error typing text into element", sessionId);
    }
  }

  async selectOption(element: string, ref: string, values: string[], sessionId?: string): Promise<ToolResponse> {
    try {
      await this.client.selectOption.mutate({ element, ref, values, sessionId });
      return this.formatToolResponse("Selected option", sessionId);
    } catch (error) {
      return this.formatToolResponse("Error selecting option", sessionId);
    }
  }

  async pressKey(key: string, sessionId?: string): Promise<ToolResponse> {
    try {
      await this.client.pressKey.mutate({ key, sessionId });
      return this.formatToolResponse("Pressed key", sessionId);
    } catch (error) {
      return this.formatToolResponse("Error pressing key", sessionId);
    }
  }

  async getConsoleLogs(sessionId?: string): Promise<ToolResponse> {
    try {
      const logs = await this.client.getConsoleLogs.query({ sessionId });
      return {
        content: [
          {
            type: "text",
            text: `Console logs retrieved:\n\`\`\`json\n${JSON.stringify(logs, null, 2)}\n\`\`\``,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error getting console logs: ${error}`,
          },
        ],
      };
    }
  }

  // Session management methods
  async getSessions() {
    return this.client.getSessions.query();
  }

  async closeSession(sessionId: string) {
    return this.client.closeSession.mutate({ sessionId });
  }

  async showSession(sessionId: string) {
    return this.client.showSession.mutate({ sessionId });
  }

  async hideSession(sessionId: string) {
    return this.client.hideSession.mutate({ sessionId });
  }

  // WebSocket management methods
  async wsConnect() {
    return this.client.wsConnect.mutate();
  }

  async wsDisconnect() {
    return this.client.wsDisconnect.mutate();
  }

  async wsGetStatus() {
    return this.client.wsGetStatus.query();
  }

  async wsSetUrl(url: string) {
    return this.client.wsSetUrl.mutate({ url });
  }
}
