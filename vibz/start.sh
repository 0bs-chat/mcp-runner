#!/bin/bash

# Configuration
export BASE_DIR="./data"
export DATA_DIR="./mnt/data"
export TEMPLATE_DIR="templates/convex-tanstackrouter-shadcn"

# Install required packages
apt-get update && apt-get install -y expect

# Setup template and project structure
echo "Setting up project environment..."

# Backup existing data directory if present
if [ -d "$BASE_DIR" ]; then
    backup_name="$BASE_DIR.bak.$(date +%s)"
    mv "$BASE_DIR" "$backup_name"
    echo "Backed up existing data directory to $backup_name"
fi

# Copy template to data directory
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

# Start Convex dev server
echo "Starting Convex dev server..."
expect -c '
  spawn bunx convex dev --local
  expect "Choose a name:"
  send "\r"
  expect "? Continue? (Y/n)"
  send "\r"
  interact
' &
CONVEX_PID=$!

# Wait for Convex dev server to be ready
echo "Waiting for Convex dev server to be ready..."
sleep 5

# Start Convex auth (after dev server is ready)
echo "Setting up Convex auth..."
expect -c '
  spawn bunx @convex-dev/auth --skip-git-check --web-server-url http://localhost:3000
  expect "Overwrite them?"
  send "\r"
  expect "Ready to continue?"
  send "\r"
  interact
' &
AUTH_PID=$!

# Wait for auth setup to complete
echo "Waiting for auth setup to complete..."
sleep 5

# Start bun dev server
echo "Starting bun dev server..."
bun dev &
DEV_PID=$!

# Start VS Code server
echo "Starting VS Code server..."
cd ..
bun run code-server --auth none --port 8080 "$BASE_DIR" &
CODE_SERVER_PID=$!

echo "Background services started:"
echo "  - Convex dev (PID: $CONVEX_PID)"
echo "  - Convex auth (PID: $AUTH_PID)"
echo "  - Bun dev (PID: $DEV_PID)"
echo "  - VS Code server (PID: $CODE_SERVER_PID)"

# Start the main Python MCP server
echo "Starting vibz MCP server..."
uv run main.py