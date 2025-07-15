// Browser automation server using Bun with WebSocket support
import { type ServerWebSocket } from "bun";

interface CDPMessage {
  id?: number;
  method: string;
  params?: any;
  result?: any;
  error?: any;
}

interface WebSocketData {
  type: 'extension' | 'client';
}

class BrowserAutomationServer {
  private extensionWs: ServerWebSocket<WebSocketData> | null = null;
  private messageId = 0;
  private pendingMessages = new Map<number, {
    resolve: (result: any) => void;
    reject: (error: any) => void;
    timeout: Timer;
  }>();

  constructor() {
    console.log('[BrowserAutomationServer] Initializing...');
  }

  // HTTP request handler
  async handleRequest(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;
    const method = request.method;

    console.log(`[HTTP] ${method} ${pathname}`);

    // Handle CORS preflight
    if (method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: this.getCorsHeaders()
      });
    }

    try {
      switch (pathname) {
        case '/status':
          return this.handleStatus();

        case '/connect':
          if (method === 'POST') {
            return await this.handleConnect();
          }
          break;

        case '/execute':
          if (method === 'POST') {
            return await this.handleExecute(request);
          }
          break;

        case '/navigate':
          if (method === 'POST') {
            return await this.handleNavigate(request);
          }
          break;

        case '/click':
          if (method === 'POST') {
            return await this.handleClick(request);
          }
          break;

        case '/type':
          if (method === 'POST') {
            return await this.handleType(request);
          }
          break;

        case '/evaluate':
          if (method === 'POST') {
            return await this.handleEvaluate(request);
          }
          break;
      }

      return new Response('Not Found', {
        status: 404,
        headers: this.getCorsHeaders()
      });

    } catch (error) {
      console.error('[HTTP] Request error:', error);
      return new Response(
        JSON.stringify({
          error: (error as Error).message,
          stack: (error as Error).stack
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...this.getCorsHeaders()
          }
        }
      );
    }
  } private getCorsHeaders() {
    return {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
  }

  private handleStatus(): Response {
    const status = {
      connected: !!this.extensionWs,
      serverReady: true,
      timestamp: new Date().toISOString()
    };

    console.log('[HTTP] Status check:', status);

    return new Response(JSON.stringify(status), {
      headers: {
        'Content-Type': 'application/json',
        ...this.getCorsHeaders()
      }
    });
  }

  private async handleConnect(): Promise<Response> {
    try {
      if (!this.extensionWs) {
        throw new Error('Extension not connected');
      }

      console.log('[HTTP] Creating new tab...');
      const result = await this.sendToExtension({
        method: 'createTab',
        params: { url: 'about:blank' }
      });

      return new Response(JSON.stringify({
        success: true,
        tabId: result.tabId
      }), {
        headers: {
          'Content-Type': 'application/json',
          ...this.getCorsHeaders()
        }
      });
    } catch (error) {
      console.error('[HTTP] Connect error:', error);
      throw error;
    }
  }

  private async handleExecute(request: Request): Promise<Response> {
    const { code, type = 'evaluate' } = await request.json();

    if (!code) {
      return new Response(
        JSON.stringify({ error: 'Code is required' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...this.getCorsHeaders()
          }
        }
      );
    }

    console.log(`[HTTP] Execute: type=${type}, code=${JSON.stringify(code)}`);

    const result = await this.executeCommand(code, type);

    return new Response(JSON.stringify({ result }), {
      headers: {
        'Content-Type': 'application/json',
        ...this.getCorsHeaders()
      }
    });
  }

  private async handleNavigate(request: Request): Promise<Response> {
    const { url } = await request.json();

    if (!url) {
      return new Response(
        JSON.stringify({ error: 'URL is required' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...this.getCorsHeaders()
          }
        }
      );
    }

    console.log(`[HTTP] Navigate to: ${url}`);

    const result = await this.sendToExtension({
      method: 'Page.navigate',
      params: { url }
    });

    return new Response(JSON.stringify({ result }), {
      headers: {
        'Content-Type': 'application/json',
        ...this.getCorsHeaders()
      }
    });
  }

  private async handleClick(request: Request): Promise<Response> {
    const { selector } = await request.json();

    if (!selector) {
      return new Response(
        JSON.stringify({ error: 'Selector is required' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...this.getCorsHeaders()
          }
        }
      );
    }

    console.log(`[HTTP] Click selector: ${selector}`);

    const result = await this.clickElement(selector);

    return new Response(JSON.stringify({ result }), {
      headers: {
        'Content-Type': 'application/json',
        ...this.getCorsHeaders()
      }
    });
  }

  private async handleType(request: Request): Promise<Response> {
    const { selector, text } = await request.json();

    if (!selector || !text) {
      return new Response(
        JSON.stringify({ error: 'Selector and text are required' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...this.getCorsHeaders()
          }
        }
      );
    }

    console.log(`[HTTP] Type into ${selector}: ${text}`);

    const result = await this.typeText(selector, text);

    return new Response(JSON.stringify({ result }), {
      headers: {
        'Content-Type': 'application/json',
        ...this.getCorsHeaders()
      }
    });
  }

  private async handleEvaluate(request: Request): Promise<Response> {
    const { expression } = await request.json();

    if (!expression) {
      return new Response(
        JSON.stringify({ error: 'Expression is required' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...this.getCorsHeaders()
          }
        }
      );
    }

    console.log(`[HTTP] Evaluate: ${expression}`);

    const result = await this.sendToExtension({
      method: 'Runtime.evaluate',
      params: {
        expression,
        returnByValue: true
      }
    });

    return new Response(JSON.stringify({ result }), {
      headers: {
        'Content-Type': 'application/json',
        ...this.getCorsHeaders()
      }
    });
  }

  // WebSocket message handlers
  handleWebSocketMessage(ws: ServerWebSocket<WebSocketData>, message: string) {
    try {
      const data: CDPMessage = JSON.parse(message);
      console.log('[WebSocket] Received from extension:', data);

      // Handle response to pending message
      if (data.id && this.pendingMessages.has(data.id)) {
        const pending = this.pendingMessages.get(data.id)!;
        this.pendingMessages.delete(data.id);
        clearTimeout(pending.timeout);

        if (data.error) {
          pending.reject(new Error(data.error.message || 'Unknown error'));
        } else {
          pending.resolve(data.result);
        }
      }

      // Handle notifications (events without id)
      if (!data.id) {
        console.log('[WebSocket] Event from extension:', data.method, data.params);
      }

    } catch (error) {
      console.error('[WebSocket] Error parsing message:', error);
    }
  }

  handleWebSocketOpen(ws: ServerWebSocket<WebSocketData>) {
    console.log('[WebSocket] ✅ Extension connected');
    this.extensionWs = ws;
  }

  handleWebSocketClose(ws: ServerWebSocket<WebSocketData>) {
    console.log('[WebSocket] ❌ Extension disconnected');
    if (this.extensionWs === ws) {
      this.extensionWs = null;
    }

    // Reject all pending messages
    for (const [id, pending] of this.pendingMessages) {
      clearTimeout(pending.timeout);
      pending.reject(new Error('Extension disconnected'));
    }
    this.pendingMessages.clear();
  }

  handleWebSocketError(ws: ServerWebSocket<WebSocketData>, error: Error) {
    console.error('[WebSocket] ⚠️ Error:', error);
    // Note: Bun doesn't call this automatically, it's here for manual error handling
  }

  // Command execution methods
  private async executeCommand(code: string, type: string): Promise<any> {
    switch (type) {
      case 'evaluate':
        return await this.sendToExtension({
          method: 'Runtime.evaluate',
          params: {
            expression: code,
            returnByValue: true
          }
        });

      case 'click':
        const clickMatch = code.match(/click\(['"]([^'"]+)['"]\)/);
        if (clickMatch) {
          return await this.clickElement(clickMatch[1]!);
        }
        throw new Error('Invalid click syntax');

      case 'type':
        const typeMatch = code.match(/type\(['"]([^'"]+)['"],\s*['"]([^'"]+)['"]\)/);
        if (typeMatch) {
          const [, selector, text] = typeMatch;
          return await this.typeText(selector!, text!);
        }
        throw new Error('Invalid type syntax');

      case 'goto':
        const gotoMatch = code.match(/goto\(['"]([^'"]+)['"]\)/);
        if (gotoMatch) {
          return await this.sendToExtension({
            method: 'Page.navigate',
            params: { url: gotoMatch[1] }
          });
        }
        throw new Error('Invalid goto syntax');

      default:
        throw new Error(`Unknown execution type: ${type}`);
    }
  }

  private async clickElement(selector: string): Promise<any> {
    console.log(`[Action] Clicking element: ${selector}`);

    // Use Runtime.evaluate to find and click the element
    const result = await this.sendToExtension({
      method: 'Runtime.evaluate',
      params: {
        expression: `
          (() => {
            const element = document.querySelector('${selector}');
            if (!element) {
              throw new Error('Element not found: ${selector}');
            }
            element.click();
            return { success: true, elementFound: true };
          })()
        `,
        returnByValue: true
      }
    });

    return result;
  }

  private async typeText(selector: string, text: string): Promise<any> {
    console.log(`[Action] Typing into ${selector}: ${text}`);

    // Use Runtime.evaluate to find element and type text
    const result = await this.sendToExtension({
      method: 'Runtime.evaluate',
      params: {
        expression: `
          (() => {
            const element = document.querySelector('${selector}');
            if (!element) {
              throw new Error('Element not found: ${selector}');
            }
            
            // Focus the element
            element.focus();
            
            // Set the value for input elements
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
              element.value = '${text.replace(/'/g, "\\'")}';
              
              // Trigger input event
              element.dispatchEvent(new Event('input', { bubbles: true }));
              element.dispatchEvent(new Event('change', { bubbles: true }));
            } else {
              // For contenteditable or other elements
              element.textContent = '${text.replace(/'/g, "\\'")}';
            }
            
            return { success: true, elementFound: true };
          })()
        `,
        returnByValue: true
      }
    });

    return result;
  }

  private async sendToExtension(message: CDPMessage): Promise<any> {
    if (!this.extensionWs) {
      throw new Error('Extension not connected');
    }

    return new Promise((resolve, reject) => {
      const id = ++this.messageId;
      const messageWithId = { ...message, id };

      console.log('[WebSocket] Sending to extension:', messageWithId);

      // Set up timeout
      const timeout = setTimeout(() => {
        if (this.pendingMessages.has(id)) {
          this.pendingMessages.delete(id);
          reject(new Error(`Command timeout after 10s: ${message.method}`));
        }
      }, 10000);

      // Store pending message
      this.pendingMessages.set(id, { resolve, reject, timeout });

      // Send message
      this.extensionWs!.send(JSON.stringify(messageWithId));
    });
  }
}

// Create server instance
const browserServer = new BrowserAutomationServer();

// Start Bun server
const server = Bun.serve({
  port: 3000,
  fetch: (request, server) => {
    // Handle WebSocket upgrade
    if (request.headers.get("upgrade") === "websocket") {
      const url = new URL(request.url);
      if (url.pathname === '/ws') {
        console.log('[WebSocket] Upgrading connection...');
        const success = server.upgrade(request, {
          data: { type: 'extension' as const }
        });
        if (success) {
          return undefined; // Bun handles the upgrade
        }
      }
      return new Response('WebSocket upgrade failed', { status: 400 });
    }

    return browserServer.handleRequest(request);
  },

  websocket: {
    message: (ws, message) => {
      browserServer.handleWebSocketMessage(ws as ServerWebSocket<WebSocketData>, message.toString());
    },

    open: (ws) => {
      browserServer.handleWebSocketOpen(ws as ServerWebSocket<WebSocketData>);
    },

    close: (ws, code, reason) => {
      browserServer.handleWebSocketClose(ws as ServerWebSocket<WebSocketData>);
    }
  }
});

console.log(`🚀 Browser Automation Server running on http://localhost:${server.port}`);
console.log(`🔌 WebSocket endpoint: ws://localhost:${server.port}/ws`);