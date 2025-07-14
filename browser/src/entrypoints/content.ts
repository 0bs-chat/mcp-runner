export default defineContentScript({
  matches: ['<all_urls>'],
  main() {
    const consoleCapture = new ConsoleCapture();
    const actionHandler = new ActionHandler(consoleCapture);

    // Message handler for automation commands
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      (async () => {
        try {
          const result = await actionHandler.execute(message);
          sendResponse({ success: true, ...result });
        } catch (error) {
          sendResponse({
            success: false,
            error: error instanceof Error ? error.message : String(error)
          });
        }
      })();

      return true; // Indicates that the response is sent asynchronously
    });
  },
});

/**
 * Captures console logs for debugging purposes
 */
class ConsoleCapture {
  private logs: any[] = [];

  constructor() {
    this.interceptConsole();
  }

  private interceptConsole() {
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    console.log = (...args) => {
      this.logs.push({ type: "log", timestamp: Date.now(), args });
      originalLog.apply(console, args);
    };

    console.error = (...args) => {
      this.logs.push({ type: "error", timestamp: Date.now(), args });
      originalError.apply(console, args);
    };

    console.warn = (...args) => {
      this.logs.push({ type: "warn", timestamp: Date.now(), args });
      originalWarn.apply(console, args);
    };
  }

  getLogs() {
    return this.logs;
  }
}

/**
 * Handles browser automation actions with proper type safety
 */
class ActionHandler {
  private refMap = new Map<string, Element>();

  constructor(private consoleCapture: ConsoleCapture) { }

  async execute(message: any): Promise<any> {
    const { action } = message;

    switch (action) {
      case "getAccessibilitySnapshot":
        return { snapshot: await this.generateAccessibilitySnapshot() };
      case "click":
        await this.clickElement(message.selector);
        return {};
      case "hover":
        await this.hoverElement(message.selector);
        return {};
      case "type":
        await this.typeText(message.selector, message.text, message.submit);
        return {};
      case "selectOption":
        await this.selectOption(message.selector, message.values);
        return {};
      case "pressKey":
        await this.pressKey(message.key);
        return {};
      case "getConsoleLogs":
        return { logs: this.consoleCapture.getLogs() };
      default:
        throw new Error(`Unknown action: ${action}`);
    }
  }

  private async generateAccessibilitySnapshot(): Promise<string> {
    const elements: string[] = [];
    let refCounter = 1000; // Start with a base number for unique refs
    this.refMap.clear(); // Clear previous refs

    function getElementRef(): string {
      return `s2e${refCounter++}`;
    }

    const getElementRole = (element: Element): string => {
      // Check for explicit role attribute
      const role = element.getAttribute('role');
      if (role) return role;

      // Map common HTML elements to accessibility roles
      const tagName = element.tagName.toLowerCase();
      const roleMap: Record<string, string> = {
        'button': 'button',
        'a': 'link',
        'input': (() => {
          const type = element.getAttribute('type');
          if (type === 'text' || type === 'search' || type === 'email' || type === 'password' || !type) return 'textbox';
          if (type === 'submit' || type === 'button') return 'button';
          return 'textbox';
        })(),
        'textarea': 'textbox',
        'select': 'combobox',
        'h1': 'heading',
        'h2': 'heading',
        'h3': 'heading',
        'h4': 'heading',
        'h5': 'heading',
        'h6': 'heading',
        'nav': 'navigation',
        'main': 'main',
        'article': 'article',
        'section': 'region',
        'aside': 'complementary',
        'header': 'banner',
        'footer': 'contentinfo',
        'ul': 'list',
        'ol': 'list',
        'li': 'listitem',
        'img': 'img',
        'table': 'table',
        'form': 'form',
        'dialog': 'dialog',
        'div': element.getAttribute('role') ? element.getAttribute('role')! : 'div',
        'span': 'text',
        'p': 'text',
        'time': 'time'
      };

      return roleMap[tagName] || tagName;
    };

    const getElementDescription = (element: Element): string => {
      const role = getElementRole(element);
      let description = role;

      // Add text content for elements that have meaningful text
      const textContent = element.textContent?.trim();
      const hasOnlyTextContent = element.children.length === 0 && textContent;

      if (hasOnlyTextContent && textContent!.length < 100) {
        description = `${role} "${textContent}"`;
      } else if (hasOnlyTextContent && textContent!.length >= 100) {
        description = `${role} "${textContent!.substring(0, 97)}..."`;
      }

      // Add specific attributes for different element types
      if (element.tagName.toLowerCase() === 'img') {
        const alt = element.getAttribute('alt');
        if (alt) description = `img "${alt}"`;
      }

      if (element.hasAttribute('placeholder')) {
        const placeholder = element.getAttribute('placeholder');
        if (placeholder) description += ` [placeholder="${placeholder}"]`;
      }

      if (element.hasAttribute('disabled')) {
        description += ' [disabled]';
      }

      if (role === 'heading') {
        const level = element.tagName.match(/h(\d)/)?.[1];
        if (level) description += ` [level=${level}]`;
      }

      if (element.hasAttribute('aria-selected') && element.getAttribute('aria-selected') === 'true') {
        description += ' [selected]';
      }

      if (element.hasAttribute('aria-expanded')) {
        const expanded = element.getAttribute('aria-expanded') === 'true';
        description += expanded ? ' [expanded]' : ' [collapsed]';
      }

      return description;
    };

    const processElement = (element: Element, depth = 0): void => {
      if (depth > 15) return; // Prevent infinite recursion

      // Skip script, style, and other non-visible elements
      const tagName = element.tagName.toLowerCase();
      if (['script', 'style', 'meta', 'title', 'noscript', 'link'].includes(tagName)) {
        return;
      }

      // Skip elements that are not visible
      if (element instanceof HTMLElement) {
        const style = window.getComputedStyle(element);
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
          return;
        }

        // Skip elements with zero dimensions (unless they're interactive)
        const rect = element.getBoundingClientRect();
        const isInteractive = ['button', 'a', 'input', 'textarea', 'select'].includes(tagName) ||
          element.hasAttribute('onclick') ||
          element.hasAttribute('tabindex');

        if (!isInteractive && rect.width === 0 && rect.height === 0) {
          return;
        }
      }

      const indent = "  ".repeat(depth);
      const ref = getElementRef();
      const description = getElementDescription(element);

      // Store ref mapping for later use
      this.refMap.set(ref, element);

      // Check if element has meaningful children
      const meaningfulChildren = Array.from(element.children).filter(child => {
        const childTag = child.tagName.toLowerCase();
        if (['script', 'style', 'meta', 'title', 'noscript', 'link'].includes(childTag)) {
          return false;
        }

        if (child instanceof HTMLElement) {
          const style = window.getComputedStyle(child);
          return !(style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0');
        }

        return true;
      });

      if (meaningfulChildren.length === 0) {
        // Leaf element
        elements.push(`${indent}- ${description} [ref=${ref}]`);
      } else {
        // Container element with children
        elements.push(`${indent}- ${description} [ref=${ref}]:`);

        // Process children
        meaningfulChildren.forEach(child => {
          processElement(child, depth + 1);
        });
      }

      // Add URL information for links
      if (element.tagName.toLowerCase() === 'a') {
        const href = element.getAttribute('href');
        if (href && href !== '#') {
          elements.push(`${indent}  - /url: ${href}`);
        }
      }
    };

    // Start with document element
    const docRef = getElementRef();
    this.refMap.set(docRef, document.documentElement);
    elements.push(`- document [ref=${docRef}]:`);
    processElement(document.body, 1);

    return elements.join("\n");
  }

  private async clickElement(selector: string): Promise<void> {
    const element = this.findElement(selector);
    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }

    element.scrollIntoView({ behavior: "smooth", block: "center" });
    await new Promise(resolve => setTimeout(resolve, 200));

    element.click();

    // Wait for potential navigation or DOM changes
    await this.waitForStability();
  }

  private async hoverElement(selector: string): Promise<void> {
    const element = this.findElement(selector);
    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }

    element.scrollIntoView({ behavior: "smooth", block: "center" });
    await new Promise(resolve => setTimeout(resolve, 200));

    const event = new MouseEvent("mouseover", { bubbles: true });
    element.dispatchEvent(event);

    await this.waitForStability();
  }

  private async typeText(selector: string, text: string, submit?: boolean): Promise<void> {
    const element = this.findElement(selector) as HTMLInputElement | HTMLTextAreaElement;
    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }

    element.scrollIntoView({ behavior: "smooth", block: "center" });
    await new Promise(resolve => setTimeout(resolve, 200));

    element.focus();
    element.value = text;

    // Trigger input events
    element.dispatchEvent(new Event("input", { bubbles: true }));
    element.dispatchEvent(new Event("change", { bubbles: true }));

    if (submit) {
      const enterEvent = new KeyboardEvent("keydown", {
        key: "Enter",
        bubbles: true,
      });
      element.dispatchEvent(enterEvent);

      // Wait for potential navigation or form submission
      await this.waitForStability(2000);
    } else {
      await this.waitForStability();
    }
  }

  private async selectOption(selector: string, values: string[]): Promise<void> {
    const element = this.findElement(selector) as HTMLSelectElement;
    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }

    element.scrollIntoView({ behavior: "smooth", block: "center" });
    await new Promise(resolve => setTimeout(resolve, 200));

    // Handle both single and multiple selection
    if (element.multiple) {
      // Clear existing selections
      Array.from(element.options).forEach(option => option.selected = false);

      // Select the specified values
      values.forEach(value => {
        const option = Array.from(element.options).find(opt => opt.value === value);
        if (option) option.selected = true;
      });
    } else {
      // Single selection - use the first value
      element.value = values[0] || "";
    }

    element.dispatchEvent(new Event("change", { bubbles: true }));
    await this.waitForStability();
  }

  private async pressKey(key: string): Promise<void> {
    const event = new KeyboardEvent("keydown", {
      key,
      bubbles: true,
    });
    document.activeElement?.dispatchEvent(event) || document.dispatchEvent(event);

    // Wait for potential navigation (e.g., Enter key)
    if (key === 'Enter') {
      await this.waitForStability(2000);
    } else {
      await this.waitForStability();
    }
  }

  /**
   * Find element by selector or ref
   */
  private findElement(selector: string): HTMLElement | null {
    // If selector looks like a ref (e.g., "s2e123"), find in ref map
    if (selector.match(/^s2e\d+$/)) {
      const element = this.refMap.get(selector);
      return element as HTMLElement | null;
    }

    // Otherwise, treat as CSS selector
    return document.querySelector(selector) as HTMLElement;
  }

  /**
   * Wait for DOM stability after actions
   */
  private async waitForStability(maxWait = 1000): Promise<void> {
    let stabilityCounter = 0;
    const requiredStability = 3; // Number of consecutive checks with no changes

    return new Promise((resolve) => {
      const checkStability = () => {
        // Check if page is still loading
        if (document.readyState !== 'complete') {
          stabilityCounter = 0;
          setTimeout(checkStability, 100);
          return;
        }

        // Check for ongoing animations or transitions
        const hasAnimations = document.getAnimations().length > 0;
        if (hasAnimations) {
          stabilityCounter = 0;
          setTimeout(checkStability, 100);
          return;
        }

        stabilityCounter++;
        if (stabilityCounter >= requiredStability) {
          resolve();
        } else {
          setTimeout(checkStability, 100);
        }
      };

      setTimeout(checkStability, 100);

      // Maximum wait timeout
      setTimeout(resolve, maxWait);
    });
  }
}