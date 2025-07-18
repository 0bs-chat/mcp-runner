import { store } from '@/lib/store'
import { getOrCreateTab } from './tabs'

let wsInstance: WebSocket | null = null

export function connectWebSocket(url: string) {
  try {
    // Close existing connection if any
    if (wsInstance) {
      wsInstance.close()
    }

    wsInstance = new WebSocket(`${url}/extension`)

    wsInstance.onopen = () => {
      store.set({
        isConnected: true,
        error: null,
        serverUrl: url
      })
    }

    wsInstance.onclose = () => {
      store.set({
        isConnected: false,
        serverUrl: null
      })
      wsInstance = null
    }

    wsInstance.onerror = (error) => {
      store.set({
        error: `WebSocket error: ${error}`,
        isConnected: false
      })
    }

    wsInstance.onmessage = async (event) => {
      try {
        const { id, method, params, tabName } = JSON.parse(event.data)
        let result
        let error
        try {
          // Helper to resolve tabId
          const tabId = (await getOrCreateTab(tabName || 'default'))!
          try {
            await chrome.debugger.detach({ tabId });
          } catch (e) {
            // Ignore detach errors
          }
          await chrome.debugger.attach({ tabId }, '1.3');

          // Relay debugger command
          result = await chrome.debugger.sendCommand({ tabId }, method, params);
          await chrome.debugger.detach({ tabId });
        } catch (e) {
          error = e instanceof Error ? e.message : String(e)
        }
        wsInstance!.send(JSON.stringify({ id, result, error }))
      } catch (e) {
        // Ignore parse errors
      }
    }
  } catch (error) {
    store.set({
      error: `Connection error: ${error}`,
      isConnected: false
    })
  }
}

export function disconnectWebSocket() {
  if (wsInstance) {
    wsInstance.close()
    wsInstance = null
  }
  store.set({
    isConnected: false,
    error: null,
    serverUrl: null
  })
}

export function cleanupWebSocket() {
  if (wsInstance) {
    wsInstance.close()
    wsInstance = null
  }
}