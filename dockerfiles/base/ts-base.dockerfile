FROM node:20-slim


WORKDIR /app

# Install common MCP dependencies
RUN npm install -g @modelcontextprotocol/sdk

ENV NODE_ENV=production
