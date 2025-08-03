import { TabManager } from "../tab";

export async function getTabId(
  tabManager: TabManager,
  tabName?: string,
): Promise<number> {
  const resolvedTabName = tabName || "default";
  return await tabManager.getOrCreateTab(resolvedTabName);
}

export async function waitForNavigation(tabId: number): Promise<void> {
  return new Promise((resolve) => {
    const listener = (
      details: chrome.webNavigation.WebNavigationFramedCallbackDetails,
    ) => {
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

// Simple wait utility
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Check if element is visible
export function isVisible(element: Element): boolean {
  const style = window.getComputedStyle(element);
  const rect = element.getBoundingClientRect();

  return (
    style.display !== "none" &&
    style.visibility !== "hidden" &&
    style.opacity !== "0" &&
    rect.width > 0 &&
    rect.height > 0
  );
}

export async function getAccessibilitySnapshot(tabId: number): Promise<string> {
  try {
    // Inject script to get accessibility information
    const results = await chrome.scripting.executeScript({
      target: { tabId },
      func: generateSimpleSnapshot,
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

// Simple snapshot generator
export function generateSimpleSnapshot(): string {
  const snapshot = {
    url: window.location.href,
    title: document.title,
    timestamp: Date.now(),
    elements: new Map(),
    generation: ((window as any).currentSnapshot?.generation || 0) + 1,
  };

  // Get interactive elements
  const selectors = [
    "a[href]",
    "button",
    "input",
    "textarea",
    "select",
    '[role="button"]',
    '[role="link"]',
    "[tabindex]",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "[aria-label]",
    "[onclick]",
  ];

  const elements: string[] = [];
  let elementId = 0;

  selectors.forEach((selector) => {
    const nodeList = document.querySelectorAll(selector);
    nodeList.forEach((element) => {
      if (isElementVisible(element)) {
        elementId++;
        snapshot.elements.set(elementId, element);
        const info = getElementInfo(element, elementId, snapshot.generation);
        elements.push(info);
      }
    });
  });

  // Store snapshot globally for later reference
  (window as any).currentSnapshot = snapshot;

  return elements.join("\n");
}

function isElementVisible(element: Element): boolean {
  const style = window.getComputedStyle(element);
  const rect = element.getBoundingClientRect();

  return (
    style.display !== "none" &&
    style.visibility !== "hidden" &&
    style.opacity !== "0" &&
    rect.width > 0 &&
    rect.height > 0
  );
}

function getElementInfo(
  element: Element,
  id: number,
  generation: number,
): string {
  const tagName = element.tagName.toLowerCase();
  const text = element.textContent?.trim().substring(0, 100) || "";
  const ariaLabel = element.getAttribute("aria-label") || "";
  const role = element.getAttribute("role") || getImplicitRole(tagName);

  let info = `- ${role || tagName}`;

  if (text) {
    info += ` "${text}"`;
  } else if (ariaLabel) {
    info += ` "${ariaLabel}"`;
  }

  info += ` [ref=s${generation}e${id}]`;

  return info;
}

function getImplicitRole(tagName: string): string {
  const roleMap: Record<string, string> = {
    button: "button",
    a: "link",
    input: "textbox",
    textarea: "textbox",
    select: "combobox",
    h1: "heading",
    h2: "heading",
    h3: "heading",
    h4: "heading",
    h5: "heading",
    h6: "heading",
  };
  return roleMap[tagName] || tagName;
}
