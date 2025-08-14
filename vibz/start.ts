import { writeFileSync, existsSync, readFileSync } from "fs";
import { exec, execSync } from "child_process";

// 1. Get CONVEX_ACCESS_TOKEN from environment
const CONVEX_ACCESS_TOKEN = process.env.CONVEX_ACCESS_TOKEN;
if (!CONVEX_ACCESS_TOKEN) {
  throw new Error("CONVEX_ACCESS_TOKEN not set in environment");
}

function checkConvexDeployKey(): boolean {
  const envPath = `${process.env.BASE_DIR}/.env.local`;
  
  if (!existsSync(envPath)) {
    return false;
  }
  
  try {
    const envContent = readFileSync(envPath, 'utf-8');
    return envContent.includes('CONVEX_DEPLOY_KEY=');
  } catch (error) {
    return false;
  }
}

function startCodeServer(): void {
  const codeServerProcess = exec(`code-server --auth none --port 8080 --host 0.0.0.0 "${process.env.BASE_DIR}"`, { cwd: "/mcp-runner/vibz" });
  codeServerProcess.stdout?.pipe(process.stdout, { end: false });
  codeServerProcess.stderr?.pipe(process.stderr, { end: false });
}

function startMcpServer(): void {
  const mcpServerProcess = exec(`uv run main.py`, { cwd: "/mcp-runner/vibz" });
  mcpServerProcess.stdout?.pipe(process.stdout, { end: false });
  mcpServerProcess.stderr?.pipe(process.stderr, { end: false });
}

async function main() {
  const hasConvexDeployKey = checkConvexDeployKey();
  
  if (hasConvexDeployKey) {
    startCodeServer();
    startMcpServer();
    execSync("bun dev", { stdio: "inherit", cwd: process.env.BASE_DIR });
    return;
  }

  console.log("CONVEX_DEPLOY_KEY not found in .env.local, executing steps 2-6");

  // 2. Get team ID
  const tokenDetails = await (await fetch(
    "https://api.convex.dev/v1/token_details",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${CONVEX_ACCESS_TOKEN}`
      },
    }
  )).json();
  const teamId = tokenDetails.teamId;

  // 3. Create project
  const projectRes = await (await fetch(
    `https://api.convex.dev/v1/teams/${teamId}/create_project`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${CONVEX_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        "deploymentType": "dev",
        "projectName": "vibz-mcp-server"
      })
    }
  )).json();
  const devDeploymentName = projectRes.deploymentName;

  // 4. Create deploy key
  const deployKeyRes = await (await fetch(
    `https://api.convex.dev/v1/deployments/${devDeploymentName}/create_deploy_key`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${CONVEX_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        "name": "vibz-mcp-server"
      })
    }
  )).json();
  const deployKey = deployKeyRes.deployKey;

  // 5. Write CONVEX_DEPLOY_KEY to .env.local
  const envPath = `${process.env.BASE_DIR}/.env.local`;
  const envLine = `CONVEX_DEPLOY_KEY=${deployKey}`;
  writeFileSync(envPath, envLine)

  // 6. Configure auth (do not wait for this to finish)
  const authProcess = exec("sleep 2 && bunx @convex-dev/auth --allow-dirty-git-state --web-server-url http://localhost:3000", { cwd: process.env.BASE_DIR });
  authProcess.stdout?.pipe(process.stdout, { end: false });
  authProcess.stderr?.pipe(process.stderr, { end: false });

  // 7. Start code server in parallel and then start the dev server
  startCodeServer();
  startMcpServer();
  execSync("bun dev", { stdio: "inherit", cwd: process.env.BASE_DIR });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});