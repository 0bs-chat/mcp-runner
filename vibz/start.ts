import { writeFileSync, existsSync, readFileSync } from "fs";
import { exec, execSync } from "child_process";
import { generateKeyPair, exportPKCS8, exportJWK } from "jose";

const CONVEX_DEPLOY_KEY = process.env.CONVEX_DEPLOY_KEY;

if (!CONVEX_DEPLOY_KEY) {
  throw new Error("CONVEX_DEPLOY_KEY must be set in environment");
}

function checkConvexDeployKey(): boolean {
  const envPath = `${process.env.BASE_DIR}/.env.local`;

  if (!existsSync(envPath)) {
    return false;
  }

  try {
    const envContent = readFileSync(envPath, "utf-8");
    return envContent.includes("CONVEX_DEPLOY_KEY=");
  } catch (error) {
    return false;
  }
}

function checkViteFlyMachineId(): boolean {
  const envPath = `${process.env.BASE_DIR}/.env.local`;

  if (!existsSync(envPath)) {
    return false;
  }

  try {
    const envContent = readFileSync(envPath, "utf-8");
    return envContent.includes("VITE_FLY_MACHINE_ID=");
  } catch (error) {
    return false;
  }
}

function startServer() {
  const codeServerProcess = exec(
    `code-server --auth none --port 8080 --host 0.0.0.0 "${process.env.BASE_DIR}"`,
    { cwd: "/mcp-runner/vibz" },
  );
  codeServerProcess.stdout?.pipe(process.stdout, { end: false });
  codeServerProcess.stderr?.pipe(process.stderr, { end: false });

  const devServerProcess = exec(`bun dev`, { cwd: process.env.BASE_DIR });
  devServerProcess.stdout?.pipe(process.stdout, { end: false });
  devServerProcess.stderr?.pipe(process.stderr, { end: false });

  return {
    codeServerProcess,
    devServerProcess,
  };
}

const excludedFiles = [
  "convex/schema.ts",
  "convex/http.ts",
  "convex/auth.ts",
  "src/routes/index.tsx",
  "package.json",
];

async function main() {
  // 0. Start MCP server and nginx
  const mcpServerProcess = exec(`uv run main.py`, { cwd: "/mcp-runner/vibz" });
  mcpServerProcess.stdout?.pipe(process.stdout, { end: false });
  mcpServerProcess.stderr?.pipe(process.stderr, { end: false });

  const nginxProcess = exec(
    `envsubst '$OAUTH_TOKEN $FLY_MACHINE_ID $FLY_APP_NAME' < nginx.conf.template > /etc/nginx/nginx.conf && nginx -g "daemon off;"`,
    {
      cwd: "/mcp-runner/vibz",
      env: { ...process.env },
    },
  );
  nginxProcess.stdout?.pipe(process.stdout, { end: false });
  nginxProcess.stderr?.pipe(process.stderr, { end: false });

  // 1. Check if CONVEX_DEPLOY_KEY is set
  const hasConvexDeployKey = checkConvexDeployKey();
  if (hasConvexDeployKey) {
    startServer();
    return;
  }
  console.log(
    "CONVEX_DEPLOY_KEY not found in environment or .env.local, executing steps 2-6",
  );

  // 2. Write CONVEX_DEPLOY_KEY and VITE_FLY_MACHINE_ID to .env.local
  const envPath = `${process.env.BASE_DIR}/.env.local`;
  let envContent = `CONVEX_DEPLOY_KEY=${CONVEX_DEPLOY_KEY}`;

  // Check and set VITE_FLY_MACHINE_ID
  const hasViteFlyMachineId = checkViteFlyMachineId();
  if (!hasViteFlyMachineId) {
    const flyMachineId = process.env.FLY_MACHINE_ID || 'default';
    envContent += `\nVITE_FLY_MACHINE_ID=${flyMachineId}`;
  }

  writeFileSync(envPath, envContent);

  // 3. Set environment variables for auth
  execSync("bunx convex env set SITE_URL http://localhost:3000", {
    stdio: "inherit",
    cwd: process.env.BASE_DIR,
  });

  const keys = await generateKeyPair("RS256", {
    extractable: true,
  });
  const privateKey = await exportPKCS8(keys.privateKey);
  const publicKey = await exportJWK(keys.publicKey);
  const jwks = JSON.stringify({ keys: [{ use: "sig", ...publicKey }] });

  execSync(
    `bunx convex env set JWT_PRIVATE_KEY='${privateKey.trimEnd().replace(/\n/g, " ")}'`,
    {
      stdio: "inherit",
      cwd: process.env.BASE_DIR,
    },
  );
  execSync(`bunx convex env set JWKS='${jwks}'`, {
    stdio: "inherit",
    cwd: process.env.BASE_DIR,
  });

  // 4. Commit git changes
  execSync(`git add . ${excludedFiles.map((file) => `:!${file}`).join(" ")}`, {
    stdio: "inherit",
    cwd: process.env.BASE_DIR,
  });
  execSync(`git commit -m "Initial commit"`, {
    stdio: "inherit",
    cwd: process.env.BASE_DIR,
  });
  execSync(`git add .`, { stdio: "inherit", cwd: process.env.BASE_DIR });

  // 5. Start code server in parallel and then start the dev server
  startServer();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
