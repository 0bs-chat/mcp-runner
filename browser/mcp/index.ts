// mcp/index.ts
import { createWebSocketServer } from "./ws";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { WebSocket } from "ws";
import { z } from "zod";

// Import shared schemas for consistency
import {
  navigateSchema,
  sessionSchema,
  selectorSchema,
  typeSchema,
  selectOptionSchema,
  pressKeySchema,
} from "../src/shared/schemas";

// ------------------------------------------------------------------
// 1.  Create the MCP server
// ------------------------------------------------------------------
const server = new McpServer({
  name: "browser-mcp",
  version: "1.0.0",
  description: "Browser automation via WebSocket",
});

// ------------------------------------------------------------------
// 2.  Create the WebSocket connection to the browser
// ------------------------------------------------------------------
const wss = await createWebSocketServer(8080);
let browserClient: WebSocket | null = null;

// Handle new WebSocket connections
wss.on("connection", (ws) => {
  console.log("Browser client connected");
  browserClient = ws;

  ws.on("close", () => {
    console.log("Browser client disconnected");
    browserClient = null;
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
    browserClient = null;
  });
});

/**
 * Send a command to the browser and wait for the response.
 * The browser is expected to reply with:
 *   { id: string, result?: any, error?: string }
 */
async function sendCommand<T = unknown>(
  method: string,
  params?: Record<string, unknown>
): Promise<T> {
  return new Promise((resolve, reject) => {
    if (!browserClient || browserClient.readyState !== WebSocket.OPEN) {
      reject(new Error("Browser client not connected"));
      return;
    }

    const id = crypto.randomUUID();
    const payload = JSON.stringify({ id, method, params });

    const onMessage = (data: Buffer) => {
      try {
        const msg = JSON.parse(data.toString());
        if (msg.id === id) {
          browserClient!.off("message", onMessage);
          clearTimeout(timeoutId);
          if (msg.error) reject(new Error(msg.error));
          else resolve(msg.result);
        }
      } catch (e) {
        browserClient!.off("message", onMessage);
        clearTimeout(timeoutId);
        reject(e);
      }
    };

    // Set up timeout
    const timeoutId = setTimeout(() => {
      browserClient!.off("message", onMessage);
      reject(new Error("Browser command timed out"));
    }, 30_000);

    browserClient.on("message", onMessage);
    browserClient.send(payload);
  });
}

// Helper function to format tool responses
async function formatToolResponse(status: string, sessionId?: string): Promise<{ content: Array<{ type: "text"; text: string }> }> {
  const url = await sendCommand("getUrl", sessionId ? { sessionId } : {});
  const title = await sendCommand("getTitle", sessionId ? { sessionId } : {});
  const snapshot = await sendCommand("snapshot", sessionId ? { sessionId } : {});
  return {
    content: [
      {
        type: "text",
        text: `${status ? `${status}\n` : ""}- Page URL: ${url}\n- Page Title: ${title}\n- Page Snapshot\n\`\`\`yaml\n${snapshot}\n\`\`\``,
      },
    ],
  };
}

// ------------------------------------------------------------------
// 3.  Register the browser tools
// ------------------------------------------------------------------

server.registerTool(
  "browser_navigate",
  {
    title: "Navigate",
    description: "Navigate the browser to the given URL. Optional to pass session id, by default the tab from which the extension is init will be the default session tab. Adding headless-* in starting of the sessionid will create a headless session in a new minimized window with pinned tabs that can be controlled from the popup",
    inputSchema: navigateSchema.shape,
  },
  async ({ url, sessionId }) => {
    try {
      await sendCommand("navigate", { url, sessionId });
      return formatToolResponse("Navigated to " + url, sessionId);
    } catch (error) {
      return formatToolResponse("Error navigating to " + url, sessionId);
    }
  }
);

server.registerTool(
  "browser_go_back",
  {
    title: "Go Back",
    description: "Go back to the previous page. Optional to pass session id, by default the tab from which the extension is init will be the default session tab. Adding headless-* in starting of the sessionid will create a headless session in a new minimized window with pinned tabs that can be controlled from the popup",
    inputSchema: sessionSchema.shape,
  },
  async ({ sessionId }) => {
    try {
      await sendCommand("goBack", { sessionId });
      return formatToolResponse("Navigated back", sessionId);
    } catch (error) {
      return formatToolResponse("Error navigating back", sessionId);
    }
  }
);

server.registerTool(
  "browser_go_forward",
  {
    title: "Go Forward",
    description: "Go forward to the next page. Optional to pass session id, by default the tab from which the extension is init will be the default session tab. Adding headless-* in starting of the sessionid will create a headless session in a new minimized window with pinned tabs that can be controlled from the popup",
    inputSchema: sessionSchema.shape,
  },
  async ({ sessionId }) => {
    try {
      await sendCommand("goForward", { sessionId });
      return formatToolResponse("Navigated forward", sessionId);
    } catch (error) {
      return formatToolResponse("Error navigating forward", sessionId);
    }
  }
);

server.registerTool(
  "browser_snapshot",
  {
    title: "Accessibility Snapshot",
    description: "Capture an accessibility snapshot of the current page. Optional to pass session id, by default the tab from which the extension is init will be the default session tab.",
    inputSchema: sessionSchema.shape,
  },
  async ({ sessionId }) => {
    try {
      await sendCommand("snapshot", { sessionId });
      return formatToolResponse("Snapshot captured", sessionId);
    } catch (error) {
      return formatToolResponse("Error capturing snapshot", sessionId);
    }
  }
);

server.registerTool(
  "browser_click",
  {
    title: "Click Element",
    description: "Click an element on the page. Optional to pass session id, by default the tab from which the extension is init will be the default session tab.",
    inputSchema: selectorSchema.shape,
  },
  async ({ element, ref, sessionId }) => {
    try {
      await sendCommand("click", { element, ref, sessionId });
      return formatToolResponse("Clicked element", sessionId);
    } catch (error) {
      return formatToolResponse("Error clicking element", sessionId);
    }
  }
);

server.registerTool(
  "browser_hover",
  {
    title: "Hover Element",
    description: "Hover over an element on the page. Optional to pass session id, by default the tab from which the extension is init will be the default session tab.",
    inputSchema: selectorSchema.shape,
  },
  async ({ element, ref, sessionId }) => {
    try {
      await sendCommand("hover", { element, ref, sessionId });
      return formatToolResponse("Hovered over element", sessionId);
    } catch (error) {
      return formatToolResponse("Error hovering over element", sessionId);
    }
  }
);

server.registerTool(
  "browser_type",
  {
    title: "Type Text",
    description: "Type text into an editable element. Optional to pass session id, by default the tab from which the extension is init will be the default session tab.",
    inputSchema: typeSchema.shape,
  },
  async ({ element, ref, text, submit, sessionId }) => {
    try {
      await sendCommand("type", { element, ref, text, submit, sessionId });
      return formatToolResponse("Typed text into element", sessionId);
    } catch (error) {
      return formatToolResponse("Error typing text into element", sessionId);
    }
  }
);

server.registerTool(
  "browser_select_option",
  {
    title: "Select Option",
    description: "Select an option in a dropdown. Optional to pass session id, by default the tab from which the extension is init will be the default session tab.",
    inputSchema: selectOptionSchema.shape,
  },
  async ({ element, ref, values, sessionId }) => {
    try {
      await sendCommand("selectOption", { element, ref, values, sessionId });
      return formatToolResponse("Selected option", sessionId);
    } catch (error) {
      return formatToolResponse("Error selecting option", sessionId);
    }
  }
);

server.registerTool(
  "browser_press_key",
  {
    title: "Press Key",
    description: "Press a key on the keyboard. Optional to pass session id, by default the tab from which the extension is init will be the default session tab.",
    inputSchema: pressKeySchema.shape,
  },
  async ({ key, sessionId }) => {
    try {
      await sendCommand("pressKey", { key, sessionId });
      return formatToolResponse("Pressed key", sessionId);
    } catch (error) {
      return formatToolResponse("Error pressing key", sessionId);
    }
  }
);

server.registerTool(
  "browser_wait",
  {
    title: "Wait",
    description: "Wait for a specified time in seconds",
    inputSchema: {
      seconds: z.number().min(0).describe("Number of seconds to wait")
    },
  },
  async ({ seconds }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
      return {
        content: [
          {
            type: "text",
            text: `Waited for ${seconds} seconds`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error waiting for ${seconds} seconds: ${error}`,
          },
        ],
      };
    }
  }
);

server.registerTool(
  "browser_get_console_logs",
  {
    title: "Get Console Logs",
    description: "Retrieve console logs from the browser. Optional to pass session id, by default the tab from which the extension is init will be the default session tab.",
    inputSchema: sessionSchema.shape,
  },
  async ({ sessionId }) => {
    try {
      const logs = await sendCommand("getConsoleLogs", { sessionId });
      return {
        content: [
          {
            type: "text",
            text: `Console logs retrieved:\n\`\`\`json\n${JSON.stringify(logs, null, 2)}\n\`\`\``,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error getting console logs: ${error}`,
          },
        ],
      };
    }
  }
);

// server.registerTool(
//   "browser_screenshot",
//   {
//     title: "Screenshot",
//     description: "Take a screenshot of the current page",
//     inputSchema: {},
//   },
//   async () => {
//     try {
//       await sendCommand("screenshot");
//       return formatToolResponse("Screenshot taken");
//     } catch (error) {
//       return formatToolResponse("Error taking screenshot");
//     }
//   }
// );

// ------------------------------------------------------------------
// 4.  Start the MCP server (stdio transport)
// ------------------------------------------------------------------
const transport = new StdioServerTransport();
await server.connect(transport);

console.log("MCP server started and waiting for browser connection...");