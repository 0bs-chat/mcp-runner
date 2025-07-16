// server/index.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import WebSocket, { WebSocketServer } from "ws";
import type { CDPMessage } from "../shared/types";

// ---------- WebSocket server ----------
const wss = new WebSocketServer({ port: 3000 });
let extensionSocket: WebSocket | null = null;
const pending = new Map<string, { resolve: (value: any) => void; reject: (error: Error) => void }>();

wss.on("connection", (ws) => {
  console.log("Extension connected.");
  extensionSocket = ws;
  ws.on("message", (data) => onMessage(data.toString()));
  ws.on("close", () => {
    console.log("Extension disconnected.");
    extensionSocket = null;
  });
  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

async function send(method: string, params?: any, tabName?: string) {
  const id = crypto.randomUUID();
  if (!extensionSocket || extensionSocket.readyState !== WebSocket.OPEN) {
    return new Error("Extension not connected")
  }
  const message: CDPMessage = { id, method, params, tabName: tabName ?? "default" };
  extensionSocket.send(JSON.stringify(message));
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
  });
}

function onMessage(data: string) {
  const msg: CDPMessage = JSON.parse(data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id)!;
    pending.delete(msg.id);
    if (msg.error) {
      reject(new Error(msg.error.message || "Error from extension"));
    } else {
      resolve(msg.result);
    }
  }
}

// ---------- Schemas ----------
const sessionSchema = z.object({
  tabName: z.string().describe("Session name").default("default")
});

const navigateSchema = sessionSchema.merge(z.object({
  url: z.string().describe("The URL to navigate to"),
}));

const selectorSchema = sessionSchema.merge(z.object({
  element: z.string().optional().nullable().describe("CSS selector for the element"),
  ref: z.string().optional().nullable().describe("Reference for the element"),
}));

const typeSchema = selectorSchema.merge(z.object({
  text: z.string().describe("Text to type"),
  submit: z.boolean().optional().describe("Whether to submit after typing"),
}));

const selectOptionSchema = selectorSchema.merge(z.object({
  values: z.array(z.string()).describe("Values to select"),
}));

const pressKeySchema = sessionSchema.merge(z.object({
  key: z.string().describe("Key to press"),
}));

// ---------- Helper functions ----------
async function formatToolResponse(status: string, tabName?: string): Promise<{ content: Array<{ type: "text"; text: string }> }> {
  // Get current URL using Runtime.evaluate
  const urlResult = await send("Runtime.evaluate", { 
    expression: "window.location.href",
    returnByValue: true 
  }, tabName);
  const url = (urlResult as any)?.result?.value || "Unknown";
  
  // Get page title using Runtime.evaluate
  const titleResult = await send("Runtime.evaluate", { 
    expression: "document.title",
    returnByValue: true 
  }, tabName);
  const title = (titleResult as any)?.result?.value || "Unknown";
  
  return {
    content: [
      {
        type: "text",
        text: `${status ? `${status}\n` : ""}- Page URL: ${url}\n- Page Title: ${title}`,
      },
    ],
  };
}

// ---------- MCP server ----------
const server = new McpServer({ name: "browser-automation-mcp", version: "1.0.0" });

import { chromium } from "playwright";

server.registerTool(
  "playwright_test",
  {
    title: "Playwright Test",
    description: "Run a playwright test",
    inputSchema: {},
  },
  async () => {
    const browser = await chromium.connectOverCDP("ws://localhost:3000");
    const page = await browser.newPage();
    await page.goto("https://www.google.com");
    return {
      content: [
        { type: "text", text: "Playwright test" },
      ],
    };
  }
)

server.registerTool(
  "browser_navigate",
  {
    title: "Navigate",
    description: "Navigate the browser to the given URL. Optional to pass session id, by default the tab from which the extension is init will be the default session tab. Adding headless-* in starting of the sessionid will create a headless session in a new minimized window with pinned tabs that can be controlled from the popup",
    inputSchema: navigateSchema.shape,
  },
  async ({ url, tabName }) => {
    try {
      await send("Page.navigate", { url }, tabName);
      await new Promise((resolve) => setTimeout(resolve, 5000));
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
    description: "Go back to the previous page. Optional to pass session id, by default the tab from which the extension is init will be the default session tab. Adding headless-* in starting of the sessionid will create a headless session in a new minimized window with pinned tabs that can be controlled from the popup",
    inputSchema: sessionSchema.shape,
  },
  async ({ tabName }) => {
    try {
      await send("Runtime.evaluate", { 
        expression: "window.history.back()",
        returnByValue: true 
      }, tabName);
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
    description: "Go forward to the next page. Optional to pass session id, by default the tab from which the extension is init will be the default session tab. Adding headless-* in starting of the sessionid will create a headless session in a new minimized window with pinned tabs that can be controlled from the popup",
    inputSchema: sessionSchema.shape,
  },
  async ({ tabName }) => {
    try {
      await send("Runtime.evaluate", { 
        expression: "window.history.forward()",
        returnByValue: true 
      }, tabName);
      return formatToolResponse("Navigated forward", tabName);
    } catch (error) {
      return formatToolResponse("Error navigating forward", tabName);
    }
  }
);

server.registerTool(
  "browser_snapshot",
  {
    title: "Page Snapshot",
    description:
      "Capture and return a simplified, structured representation of the current page's content, focusing on interactive and semantic elements.",
    inputSchema: sessionSchema.shape,
  },
  async ({ tabName }) => {
    try {
      // Get current URL and title for context
      const urlResult = await send("Runtime.evaluate", {
        expression: "window.location.href",
        returnByValue: true,
      }, tabName);
      const url = (urlResult as any)?.result?.value || "Unknown";
      
      const titleResult = await send("Runtime.evaluate", {
        expression: "document.title",
        returnByValue: true,
      }, tabName);
      const title = (titleResult as any)?.result?.value || "Unknown";

      // Evaluate a script in the browser context to generate the simplified DOM tree
      const snapshotResult = await send("Runtime.evaluate", {
        expression: `
          (function() {
            let refCounter = 1;
            const output = [];

            function getAccessibleName(el) {
              if (el.getAttribute('aria-hidden') === 'true') return null;
              
              let name = el.getAttribute('aria-label') || '';
              if (name) return name.trim();

              if (el.getAttribute('aria-labelledby')) {
                const labelledbyIds = el.getAttribute('aria-labelledby').split(' ');
                const names = labelledbyIds.map(id => {
                  const labelEl = document.getElementById(id);
                  return labelEl ? (labelEl.innerText || labelEl.textContent) : '';
                });
                name = names.join(' ');
                if (name) return name.trim();
              }
              
              name = el.title || el.alt || '';
              if (name) return name.trim();

              // Use innerText, but exclude text from children that are also processed
              let ownText = Array.from(el.childNodes)
                .filter(n => n.nodeType === Node.TEXT_NODE)
                .map(n => n.textContent)
                .join(' ').trim();

              if (ownText) return ownText;

              // Fallback to innerText if no other source is found
              return (el.innerText || '').trim().replace(/\\s+/g, ' ').substring(0, 200);
            }

            function getRole(el) {
              let role = el.getAttribute('role');
              if (role) return role;
              const tagName = el.tagName.toLowerCase();
              const tagToRole = {
                'a': 'link', 'button': 'button', 'input': 'input', 'select': 'select', 
                'textarea': 'textarea', 'h1': 'heading', 'h2': 'heading', 'h3': 'heading', 
                'h4': 'heading', 'h5': 'heading', 'h6': 'heading', 'nav': 'navigation', 
                'header': 'banner', 'main': 'main', 'dialog': 'dialog', 'search': 'search'
              };
              return tagToRole[tagName] || null;
            }

            function getStates(el) {
              const states = [];
              if (el.getAttribute('aria-pressed') === 'true') states.push('pressed');
              if (el.getAttribute('aria-expanded') === 'true') states.push('expanded');
              if (el.hasAttribute('disabled')) states.push('disabled');
              if (el.hasAttribute('selected')) states.push('selected');
              return states.map(s => \`[\${s}]\`).join(' ');
            }

            function isVisible(el) {
              if (!el) return false;
              const style = window.getComputedStyle(el);
              return style.width !== '0' && style.height !== '0' && style.opacity !== '0' && style.display !== 'none' && style.visibility !== 'hidden';
            }

            function traverse(node, indent = '') {
              if (node.nodeType !== Node.ELEMENT_NODE || !isVisible(node) || ['script', 'style', 'meta', 'link'].includes(node.tagName.toLowerCase())) {
                return;
              }

              const role = getRole(node);
              let name = getAccessibleName(node);
              const states = getStates(node);
              const ref = \`s1e\${refCounter++}\`;

              let isInteresting = role && name && name.length > 0;
              
              if (isInteresting) {
                let line = \`\${indent}- \${role} "\${name}" \${states} [ref=\${ref}]\`.replace(/\\s+/g, ' ').trim();
                if (role === 'heading') {
                    line = \`\${indent}- \${role} "\${name}" [level=\${node.tagName.substring(1)}] [ref=\${ref}]\`.trim();
                }
                output.push(line);
                
                if (role === 'link' && node.href) {
                    output.push(\`\${indent}  - /url: \${node.getAttribute('href')}\`);
                }

                for (const child of node.children) {
                  traverse(child, indent + '  ');
                }
              } else {
                for (const child of node.children) {
                  traverse(child, indent);
                }
              }
            }
            
            traverse(document.body);
            return output.join('\\n');
          })()
        `,
        returnByValue: true,
      }, tabName);
      
      const snapshot = (snapshotResult as any)?.result?.value || "Unable to generate snapshot.";

      return {
        content: [
          {
            type: "text",
            text: `- Page URL: ${url}\n- Page Title: ${title}\n- Page Snapshot\n\`\`\`yaml\n${snapshot}\n\`\`\``,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error capturing page snapshot: ${error}\n- Page URL: Unknown\n- Page Title: Unknown`,
          },
        ],
      };
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
  async ({ element, ref, tabName }) => {
    try {
      const selector = element || ref;
      if (!selector) {
        throw new Error("Element selector is required");
      }
      
      await send("Runtime.evaluate", { 
        expression: `
          (() => {
            const element = document.querySelector('${selector}');
            if (element) {
              element.click();
              return true;
            } else {
              throw new Error('Element not found: ${selector}');
            }
          })()
        `,
        returnByValue: true 
      }, tabName);
      
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
    description: "Hover over an element on the page. Optional to pass session id, by default the tab from which the extension is init will be the default session tab.",
    inputSchema: selectorSchema.shape,
  },
    async ({ element, ref, tabName }) => {
    try {
      const selector = element || ref;
      if (!selector) {
        throw new Error("Element selector is required");
      }
      
      await send("Runtime.evaluate", { 
        expression: `
          (() => {
            const element = document.querySelector('${selector}');
            if (element) {
              const event = new MouseEvent('mouseover', {
                bubbles: true,
                cancelable: true,
                view: window
              });
              element.dispatchEvent(event);
              return true;
            } else {
              throw new Error('Element not found: ${selector}');
            }
          })()
        `,
        returnByValue: true 
      }, tabName);
      
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
    description: "Type text into an editable element. Optional to pass session id, by default the tab from which the extension is init will be the default session tab.",
    inputSchema: typeSchema.shape,
  },
  async ({ element, ref, text, submit, tabName }) => {
    try {
      const selector = element || ref;
      if (!selector) {
        throw new Error("Element selector is required");
      }
      
      await send("Runtime.evaluate", { 
        expression: `
          (() => {
            const element = document.querySelector('${selector}');
            if (element) {
              element.focus();
              element.value = '${text}';
              
              // Trigger input event
              const inputEvent = new Event('input', { bubbles: true });
              element.dispatchEvent(inputEvent);
              
              ${submit ? `
              // Submit form if requested
              if (element.form) {
                element.form.submit();
              } else if (element.tagName === 'INPUT' && element.type === 'text') {
                const submitEvent = new KeyboardEvent('keydown', {
                  key: 'Enter',
                  code: 'Enter',
                  keyCode: 13,
                  which: 13,
                  bubbles: true
                });
                element.dispatchEvent(submitEvent);
              }
              ` : ''}
              
              return true;
            } else {
              throw new Error('Element not found: ${selector}');
            }
          })()
        `,
        returnByValue: true 
      }, tabName);
      
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
    description: "Select an option in a dropdown. Optional to pass session id, by default the tab from which the extension is init will be the default session tab.",
    inputSchema: selectOptionSchema.shape,
  },
  async ({ element, ref, values, tabName }) => {
    try {
      const selector = element || ref;
      if (!selector) {
        throw new Error("Element selector is required");
      }
      
      await send("Runtime.evaluate", { 
        expression: `
          (() => {
            const element = document.querySelector('${selector}');
            if (element) {
              if (element.tagName === 'SELECT') {
                // For select elements
                element.value = '${values[0]}';
                const changeEvent = new Event('change', { bubbles: true });
                element.dispatchEvent(changeEvent);
              } else {
                // For other elements, try to set value
                element.value = '${values[0]}';
                const inputEvent = new Event('input', { bubbles: true });
                element.dispatchEvent(inputEvent);
              }
              return true;
            } else {
              throw new Error('Element not found: ${selector}');
            }
          })()
        `,
        returnByValue: true 
      }, tabName);
      
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
    description: "Press a key on the keyboard. Optional to pass session id, by default the tab from which the extension is init will be the default session tab.",
    inputSchema: pressKeySchema.shape,
  },
  async ({ key, tabName }) => {
    try {
      await send("Runtime.evaluate", { 
        expression: `
          (() => {
            const event = new KeyboardEvent('keydown', {
              key: '${key}',
              code: '${key}',
              keyCode: '${key}'.charCodeAt(0),
              which: '${key}'.charCodeAt(0),
              bubbles: true
            });
            document.activeElement?.dispatchEvent(event);
            return true;
          })()
        `,
        returnByValue: true 
      }, tabName);
      
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
    await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
    return {
      content: [
        {
          type: "text",
          text: `Waited for ${seconds} seconds`,
        },
      ],
    };
  }
);

server.registerTool(
  "browser_get_console_logs",
  {
    title: "Get Console Logs",
    description: "Retrieve console logs from the browser. Optional to pass session id, by default the tab from which the extension is init will be the default session tab.",
    inputSchema: sessionSchema.shape,
  },
  async ({ tabName }) => {
    try {
      // Enable console logging
      await send("Runtime.enable", {}, tabName);
      
      // Get console messages
      const result = await send("Runtime.evaluate", { 
        expression: `
          (() => {
            // Override console methods to capture logs
            const logs = [];
            const originalLog = console.log;
            const originalError = console.error;
            const originalWarn = console.warn;
            
            console.log = function(...args) {
              logs.push({ type: 'log', message: args.join(' ') });
              originalLog.apply(console, args);
            };
            
            console.error = function(...args) {
              logs.push({ type: 'error', message: args.join(' ') });
              originalError.apply(console, args);
            };
            
            console.warn = function(...args) {
              logs.push({ type: 'warn', message: args.join(' ') });
              originalWarn.apply(console, args);
            };
            
            return logs;
          })()
        `,
        returnByValue: true 
      }, tabName);
      
      const logs = (result as any)?.result?.value || [];
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


// ---------- start ----------
const transport = new StdioServerTransport();
server.connect(transport);
console.log("MCP server connected to transport and ready.");