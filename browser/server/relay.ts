import { WebSocket, WebSocketServer } from 'ws';
import http from 'node:http';
import debug from 'debug';
import type { AddressInfo } from 'node:net';
import assert from 'node:assert';
import type { CDPCommand, CDPResponse } from '../shared/types';

export function httpAddressToString(address: string | AddressInfo | null): string {
  assert(address, 'Could not bind server socket');
  if (typeof address === 'string') return address;
  const port = address.port;
  let host = address.family === 'IPv4' ? address.address : `[${address.address}]`;
  if (host === '0.0.0.0' || host === '[::]') host = 'localhost';
  return `http://${host}:${port}`;
}

const debugLogger = debug('pw:mcp:relay');

const CDP_PATH = '/cdp';
const EXTENSION_PATH = '/extension';

export class CDPRelayServer {
  private _wss: WebSocketServer;
  private _playwrightSocket: WebSocket | null = null;
  private _extensionConnection: ExtensionConnection | null = null;
  private _connectionInfo:
    | { targetInfo: any; sessionId: string }
    | undefined;

  constructor(server: http.Server) {
    this._wss = new WebSocketServer({ server });
    this._wss.on('connection', this._onConnection.bind(this));
  }

  stop(): void {
    this._playwrightSocket?.close();
    this._extensionConnection?.close();
  }

  private _onConnection(ws: WebSocket, request: http.IncomingMessage): void {
    const url = new URL(`http://localhost${request.url}`);
    debugLogger(`New connection to ${url.pathname}`);
    if (url.pathname === CDP_PATH) {
      this._handlePlaywrightConnection(ws);
    } else if (url.pathname === EXTENSION_PATH) {
      this._handleExtensionConnection(ws);
    } else {
      ws.close(4004, 'Invalid path');
    }
  }

  private _handlePlaywrightConnection(ws: WebSocket): void {
    if (this._playwrightSocket?.readyState === WebSocket.OPEN) {
      this._playwrightSocket.close(1000, 'New connection established');
    }
    this._playwrightSocket = ws;
    ws.on('message', async (data) => {
      try {
        const message = JSON.parse(data.toString());
        await this._handlePlaywrightMessage(message);
      } catch (error) {
        debugLogger('Error parsing Playwright message:', error);
      }
    });
    ws.on('close', () => {
      if (this._playwrightSocket === ws) {
        this._detachDebugger();
        this._playwrightSocket = null;
      }
    });
    ws.on('error', (error) => {
      debugLogger('Playwright WebSocket error:', error);
    });
  }

  private async _detachDebugger() {
    this._connectionInfo = undefined;
    await this._extensionConnection?.send('detachFromTab', {});
  }

  private _handleExtensionConnection(ws: WebSocket): void {
    if (this._extensionConnection) {
      this._extensionConnection.close('New connection established');
    }
    this._extensionConnection = new ExtensionConnection(ws);
    this._extensionConnection.onclose = (c) => {
      if (this._extensionConnection === c) {
        this._extensionConnection = null;
      }
    };
    this._extensionConnection.onmessage = this._handleExtensionMessage.bind(
      this
    );
  }

  private _handleExtensionMessage(method: string, params: any) {
    switch (method) {
      case 'forwardCDPEvent':
        this._sendToPlaywright({
          sessionId: params.sessionId,
          method: params.method,
          params: params.params,
        });
        break;
      case 'detachedFromTab':
        this._connectionInfo = undefined;
        this._extensionConnection?.close();
        this._extensionConnection = null;
        break;
    }
  }

  private async _handlePlaywrightMessage(message: CDPCommand): Promise<void> {
    if (!this._extensionConnection) {
      this._sendToPlaywright({ id: message.id, error: { message: 'Extension not connected' } });
      return;
    }
    if (await this._interceptCDPCommand(message)) return;
    await this._forwardToExtension(message);
  }

  private async _interceptCDPCommand(message: CDPCommand): Promise<boolean> {
    switch (message.method) {
      case 'Browser.getVersion':
        this._sendToPlaywright({
          id: message.id,
          result: {
            protocolVersion: '1.3',
            product: 'Chrome/Extension-Bridge',
            userAgent: 'CDP-Bridge-Server/1.0.0',
          },
        });
        return true;
      case 'Browser.setDownloadBehavior':
        this._sendToPlaywright({ id: message.id });
        return true;
      case 'Target.setAutoAttach':
        if (!message.sessionId) {
          this._connectionInfo = await this._extensionConnection!.send('attachToTab');
          this._sendToPlaywright({
            method: 'Target.attachedToTarget',
            params: {
              sessionId: this._connectionInfo!.sessionId,
              targetInfo: {
                ...this._connectionInfo!.targetInfo,
                attached: true,
              },
              waitingForDebugger: false,
            },
          });
          this._sendToPlaywright({ id: message.id });
        } else {
          await this._forwardToExtension(message);
        }
        return true;
      case 'Target.getTargetInfo':
        this._sendToPlaywright({
          id: message.id,
          result: this._connectionInfo?.targetInfo,
        });
        return true;
    }
    return false;
  }

  private async _forwardToExtension(message: CDPCommand): Promise<void> {
    try {
      if (!this._extensionConnection) throw new Error('Extension not connected');
      const { id, sessionId, method, params } = message;
      const result = await this._extensionConnection.send('forwardCDPCommand', { sessionId, method, params });
      this._sendToPlaywright({ id, sessionId, result });
    } catch (e) {
      this._sendToPlaywright({
        id: message.id,
        sessionId: message.sessionId,
        error: { message: (e as Error).message },
      });
    }
  }

  private _sendToPlaywright(message: CDPResponse): void {
    this._playwrightSocket?.send(JSON.stringify(message));
  }
}

export async function startCDPRelayServer(httpServer: http.Server) {
  const wsAddress = httpAddressToString(httpServer.address()).replace(/^http/, 'ws');
  const cdpRelayServer = new CDPRelayServer(httpServer);
  process.on('exit', () => cdpRelayServer.stop());
  console.error(`CDP relay server started on ${wsAddress}${EXTENSION_PATH}`);
  const cdpEndpoint = `${wsAddress}${CDP_PATH}`;
  return cdpEndpoint;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = parseInt(process.argv[2] ?? '9223', 10);
  const httpServer = http.createServer();
  await new Promise<void>((resolve) => httpServer.listen(port, resolve));
  const server = new CDPRelayServer(httpServer);
  console.error(`CDP Bridge Server listening on ws://localhost:${port}`);
  console.error(`- Playwright MCP: ws://localhost:${port}${CDP_PATH}`);
  console.error(`- Extension: ws://localhost:${port}${EXTENSION_PATH}`);
  process.on('SIGINT', () => {
    server.stop();
    process.exit(0);
  });
}

class ExtensionConnection {
  private _ws: WebSocket;
  private _callbacks = new Map<number, { resolve: (o: any) => void; reject: (e: Error) => void }>();
  private _lastId = 0;

  onmessage?: (method: string, params: any) => void;
  onclose?: (self: ExtensionConnection) => void;

  constructor(ws: WebSocket) {
    this._ws = ws;
    this._ws.on('message', this._onMessage.bind(this));
    this._ws.on('close', this._onClose.bind(this));
    this._ws.on('error', this._onError.bind(this));
  }

  async send(method: string, params?: any, sessionId?: string): Promise<any> {
    if (this._ws.readyState !== WebSocket.OPEN) throw new Error('WebSocket closed');
    const id = ++this._lastId;
    this._ws.send(JSON.stringify({ id, method, params, sessionId }));
    return new Promise((resolve, reject) => {
      this._callbacks.set(id, { resolve, reject });
    });
  }

  close(message?: string) {
    this._ws.close(1000, message ?? 'Connection closed');
    this.onclose?.(this);
  }

  private _onMessage(event: WebSocket.RawData) {
    const data = event.toString();
    let parsed;
    try {
      parsed = JSON.parse(data);
    } catch (e) {
      this._ws.close();
      return;
    }
    this._handleParsedMessage(parsed);
  }

  private _handleParsedMessage(object: any) {
    if (object.id && this._callbacks.has(object.id)) {
      const callback = this._callbacks.get(object.id)!;
      this._callbacks.delete(object.id);
      if (object.error) callback.reject(new Error(object.error.message));
      else callback.resolve(object.result);
    } else if (object.id) {
    } else {
      this.onmessage?.(object.method, object.params);
    }
  }

  private _onClose(event: WebSocket.CloseEvent) {
    this._dispose();
  }

  private _onError(event: WebSocket.ErrorEvent) {
    this._dispose();
  }

  private _dispose() {
    for (const callback of this._callbacks.values()) callback.reject(new Error('WebSocket closed'));
    this._callbacks.clear();
  }
}