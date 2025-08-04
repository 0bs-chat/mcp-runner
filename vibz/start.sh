#!/bin/bash

cd /convex-backend
. $HOME/.cargo/env
SECRET=$(cargo run -p keybroker --bin generate_secret)
KEY=$(cargo run -p keybroker --bin generate_key -- convex-self-hosted $SECRET)
echo "CONVEX_SELF_HOSTED_ADMIN_KEY='$KEY'" > /.env.local
echo "CONVEX_SELF_HOSTED_URL='http://127.0.0.1:3210'" >> /.env.local

cd /mcp-runner/vibz
cp /.env.local ${TEMPLATE_DIR}/.env.local
bun i
backup_name="$BASE_DIR.bak.$(date +%s)"
mv "$BASE_DIR" "$backup_name"
echo "Backed up existing data directory to $backup_name"
cp -r "$TEMPLATE_DIR" "$BASE_DIR"

cd "$BASE_DIR"

# Initialize git repository
git init
git add .
git commit -m "Initial commit"
echo "Template copied and git repository initialized"

# Install dependencies
echo "Installing dependencies..."
bun install

# Start background services
echo "Starting background services..."
/convex-local-backend --instance-name convex-self-hosted --instance-secret $SECRET -i 0.0.0.0 &
BACKEND_PID=$!
sleep 5
bunx convex env set SITE_URL http://127.0.0.1:3000
bun generateKeys.js | bash

echo "Starting bun dev server..."
bun dev & $SERVER_PID=$!

echo "Starting VS Code server..."
cd /mcp-runner/vibz
bun run code-server --auth none --port 8080 "$BASE_DIR" &
CODE_SERVER_PID=$!
uv run main.py & MCP_PID=$!