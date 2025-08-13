import { writeFileSync, existsSync, appendFileSync } from "fs";
import { execSync } from "child_process";

// 1. Get CONVEX_ACCESS_TOKEN from environment
const CONVEX_ACCESS_TOKEN = process.env.CONVEX_ACCESS_TOKEN;
if (!CONVEX_ACCESS_TOKEN) {
  throw new Error("CONVEX_ACCESS_TOKEN not set in environment");
}

async function main() {
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
  console.log(devDeploymentName);

  // 5. Create deploy key
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

  // 6. Write CONVEX_DEPLOY_KEY to .env.local
  const envPath = `${process.env.BASE_DIR}/.env.local`;
  const envLine = `CONVEX_DEPLOY_KEY=${deployKey}`;
  if (existsSync(envPath)) {
    appendFileSync(envPath, envLine);
  } else {
    writeFileSync(envPath, envLine);
  }
  console.log(`Wrote CONVEX_DEPLOY_KEY to ${envPath}`);

  execSync("bun dev", { stdio: "inherit", cwd: process.env.BASE_DIR });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});