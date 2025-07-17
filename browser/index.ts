// mcp/index.ts
import { createWebSocketServer } from "./ws";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { WebSocket } from "ws";

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
async function formatToolResponse(status: string, tabName?: string): Promise<{ content: Array<{ type: "text"; text: string }> }> {
  const url = await sendCommand("getUrl", tabName ? { tabName } : {});
  const title = await sendCommand("getTitle", tabName ? { tabName } : {});
  const snapshot = await sendCommand("snapshot", tabName ? { tabName } : {});
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
    description: "Navigate the browser to the given URL. Optional to pass tab name, by default the tab from which the extension is init will be the default session tab. Adding headless-* in starting of the tab name will create a headless session in a new minimized window with pinned tabs that can be controlled from the popup",
    inputSchema: {
      url: z.string().describe("The URL to navigate to"),
      tabName: z.string().optional().describe("Tab name to navigate (optional, uses default session if not provided). Prefix with 'headless-' to create a headless session in a new minimized window"),
    },
  },
  async ({ url, tabName }) => {
    try {
      await sendCommand("navigate", { url, tabName });
      return formatToolResponse("Navigated to " + url, tabName);
    } catch (error) {
      return formatToolResponse("Error navigating to " + url, tabName);
    }
  }
);

server.registerTool(
  "browser_go_back",
  {
    title: "Go Back",
    description: "Go back to the previous page. Optional to pass tab name, by default the tab from which the extension is init will be the default session tab. Adding headless-* in starting of the tab name will create a headless session in a new minimized window with pinned tabs that can be controlled from the popup",
    inputSchema: {
      tabName: z.string().optional().describe("Tab name to navigate back (optional, uses default session if not provided). Prefix with 'headless-' to create a headless session"),
    },
  },
  async ({ tabName }) => {
    try {
      await sendCommand("goBack", { tabName });
      return formatToolResponse("Navigated back", tabName);
    } catch (error) {
      return formatToolResponse("Error navigating back", tabName);
    }
  }
);

server.registerTool(
  "browser_go_forward",
  {
    title: "Go Forward",
    description: "Go forward to the next page. Optional to pass tab name, by default the tab from which the extension is init will be the default session tab. Adding headless-* in starting of the tab name will create a headless session in a new minimized window with pinned tabs that can be controlled from the popup",
    inputSchema: {
      tabName: z.string().optional().describe("Tab name to navigate forward (optional, uses default session if not provided). Prefix with 'headless-' to create a headless session"),
    },
  },
  async ({ tabName }) => {
    try {
      await sendCommand("goForward", { tabName });
      return formatToolResponse("Navigated forward", tabName);
    } catch (error) {
      return formatToolResponse("Error navigating forward", tabName);
    }
  }
);

server.registerTool(
  "browser_snapshot",
  {
    title: "Accessibility Snapshot",
    description: "Capture an accessibility snapshot of the current page. Optional to pass tab name, by default the tab from which the extension is init will be the default session tab.",
    inputSchema: {
      tabName: z.string().optional().describe("Tab name to capture snapshot from (optional, uses default session if not provided)"),
    },
  },
  async ({ tabName }) => {
    try {
      await sendCommand("snapshot", { tabName });
      return formatToolResponse("Snapshot captured", tabName);
    } catch (error) {
      return formatToolResponse("Error capturing snapshot", tabName);
    }
  }
);

server.registerTool(
  "browser_click",
  {
    title: "Click Element",
    description: "Click an element on the page. Optional to pass tab name, by default the tab from which the extension is init will be the default session tab.",
    inputSchema: {
      element: z.string().describe("Human-readable element description used to obtain permission to interact with the element"),
      ref: z.string().describe("Exact target element reference from the page snapshot"),
      tabName: z.string().optional().describe("Tab name to click element in (optional, uses default session if not provided)"),
    },
  },
  async ({ element, ref, tabName }) => {
    try {
      await sendCommand("click", { element, ref, tabName });
      return formatToolResponse("Clicked element", tabName);
    } catch (error) {
      return formatToolResponse("Error clicking element", tabName);
    }
  }
);

server.registerTool(
  "browser_hover",
  {
    title: "Hover Element",
    description: "Hover over an element on the page. Optional to pass tab name, by default the tab from which the extension is init will be the default session tab.",
    inputSchema: {
      element: z.string().describe("Human-readable element description used to obtain permission to interact with the element"),
      ref: z.string().describe("Exact target element reference from the page snapshot"),
      tabName: z.string().optional().describe("Tab name to hover element in (optional, uses default session if not provided)"),
    },
  },
  async ({ element, ref, tabName }) => {
    try {
      await sendCommand("hover", { element, ref, tabName });
      return formatToolResponse("Hovered over element", tabName);
    } catch (error) {
      return formatToolResponse("Error hovering over element", tabName);
    }
  }
);

server.registerTool(
  "browser_type",
  {
    title: "Type Text",
    description: "Type text into an editable element. Optional to pass tab name, by default the tab from which the extension is init will be the default session tab.",
    inputSchema: {
      element: z.string().describe("Human-readable element description used to obtain permission to interact with the element"),
      ref: z.string().describe("Exact target element reference from the page snapshot"),
      text: z.string().describe("The text to type into the element"),
      submit: z.boolean().optional().describe("Whether to submit entered text (press Enter after)"),
      tabName: z.string().optional().describe("Tab name to type in (optional, uses default session if not provided)"),
    },
  },
  async ({ element, ref, text, submit, tabName }) => {
    try {
      await sendCommand("type", { element, ref, text, submit, tabName });
      return formatToolResponse("Typed text into element", tabName);
    } catch (error) {
      return formatToolResponse("Error typing text into element", tabName);
    }
  }
);

server.registerTool(
  "browser_select_option",
  {
    title: "Select Option",
    description: "Select an option in a dropdown. Optional to pass tab name, by default the tab from which the extension is init will be the default session tab.",
    inputSchema: {
      element: z.string().describe("Human-readable element description used to obtain permission to interact with the element"),
      ref: z.string().describe("Exact target element reference from the page snapshot"),
      values: z.array(z.string()).describe("Array of values to select in the dropdown. This can be a single value or multiple values."),
      tabName: z.string().optional().describe("Tab name to select option in (optional, uses default session if not provided)"),
    },
  },
  async ({ element, ref, values, tabName }) => {
    try {
      await sendCommand("selectOption", { element, ref, values, tabName });
      return formatToolResponse("Selected option", tabName);
    } catch (error) {
      return formatToolResponse("Error selecting option", tabName);
    }
  }
);

server.registerTool(
  "browser_press_key",
  {
    title: "Press Key",
    description: "Press a key on the keyboard. Optional to pass tab name, by default the tab from which the extension is init will be the default session tab.",
    inputSchema: {
      key: z.string().describe("Name of the key to press or a character to generate, such as `ArrowLeft` or `a`"),
      tabName: z.string().optional().describe("Tab name to press key in (optional, uses default session if not provided)"),
    },
  },
  async ({ key, tabName }) => {
    try {
      await sendCommand("pressKey", { key, tabName });
      return formatToolResponse("Pressed key", tabName);
    } catch (error) {
      return formatToolResponse("Error pressing key", tabName);
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
      await sendCommand("wait", { seconds });
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
    description: "Retrieve console logs from the browser. Optional to pass tab name, by default the tab from which the extension is init will be the default session tab.",
    inputSchema: {
      tabName: z.string().optional().describe("Tab name to get console logs from (optional, uses default session if not provided)"),
    },
  },
  async ({ tabName }) => {
    try {
      const logs = await sendCommand("getConsoleLogs", { tabName });
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