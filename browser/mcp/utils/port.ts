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
      try {
        const result = execSync(`lsof -ti:${port}`, { encoding: 'utf8' }).trim();
        if (result) {
          execSync(`kill -9 ${result}`);
        }
      } catch (lsofError) {
        // lsof returns exit code 1 when no processes are found, which is normal
        // Only re-throw if it's a different kind of error
        if (lsofError instanceof Error && lsofError.message.includes('Command failed: lsof')) {
          const execError = lsofError as any;
          if (execError.status !== 1) {
            throw lsofError;
          }
          // Status 1 means no processes found, which is fine
        } else {
          throw lsofError;
        }
      }
    }
  } catch (error) {
    console.error(`Failed to kill process on port ${port}:`, error);
  }
}