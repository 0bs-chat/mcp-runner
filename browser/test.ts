import WebSocket from 'ws';

interface CDPMessage {
  id?: number;
  method: string;
  params?: any;
  result?: any;
  error?: any;
}

class CDPTestClient {
  private ws: WebSocket | null = null;
  private messageId = 1;

  async connect(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log(`🔗 Connecting to CDP endpoint: ${url}`);
      
      this.ws = new WebSocket(url);
      
      this.ws.on('open', () => {
        console.log('✅ Connected to CDP endpoint');
        resolve();
      });
      
      this.ws.on('message', (data) => {
        try {
          const message: CDPMessage = JSON.parse(data.toString());
          console.log('📥 Received message:', message);
          
          // Handle specific responses
          if (message.result) {
            console.log('✅ Command successful:', message.result);
          } else if (message.error) {
            console.error('❌ Command failed:', message.error);
          }
        } catch (error) {
          console.error('❌ Failed to parse message:', error);
        }
      });
      
      this.ws.on('close', (code, reason) => {
        console.log(`🔌 Connection closed: Code ${code}, Reason: ${reason}`);
      });
      
      this.ws.on('error', (error) => {
        console.error('❌ WebSocket error:', error);
        reject(error);
      });
    });
  }

  private sendMessage(message: CDPMessage): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket is not connected');
    }
    
    console.log('📤 Sending message:', message);
    this.ws.send(JSON.stringify(message));
  }

  async navigateToGoogle(): Promise<void> {
    console.log('🌐 Navigating to google.com...');
    
    // Send navigate command
    const navigateMessage: CDPMessage = {
      id: this.messageId++,
      method: 'Page.navigate',
      params: {
        url: 'https://www.google.com'
      }
    };
    
    this.sendMessage(navigateMessage);
    
    // Wait a bit for the navigation to complete
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  async getPageInfo(): Promise<void> {
    console.log('📄 Getting page information...');
    
    // Get page title
    const titleMessage: CDPMessage = {
      id: this.messageId++,
      method: 'Runtime.evaluate',
      params: {
        expression: 'document.title'
      }
    };
    
    this.sendMessage(titleMessage);
    
    // Get current URL
    const urlMessage: CDPMessage = {
      id: this.messageId++,
      method: 'Runtime.evaluate',
      params: {
        expression: 'window.location.href'
      }
    };
    
    this.sendMessage(urlMessage);
  }

  async enablePageEvents(): Promise<void> {
    console.log('🔔 Enabling page events...');
    
    // Enable page domain
    const enablePageMessage: CDPMessage = {
      id: this.messageId++,
      method: 'Page.enable',
      params: {}
    };
    
    this.sendMessage(enablePageMessage);
    
    // Enable runtime domain
    const enableRuntimeMessage: CDPMessage = {
      id: this.messageId++,
      method: 'Runtime.enable',
      params: {}
    };
    
    this.sendMessage(enableRuntimeMessage);
  }

  disconnect(): void {
    if (this.ws) {
      console.log('🔌 Disconnecting...');
      this.ws.close();
      this.ws = null;
    }
  }
}

async function runTest(): Promise<void> {
  const client = new CDPTestClient();
  
  try {
    // Connect to the CDP endpoint
    await client.connect('ws://localhost:8080/cdp');
    
    // Enable page events
    await client.enablePageEvents();
    
    // Wait a moment for events to be enabled
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Navigate to Google
    await client.navigateToGoogle();
    
    // Wait for navigation to complete
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Get page information
    await client.getPageInfo();
    
    // Keep connection open for a bit to see responses
    console.log('⏳ Waiting 5 seconds to see responses...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    client.disconnect();
    console.log('✅ Test completed');
  }
}

// Run the test
if (require.main === module) {
  console.log('🚀 Starting CDP test...');
  runTest().catch(console.error);
}

export { CDPTestClient, runTest };
