// src/entrypoints/popup/App.tsx
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type ConnectResponse = { success: boolean; error?: string }
type Status = 'idle' | 'connecting' | 'connected' | 'error'

export default function App() {
  const [serverUrl, setServerUrl] = useState<string>(
    'ws://localhost:8080/extension/<your-uuid-here>'
  )
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  const handleConnect = () => {
    setStatus('connecting')
    setError(null)
    chrome.runtime.sendMessage(
      { type: 'connectToMCPRelay', mcpRelayUrl: serverUrl },
      (resp: ConnectResponse) => {
        if (resp?.success) {
          setStatus('connected')
        } else {
          setStatus('error')
          setError(resp?.error ?? 'Unknown error')
        }
      }
    )
  }

  const handleDisconnect = () => {
    setStatus('idle')
    setError(null)
    chrome.runtime.sendMessage(
      { type: 'disconnectFromMCPRelay' },
      () => {}
    )
  }

  const isConnected = status === 'connected'
  const isConnecting = status === 'connecting'

  return (
    <div className="p-4 flex flex-col gap-4 min-w-[320px]">
      <Card>
        <CardHeader>
          <CardTitle>0bs Browser MCP Bridge</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {status === 'error' && (
            <div className="text-sm text-red-700 bg-red-100 p-2 rounded">
              {error}
            </div>
          )}

          <div className="flex gap-2 items-center">
            <Input
              className="flex-1"
              placeholder="ws://host:port/extension/<uuid>"
              value={serverUrl}
              onChange={(e) => setServerUrl(e.currentTarget.value)}
            />

            {isConnected ? (
              <Button size="sm" variant="destructive" onClick={handleDisconnect}>
                Disconnect
              </Button>
            ) : (
              <Button
                size="sm"
                disabled={isConnecting}
                onClick={handleConnect}
              >
                {isConnecting ? 'Connecting…' : 'Connect'}
              </Button>
            )}
          </div>

          <div className="text-xs text-gray-600">
            Status: <strong>{status}</strong>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}