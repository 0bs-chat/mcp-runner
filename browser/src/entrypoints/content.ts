import type { ConsoleLog } from '../shared/types';

export default defineContentScript({
  matches: ['<all_urls>'],
  main() {
    const consoleCapture = new ConsoleCapture();
    const cursorManager = new CursorManager();
    const actionHandler = new ActionHandler(consoleCapture, cursorManager);

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

    // Initialize cursor manager
    cursorManager.init();
  },
});

/**
 * Captures console logs for debugging purposes
 */
class ConsoleCapture {
  private logs: ConsoleLog[] = [];

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
 * Manages custom cursor for element interaction visualization
 */
class CursorManager {
  private cursor: HTMLElement | null = null;
  private isInitialized = false;

  init() {
    if (this.isInitialized) return;
    this.createCursor();
    this.isInitialized = true;
  }

  private createCursor() {
    this.cursor = document.createElement('div');
    this.cursor.id = 'browser-automation-cursor';
    this.cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: #ff6b6b;
      border: 2px solid #fff;
      border-radius: 50%;
      pointer-events: none;
      z-index: 999999;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      transition: all 0.3s ease;
      transform: translate(-50%, -50%);
      opacity: 0;
    `;
    document.body.appendChild(this.cursor);
  }

  showAt(element: Element) {
    if (!this.cursor) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    this.cursor.style.left = centerX + 'px';
    this.cursor.style.top = centerY + 'px';
    this.cursor.style.opacity = '1';
    this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
  }

  hide() {
    if (!this.cursor) return;
    this.cursor.style.opacity = '0';
    this.cursor.style.transform = 'translate(-50%, -50%) scale(0.5)';
  }

  async animateClick() {
    if (!this.cursor) return;

    // Click animation
    this.cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    this.cursor.style.background = '#ff4757';

    await new Promise(resolve => setTimeout(resolve, 150));

    this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    this.cursor.style.background = '#ff6b6b';
  }

  async animateTyping() {
    if (!this.cursor) return;

    // Typing indicator animation
    this.cursor.style.background = '#2ed573';
    this.cursor.style.animation = 'blink 1s infinite';

    // Add blink animation if not exists
    if (!document.getElementById('cursor-blink-style')) {
      const style = document.createElement('style');
      style.id = 'cursor-blink-style';
      style.textContent = `
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.3; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  stopTypingAnimation() {
    if (!this.cursor) return;
    this.cursor.style.animation = '';
    this.cursor.style.background = '#ff6b6b';
  }
}

// --- Start of Refactored Code ---

/**
 * Represents a semantically meaningful node in the accessibility tree.
 * The 'text' role is used for plain text content.
 */
interface SemanticNode {
  ref?: string;
  role: string;
  name?: string;
  level?: number;
  url?: string;
  state: string[];
  children: SemanticNode[];
  element?: Element;
}

/**
 * Handles browser automation actions with a new semantic snapshot approach.
 */
class ActionHandler {
  private refMap = new Map<string, Element>();
  private refCounter = 0;

  constructor(private consoleCapture: ConsoleCapture, private cursorManager: CursorManager) { }

  async execute(message: any): Promise<any> {
    const { action } = message;

    switch (action) {
      case "getAccessibilitySnapshot":
        return { snapshot: this.generateAccessibilitySnapshot() };
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

  /**
   * Generates a high-level, semantic accessibility snapshot of the page.
   */
  private generateAccessibilitySnapshot(): string {
    this.refMap.clear();
    this.refCounter = 0;
    const processedNodes = new Set<Node>();

    const semanticTree = Array.from(document.body.childNodes)
      .flatMap(child => this.buildSemanticTree(child, processedNodes));

    const docRef = this.getRef();
    this.refMap.set(docRef, document.documentElement);
    const rootNode: SemanticNode = {
      ref: docRef,
      role: 'document',
      element: document.documentElement,
      children: this.mergeTextNodes(semanticTree),
      state: [],
    };

    return this.formatTreeToYaml([rootNode]);
  }

  /**
   * Recursively builds a semantic tree from a DOM Node. Can return multiple
   * nodes if the input node is an uninteresting container, or an empty array
   * if the node is invisible, already processed, or uninteresting.
   */
  private buildSemanticTree(node: Node, processedNodes: Set<Node>): SemanticNode[] {
    if (processedNodes.has(node)) {
      return [];
    }
    processedNodes.add(node);

    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim();
      return text ? [{ role: 'text', name: text, state: [], children: [] }] : [];
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return [];
    }

    const element = node as Element;
    if (!this.isVisible(element)) {
      return [];
    }

    const semanticNode = this.createSemanticNode(element, processedNodes);

    if (semanticNode) {
      return [semanticNode];
    } else {
      return Array.from(element.childNodes)
        .flatMap(child => this.buildSemanticTree(child, processedNodes));
    }
  }

  private createSemanticNode(element: Element, processedNodes: Set<Node>): SemanticNode | null {
    const role = this.getSemanticRole(element);
    if (!role) return null;

    const interestingRoles = ['link', 'button', 'heading', 'navigation', 'main', 'complementary', 'banner', 'region', 'tab', 'tablist', 'search', 'form', 'list', 'listitem', 'img', 'status', 'paragraph', 'checkbox', 'article', 'group', 'combobox', 'progressbar', 'time', 'textbox', 'searchbox'];
    if (!interestingRoles.includes(role)) return null;

    const name = this.getAccessibleName(element);
    const isContainer = ['navigation', 'main', 'complementary', 'banner', 'region', 'list', 'tablist', 'form', 'article', 'group', 'listitem'];

    // An element is interesting if it's a designated container, has a name, or is a role that's always interesting.
    if (!isContainer.includes(role) && !name && !['img', 'progressbar', 'time', 'textbox', 'searchbox', 'checkbox'].includes(role)) {
      return null;
    }

    const node: Partial<SemanticNode> = { role, name: name || undefined, element, state: [] };

    if (element.hasAttribute('disabled')) node.state!.push('disabled');
    if (element.getAttribute('aria-selected') === 'true') node.state!.push('selected');
    if (role === 'heading') node.level = parseInt(element.getAttribute('aria-level') || element.tagName.slice(1) || '0', 10);
    if (role === 'link' && element.hasAttribute('href')) node.url = (element as HTMLAnchorElement).href;

    const children = Array.from(element.childNodes)
      .flatMap(child => this.buildSemanticTree(child, processedNodes));
    node.children = this.mergeTextNodes(children);

    return this.finalizeNode(node);
  }

  /**
   * Finalizes a partial node by adding a ref and ensuring all fields are set.
   */
  private finalizeNode(partialNode: Partial<SemanticNode>): SemanticNode {
    const ref = this.getRef();
    this.refMap.set(ref, partialNode.element!);
    return {
      ref,
      role: partialNode.role!,
      name: partialNode.name,
      level: partialNode.level,
      url: partialNode.url,
      state: partialNode.state || [],
      children: partialNode.children || [],
      element: partialNode.element!
    };
  }

  // --- Helper Functions ---

  private getRef = (): string => `s1e${++this.refCounter}`;

  private isVisible = (element: Element): boolean => {
    if (!(element instanceof HTMLElement)) return true;
    if (element.getAttribute('aria-hidden') === 'true') return false;
    const style = window.getComputedStyle(element);
    if (style.display === 'none' || style.visibility === 'hidden' || parseFloat(style.opacity) === 0) return false;
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  };

  private getAccessibleName(element: Element): string {
    const ariaLabel = element.getAttribute('aria-label');
    if (ariaLabel) return ariaLabel.trim();

    const labelledby = element.getAttribute('aria-labelledby');
    if (labelledby) {
      const ids = labelledby.split(' ').filter(Boolean);
      const text = ids.map(id => document.getElementById(id)?.textContent).join(' ');
      if (text) return text.replace(/\s+/g, ' ').trim();
    }

    if (element.tagName.toLowerCase() === 'img') {
      return element.getAttribute('alt')?.trim() || '';
    }

    const clone = element.cloneNode(true) as HTMLElement;
    const childSemanticSelectors = 'a, button, input, select, textarea, img, [role], h1, h2, h3, h4, h5, h6';
    clone.querySelectorAll(childSemanticSelectors).forEach(childEl => {
      if (element.contains(childEl) && childEl !== element) {
        (childEl as HTMLElement).innerText = '';
      }
    });

    return (clone.innerText || '').replace(/\s+/g, ' ').trim();
  }

  private getSemanticRole(element: Element): string | null {
    const explicitRole = element.getAttribute('role');
    if (explicitRole) return explicitRole;

    const tag = element.tagName.toLowerCase();
    const tagToRole: { [key: string]: string } = {
      'a': 'link', 'button': 'button', 'nav': 'navigation', 'header': 'banner', 'main': 'main',
      'aside': 'complementary', 'article': 'article', 'section': 'region', 'h1': 'heading',
      'h2': 'heading', 'h3': 'heading', 'h4': 'heading', 'h5': 'heading', 'h6': 'heading',
      'ul': 'list', 'ol': 'list', 'li': 'listitem', 'form': 'form', 'img': 'img',
      'p': 'paragraph', 'time': 'time', 'progress': 'progressbar', 'textarea': 'textbox'
    };
    if (tagToRole[tag]) return tagToRole[tag];

    if (tag === 'input') {
      const type = element.getAttribute('type')?.toLowerCase() || '';
      const buttonTypes = ['button', 'submit', 'reset'];
      const checkboxTypes = ['checkbox', 'radio'];

      if (buttonTypes.includes(type)) return 'button';
      if (checkboxTypes.includes(type)) return type === 'radio' ? 'radiobutton' : 'checkbox';
      if (type === 'search') return 'searchbox';

      // All other input types are treated as textbox
      return 'textbox';
    }

    // Check for contentEditable
    if (element.getAttribute('contenteditable') === 'true') {
      return 'textbox';
    }

    return null;
  }

  private mergeTextNodes(nodes: SemanticNode[]): SemanticNode[] {
    if (nodes.length < 2) return nodes;
    const merged: SemanticNode[] = [];
    let buffer: string[] = [];

    const flushBuffer = () => {
      if (buffer.length > 0) {
        const joinedText = buffer.join(' ').trim();
        if (joinedText) {
          merged.push({ role: 'text', name: joinedText, state: [], children: [] });
        }
        buffer = [];
      }
    };

    for (const node of nodes) {
      if (node.role === 'text' && node.name) {
        buffer.push(node.name);
      } else {
        flushBuffer();
        merged.push(node);
      }
    }
    flushBuffer();
    return merged;
  }

  private formatTreeToYaml(nodes: SemanticNode[], depth = 0): string {
    const lines: string[] = [];
    const indent = '  '.repeat(depth);

    for (const node of nodes) {
      if (node.role === 'text') {
        const cleanedText = (node.name || '').replace(/\s+/g, ' ').trim();
        if (cleanedText) lines.push(`${indent}- text: ${cleanedText}`);
        continue;
      }

      let line = `${indent}- ${node.role}`;
      if (node.name) {
        const cleanedName = node.name.replace(/"/g, "'").replace(/\s+/g, ' ').trim();
        line += ` "${cleanedName.length > 150 ? cleanedName.substring(0, 147) + '...' : cleanedName}"`;
      }
      const attrs = [...node.state];
      if (node.level) attrs.push(`level=${node.level}`);
      if (attrs.length) line += ` [${attrs.join(' ')}]`;
      if (node.ref) line += ` [ref=${node.ref}]`;

      const hasChildren = node.children.length > 0;
      const hasUrl = !!node.url;

      if (!hasChildren && !hasUrl) {
        lines.push(line);
      } else {
        lines.push(line + ':');
        const childIndent = '  '.repeat(depth + 1);
        if (hasUrl) {
          try {
            const url = new URL(node.url!);
            const relativeUrl = url.pathname + url.search + url.hash;
            lines.push(`${childIndent}- /url: ${relativeUrl}`);
          } catch {
            lines.push(`${childIndent}- /url: ${node.url}`);
          }
        }
        if (hasChildren) {
          lines.push(this.formatTreeToYaml(node.children, depth + 1));
        }
      }
    }
    return lines.join('\n');
  }

  // --- Enhanced Action Methods with Cursor Management and Improved Typing ---

  private async clickElement(selector: string): Promise<void> {
    const element = this.findElement(selector);
    if (!element) throw new Error(`Element not found: ${selector}`);

    element.scrollIntoView({ behavior: "smooth", block: "center" });
    await new Promise(resolve => setTimeout(resolve, 200));

    // Show cursor and animate click
    this.cursorManager.showAt(element);
    await new Promise(resolve => setTimeout(resolve, 300));
    await this.cursorManager.animateClick();

    element.click();
    await this.waitForStability();

    // Hide cursor after action
    setTimeout(() => this.cursorManager.hide(), 500);
  }

  private async hoverElement(selector: string): Promise<void> {
    const element = this.findElement(selector);
    if (!element) throw new Error(`Element not found: ${selector}`);

    element.scrollIntoView({ behavior: "smooth", block: "center" });
    await new Promise(resolve => setTimeout(resolve, 200));

    // Show cursor at hover location
    this.cursorManager.showAt(element);

    const event = new MouseEvent("mouseover", { bubbles: true });
    element.dispatchEvent(event);
    await this.waitForStability();

    // Keep cursor visible for hover
    setTimeout(() => this.cursorManager.hide(), 1000);
  }

  private async typeText(selector: string, text: string, submit?: boolean): Promise<void> {
    const element = this.findElement(selector);
    if (!element) throw new Error(`Element not found: ${selector}`);

    // Check if element is typeable
    const isTypeable = this.isTypeableElement(element);
    if (!isTypeable) {
      throw new Error(`Element is not a typeable input: ${selector}`);
    }

    element.scrollIntoView({ behavior: "smooth", block: "center" });
    await new Promise(resolve => setTimeout(resolve, 200));

    // Show cursor and start typing animation
    this.cursorManager.showAt(element);
    await new Promise(resolve => setTimeout(resolve, 300));
    this.cursorManager.animateTyping();

    // Focus the element
    element.focus();

    // Clear existing content
    if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
      element.value = '';
      element.dispatchEvent(new Event("input", { bubbles: true }));
    } else if (element.getAttribute('contenteditable') === 'true') {
      element.textContent = '';
      element.dispatchEvent(new Event("input", { bubbles: true }));
    }

    // Type text character by character with realistic timing
    await this.simulateTyping(element, text);

    // Stop typing animation
    this.cursorManager.stopTypingAnimation();

    // Dispatch final events
    element.dispatchEvent(new Event("change", { bubbles: true }));
    element.dispatchEvent(new Event("blur", { bubbles: true }));

    if (submit) {
      await new Promise(resolve => setTimeout(resolve, 200));
      await this.handleSubmission(element);
      await this.waitForStability(2000);
    } else {
      await this.waitForStability();
    }

    // Hide cursor after typing
    setTimeout(() => this.cursorManager.hide(), 500);
  }

  private isTypeableElement(element: Element): boolean {
    if (element instanceof HTMLInputElement) {
      const type = element.type.toLowerCase();
      const typeableTypes = ['text', 'email', 'password', 'search', 'tel', 'url', 'number', 'date', 'time', 'datetime-local', 'month', 'week'];
      return typeableTypes.includes(type) || type === '';
    }

    if (element instanceof HTMLTextAreaElement) {
      return true;
    }

    if (element.getAttribute('contenteditable') === 'true') {
      return true;
    }

    // Check for role=textbox
    if (element.getAttribute('role') === 'textbox') {
      return true;
    }

    return false;
  }

  private async simulateTyping(element: Element, text: string): Promise<void> {
    for (let i = 0; i < text.length; i++) {
      const char = text[i];

      // Get proper key code for the character
      const keyInfo = this.getKeyInfo(char);

      // Simulate keydown, keypress, and keyup events
      const keydownEvent = new KeyboardEvent("keydown", {
        key: keyInfo.key,
        code: keyInfo.code,
        bubbles: true,
        cancelable: true
      });
      const keypressEvent = new KeyboardEvent("keypress", {
        key: keyInfo.key,
        code: keyInfo.code,
        bubbles: true,
        cancelable: true
      });
      const keyupEvent = new KeyboardEvent("keyup", {
        key: keyInfo.key,
        code: keyInfo.code,
        bubbles: true,
        cancelable: true
      });

      element.dispatchEvent(keydownEvent);

      // Only dispatch keypress for printable characters
      if (keyInfo.key.length === 1) {
        element.dispatchEvent(keypressEvent);
      }

      // Update element value
      if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        element.value += char;
      } else if (element.getAttribute('contenteditable') === 'true') {
        element.textContent += char;
      }

      // Dispatch input event for each character
      element.dispatchEvent(new Event("input", { bubbles: true }));
      element.dispatchEvent(keyupEvent);

      // Random typing delay between 50-150ms for realistic feel
      const delay = 50 + Math.random() * 100;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  private getKeyInfo(char: string): { key: string; code: string } {
    // Handle special characters and spaces
    if (char === ' ') {
      return { key: ' ', code: 'Space' };
    }

    // Handle numbers
    if (/\d/.test(char)) {
      return { key: char, code: `Digit${char}` };
    }

    // Handle letters
    if (/[a-zA-Z]/.test(char)) {
      return { key: char, code: `Key${char.toUpperCase()}` };
    }

    // Handle common special characters
    const specialChars: { [key: string]: string } = {
      '.': 'Period',
      ',': 'Comma',
      ';': 'Semicolon',
      ':': 'Colon',
      '!': 'Digit1', // Shift+1
      '@': 'Digit2', // Shift+2
      '#': 'Digit3', // Shift+3
      '$': 'Digit4', // Shift+4
      '%': 'Digit5', // Shift+5
      '^': 'Digit6', // Shift+6
      '&': 'Digit7', // Shift+7
      '*': 'Digit8', // Shift+8
      '(': 'Digit9', // Shift+9
      ')': 'Digit0', // Shift+0
      '-': 'Minus',
      '+': 'Equal', // Shift+=
      '=': 'Equal',
      '[': 'BracketLeft',
      ']': 'BracketRight',
      '{': 'BracketLeft', // Shift+[
      '}': 'BracketRight', // Shift+]
      '\\': 'Backslash',
      '|': 'Backslash', // Shift+\
      '\'': 'Quote',
      '"': 'Quote', // Shift+'
      '/': 'Slash',
      '?': 'Slash', // Shift+/
      '`': 'Backquote',
      '~': 'Backquote', // Shift+`
    };

    const code = specialChars[char];
    if (code) {
      return { key: char, code };
    }

    // Default fallback
    return { key: char, code: 'Unidentified' };
  }

  private async selectOption(selector: string, values: string[]): Promise<void> {
    const element = this.findElement(selector) as HTMLSelectElement;
    if (!element) throw new Error(`Element not found: ${selector}`);

    element.scrollIntoView({ behavior: "smooth", block: "center" });
    await new Promise(resolve => setTimeout(resolve, 200));

    // Show cursor for selection
    this.cursorManager.showAt(element);
    await new Promise(resolve => setTimeout(resolve, 300));
    await this.cursorManager.animateClick();

    if (element.multiple) {
      Array.from(element.options).forEach(option => option.selected = false);
      values.forEach(value => {
        const option = Array.from(element.options).find(opt => opt.value === value);
        if (option) option.selected = true;
      });
    } else {
      element.value = values[0] || "";
    }
    element.dispatchEvent(new Event("change", { bubbles: true }));
    await this.waitForStability();

    // Hide cursor after selection
    setTimeout(() => this.cursorManager.hide(), 500);
  }

  private async pressKey(key: string): Promise<void> {
    // Show brief cursor animation for key press if there's an active element
    const activeElement = document.activeElement;
    if (activeElement && activeElement !== document.body) {
      this.cursorManager.showAt(activeElement as Element);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    const keydownEvent = new KeyboardEvent("keydown", { key, bubbles: true });
    const keyupEvent = new KeyboardEvent("keyup", { key, bubbles: true });

    (document.activeElement || document).dispatchEvent(keydownEvent);
    (document.activeElement || document).dispatchEvent(keyupEvent);

    await this.waitForStability(key === 'Enter' ? 2000 : 500);

    // Hide cursor after key press
    if (activeElement && activeElement !== document.body) {
      setTimeout(() => this.cursorManager.hide(), 300);
    }
  }

  private findElement(selector: string): HTMLElement | null {
    if (selector.match(/^s1e\d+$/)) {
      return this.refMap.get(selector) as HTMLElement | null;
    }
    return document.querySelector(selector);
  }

  private async waitForStability(maxWait = 1000): Promise<void> {
    return new Promise(resolve => {
      let stabilityCounter = 0;
      const check = () => {
        // Only check document ready state, not animations which can be ongoing
        if (document.readyState !== 'complete') {
          stabilityCounter = 0;
          setTimeout(check, 100);
        } else {
          stabilityCounter++;
          if (stabilityCounter >= 2) resolve(); // Reduced from 3 to 2 for faster response
          else setTimeout(check, 100);
        }
      };
      setTimeout(check, 100);
      setTimeout(resolve, maxWait);
    });
  }

  private async handleSubmission(element: Element): Promise<void> {
    // Try to find the containing form
    const form = element.closest('form');

    if (form) {
      // If there's a form, try to find a submit button first
      const submitButton = form.querySelector('button[type="submit"], input[type="submit"]') ||
        form.querySelector('button:not([type]), button[type="button"]') ||
        form.querySelector('[role="button"]');

      if (submitButton && submitButton instanceof HTMLElement) {
        // Click the submit button if found
        submitButton.click();
        return;
      }

      // If no submit button, dispatch form submit event
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      if (!form.dispatchEvent(submitEvent)) {
        // If event was prevented, try manual form submission
        if (form.submit && typeof form.submit === 'function') {
          form.submit();
        }
      }
    } else {
      // No form found, try Enter key approach
      const enterKeydown = new KeyboardEvent("keydown", {
        key: "Enter",
        code: "Enter",
        bubbles: true,
        cancelable: true
      });
      const enterKeypress = new KeyboardEvent("keypress", {
        key: "Enter",
        code: "Enter",
        bubbles: true,
        cancelable: true
      });
      const enterKeyup = new KeyboardEvent("keyup", {
        key: "Enter",
        code: "Enter",
        bubbles: true,
        cancelable: true
      });

      element.dispatchEvent(enterKeydown);
      element.dispatchEvent(enterKeypress);
      element.dispatchEvent(enterKeyup);

      // Also try dispatching on the document in case of global handlers
      if (!enterKeydown.defaultPrevented) {
        document.dispatchEvent(new KeyboardEvent("keydown", {
          key: "Enter",
          code: "Enter",
          bubbles: true
        }));
      }
    }
  }
}