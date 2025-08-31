FROM python:3.12-slim-bookworm

# Copy uv and uvx from the official image
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/*

COPY . .

RUN uv sync

EXPOSE 8000

CMD ["uv", "run", "main.py"]
# cd services/mcps/py_exec/ && docker build -t registry.fly.io/bitter-leaf-7106 . --push
# sudo docker run -p 8000:8000 registry.fly.io/bitter-leaf-7106