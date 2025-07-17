import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useWebSocket } from '@/hooks/ws'
import { useTabs } from '@/hooks/tabs'
import { Eye, X, RotateCcw } from 'lucide-react'
import { assignTab } from '../background/tabs'

function App() {
  const [serverUrl, setServerUrl] = useState('ws://localhost:8080')
  const [state, { connect, disconnect }] = useWebSocket()
  const tabs = useTabs()

  const handleConnect = async () => {
    await connect(serverUrl)
  }

  const handleDisconnect = async () => {
    await disconnect()
  }

  // View tab (switch to tab)
  const handleViewTab = (tabId: number) => {
    chrome.tabs.update(tabId, { active: true })
  }

  // Remove tab from map and close it
  const handleRemoveTab = (tabId: number) => {
    // Remove from storage
    chrome.storage.local.get('tabs', (result) => {
      const currentTabs = result.tabs || {}
      // Remove all keys with this tabId value
      const newTabs = Object.fromEntries(
        Object.entries(currentTabs).filter(([k, v]) => v !== tabId)
      )
      chrome.storage.local.set({ tabs: newTabs })
    })
    // Close the tab
    chrome.tabs.remove(tabId)
  }

  // Assign the current tab as default
  const handleSwapDefault = async () => {
    try {
      await assignTab('default')
    } catch (e) {
      // Optionally handle error
      console.error('Failed to assign default tab', e)
    }
  }

  return (
    <div className="p-0 flex flex-col items-center gap-2 min-w-[400px]">
      <Card className="w-full rounded-none">
        <CardHeader>
          <CardTitle>0bs Browser MCP</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {state.error && (
            <div className="text-sm text-red-600 bg-red-50 p-2 rounded mb-2">
              {state.error}
            </div>
          )}

          <div className="flex flex-col gap-1">
            <Input
              value={serverUrl}
              onChange={(e) => setServerUrl(e.target.value)}
              placeholder="WebSocket URL"
              className="flex-1"
            />
            {!state.isConnected ? (
              <Button onClick={handleConnect} size="sm">
                Connect
              </Button>
            ) : (
              <Button onClick={handleDisconnect} size="sm" variant="destructive">
                Disconnect
              </Button>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex flex-row items-center justify-between">
              <span className="font-semibold">Tracked tabs</span>
              <Button size="sm" variant="default" className='h-4' onClick={handleSwapDefault} title="Set current tab as default">
                <RotateCcw className="h-4 w-4" />
                Swap Default
              </Button>
            </div>
            <div className="flex flex-col gap-1">
              {Object.entries(tabs.tabs).length === 0 && <span className="text-muted-foreground">No tracked tabs</span>}
              {Object.entries(tabs.tabs).map(([key, tabId]) => (
                <div key={key} className="flex flex-row items-center justify-between bg-input rounded-lg px-2 py-1 w-full">
                  <span className="font-mono text-xs">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                  <div>
                    <Button size="icon" variant="ghost" onClick={() => handleViewTab(tabId)} title="View tab">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => handleRemoveTab(tabId)} title="Remove tab">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default App
