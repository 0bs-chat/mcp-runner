export default defineContentScript({
  main() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.method === 'snapshot') {
        const yaml = captureARIASnapshot();
        sendResponse(yaml);
      }
      if (message.method === 'click') {
        handleClick(message.ref);
      }
      if (message.method === 'hover') {
        handleHover(message.ref);
      }
      if (message.method === 'type') {
        handleType(message.ref, message.text, message.submit);
      }
      if (message.method === 'selectOption') {
        handleSelectOption(message.ref, message.values);
      }
      if (message.method === 'pressKey') {
        handlePressKey(message.key);
      }
      if (message.method === 'getConsoleLogs') {
        handleGetConsoleLogs();
      }
    });
  },
  matches: ['<all_urls>'],
});

async function handleClick(ref: string) {
  const element = findElement(ref);
  if (!element) {
    throw new Error(`Element not found: ${ref}`);
  }
  element.scrollIntoView({ behavior: "smooth", block: "center" });
  await new Promise(resolve => setTimeout(resolve, 200));
  (element as HTMLElement).click();
  await waitForStability();
  return true;
}

async function handleType(ref: string, text: string, submit: boolean) {
  const element = findElement(ref);
  if (!element) throw new Error(`Element not found: ${ref}`);

  if (element) {
    (element as HTMLElement).focus();
    (element as HTMLInputElement).value = text;
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    if (submit) {
      element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    }
  }
  return true;
}

async function handleHover(ref: string) {
  const element = findElement(ref);
  if (!element) {
    throw new Error(`Element not found: ${ref}`);
  }
  element.scrollIntoView({ behavior: "smooth", block: "center" });
  await new Promise(resolve => setTimeout(resolve, 200));
  element.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  await waitForStability();
  return true;
}

async function handleSelectOption(ref: string, values: string[]) {
  const element = findElement(ref);
  if (!element) {
    throw new Error(`Element not found: ${ref}`);
  }
  element.scrollIntoView({ behavior: "smooth", block: "center" });
  await new Promise(resolve => setTimeout(resolve, 200));
  if (element.tagName === 'SELECT') {
    values.forEach(value => {
      const option = element.querySelector(`option[value="${value}"]`);
      if (option) {
        (option as HTMLOptionElement).selected = true;
      }
    });
    element.dispatchEvent(new Event('change', { bubbles: true }));
    await waitForStability();
    return true;
  } else {
    throw new Error(`Select element not found: ${ref}`);
  }
}

async function handlePressKey(key: string) {
  document.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
  await waitForStability();
  return true;
}

async function handleGetConsoleLogs() {
  // Console logs are captured by background script
  return true;
}

// Utility methods
function findElement(ref: string) {
  // if ref is a number, return the Nth interactive element
  const idx = parseInt(ref, 10);
  const interactive = document.querySelectorAll(
    "button, a, input, select, textarea, [role='button'], [tabindex]"
  );
  if (!isNaN(idx) && interactive[idx]) {
    return interactive[idx];
  }

  // otherwise fall back to your existing aria-label / text-matching logic…
  const queries = [
    `[aria-label="${ref}"]`,
    `[title="${ref}"]`,
    // …
  ];
  for (const q of queries) {
    const el = document.querySelector(q);
    if (el instanceof HTMLElement) return el;
  }
  for (const el of document.querySelectorAll("button, a, input, [role='button']")) {
    if (el.textContent?.trim().includes(ref) && el instanceof HTMLElement) {
      return el;
    }
  }
  return null;
}

function captureARIASnapshot() {
  type SnapshotElement = {
    ref: number;
    tagName: string;
    type?: string;
    text?: string;
    value?: string;
    ariaLabel?: string;
    title?: string;
    placeholder?: string;
    role?: string;
    href?: string;
    visible: boolean;
  };
  type Section = {
    name: string;
    role?: string;
    ariaLabel?: string;
    elements: SnapshotElement[];
  };

  const snapshot: {
    url: string;
    title: string;
    /* flat list kept for backward-compatibility */
    elements: SnapshotElement[];
    /* new grouped sections */
    sections?: Section[];
  } = {
    url: window.location.href,
    title: document.title,
    elements: [],
  };

  const interactiveElements = document.querySelectorAll(
    'button, a, input, select, textarea, [role="button"], [role="link"], [tabindex]'
  );

  // selectors to identify semantic containers
  const groupingSelectors =
    'header, nav, main, article, aside, footer,' +
    ' [role="banner"], [role="navigation"], [role="main"],' +
    ' [role="region"], [role="complementary"], [role="contentinfo"]';

  interactiveElements.forEach((element, index) => {
    const rect = element.getBoundingClientRect();
    if (
      rect.width < 1 ||
      rect.height < 1 ||
      rect.bottom < 0 ||
      rect.top > window.innerHeight
    ) {
      return;
    }

    const raw: SnapshotElement = {
      ref: index,
      tagName: element.tagName.toLowerCase(),
      type: (element as HTMLInputElement).type || undefined,
      text: element.textContent?.trim() || undefined,
      value: (element as HTMLInputElement).value || undefined,
      ariaLabel: element.getAttribute('aria-label') || undefined,
      title: element.getAttribute('title') || undefined,
      placeholder: element.getAttribute('placeholder') || undefined,
      role: element.getAttribute('role') || undefined,
      href: (element as HTMLAnchorElement).href || undefined,
      visible: isElementVisible(element as HTMLElement),
    };

    // prune undefined or empty props
    const filtered = Object.fromEntries(
      Object.entries(raw).filter(
        ([, v]) => v !== null && v !== undefined && v !== ''
      )
    ) as SnapshotElement;

    snapshot.elements.push(filtered);
  });

  // build grouped sections
  const sectionMap = new Map<string, Section>();
  snapshot.elements.forEach(el => {
    // find the actual DOM node by ref
    const domEl = interactiveElements[el.ref] as HTMLElement;
    const secEl = domEl.closest(groupingSelectors) as HTMLElement | null;

    const sectionName = secEl
      ? secEl.getAttribute('aria-label') ||
        secEl.getAttribute('role') ||
        secEl.tagName.toLowerCase()
      : 'page';

    const sectionRole = secEl?.getAttribute('role') || undefined;
    const sectionAriaLabel = secEl?.getAttribute('aria-label') || undefined;

    if (!sectionMap.has(sectionName)) {
      sectionMap.set(sectionName, {
        name: sectionName,
        role: sectionRole,
        ariaLabel: sectionAriaLabel,
        elements: [],
      });
    }
    sectionMap.get(sectionName)!.elements.push(el);
  });

  snapshot.sections = Array.from(sectionMap.values());

  return snapshot;
}

function isElementVisible(element: HTMLElement) {
  const style = window.getComputedStyle(element);
  return style.display !== 'none' && 
         style.visibility !== 'hidden' && 
         style.opacity !== '0';
}

async function handleGetInnerHTML(data: { selector: string, getAll: boolean, getTextContent: boolean }, messageId: string) {
  try {
    const { selector, getAll = false, getTextContent = false } = data;
    console.log('[Chrome MCP] Getting content for selector:', selector, 
               `(getAll: ${getAll}, getTextContent: ${getTextContent})`);
    
    let result;
    
    if (getAll) {
      // Get all matching elements
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        throw new Error(`No elements found for selector: ${selector}`);
      }
      
      // Convert NodeList to Array and extract content
      result = Array.from(elements).map(el => {
        return getTextContent ? el.textContent : el.innerHTML;
      });
      
      console.log(`[Chrome MCP] Found ${result.length} elements matching selector`);
    } else {
      // Get just the first element
      const element = document.querySelector(selector);
      if (!element) {
        throw new Error(`Element not found for selector: ${selector}`);
      }
      
      result = getTextContent ? element.textContent : element.innerHTML;
      console.log('[Chrome MCP] Content:', result);
    }
    
    return {
      id: messageId,
      type: 'browser_get_inner_html_complete',
      data: { 
        selector, 
        content: result,
        getAll,
        getTextContent
      }
    };
  } catch (error) {
    console.error('[Chrome MCP] Error getting content:', error);
    return {
      id: messageId,
      type: 'browser_get_inner_html_error',
      data: {
        selector: data.selector,
        getAll: data.getAll || false,
        getTextContent: data.getTextContent || false,
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      }
    };
  }
}

async function waitForStability(maxWait = 1000): Promise<void> {
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