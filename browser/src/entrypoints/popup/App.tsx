import { Button } from '@/components/ui/button'
import { useWebSocket } from '@/lib/ws' // Now uses background messaging
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ModeToggle } from '@/components/mode-toggle'
import { Badge } from '@/components/ui/badge'
import { Eye, EyeOff, X, RefreshCw } from 'lucide-react'

function App() {
  const {
    connected,
    connecting,
    connect,
    disconnect,
    url,
    setUrl,
    sessions,
    refreshSessions,
    closeSession,
    showSession,
    hideSession
  } = useWebSocket();

  return (
    <Card className="w-[400px] shadow-lg outline-none border-none">
      <CardHeader>
        <CardTitle className="text-center text-lg">Browser MCP</CardTitle>
        <ModeToggle />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            disabled={connected || connecting}
            placeholder="WebSocket URL"
            className="mb-2"
          />
          <div className="flex justify-center">
            {!connected ? (
              <Button onClick={connect} disabled={connecting} className="w-full">
                {connecting ? 'Connecting...' : 'Connect'}
              </Button>
            ) : (
              <Button onClick={disconnect} variant="destructive" className="w-full">
                Disconnect
              </Button>
            )}
          </div>

          {connected && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">Sessions</h3>
                <Button
                  onClick={refreshSessions}
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                >
                  <RefreshCw className="h-3 w-3" />
                </Button>
              </div>

              {sessions.length === 0 ? (
                <p className="text-xs text-muted-foreground">No active sessions</p>
              ) : (
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {sessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-2 bg-muted rounded text-xs">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="font-medium truncate">{session.id}</span>
                          {session.isHeadless && (
                            <Badge variant="secondary" className="text-xs">Headless</Badge>
                          )}
                        </div>
                        {session.title && (
                          <p className="text-muted-foreground truncate">{session.title}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-1 ml-1">
                        {session.isHeadless ? (
                          <Button
                            onClick={() => showSession(session.id)}
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            title="Show headless window"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        ) : (
                          <Button
                            onClick={() => showSession(session.id)}
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            title="Focus session tab"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        )}
                        {session.isHeadless && (
                          <Button
                            onClick={() => hideSession(session.id)}
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            title="Hide headless window"
                          >
                            <EyeOff className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          onClick={() => closeSession(session.id)}
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-destructive"
                          title={session.isHeadless ? "Close headless window" : "Close session tab"}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default App
