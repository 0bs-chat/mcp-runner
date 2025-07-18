import { chromium, type BrowserContext } from "playwright";

async function main() {
  console.log("Connecting to WebSocket server at ws://localhost:9223/cdp");
  const browser = await chromium.connectOverCDP("ws://localhost:9223/cdp");
  console.log("Connected to WebSocket server");

  try {
    // Get existing context or create a new one
    const contexts = browser.contexts();
    let context: BrowserContext;
    if (contexts.length > 0 && contexts[0]) {
      context = contexts[0];
    } else {
      context = await browser.newContext();
    }

    // Create a new page
    const page = await context.newPage();

    // Navigate to the URL
    await page.goto("https://example.com");

    console.log("Successfully navigated to https://example.com");

    // Optional: Wait for a moment to see the page
    await page.waitForTimeout(2000);

  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Clean up
    await browser.close();
  }
}

main().catch(console.error);