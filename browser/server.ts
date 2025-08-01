import { WebSocketServer, WebSocket } from 'ws';
import { createServer } from 'http';

interface RelayMessage {
  id?: string;
  method: string;
  params: any;
  result?: any;
  error?: any;
}

class RelayServer {
  private wss: WebSocketServer;
  private cdpConnections = new Map<string, WebSocket>();
  private extensionConnections = new Map<string, WebSocket>();
  private messageCounter = 0;

  constructor(port: number = 8080) {
    const server = createServer();
    this.wss = new WebSocketServer({ server });
    
    server.listen(port, () => {
      console.log(`🚀 Relay server started on port ${port}`);
      console.log(`📡 CDP endpoint: ws://localhost:${port}/cdp`);
      console.log(`🔌 Extension endpoint: ws://localhost:${port}/extension`);
    });

    this.setupWebSocketServer();
  }

  private setupWebSocketServer() {
    this.wss.on('connection', (ws: WebSocket, request) => {
      const url = new URL(request.url!, `http://localhost`);
      const path = url.pathname;
      const connectionId = this.generateConnectionId();

      console.log(`🔗 New connection: ${path} (ID: ${connectionId})\n\nRequest: ${JSON.stringify(request, null, 2)}`);

      if (path === '/cdp') {
        this.handleCdpConnection(ws, connectionId);
      } else if (path === '/extension') {
        this.handleExtensionConnection(ws, connectionId);
      } else {
        console.log(`❌ Unknown path: ${path}`);
        ws.close(1008, 'Unknown path');
        return;
      }

      ws.on('close', (code, reason) => {
        console.log(`🔌 Connection closed: ${path} (ID: ${connectionId}) - Code: ${code}, Reason: ${reason}`);
        this.cleanupConnection(path, connectionId);
      });

      ws.on('error', (error) => {
        console.error(`❌ WebSocket error on ${path} (ID: ${connectionId}):`, error);
      });
    });
  }

  private handleCdpConnection(ws: WebSocket, connectionId: string) {
    console.log(`📡 CDP client connected (ID: ${connectionId})`);
    this.cdpConnections.set(connectionId, ws);

    ws.on('message', (data) => {
      try {
        console.log("CDP message", data.toString());
        const message = JSON.parse(data.toString()) as RelayMessage;
        console.log(`📤 CDP → Extension (ID: ${connectionId}):`, {
          method: message.method,
          params: message.params,
          id: message.id
        });

        // Forward to all extension connections
        this.forwardToExtensions(message, connectionId);
      } catch (error) {
        console.error(`❌ Failed to parse CDP message:`, error);
      }
    });
  }

  private handleExtensionConnection(ws: WebSocket, connectionId: string) {
    console.log(`🔌 Extension client connected (ID: ${connectionId})`);
    this.extensionConnections.set(connectionId, ws);

    ws.on('message', (data) => {
      try {
        const message = JSON.parse(data.toString()) as RelayMessage;
        console.log(`📤 Extension → CDP (ID: ${connectionId}):`, {
          method: message.method,
          params: message.params,
          result: message.result,
          error: message.error,
          id: message.id
        });

        // Forward to all CDP connections
        this.forwardToCdp(message, connectionId);
      } catch (error) {
        console.error(`❌ Failed to parse extension message:`, error);
      }
    });
  }

  private forwardToExtensions(message: RelayMessage, sourceConnectionId: string) {
    const extensionCount = this.extensionConnections.size;
    console.log(`📤 Forwarding to ${extensionCount} extension connection(s)`);

    this.extensionConnections.forEach((extensionWs, connectionId) => {
      if (extensionWs.readyState === WebSocket.OPEN) {
        try {
          extensionWs.send(JSON.stringify(message));
          console.log(`✅ Forwarded to extension (ID: ${connectionId})`);
        } catch (error) {
          console.error(`❌ Failed to forward to extension (ID: ${connectionId}):`, error);
        }
      } else {
        console.log(`⚠️ Extension connection not ready (ID: ${connectionId})`);
      }
    });
  }

  private forwardToCdp(message: RelayMessage, sourceConnectionId: string) {
    const cdpCount = this.cdpConnections.size;
    console.log(`📤 Forwarding to ${cdpCount} CDP connection(s)`);

    this.cdpConnections.forEach((cdpWs, connectionId) => {
      if (cdpWs.readyState === WebSocket.OPEN) {
        try {
          cdpWs.send(JSON.stringify(message));
          console.log(`✅ Forwarded to CDP (ID: ${connectionId})`);
        } catch (error) {
          console.error(`❌ Failed to forward to CDP (ID: ${connectionId}):`, error);
        }
      } else {
        console.log(`⚠️ CDP connection not ready (ID: ${connectionId})`);
      }
    });
  }

  private cleanupConnection(path: string, connectionId: string) {
    if (path === '/cdp') {
      this.cdpConnections.delete(connectionId);
      console.log(`🧹 Cleaned up CDP connection (ID: ${connectionId})`);
    } else if (path === '/extension') {
      this.extensionConnections.delete(connectionId);
      console.log(`🧹 Cleaned up extension connection (ID: ${connectionId})`);
    }
  }

  private generateConnectionId(): string {
    return `conn_${++this.messageCounter}_${Date.now()}`;
  }

  public getStats() {
    return {
      cdpConnections: this.cdpConnections.size,
      extensionConnections: this.extensionConnections.size,
      totalConnections: this.cdpConnections.size + this.extensionConnections.size
    };
  }

  public logStats() {
    const stats = this.getStats();
    console.log(`📊 Connection Stats:`, stats);
  }

  public close() {
    this.wss.close();
  }
}

// Start the relay server
const relayServer = new RelayServer(8080);

// Log stats every 30 seconds
setInterval(() => {
  relayServer.logStats();
}, 30000);

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down relay server...');
  relayServer.close();
  console.log('✅ Relay server stopped');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down relay server...');
  relayServer.close();
  console.log('✅ Relay server stopped');
  process.exit(0);
});
