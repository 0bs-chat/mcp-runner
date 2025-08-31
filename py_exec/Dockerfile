FROM python:3.12-slim-bookworm

# Copy uv and uvx from the official image
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

# Install curl for nvm installation
RUN apt-get update && apt-get install -y ffmpeg curl && rm -rf /var/lib/apt/lists/*

# NVM/Node setup
ENV NVM_DIR=/root/.nvm
ENV NODE_VERSION=18

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash && \
    . $NVM_DIR/nvm.sh && \
    nvm install $NODE_VERSION && \
    nvm use $NODE_VERSION && \
    nvm alias default $NODE_VERSION && \
    npm install -g bun

ENV NODE_PATH=$NVM_DIR/$NODE_VERSION/lib/node_modules
ENV PATH=$NVM_DIR/$NODE_VERSION/bin:$PATH

# Verify bun installation
RUN . $NVM_DIR/nvm.sh && \
    nvm use default && \
    echo "Bun is available:" && \
    bun --version

COPY ./py_exec .
COPY ./supergateway ./supergateway

RUN uv sync

EXPOSE 8000

CMD ["/bin/bash", "-c", ". $NVM_DIR/nvm.sh && nvm use default && bun run ./supergateway/dist/index.js --stdio 'uv run main.py' --auth $OAUTH_TOKEN --base-url http://0.0.0.0:8000 --healthEndpoint /healthz --ssePath /mcp --data_path --data_dir"]
# fly auth docker && cd services/mcps/ && docker build -t registry.fly.io/bitter-leaf-7106 -f py_exec/Dockerfile . --push
# sudo docker run -p 8000:8000 registry.fly.io/bitter-leaf-7106