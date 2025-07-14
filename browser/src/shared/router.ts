// shared/router.ts
import { initTRPC } from '@trpc/server';
import type { SessionInfo, WebSocketStatus, ConsoleLog, ScreenshotResult } from './types';
import {
  selectorSchema,
  typeSchema,
  selectOptionSchema,
  navigateSchema,
  sessionSchema,
  pressKeySchema,
  wsUrlSchema,
  sessionIdSchema,
} from './schemas';

const t = initTRPC.create({
  isServer: false,
  allowOutsideOfServer: true,
});

// Define the router type that will be implemented in background script
export const createAppRouter = <T extends Record<string, any>>(handlers: T) =>
  t.router({
    // Browser automation
    navigate: t.procedure
      .input(navigateSchema)
      .mutation(async ({ input }) => handlers.navigate(input)),

    goBack: t.procedure
      .input(sessionSchema)
      .mutation(async ({ input }) => handlers.goBack(input)),

    goForward: t.procedure
      .input(sessionSchema)
      .mutation(async ({ input }) => handlers.goForward(input)),

    snapshot: t.procedure
      .input(sessionSchema)
      .query(async ({ input }) => handlers.snapshot(input)),

    click: t.procedure
      .input(selectorSchema)
      .mutation(async ({ input }) => handlers.click(input)),

    hover: t.procedure
      .input(selectorSchema)
      .mutation(async ({ input }) => handlers.hover(input)),

    type: t.procedure
      .input(typeSchema)
      .mutation(async ({ input }) => handlers.type(input)),

    selectOption: t.procedure
      .input(selectOptionSchema)
      .mutation(async ({ input }) => handlers.selectOption(input)),

    pressKey: t.procedure
      .input(pressKeySchema)
      .mutation(async ({ input }) => handlers.pressKey(input)),

    getConsoleLogs: t.procedure
      .input(sessionSchema)
      .query(async ({ input }) => handlers.getConsoleLogs(input)),

    screenshot: t.procedure
      .input(sessionSchema)
      .query(async ({ input }) => handlers.screenshot(input)),

    getUrl: t.procedure
      .input(sessionSchema)
      .query(async ({ input }) => handlers.getUrl(input)),

    getTitle: t.procedure
      .input(sessionSchema)
      .query(async ({ input }) => handlers.getTitle(input)),

    // Session management
    getSessions: t.procedure
      .query(async () => handlers.getSessions()),

    closeSession: t.procedure
      .input(sessionIdSchema)
      .mutation(async ({ input }) => handlers.closeSession(input.sessionId)),

    showSession: t.procedure
      .input(sessionIdSchema)
      .mutation(async ({ input }) => handlers.showSession(input.sessionId)),

    hideSession: t.procedure
      .input(sessionIdSchema)
      .mutation(async ({ input }) => handlers.hideSession(input.sessionId)),

    // WebSocket management
    wsConnect: t.procedure
      .mutation(async () => handlers.wsConnect()),

    wsDisconnect: t.procedure
      .mutation(async () => handlers.wsDisconnect()),

    wsGetStatus: t.procedure
      .query(async () => handlers.wsGetStatus()),

    wsSetUrl: t.procedure
      .input(wsUrlSchema)
      .mutation(async ({ input }) => handlers.wsSetUrl(input.url)),
  });

export type AppRouter = ReturnType<typeof createAppRouter>;
