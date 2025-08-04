#!/bin/bash

cd /convex-backend
. $HOME/.cargo/env
SECRET=$(cargo run -p keybroker --bin generate_secret)
KEY=$(cargo run -p keybroker --bin generate_key -- convex-self-hosted $SECRET)
echo "CONVEX_SELF_HOSTED_ADMIN_KEY='$KEY'" > /.env.local
echo "CONVEX_SELF_HOSTED_URL='http://127.0.0.1:3210'" >> /.env.local

# Start background services
echo "Starting background services..."
cd "$BASE_DIR"
cp /.env.local ${BASE_DIR}/.env.local

# Kill existing screen sessions if they exist
screen -S convex-backend -X quit 2>/dev/null || true
screen -S bun-dev -X quit 2>/dev/null || true
screen -S code-server -X quit 2>/dev/null || true
screen -S mcp-server -X quit 2>/dev/null || true

# Start convex backend in screen session
echo "Starting convex backend in screen session..."
screen -dmS convex-backend bash -c "cd \"$BASE_DIR\" && /convex-local-backend --instance-name convex-self-hosted --instance-secret $SECRET -i 0.0.0.0; exec bash"

bunx convex env set SITE_URL http://127.0.0.1:3000
bun generateKeys.js | bash

# Start bun dev server in screen session
echo "Starting bun dev server in screen session..."
screen -dmS bun-dev bash -c "cd \"$BASE_DIR\" && bun dev --host 0.0.0.0 & bunx convex dev; exec bash"

# Start VS Code server in screen session
echo "Starting VS Code server in screen session..."
screen -dmS code-server bash -c "cd /mcp-runner/vibz && bun run code-server --auth none --port 8080 \"$BASE_DIR\"; exec bash"

# Start MCP server in screen session
echo "Starting MCP server in screen session..."
screen -dmS mcp-server bash -c "cd /mcp-runner/vibz && uv run main.py; exec bash"

wait