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
    bash-completion \
    cmake \
    unzip \
    screen \
    nginx \
    gettext \
    && \
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

# Install Astral UV
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/
RUN . $NVM_DIR/nvm.sh && \
  nvm use default && \
  echo "Bunx is available:" && \
  bunx --version && \
  echo "Bun is available:" && \
  bun --version

# Configuration
ENV BASE_DIR=/mnt
ENV DATA_DIR=/mnt/data
ENV TEMPLATE_DIR=/mcp-runner/vibz/templates/convex-tanstackrouter-shadcn

# Clone & build convex
RUN git config --global user.email "vibz@0bs.chat" && \
  git config --global user.name "VibzBot"

RUN cd / && sleep 1 &&git clone https://github.com/0bs-chat/mcp-runner.git && \
  cd /mcp-runner/vibz && \
  . $NVM_DIR/nvm.sh && \
  nvm use default && \
  uv sync && \
  curl -fsSL https://code-server.dev/install.sh | sh && \
  bun i && \
  cp -r "$TEMPLATE_DIR/." "$BASE_DIR" && \
  cd "$BASE_DIR" && \
  bun i && \
  git init && \
  echo "Template copied and git repository initialized"

WORKDIR /mcp-runner/vibz
CMD /bin/bash -c 'source $NVM_DIR/nvm.sh && git pull && nvm use default && bun run start.ts'
# docker build -t registry.fly.io/still-smoke-7835:v2 -f services/mcps/vibz/Dockerfile . --push
# sudo docker run -it -p 80:80 -e CONVEX_DEPLOY_KEY=$CONVEX_DEPLOY_KEY -e OAUTH_TOKEN=test -e FLY_MACHINE_ID=t123 registry.fly.io/still-smoke-7835