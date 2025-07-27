import { getTabManager } from "../tab";

export interface MCPMessage {
  id: string;
  method: string;
  params?: Record<string, unknown>;
  result?: unknown;
  error?: string;
}

export class MCPCommandHandler {
  private tabManager = getTabManager();
  private consoleLogs: Array<{level: string, message: string, timestamp: number}> = [];

  constructor() {
    this.setupConsoleCapture();
  }

  private setupConsoleCapture() {
    // This would be handled by content script in actual implementation
    // Keeping structure for compatibility
  }

  async handleCommand(message: MCPMessage): Promise<MCPMessage> {
    console.log('MCPCommandHandler: Processing command', message.method, message.params);

    try {
      let result: unknown;

      switch (message.method) {
        case "navigate":
          result = await this.handleNavigate(message.params);
          break;
        case "goBack":
          result = await this.handleGoBack(message.params);
          break;
        case "goForward":
          result = await this.handleGoForward(message.params);
          break;
        case "snapshot":
          result = await this.handleSnapshot(message.params);
          break;
        case "click":
          result = await this.handleClick(message.params);
          break;
        case "hover":
          result = await this.handleHover(message.params);
          break;
        case "type":
          result = await this.handleType(message.params);
          break;
        case "selectOption":
          result = await this.handleSelectOption(message.params);
          break;
        case "pressKey":
          result = await this.handlePressKey(message.params);
          break;
        case "wait":
          result = await this.handleWait(message.params);
          break;
        case "getConsoleLogs":
          result = await this.handleGetConsoleLogs(message.params);
          break;
        default:
          throw new Error(`Unknown method: ${message.method}`);
      }

      return {
        id: message.id,
        method: message.method,
        result,
      };
    } catch (error) {
      return {
        id: message.id,
        method: message.method,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  private async getTabId(tabName?: string): Promise<number> {
    const resolvedTabName = tabName || "default";
    return await this.tabManager.getOrCreateTab(resolvedTabName);
  }

  // Find element using various strategies
  private findElement(selector: string, tabId: number): Promise<any> {
    return chrome.scripting.executeScript({
      target: { tabId },
      func: (sel: string) => {
        // Try CSS selector
        let element = document.querySelector(sel);
        if (element) return element;

        // Try by ID
        element = document.getElementById(sel);
        if (element) return element;

        // Try by text content
        const elements = Array.from(document.querySelectorAll('*'));
        element = elements.find(el => el.textContent && el.textContent.trim() === sel) || null;
        if (element) return element;

        // Try by aria-label
        element = document.querySelector(`[aria-label="${sel}"]`);
        if (element) return element;

        return null;
      },
      args: [selector]
    }).then(results => results[0]?.result);
  }

  private async handleNavigate(params?: Record<string, unknown>): Promise<string> {
    const { url, tabName } = params || {};
    if (!url || typeof url !== "string") {
      throw new Error("URL is required for navigation");
    }

    const tabId = await this.getTabId(tabName as string);
    await chrome.tabs.update(tabId, { url });

    // Wait for navigation to complete
    await this.waitForNavigation(tabId);

    return "Navigation completed";
  }

  private async handleGoBack(params?: Record<string, unknown>): Promise<string> {
    const { tabName } = params || {};
    const tabId = await this.getTabId(tabName as string);

    // Use scripting API to execute history.back()
    await chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        window.history.back();
      },
    });

    await this.waitForNavigation(tabId);
    return "Navigated back";
  }

  private async handleGoForward(params?: Record<string, unknown>): Promise<string> {
    const { tabName } = params || {};
    const tabId = await this.getTabId(tabName as string);

    // Use scripting API to execute history.forward()
    await chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        window.history.forward();
      },
    });

    await this.waitForNavigation(tabId);
    return "Navigated forward";
  }

  private async handleSnapshot(params?: Record<string, unknown>): Promise<string> {
    const { tabName } = params || {};
    const tabId = await this.getTabId(tabName as string);

    // Get accessibility tree snapshot
    const snapshot = await this.getAccessibilitySnapshot(tabId);
    return snapshot;
  }

  private async waitForNavigation(tabId: number): Promise<void> {
    return new Promise((resolve) => {
      const listener = (details: chrome.webNavigation.WebNavigationFramedCallbackDetails) => {
        if (details.tabId === tabId && details.frameId === 0) {
          chrome.webNavigation.onCompleted.removeListener(listener);
          // Add a small delay to ensure page is fully loaded
          setTimeout(resolve, 500);
        }
      };

      chrome.webNavigation.onCompleted.addListener(listener);

      // Fallback timeout
      setTimeout(() => {
        chrome.webNavigation.onCompleted.removeListener(listener);
        resolve();
      }, 10000);
    });
  }

  private async getAccessibilitySnapshot(tabId: number): Promise<string> {
    try {
      // Inject script to get accessibility information using browser-mcp implementation
      const results = await chrome.scripting.executeScript({
        target: { tabId },
        func: () => {
          // This is the exact implementation from browser-mcp content.js
          const a = (window as any).__playwright_builtins__ || {
            Map: Map,
            Set: Set,
            Date: Date
          };
          const r = ((window as any).currentSnapshot?.generation ?? 0) + 1;
          (window as any).currentSnapshot = buildAriaSnapshot(a, document.documentElement, r);
          return formatAriaSnapshot((window as any).currentSnapshot, {});

          function buildAriaSnapshot(a: any, r: Element, s: number) {
            const c = new a.Set(),
              f = {
                root: {
                  role: "fragment",
                  name: "",
                  children: [],
                  element: r,
                  props: {},
                },
                elements: new a.Map(),
                generation: s,
                ids: new a.Map(),
              },
              m = (b: any) => {
                const p = f.elements.size + 1;
                f.elements.set(p, b), f.ids.set(b, p);
              };
            m(r);
            const g = (b: any, p: any) => {
              if (c.has(p)) return;
              if ((c.add(p), p.nodeType === Node.TEXT_NODE && p.nodeValue)) {
                const Q = p.nodeValue;
                b.role !== "textbox" && Q && b.children.push(p.nodeValue || "");
                return;
              }
              if (p.nodeType !== Node.ELEMENT_NODE) return;
              const O = p;
              if (isHidden(O)) return;
              const k = [];
              if (O.hasAttribute("aria-owns")) {
                const Q = O.getAttribute("aria-owns") || "";
                for (const $ of Q.split(/\s+/))
                  if ($) {
                    const z = r.ownerDocument?.getElementById($);
                    z && k.push(z);
                  }
              }
              const L = getAriaElement(O, f);
              if (L) {
                m(O);
                for (const Q of O.childNodes) g(L, Q);
                for (const Q of k) g(L, Q);
                b.children.push(L);
              } else for (const Q of O.childNodes) g(b, Q);
            };
            return g(f.root, r), normalizeSnapshot(f), f;
          }

          function isHidden(element: Element): boolean {
            const style = window.getComputedStyle(element);
            return style.display === 'none' || style.visibility === 'hidden';
          }

          function getAriaElement(element: Element, snapshot: any): any {
            const role = element.getAttribute('role') || getImplicitRole(element.tagName.toLowerCase());
            if (!role) return null;

            return {
              role,
              name: element.textContent?.trim() || '',
              children: [],
              element,
              props: {}
            };
          }

          function getImplicitRole(tagName: string): string | undefined {
            const roleMap: Record<string, string> = {
              'button': 'button',
              'a': 'link',
              'input': 'textbox',
              'textarea': 'textbox',
              'select': 'combobox',
              'option': 'option',
              'img': 'img',
              'h1': 'heading',
              'h2': 'heading',
              'h3': 'heading',
              'h4': 'heading',
              'h5': 'heading',
              'h6': 'heading',
              'main': 'main',
              'nav': 'navigation',
              'section': 'region',
              'article': 'article',
              'aside': 'complementary',
              'header': 'banner',
              'footer': 'contentinfo',
              'form': 'form',
              'table': 'table',
              'tr': 'row',
              'td': 'cell',
              'th': 'columnheader'
            };
            return roleMap[tagName];
          }

          function normalizeSnapshot(snapshot: any): void {
            const normalize = (element: any) => {
              if (!element || !element.children) return;

              element.children = element.children.filter((child: any) => {
                if (typeof child === 'string') return child.trim().length > 0;
                if (child && child.children) normalize(child);
                return true;
              });

              if (element.children.length === 1 &&
                  typeof element.children[0] === 'string' &&
                  element.children[0] === element.name) {
                element.children = [];
              }
            };

            normalize(snapshot.root);
          }

          function formatAriaSnapshot(a: any, r: any): string {
            const s: string[] = [],
              c = () => true,
              f = (E: any) => E,
              m = (E: any, b: any, p: string) => {
                if (typeof E == "string") {
                  const Q = E.trim();
                  Q && s.push(p + "- text: " + JSON.stringify(Q));
                  return;
                }
                let O = E.role;
                if (E.name && E.name.length <= 900) {
                  const Q = f(E.name);
                  if (Q) {
                    const $ = JSON.stringify(Q);
                    O += " " + $;
                  }
                }
                E.checked === "mixed" && (O += " [checked=mixed]"),
                  E.checked === !0 && (O += " [checked]"),
                  E.disabled && (O += " [disabled]"),
                  E.expanded && (O += " [expanded]"),
                  E.level && (O += ` [level=${E.level}]`),
                  E.pressed === "mixed" && (O += " [pressed=mixed]"),
                  E.pressed === !0 && (O += " [pressed]"),
                  E.selected === !0 && (O += " [selected]");
                {
                  const Q = a.ids.get(E.element);
                  Q && (O += ` [ref=s${a.generation}e${Q}]`);
                }
                const k = p + "- " + O;
                if (!E.children.length) s.push(k);
                else if (
                  E.children.length === 1 &&
                  typeof E.children[0] == "string"
                ) {
                  const Q = E.children[0];
                  Q ? s.push(k + " " + JSON.stringify(Q)) : s.push(k);
                } else {
                  s.push(k);
                  const Q = p + "  ";
                  for (const $ of E.children) m($, E, Q);
                }
              },
              g = a.root;
            if (g.role === "fragment") for (const E of g.children || []) m(E, g, "");
            else m(g, null, "");
            return s.join(`
`);
          }
        },
      });

      if (results && results[0] && results[0].result) {
        return results[0].result as string;
      }

      return "Unable to capture accessibility snapshot";
    } catch (error) {
      console.error("Error capturing accessibility snapshot:", error);
      return `Error capturing snapshot: ${error instanceof Error ? error.message : "Unknown error"}`;
    }
  }

  private async handleClick(params?: Record<string, unknown>): Promise<string> {
    const { ref, element, tabName } = params || {};
    const selector = ref || element;
    if (!selector || typeof selector !== "string") {
      throw new Error("Element reference is required for click");
    }

    const tabId = await this.getTabId(tabName as string);

    await chrome.scripting.executeScript({
      target: { tabId },
      func: (sel: string) => {
        // Find element using various strategies
        let targetElement: Element | null = null;

        // Try aria-ref format first
        const ariaMatch = sel.match(/^s(\d+)e(\d+)$/);
        if (ariaMatch && (window as any).currentSnapshot) {
          const [, generation, elementId] = ariaMatch;
          if ((window as any).currentSnapshot.generation === +generation) {
            targetElement = (window as any).currentSnapshot.elements.get(+elementId);
          }
        }

        // Fallback to other selectors
        if (!targetElement) {
          // Try CSS selector
          targetElement = document.querySelector(sel);
          if (!targetElement) {
            // Try by ID
            targetElement = document.getElementById(sel);
          }
          if (!targetElement) {
            // Try by text content
            const elements = Array.from(document.querySelectorAll('*'));
            targetElement = elements.find(el => el.textContent && el.textContent.trim() === sel) || null;
          }
          if (!targetElement) {
            // Try by aria-label
            targetElement = document.querySelector(`[aria-label="${sel}"]`);
          }
        }

        if (!targetElement) {
          throw new Error(`Element not found: ${sel}`);
        }

        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Simple click
        (targetElement as HTMLElement).click();
      },
      args: [selector],
    });

    return "Element clicked successfully";
  }

  private async handleHover(params?: Record<string, unknown>): Promise<string> {
    const { ref, element, tabName } = params || {};
    const selector = ref || element;
    if (!selector || typeof selector !== "string") {
      throw new Error("Element reference is required for hover");
    }

    const tabId = await this.getTabId(tabName as string);

    await chrome.scripting.executeScript({
      target: { tabId },
      func: (sel: string) => {
        // Find element using various strategies
        let targetElement: Element | null = null;

        // Try aria-ref format first
        const ariaMatch = sel.match(/^s(\d+)e(\d+)$/);
        if (ariaMatch && (window as any).currentSnapshot) {
          const [, generation, elementId] = ariaMatch;
          if ((window as any).currentSnapshot.generation === +generation) {
            targetElement = (window as any).currentSnapshot.elements.get(+elementId);
          }
        }

        // Fallback to other selectors
        if (!targetElement) {
          // Try CSS selector
          targetElement = document.querySelector(sel);
          if (!targetElement) {
            // Try by ID
            targetElement = document.getElementById(sel);
          }
          if (!targetElement) {
            // Try by text content
            const elements = Array.from(document.querySelectorAll('*'));
            targetElement = elements.find(el => el.textContent && el.textContent.trim() === sel) || null;
          }
          if (!targetElement) {
            // Try by aria-label
            targetElement = document.querySelector(`[aria-label="${sel}"]`);
          }
        }

        if (!targetElement) {
          throw new Error(`Element not found: ${sel}`);
        }

        const event = new MouseEvent('mouseover', { bubbles: true });
        targetElement.dispatchEvent(event);
      },
      args: [selector],
    });

    return "Element hovered successfully";
  }

  private async handleType(params?: Record<string, unknown>): Promise<string> {
    const { ref, element, text, submit, tabName } = params || {};
    const selector = ref || element;
    if (!selector || typeof selector !== "string") {
      throw new Error("Element reference is required for type");
    }
    if (!text || typeof text !== "string") {
      throw new Error("Text is required for type");
    }

    const tabId = await this.getTabId(tabName as string);

    await chrome.scripting.executeScript({
      target: { tabId },
      func: (sel: string, inputText: string, shouldSubmit: boolean) => {
        // Find element using various strategies
        let targetElement: HTMLInputElement | HTMLTextAreaElement | null = null;

        // Try aria-ref format first
        const ariaMatch = sel.match(/^s(\d+)e(\d+)$/);
        if (ariaMatch && (window as any).currentSnapshot) {
          const [, generation, elementId] = ariaMatch;
          if ((window as any).currentSnapshot.generation === +generation) {
            targetElement = (window as any).currentSnapshot.elements.get(+elementId);
          }
        }

        // Fallback to other selectors
        if (!targetElement) {
          // Try CSS selector
          targetElement = document.querySelector(sel) as HTMLInputElement | HTMLTextAreaElement;
          if (!targetElement) {
            // Try by ID
            targetElement = document.getElementById(sel) as HTMLInputElement | HTMLTextAreaElement;
          }
          if (!targetElement) {
            // Try by text content
            const elements = Array.from(document.querySelectorAll('*'));
            targetElement = (elements.find(el => el.textContent && el.textContent.trim() === sel) as HTMLInputElement | HTMLTextAreaElement) || null;
          }
          if (!targetElement) {
            // Try by aria-label
            targetElement = document.querySelector(`[aria-label="${sel}"]`) as HTMLInputElement | HTMLTextAreaElement;
          }
        }

        if (!targetElement) {
          throw new Error(`Element not found: ${sel}`);
        }

        // Focus the element
        targetElement.focus();

        // Check if it's a form input element
        const isFormInput = targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA';

        if (isFormInput) {
          // For form inputs, set value directly (like browser-mcp does)
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
          const nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;

          if (targetElement.tagName === 'INPUT' && nativeInputValueSetter) {
            nativeInputValueSetter.call(targetElement, inputText);
          } else if (targetElement.tagName === 'TEXTAREA' && nativeTextAreaValueSetter) {
            nativeTextAreaValueSetter.call(targetElement, inputText);
          } else {
            targetElement.value = inputText;
          }

          // Trigger React-compatible events
          targetElement.dispatchEvent(new Event('input', { bubbles: true }));
          targetElement.dispatchEvent(new Event('change', { bubbles: true }));
        } else {
          // For non-form elements, use character-by-character typing
          targetElement.textContent = '';
          for (let i = 0; i < inputText.length; i++) {
            const char = inputText[i];

            // Simulate keydown
            const keydownEvent = new KeyboardEvent('keydown', { key: char, bubbles: true });
            targetElement.dispatchEvent(keydownEvent);

            // Add character
            targetElement.textContent += char;

            // Simulate keyup
            const keyupEvent = new KeyboardEvent('keyup', { key: char, bubbles: true });
            targetElement.dispatchEvent(keyupEvent);
          }
        }

        if (shouldSubmit) {
          // Simulate Enter key press
          const enterKeyDown = new KeyboardEvent('keydown', {
            key: 'Enter',
            code: 'Enter',
            keyCode: 13,
            bubbles: true,
            cancelable: true
          });
          targetElement.dispatchEvent(enterKeyDown);

          const enterKeyUp = new KeyboardEvent('keyup', {
            key: 'Enter',
            code: 'Enter',
            keyCode: 13,
            bubbles: true,
            cancelable: true
          });
          targetElement.dispatchEvent(enterKeyUp);

          // Try to submit the form
          const form = targetElement.closest('form');
          if (form) {
            form.submit();
          }
        }
      },
      args: [selector, text, !!submit],
    });

    return submit ? "Text typed and submitted successfully" : "Text typed successfully";
  }

  private async handleSelectOption(params?: Record<string, unknown>): Promise<string> {
    const { ref, values, tabName } = params || {};
    if (!ref || typeof ref !== "string") {
      throw new Error("Element reference is required for selectOption");
    }
    if (!values || !Array.isArray(values)) {
      throw new Error("Values array is required for selectOption");
    }

    const tabId = await this.getTabId(tabName as string);

    await chrome.scripting.executeScript({
      target: { tabId },
      func: (ariaRef: string, optionValues: string[]) => {
        const match = ariaRef.match(/^s(\d+)e(\d+)$/);
        if (!match) {
          throw new Error("Invalid aria-ref selector, should be of form s<number>e<number>");
        }

        if (!(window as any).currentSnapshot) {
          throw new Error("No snapshot found. Please generate an aria snapshot before trying again.");
        }

        const [, generation, elementId] = match;
        if ((window as any).currentSnapshot.generation !== +generation) {
          throw new Error(`Stale aria-ref, expected s${(window as any).currentSnapshot.generation}e${elementId}, got ${ariaRef}. Please regenerate an aria snapshot before trying again.`);
        }

        const element = (window as any).currentSnapshot.elements.get(+elementId) as HTMLSelectElement;
        if (!element) {
          throw new Error(`Element with id ${elementId} not found in snapshot`);
        }

        if (element.tagName.toLowerCase() !== 'select') {
          throw new Error(`Element with ref ${ariaRef} is not a select element`);
        }

        // Scroll into view and focus
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();

        // Clear existing selections
        for (const option of element.options) {
          option.selected = false;
        }

        // Select the specified options
        for (const value of optionValues) {
          for (const option of element.options) {
            if (option.value === value || option.text === value) {
              option.selected = true;
              break;
            }
          }
        }

        // Trigger change event
        element.dispatchEvent(new Event('change', { bubbles: true }));
      },
      args: [ref, values],
    });

    return `Options selected successfully: ${values.join(', ')}`;
  }

  private async handlePressKey(params?: Record<string, unknown>): Promise<string> {
    const { key, tabName } = params || {};
    if (!key || typeof key !== "string") {
      throw new Error("Key is required for pressKey");
    }

    const tabId = await this.getTabId(tabName as string);

    await chrome.scripting.executeScript({
      target: { tabId },
      func: (keyName: string) => {
        // Get the currently focused element or use document.body
        const target = document.activeElement || document.body;

        // Create keyboard event
        const keyEvent = new KeyboardEvent('keydown', {
          key: keyName,
          code: keyName,
          bubbles: true,
          cancelable: true
        });

        target.dispatchEvent(keyEvent);

        // Also dispatch keyup event
        const keyUpEvent = new KeyboardEvent('keyup', {
          key: keyName,
          code: keyName,
          bubbles: true,
          cancelable: true
        });

        target.dispatchEvent(keyUpEvent);
      },
      args: [key],
    });

    return `Key '${key}' pressed successfully`;
  }

  private async handleWait(params?: Record<string, unknown>): Promise<string> {
    const { seconds } = params || {};
    if (typeof seconds !== "number" || seconds < 0) {
      throw new Error("Valid seconds number is required for wait");
    }

    await new Promise(resolve => setTimeout(resolve, seconds * 1000));
    return `Waited for ${seconds} seconds`;
  }

  private async handleGetConsoleLogs(params?: Record<string, unknown>): Promise<string> {
    const { tabName } = params || {};
    const tabId = await this.getTabId(tabName as string);

    try {
      const results = await chrome.scripting.executeScript({
        target: { tabId },
        func: () => {
          // This is a simplified version - in a real implementation,
          // you'd need to set up console log capturing beforehand
          return "Console log capture not fully implemented in extension";
        },
      });

      return results[0]?.result as string || "No console logs available";
    } catch (error) {
      return `Error getting console logs: ${error instanceof Error ? error.message : "Unknown error"}`;
    }
  }
}

// Global instance
let mcpHandler: MCPCommandHandler | null = null;

export function getMCPCommandHandler(): MCPCommandHandler {
  if (!mcpHandler) {
    mcpHandler = new MCPCommandHandler();
  }
  return mcpHandler;
}