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

# Install Rust
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain stable && \
    . $HOME/.cargo/env && \
    rustup default stable && \
    rustup update

# Clone & build convex
RUN git clone https://github.com/get-convex/convex-backend && \
    cd convex-backend && \
    . $HOME/.cargo/env && \
    cargo run -p keybroker --bin generate_key -- convex-self-hosted  $(cargo run -p keybroker --bin generate_secret) > ../.env.local && \
    cd .. && \
    wget https://github.com/get-convex/convex-backend/releases/download/precompiled-2025-08-04-b972983/convex-local-backend-x86_64-unknown-linux-gnu.zip && \
    unzip convex-local-backend-x86_64-unknown-linux-gnu.zip && \
    rm convex-local-backend-x86_64-unknown-linux-gnu.zip && \
    git clone https://github.com/0bs-chat/mcp-runner.git

WORKDIR /mcp-runner/vibz
CMD ["./start.sh"]
# sudo docker build -t mantrakp04/vibz:latest -f services/mcps/vibz/Dockerfile . --push
# sudo docker run -it -p 8000:8000 -p 3000:3000 -p 8080:8080 -p 6790:6790 mantrakp04/vibz:latest