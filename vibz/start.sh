#!/bin/bash

# Configuration
export BASE_DIR="${BASE_DIR:-/mnt}"
export DATA_DIR="${DATA_DIR:-/mnt/data}"
export TEMPLATE_DIR="${TEMPLATE_DIR:-templates/convex-tanstackrouter-shadcn}"

# Setup template and project structure
echo "Setting up project environment..."

cd /convex-backend
. $HOME/.cargo/env
cargo run -p keybroker --bin generate_key -- convex-self-hosted  $(cargo run -p keybroker --bin generate_secret) > ../.env.local
cp /.env.local ${TEMPLATE_DIR}/.env.local

cd $BASE_DIR
bun i
backup_name="$BASE_DIR.bak.$(date +%s)"
mv "$BASE_DIR" "$backup_name"
echo "Backed up existing data directory to $backup_name"
cp -r "$TEMPLATE_DIR" "$BASE_DIR"

cd "$BASE_DIR"

# Initialize git repository
git config --global user.email "barrel@0bs.chat"
git config --global user.name "BarrelOfLube"
git init
git add .
git commit -m "Initial commit"
echo "Template copied and git repository initialized"

# Install dependencies
echo "Installing dependencies..."
bun install

# Start background services
echo "Starting background services..."

# Start Convex dev server
echo "Starting Convex dev server..."
expect -c '
  spawn bunx convex dev --local
  expect "Choose a name:"
  send "\r"
  expect "Continue?"
  send "\r"
  expect "Continue?"
  send "Y\r\r"
  interact
' &
CONVEX_PID=$!

sleep 40

echo "Setting up Convex auth..."
expect -c '
  spawn bunx @convex-dev/auth --skip-git-check --web-server-url http://localhost:3000
  expect "Ready to continue?"
  send "\r"
  interact
' &
AUTH_PID=$!

# # Start bun dev server
# echo "Starting bun dev server..."
# bun dev &
# DEV_PID=$!

# # Start VS Code server
# echo "Starting VS Code server..."
# cd ..
# bun run code-server --auth none --port 8080 "$BASE_DIR" &
# CODE_SERVER_PID=$!

# echo "Background services started:"
# echo "  - Convex dev (PID: $CONVEX_PID)"
# echo "  - Convex auth (PID: $AUTH_PID)"
# echo "  - Bun dev (PID: $DEV_PID)"
# echo "  - VS Code server (PID: $CODE_SERVER_PID)"

# # Start the main Python MCP server
# echo "Starting vibz MCP server..."
# ls -la
# uv run main.py