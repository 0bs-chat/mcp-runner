import { store } from '@/lib/store'
import { connectWebSocket, disconnectWebSocket, cleanupWebSocket } from './ws'
import { assignTab, resetAndCloseAllTabs } from './tabs'

export default defineBackground(() => {
  // Initialize WebSocket state in storage
  store.set({
    isConnected: false,
    error: null,
    serverUrl: null,
    tabs: {}
  })

  // Listen for messages from popup
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'WEBSOCKET_CONNECT') {
      assignTab('default').then(() => {
        connectWebSocket(message.url)
        sendResponse({ success: true })
      })
      return true // indicate async response
    } else if (message.type === 'WEBSOCKET_DISCONNECT') {
      disconnectWebSocket()
      resetAndCloseAllTabs().then(() => {
        sendResponse({ success: true })
      })
      return true
    } else if (message.type === 'GET_WEBSOCKET_STATE') {
      store.get().then(state => {
        sendResponse(state)
      })
      return true
    }
  })

  // Cleanup on extension unload
  chrome.runtime.onSuspend.addListener(() => {
    cleanupWebSocket()
  })
})