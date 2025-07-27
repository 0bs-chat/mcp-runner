import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import debug from "debug";
import { z } from "zod";
import { WebSocket, WebSocketServer } from "ws";

const log = debug("browser-mcp");

const server = new McpServer({
  name: "browser-mcp",
  version: "1.0.0",
  description: "Browser Control MCP Server",
});

const wss = new WebSocketServer({ port: 8080 });
let browserClient: WebSocket | null = null;

wss.on("connection", (ws: WebSocket) => {
  console.log("Browser client connected");
  browserClient = ws;

  ws.on("close", () => {
    console.log("Browser client disconnected");
    browserClient = null;
  });

  ws.on("error", (error: Error) => {
    console.error("WebSocket error:", error);
    browserClient = null;
  });
});

async function formatToolResponse(
  tabName?: string,
): Promise<{ content: Array<{ type: "text"; text: string }> }> {
  const snapshot = await sendCommand("snapshot", tabName ? { tabName } : {});
  return {
    content: [
      {
        type: "text",
        text: snapshot as string,
      },
    ],
  };
}

async function sendCommand<T = unknown>(
  method: string,
  params?: Record<string, unknown>,
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

const tabNameType = z
  .string()
  .optional()
  .describe(
    "Tab name to navigate (optional, uses default session if not provided). Prefix with 'headless-' to create a headless session in a new minimized window",
  );
const elementType = z
  .string()
  .describe(
    "Human-readable element description used to obtain permission to interact with the element",
  );
const refType = z
  .string()
  .describe("Exact target element reference from the page snapshot");

server.registerTool(
  "browser_navigate",
  {
    title: "Navigate",
    description:
      "Navigate the browser to the given URL. On timeouts, use the snapshot tool following this.",
    inputSchema: {
      url: z.string().describe("The URL to navigate to"),
      tabName: tabNameType,
    },
  },
  async ({ url, tabName }) => {
    try {
      await sendCommand("navigate", { url, tabName });
      return formatToolResponse(tabName);
    } catch (error) {
      return formatToolResponse(tabName);
    }
  },
);

server.registerTool(
  "browser_go_back",
  {
    title: "Go Back",
    description: "Go back to the previous page.",
    inputSchema: {
      tabName: tabNameType,
    },
  },
  async ({ tabName }) => {
    try {
      await sendCommand("goBack", { tabName });
      return formatToolResponse(tabName);
    } catch (error) {
      return formatToolResponse(tabName);
    }
  },
);

server.registerTool(
  "browser_go_forward",
  {
    title: "Go Forward",
    description: "Go forward to the next page.",
    inputSchema: {
      tabName: tabNameType,
    },
  },
  async ({ tabName }) => {
    try {
      await sendCommand("goForward", { tabName });
      return formatToolResponse(tabName);
    } catch (error) {
      return formatToolResponse(tabName);
    }
  },
);

server.registerTool(
  "browser_snapshot",
  {
    title: "Accessibility Snapshot",
    description: "Capture an accessibility snapshot of the current page.",
    inputSchema: {
      tabName: tabNameType,
    },
  },
  async ({ tabName }) => {
    try {
      await sendCommand("snapshot", { tabName });
      return formatToolResponse(tabName);
    } catch (error) {
      return formatToolResponse(tabName);
    }
  },
);

server.registerTool(
  "browser_click",
  {
    title: "Click Element",
    description: "Click an element on the page.",
    inputSchema: {
      element: elementType,
      ref: refType,
      tabName: tabNameType,
    },
  },
  async ({ element, ref, tabName }) => {
    try {
      await sendCommand("click", { element, ref, tabName });
      return formatToolResponse(tabName);
    } catch (error) {
      return formatToolResponse(tabName);
    }
  },
);

server.registerTool(
  "browser_hover",
  {
    title: "Hover Element",
    description: "Hover over an element on the page.",
    inputSchema: {
      element: elementType,
      ref: refType,
      tabName: tabNameType,
    },
  },
  async ({ element, ref, tabName }) => {
    try {
      await sendCommand("hover", { element, ref, tabName });
      return formatToolResponse(tabName);
    } catch (error) {
      return formatToolResponse(tabName);
    }
  },
);

server.registerTool(
  "browser_type",
  {
    title: "Type Text",
    description: "Type text into an editable element.",
    inputSchema: {
      element: elementType,
      ref: refType,
      text: z.string().describe("The text to type into the element"),
      submit: z
        .boolean()
        .optional()
        .describe("Whether to submit entered text (press Enter after)"),
      tabName: tabNameType,
    },
  },
  async ({ element, ref, text, submit, tabName }) => {
    try {
      await sendCommand("type", { element, ref, text, submit, tabName });
      return formatToolResponse(tabName);
    } catch (error) {
      return formatToolResponse(tabName);
    }
  },
);

server.registerTool(
  "browser_select_option",
  {
    title: "Select Option",
    description: "Select an option in a dropdown.",
    inputSchema: {
      element: elementType,
      ref: refType,
      values: z
        .array(z.string())
        .describe(
          "Array of values to select in the dropdown. This can be a single value or multiple values.",
        ),
      tabName: tabNameType,
    },
  },
  async ({ element, ref, values, tabName }) => {
    try {
      await sendCommand("selectOption", { element, ref, values, tabName });
      return formatToolResponse(tabName);
    } catch (error) {
      return formatToolResponse(tabName);
    }
  },
);

server.registerTool(
  "browser_press_key",
  {
    title: "Press Key",
    description: "Press a key on the keyboard.",
    inputSchema: {
      key: z
        .string()
        .describe(
          "Name of the key to press or a character to generate, such as `ArrowLeft` or `a`",
        ),
      tabName: tabNameType,
    },
  },
  async ({ key, tabName }) => {
    try {
      await sendCommand("pressKey", { key, tabName });
      return formatToolResponse(tabName);
    } catch (error) {
      return formatToolResponse(tabName);
    }
  },
);

server.registerTool(
  "browser_wait",
  {
    title: "Wait",
    description: "Wait for a specified time in seconds",
    inputSchema: {
      seconds: z.number().min(0).describe("Number of seconds to wait"),
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
  },
);

server.registerTool(
  "browser_get_console_logs",
  {
    title: "Get Console Logs",
    description: "Retrieve console logs from the browser.",
    inputSchema: {
      tabName: tabNameType,
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
  },
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
