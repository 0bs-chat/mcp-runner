import { WebSocketServer } from "ws";
import { execSync } from "node:child_process";
import net from "node:net";

export async function isPortInUse(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", () => resolve(true)); // Port is still in use
    server.once("listening", () => {
      server.close(() => resolve(false)); // Port is free
    });
    server.listen(port);
  });
}

export function killProcessOnPort(port: number) {
  try {
    if (process.platform === "win32") {
      execSync(
        `FOR /F "tokens=5" %a in ('netstat -ano ^| findstr :${port}') do taskkill /F /PID %a`,
      );
    } else {
      // First check if there are any processes on the port
      const processes = execSync(`lsof -ti:${port}`, { encoding: 'utf8' }).trim();
      if (processes) {
        // Only kill if there are actually processes to kill
        execSync(`lsof -ti:${port} | xargs kill -9`);
        console.log(`Killed processes on port ${port}`);
      } else {
        console.log(`No processes found on port ${port}`);
      }
    }
  } catch (error: any) {
    // Don't treat "no processes found" as an error
    if (error.status === 1 && error.stderr?.includes("Usage:")) {
      console.log(`No processes found on port ${port}`);
    } else {
      console.error(`Failed to kill process on port ${port}:`, error.message);
    }
  }
}

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