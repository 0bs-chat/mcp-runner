FROM ubuntu:22.04

# Avoid interactive prompts (e.g., tzdata) and set timezone
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=UTC

RUN ln -fs /usr/share/zoneinfo/$TZ /etc/localtime && \
  echo $TZ > /etc/timezone

# Install dependencies non-interactively
RUN apt-get update && \
  apt-get -y upgrade \
    -o Dpkg::Options::="--force-confdef" \
    -o Dpkg::Options::="--force-confold" && \
  apt-get install -y \
    tzdata \
    locales \
    ca-certificates \
    coreutils \
    util-linux \
    bsdutils \
    file \
    openssl \
    libssl-dev \
    ssh \
    wget \
    patch \
    sudo \
    htop \
    dstat \
    vim \
    tmux \
    curl \
    git \
    jq \
    zsh \
    ksh \
    gcc \
    g++ \
    xz-utils \
    build-essential \
    expect \
    bash-completion && \
  rm -rf /var/lib/apt/lists/*

# Configure a default UTF-8 locale (non-interactive)
RUN sed -i 's/# en_US.UTF-8/en_US.UTF-8/' /etc/locale.gen && \
  locale-gen en_US.UTF-8 && \
  update-locale LANG=en_US.UTF-8
ENV LANG=en_US.UTF-8
ENV LC_ALL=en_US.UTF-8

# NVM/Node setup
ENV NVM_DIR=/root/.nvm
ENV NODE_VERSION=18

RUN apt-get update && apt-get install -y curl && \
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash && \
    . $NVM_DIR/nvm.sh && \
    nvm install $NODE_VERSION && \
    nvm use $NODE_VERSION && \
    nvm alias default $NODE_VERSION && \
    npm install -g bun

ENV NODE_PATH=$NVM_DIR/$NODE_VERSION/lib/node_modules
ENV PATH=$NVM_DIR/$NODE_VERSION/bin:$PATH

# Install Astral UV
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/
RUN . $NVM_DIR/nvm.sh && \
    nvm use default && \
    echo "Bunx is available:" && \
    bunx --version && \
    echo "Bun is available:" && \
    bun --version

ENV MCP_COMMAND="bunx -y github-repo-mcp"
ENV IDLE_TIMEOUT_MINS=15
ENV OAUTH_TOKEN="sheesh"
EXPOSE 8000
CMD ["/bin/bash", "-c", ". $NVM_DIR/nvm.sh && nvm use default && bunx -y supergateway --stdio '${MCP_COMMAND}' --port 8000 --base-url http://0.0.0.0:8000 --ssePath /sse --messagePath /message --oauth2Bearer '${OAUTH_TOKEN}' --healthEndpoint /healthz"]

# sudo docker build -t mantrakp04/mcprunner:v1 -f services/mcps/Dockerfile . --push
# sudo docker run -it -e MCP_COMMAND="git clone https://github.com/0bs-chat/mcp-runner.git && cd mcp-runner/vibz && bash start.sh" -p 8000:8000 -p 3000:3000 -p 8080:8080 -p 6790:6790 mantrakp04/mcprunner:latest