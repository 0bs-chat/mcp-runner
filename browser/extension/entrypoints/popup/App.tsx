/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useEffect, useState } from 'react';

interface TabInfo {
  title?: string;
  url?: string;
}

interface ConnectionStatus {
  isConnected: boolean;
  activeTabId?: number;
  activeTabInfo?: TabInfo;
  error?: string;
}

export default function App() {
  const [currentTab, setCurrentTab] = useState<chrome.tabs.Tab | null>(null);
  const [bridgeUrl, setBridgeUrl] = useState('ws://localhost:9223/extension');
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    isConnected: false
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    init();
  }, []);

  const init = async (): Promise<void> => {
    // Get current tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    setCurrentTab(tab);

    // Load saved bridge URL
    const result = await chrome.storage.sync.get(['bridgeUrl']);
    const savedUrl = result.bridgeUrl || 'ws://localhost:9223/extension';
    setBridgeUrl(savedUrl);

    // Update UI based on current state
    await updateUI();
    setIsLoading(false);
  };

  const updateUI = async (): Promise<void> => {
    if (!currentTab?.id) return;

    // Get connection status from background script
    const response = await chrome.runtime.sendMessage({
      type: 'getStatus',
      tabId: currentTab.id
    });

    setConnectionStatus(response as ConnectionStatus);
  };

  const onUrlChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const url = e.target.value;
    setBridgeUrl(url);
    
    // Save URL to storage if valid
    if (isValidWebSocketUrl(url)) {
      chrome.storage.sync.set({ bridgeUrl: url });
    }
  };

  const onConnectClick = async (): Promise<void> => {
    if (!currentTab?.id) return;

    const url = bridgeUrl.trim();
    if (!isValidWebSocketUrl(url)) {
      setConnectionStatus(prev => ({ ...prev, error: 'Please enter a valid WebSocket URL' }));
      return;
    }

    // Save URL to storage
    await chrome.storage.sync.set({ bridgeUrl: url });

    // Send connect message to background script
    const response = await chrome.runtime.sendMessage({
      type: 'connect',
      tabId: currentTab.id,
      bridgeUrl: url
    });

    if (response.success) {
      await updateUI();
    } else {
      setConnectionStatus(prev => ({ ...prev, error: response.error || 'Failed to connect' }));
    }
  };

  const onDisconnectClick = async (): Promise<void> => {
    if (!currentTab?.id) return;

    const response = await chrome.runtime.sendMessage({
      type: 'disconnect',
      tabId: currentTab.id
    });

    if (response.success) {
      await updateUI();
    } else {
      setConnectionStatus(prev => ({ ...prev, error: response.error || 'Failed to disconnect' }));
    }
  };

  const onFocusClick = async (activeTabId: number): Promise<void> => {
    try {
      await chrome.tabs.update(activeTabId, { active: true });
      window.close(); // Close popup after switching
    } catch (error) {
      setConnectionStatus(prev => ({ ...prev, error: 'Failed to switch to tab' }));
    }
  };

  const isValidWebSocketUrl = (url: string): boolean => {
    if (!url) return false;
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'ws:' || parsed.protocol === 'wss:';
    } catch {
      return false;
    }
  };

  const showStatus = (type: string, message: string) => {
    return (
      <div className={`status ${type}`}>
        {message}
      </div>
    );
  };

  const showActiveTabInfo = (tabInfo?: TabInfo) => {
    if (!tabInfo) return null;
    
    return (
      <div className="tab-info">
        <div className="tab-title">{tabInfo.title || 'Unknown Tab'}</div>
        <div className="tab-url">{tabInfo.url || ''}</div>
      </div>
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{
      width: '320px',
      padding: '16px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontSize: '14px',
      margin: 0
    }}>
      <div style={{ marginBottom: '16px', textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 8px 0', color: '#333' }}>Playwright MCP Bridge</h3>
      </div>

      <div id="status-container">
        {connectionStatus.error && showStatus('error', `Error: ${connectionStatus.error}`)}
        {connectionStatus.isConnected && connectionStatus.activeTabId === currentTab?.id && 
          showStatus('connected', 'This tab is currently shared with MCP server')}
        {connectionStatus.isConnected && connectionStatus.activeTabId !== currentTab?.id && 
          showStatus('warning', 'Another tab is already sharing the CDP session')}
        {!connectionStatus.isConnected && !connectionStatus.error && 
          showStatus('info', 'Ready to connect')}
        
        {connectionStatus.isConnected && connectionStatus.activeTabId !== currentTab?.id && 
          showActiveTabInfo(connectionStatus.activeTabInfo)}
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500', color: '#555' }}>
          Bridge Server URL:
        </label>
        <input
          type="url"
          value={bridgeUrl}
          onChange={onUrlChange}
          placeholder="ws://localhost:9223/extension"
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            boxSizing: 'border-box'
          }}
        />
        <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
          Enter the WebSocket URL of your MCP bridge server
        </div>
      </div>

      <div id="action-container">
        {connectionStatus.isConnected && connectionStatus.activeTabId === currentTab?.id ? (
          <button
            onClick={onDisconnectClick}
            style={{
              background: '#f44336',
              color: 'white',
              border: 'none',
              padding: '10px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              width: '100%',
              marginTop: '8px'
            }}
          >
            Stop Sharing
          </button>
        ) : connectionStatus.isConnected && connectionStatus.activeTabId !== currentTab?.id ? (
          <button
            onClick={() => connectionStatus.activeTabId && onFocusClick(connectionStatus.activeTabId)}
            style={{
              background: '#2196F3',
              color: 'white',
              border: 'none',
              padding: '10px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              width: '100%',
              marginTop: '8px'
            }}
          >
            Switch to Shared Tab
          </button>
        ) : (
          <button
            onClick={onConnectClick}
            disabled={!isValidWebSocketUrl(bridgeUrl)}
            style={{
              background: isValidWebSocketUrl(bridgeUrl) ? '#4CAF50' : '#cccccc',
              color: 'white',
              border: 'none',
              padding: '10px 16px',
              borderRadius: '4px',
              cursor: isValidWebSocketUrl(bridgeUrl) ? 'pointer' : 'not-allowed',
              fontSize: '14px',
              width: '100%',
              marginTop: '8px'
            }}
          >
            Share This Tab
          </button>
        )}
      </div>

      <style>{`
        .status {
          padding: 12px;
          border-radius: 4px;
          margin-bottom: 16px;
          text-align: center;
        }
        .status.connected {
          background: #e8f5e8;
          color: #2e7d32;
          border: 1px solid #4caf50;
        }
        .status.error {
          background: #ffebee;
          color: #c62828;
          border: 1px solid #f44336;
        }
        .status.warning {
          background: #fff3e0;
          color: #ef6c00;
          border: 1px solid #ff9800;
        }
        .status.info {
          background: #e3f2fd;
          color: #1565c0;
          border: 1px solid #2196f3;
        }
        .tab-info {
          background: #f5f5f5;
          padding: 12px;
          border-radius: 4px;
          margin-bottom: 16px;
        }
        .tab-title {
          font-weight: 500;
          margin-bottom: 4px;
          color: #333;
        }
        .tab-url {
          font-size: 12px;
          color: #666;
          word-break: break-all;
        }
      `}</style>
    </div>
  );
}