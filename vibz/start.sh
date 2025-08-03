#!/bin/bash

apt-get update && apt-get install -y expect

# Set up the dev environment
cd templates/convex-tanstackrouter-shadcn
expect -c '
  spawn bunx convex dev --local --once
  expect "Choose a name:"
  send "\r"
  expect "? Continue? (Y/n)"
  send "\r"
  interact
'
expect -c '
  spawn bunx @convex-dev/auth
  expect "Enter the URL where your site is hosted (e.g. https://example.com)"
  send "http://localhost:3000\r"
  interact
'

uv run main.py