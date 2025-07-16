import { chromium } from 'playwright';

async function main() {
  console.log('Connecting to CDP server at ws://localhost:9223/cdp...');
  
  // Connect to the CDP server
  const browser = await chromium.connectOverCDP('ws://localhost:9223/cdp');
  
  try {
    console.log('Successfully connected to CDP server');
    
    // Get the default context and page
    const contexts = browser.contexts();
    if (contexts.length === 0) {
      throw new Error('No browser contexts available');
    }
    const context = contexts[0]!;
    const page = context.pages()[0] || await context.newPage();
    
    console.log('Navigating to Google.com...');
    
    // Navigate to Google
    await page.goto('https://www.google.com');
    
    console.log('Successfully navigated to Google.com');
    console.log('Page title:', await page.title());
    
    // Wait a bit to see the page
    await page.waitForTimeout(3000);
    
    console.log('Test completed successfully!');
    
  } catch (error) {
    console.error('Error during test:', error);
  } finally {
    // Close the browser connection
    await browser.close();
    console.log('Browser connection closed');
  }
}

// Run the script
main().catch(console.error); 