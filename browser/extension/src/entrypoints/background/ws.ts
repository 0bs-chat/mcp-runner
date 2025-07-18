import { store } from '@/lib/store'
import { getTabIdByName } from './tabs'
import { isWebSocketBaseMessage } from '@/lib/types'
import { waitNetworkIdle } from './utils'
import yaml from 'js-yaml'

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

    wsInstance.onmessage = async (event) => {
      try {
        const msg: unknown = JSON.parse(event.data)
        if (!isWebSocketBaseMessage(msg)) {
          return
        }
        const { id, method, params } = msg
        let result
        let error
        try {
          // Helper to resolve tabId
          const tabId = await getTabIdByName(params.tabName || 'default')
          if (!tabId) {
            throw new Error('No target tab found')
          }
          switch (method) {
            case 'navigate': {
              await chrome.tabs.update(tabId, { url: params.url })
              await waitNetworkIdle(tabId)
              result = true
              break
            }
            case 'goBack': {
              await chrome.tabs.goBack(tabId)
              await waitNetworkIdle(tabId)
              result = true
              break
            }
            case 'goForward': {
              await chrome.tabs.goForward(tabId)
              await waitNetworkIdle(tabId)
              result = true
              break
            }
            case 'getUrl': {
              const tab = await chrome.tabs.get(tabId)
              result = tab.url
              break
            }
            case 'getTitle': {
              const tab = await chrome.tabs.get(tabId)
              result = tab.title
              break
            }
            case 'wait': {
              await new Promise((resolve) => setTimeout(resolve, (params.seconds || 1) * 1000))
              result = true
              break
            }
            // Content script required commands
            case 'snapshot': {
              const response: string = await chrome.tabs.sendMessage(tabId, {
                method: 'snapshot',
              })
              result = yaml.dump(response).trim()
              break
            }
            case 'click':
              await chrome.tabs.sendMessage(tabId, {
                method: 'click',
                ref: params.ref,
              })
              await waitNetworkIdle(tabId)
              result = true
              break
            case 'hover':
              await chrome.tabs.sendMessage(tabId, {
                method: 'hover',
                ref: params.ref,
              })
              await waitNetworkIdle(tabId)
              result = true
              break
            case 'type':
              await chrome.tabs.sendMessage(tabId, {
                method: 'type',
                ref: params.ref,
                text: params.text,
                submit: params.submit,
              })
              await waitNetworkIdle(tabId)
              result = true
              break
            case 'selectOption':
              await waitNetworkIdle(tabId)
              await chrome.tabs.sendMessage(tabId, {
                method: 'selectOption',
                ref: params.ref,
                values: params.values,
              })
              await waitNetworkIdle(tabId)
              result = true
              break
            case 'pressKey':
              await waitNetworkIdle(tabId)
              await chrome.tabs.sendMessage(tabId, {
                method: 'pressKey',
                key: params.key,
              })
              await waitNetworkIdle(tabId)
              result = true
              break
            case 'getConsoleLogs':
              await waitNetworkIdle(tabId)
              await chrome.tabs.sendMessage(tabId, {
                method: 'getConsoleLogs',
              })
              await waitNetworkIdle(tabId)
              result = true
              break
            default:
              throw new Error('Unknown method: ' + method)
          }
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