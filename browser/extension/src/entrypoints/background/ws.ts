import { store } from '@/lib/store'

let wsInstance: WebSocket | null = null

export function connectWebSocket(url: string) {
  try {
    // Close existing connection if any
    if (wsInstance) {
      wsInstance.close()
    }

    wsInstance = new WebSocket(url)

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

    wsInstance.onmessage = (event) => {
      // Handle incoming messages if needed
      console.log('WebSocket message received:', event.data)
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
