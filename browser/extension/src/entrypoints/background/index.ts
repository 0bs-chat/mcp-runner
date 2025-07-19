// src/entrypoints/background/index.ts
import { TabShareExtension } from "./tabShare";

export default defineBackground(() => {
  // instantiate the MCP bridge handler
  new TabShareExtension();
});