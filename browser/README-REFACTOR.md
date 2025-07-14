# Browser MCP - Refactored with tRPC Chrome

This browser automation MCP (Model Context Protocol) server has been refactored to use `trpc-chrome` for type-safe communication between the content script, background script, and popup interface.

## Key Improvements

### 🧩 **Type Safety with tRPC**
- **End-to-end type safety** between all components
- **Shared schemas** for consistent validation across MCP server and Chrome extension
- **Automatic TypeScript inference** for all browser automation methods

### 🏗️ **Clean Architecture**
- **DRY principles** with shared types and schemas
- **Modular design** with clear separation of concerns
- **Consistent error handling** across all layers

### 🔄 **Backward Compatibility**
- **Legacy message handling** preserved for existing integrations
- **Gradual migration path** from WebSocket-based to tRPC-based communication
- **Dual client support** (WebSocket + tRPC)

## Architecture Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   MCP Server    │    │  Chrome Extension │    │   Web Page      │
│                 │    │                  │    │                 │
│  ┌───────────┐  │    │ ┌──────────────┐ │    │ ┌─────────────┐ │
│  │WebSocket  │◄─┼────┼─┤ Background   │ │    │ │Content      │ │
│  │Server     │  │    │ │Script        │ │    │ │Script       │ │
│  └───────────┘  │    │ │              │ │    │ └─────────────┘ │
│                 │    │ │  ┌────────┐  │ │    │                 │
│  ┌───────────┐  │    │ │  │tRPC    │  │ │    │                 │
│  │tRPC Client│◄─┼────┼─┤  │Router  │  │ │    │                 │
│  └───────────┘  │    │ │  └────────┘  │ │    │                 │
│                 │    │ └──────────────┘ │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## File Structure

```
src/
├── shared/
│   ├── types.ts          # Common TypeScript interfaces
│   ├── schemas.ts        # Zod validation schemas
│   └── router.ts         # tRPC router definition
├── entrypoints/
│   ├── background.ts     # Background script with tRPC handler
│   └── content.ts        # Content script for page automation
├── lib/
│   └── ws.ts            # WebSocket hook with tRPC integration
mcp/
├── index.ts             # MCP server with shared schemas
├── trpc-client.ts       # Type-safe tRPC client alternative
└── ws.ts               # WebSocket server setup
```

## Key Components

### Shared Types (`src/shared/types.ts`)
Common interfaces used across all components:
- `SessionInfo` - Browser session metadata
- `WebSocketStatus` - Connection status information
- `ConsoleLog` - Console log structure
- Parameter types for all browser actions

### Shared Schemas (`src/shared/schemas.ts`)
Zod validation schemas ensuring consistency:
- `navigateSchema` - URL navigation parameters
- `selectorSchema` - Element selection parameters
- `typeSchema` - Text input parameters
- `sessionSchema` - Session management parameters

### tRPC Router (`src/shared/router.ts`)
Type-safe API definition with procedures for:
- **Browser automation**: navigate, click, type, etc.
- **Session management**: create, close, show/hide sessions
- **WebSocket management**: connect, disconnect, status

### Background Script (`src/entrypoints/background.ts`)
Enhanced with:
- **tRPC Chrome handler** for type-safe communication
- **Legacy message support** for backward compatibility
- **Public method access** for tRPC router binding
- **Comprehensive error handling**

### Content Script (`src/entrypoints/content.ts`)
Improved with:
- **Shared type usage** for consistency
- **Enhanced accessibility snapshot generation**
- **Better error handling and stability checks**

## Usage Examples

### Using the tRPC Client

```typescript
import { TRPCMcpClient } from './mcp/trpc-client';

const client = new TRPCMcpClient();

// Navigate to a page
await client.navigate('https://example.com');

// Click an element
await client.click('Submit button', 's2e1234');

// Type text with form submission
await client.type('Email input', 's2e5678', 'user@example.com', true);

// Get console logs
const logs = await client.getConsoleLogs();
```

### Using the Legacy WebSocket Client

```typescript
// The existing WebSocket-based approach still works
const wss = await createWebSocketServer(8080);
// ... existing code unchanged
```

### Using the React Hook

```typescript
import { useWebSocket } from '../lib/ws';

function BrowserControl() {
  const {
    connected,
    connecting,
    sessions,
    connect,
    disconnect,
    closeSession,
  } = useWebSocket();

  // Now with automatic tRPC fallback for better reliability
}
```

## Migration Guide

### For MCP Server Users
1. **Existing code continues to work** - no changes needed
2. **Optional**: Use new `TRPCMcpClient` for type safety
3. **Schemas are now shared** - consistent validation across all layers

### For Chrome Extension Users
1. **tRPC communication** is now available alongside legacy messages
2. **Type safety** is automatically enforced
3. **Error handling** is more robust with fallbacks

### For Developers
1. **Add new browser actions** by updating the shared router
2. **Schemas ensure consistency** across MCP server and extension
3. **Type safety** catches errors at compile time

## Benefits

### 🎯 **Developer Experience**
- **IntelliSense support** for all browser automation methods
- **Compile-time error detection** prevents runtime issues
- **Consistent API** across all communication layers

### 🛡️ **Reliability**
- **Automatic retries** with fallback to legacy communication
- **Better error messages** with structured error handling
- **Input validation** at multiple layers

### 🔧 **Maintainability**
- **Single source of truth** for API definitions
- **Shared types** prevent interface drift
- **Modular architecture** enables easy testing and updates

## Getting Started

1. **Install dependencies** (already done):
   ```bash
   bun install  # trpc-chrome and dependencies already installed
   ```

2. **Build the extension**:
   ```bash
   bun run build
   ```

3. **Load in Chrome** and test the enhanced type safety!

The refactored code maintains full backward compatibility while providing a modern, type-safe foundation for future development.
