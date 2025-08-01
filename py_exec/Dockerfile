FROM python:3.12-slim-bookworm

# Copy uv and uvx from the official image
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/*

COPY . .

RUN uv sync

EXPOSE 8000

CMD ["uv", "run", "main.py"]
# docker build -t mantrakp04/py_exec:latest . --push
# docker run -p 8000:8000 mantrakp04/py_exec:latest