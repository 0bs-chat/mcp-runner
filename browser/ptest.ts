import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.connectOverCDP('ws://localhost:8080/cdp');
  const context = await browser.newContext();
  const pages = await context.pages();
  const page = pages[0];
  await page?.goto('https://www.google.com');
  await page?.waitForTimeout(10000);
  const content = await page?.content();
  console.log(content);
  await browser.close();
}

main();