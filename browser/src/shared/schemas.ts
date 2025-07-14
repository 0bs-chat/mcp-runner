// shared/schemas.ts
import { z } from "zod";

// Base schemas
export const selectorSchema = z.object({
  element: z.string().describe("Human-readable element description used to obtain permission to interact with the element"),
  ref: z.string().describe("Exact target element reference from the page snapshot"),
  sessionId: z.string().optional().describe("Session ID (optional, uses default session if not provided)"),
});

export const typeSchema = selectorSchema.extend({
  text: z.string().describe("The text to type into the element"),
  submit: z.boolean().optional().describe("Whether to submit entered text (press Enter after)"),
});

export const selectOptionSchema = selectorSchema.extend({
  values: z.array(z.string()).describe("Array of values to select in the dropdown. This can be a single value or multiple values."),
});

export const navigateSchema = z.object({
  url: z.string().describe("The URL to navigate to"),
  sessionId: z.string().optional().describe("Session ID to navigate (optional, uses default session if not provided). Prefix with 'headless-' to create a headless session in a new minimized window"),
});

export const sessionSchema = z.object({
  sessionId: z.string().optional().describe("Session ID (optional, uses default session if not provided)"),
});

export const pressKeySchema = z.object({
  key: z.string().describe("Name of the key to press or a character to generate, such as `ArrowLeft` or `a`"),
  sessionId: z.string().optional().describe("Session ID to press key in (optional, uses default session if not provided)"),
});

export const wsUrlSchema = z.object({
  url: z.string().describe("WebSocket URL to connect to"),
});

export const sessionIdSchema = z.object({
  sessionId: z.string().describe("Session ID"),
});