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
      // Inject script to get accessibility information
      const results = await chrome.scripting.executeScript({
        target: { tabId },
        func: this.extractAccessibilityInfo,
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
    const { ref, tabName } = params || {};
    if (!ref || typeof ref !== "string") {
      throw new Error("Element reference is required for click");
    }

    const tabId = await this.getTabId(tabName as string);

    await chrome.scripting.executeScript({
      target: { tabId },
      func: (elementRef: string) => {
        const element = document.querySelector(`[data-ref="${elementRef}"]`) as HTMLElement;
        if (!element) {
          throw new Error(`Element with ref ${elementRef} not found`);
        }
        element.click();
      },
      args: [ref],
    });

    return "Element clicked successfully";
  }

  private async handleHover(params?: Record<string, unknown>): Promise<string> {
    const { ref, tabName } = params || {};
    if (!ref || typeof ref !== "string") {
      throw new Error("Element reference is required for hover");
    }

    const tabId = await this.getTabId(tabName as string);

    await chrome.scripting.executeScript({
      target: { tabId },
      func: (elementRef: string) => {
        const element = document.querySelector(`[data-ref="${elementRef}"]`) as HTMLElement;
        if (!element) {
          throw new Error(`Element with ref ${elementRef} not found`);
        }

        // Create and dispatch mouseover event
        const event = new MouseEvent('mouseover', {
          view: window,
          bubbles: true,
          cancelable: true
        });
        element.dispatchEvent(event);
      },
      args: [ref],
    });

    return "Element hovered successfully";
  }

  private async handleType(params?: Record<string, unknown>): Promise<string> {
    const { ref, text, submit, tabName } = params || {};
    if (!ref || typeof ref !== "string") {
      throw new Error("Element reference is required for type");
    }
    if (!text || typeof text !== "string") {
      throw new Error("Text is required for type");
    }

    const tabId = await this.getTabId(tabName as string);

    await chrome.scripting.executeScript({
      target: { tabId },
      func: (elementRef: string, inputText: string, shouldSubmit: boolean) => {
        const element = document.querySelector(`[data-ref="${elementRef}"]`) as HTMLInputElement | HTMLTextAreaElement;
        if (!element) {
          throw new Error(`Element with ref ${elementRef} not found`);
        }

        // Clear existing value and type new text
        element.focus();
        element.value = inputText;

        // Trigger input events
        element.dispatchEvent(new Event('input', { bubbles: true }));
        element.dispatchEvent(new Event('change', { bubbles: true }));

        if (shouldSubmit) {
          // Try to submit the form or press Enter
          const form = element.closest('form');
          if (form) {
            form.submit();
          } else {
            // Simulate Enter key press
            const enterEvent = new KeyboardEvent('keydown', {
              key: 'Enter',
              code: 'Enter',
              keyCode: 13,
              bubbles: true
            });
            element.dispatchEvent(enterEvent);
          }
        }
      },
      args: [ref, text, !!submit],
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
      func: (elementRef: string, optionValues: string[]) => {
        const element = document.querySelector(`[data-ref="${elementRef}"]`) as HTMLSelectElement;
        if (!element) {
          throw new Error(`Element with ref ${elementRef} not found`);
        }

        if (element.tagName.toLowerCase() !== 'select') {
          throw new Error(`Element with ref ${elementRef} is not a select element`);
        }

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

  private extractAccessibilityInfo(): string {
    const elements: Array<{
      tag: string;
      text: string;
      ref: string;
      role?: string;
      type?: string;
      placeholder?: string;
      value?: string;
    }> = [];

    let refCounter = 1;

    function processElement(element: Element, depth = 0): void {
      if (depth > 10) return; // Prevent infinite recursion

      const tag = element.tagName.toLowerCase();
      const text = element.textContent?.trim() || "";
      const role = element.getAttribute("role");
      const type = element.getAttribute("type");
      const placeholder = element.getAttribute("placeholder");
      const value = (element as HTMLInputElement).value;

      // Only include interactive or meaningful elements
      const isInteractive = [
        "a", "button", "input", "select", "textarea", "form",
        "h1", "h2", "h3", "h4", "h5", "h6", "p", "div", "span"
      ].includes(tag) || role || type;

      if (isInteractive && (text || placeholder || value || ["input", "button", "select", "textarea"].includes(tag))) {
        const ref = `ref-${refCounter++}`;
        element.setAttribute("data-ref", ref);

        elements.push({
          tag,
          text: text.substring(0, 100), // Limit text length
          ref,
          ...(role && { role }),
          ...(type && { type }),
          ...(placeholder && { placeholder }),
          ...(value && { value }),
        });
      }

      // Process children
      for (const child of element.children) {
        processElement(child, depth + 1);
      }
    }

    processElement(document.body);

    return JSON.stringify({
      url: window.location.href,
      title: document.title,
      elements: elements.slice(0, 100), // Limit number of elements
    }, null, 2);
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