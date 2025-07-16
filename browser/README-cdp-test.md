# CDP Test Script

This script demonstrates how to connect to the CDP relay server and perform browser automation using Playwright.

## Prerequisites

1. Make sure the CDP relay server is running:
   ```bash
   # The server should be running on ws://localhost:9223
   # You should see output like:
   # CDP Bridge Server listening on ws://localhost:9223
   # - Playwright MCP: ws://localhost:9223/cdp
   # - Extension: ws://localhost:9223/extension
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

## Running the Test

Run the CDP test script:

```bash
bun run test:cdp
```

Or run it directly:

```bash
bun run playwright-cdp-test.ts
```

## What the Script Does

1. Connects to the CDP server at `ws://localhost:9223/cdp`
2. Gets the first available browser context
3. Navigates to `https://www.google.com`
4. Prints the page title
5. Waits for 3 seconds
6. Closes the browser connection

## Expected Output

```
Connecting to CDP server at ws://localhost:9223/cdp...
Successfully connected to CDP server
Navigating to Google.com...
Successfully navigated to Google.com
Page title: Google
Test completed successfully!
Browser connection closed
```

## Troubleshooting

- Make sure the CDP relay server is running before executing the script
- If you get connection errors, verify the server is listening on port 9223
- The script requires a browser extension to be connected to the `/extension` endpoint for full functionality 