import { WebSocketServer } from "ws";
import { isPortInUse, killProcessOnPort } from "./utils/port";

export async function createWebSocketServer(
  port: number = 8080,
): Promise<WebSocketServer> {
  console.log("Creating WebSocket server on port", port);
  killProcessOnPort(port);
  while (await isPortInUse(port)) {
    console.log("Port is in use, waiting for it to be free");
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  console.log("Port is free, creating WebSocket server");
  return new WebSocketServer({ port });
}