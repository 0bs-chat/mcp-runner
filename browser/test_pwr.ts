/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { resolveCLIConfig } from '../playwright-mcp/src/config.js';
import { Connection } from '../playwright-mcp/src/connection.js';
import { startStdioTransport } from '../playwright-mcp/src/transport.js';
import { Server } from '../playwright-mcp/src/server.js';

export async function runWithExtension(options: any) {
  const config = await resolveCLIConfig({ });

  let connection: Connection | null = null;
  // Point CDP endpoint to the relay server.
  config.browser.cdpEndpoint = "ws://localhost:8080/cdp/ca83c3fe-a2d6-4073-891a-ee5c905fe860";

  const server = new Server(config);
  server.setupExitWatchdog();

  connection = await startStdioTransport(server);
  await connection.context.newTab();
  const page = await connection.context.currentTabOrDie().page;
  await page.goto('https://www.google.com');
  await page.waitForTimeout(100000);
  await connection.close();
}

await runWithExtension({});