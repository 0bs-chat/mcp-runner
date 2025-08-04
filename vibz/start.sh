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
/convex-local-backend --instance-name convex-self-hosted --instance-secret $SECRET -i 0.0.0.0 &
BACKEND_PID=$!
bunx convex env set SITE_URL http://127.0.0.1:3000
bun generateKeys.js | bash

echo "Starting bun dev server..."
bun dev --host 0.0.0.0 & bunx convex dev & SERVER_PID=$!

echo "Starting VS Code server..."
cd /mcp-runner/vibz
bun run code-server --auth none --port 8080 "$BASE_DIR" &
CODE_SERVER_PID=$!
uv run main.py & MCP_PID=$!
tail -f /dev/null