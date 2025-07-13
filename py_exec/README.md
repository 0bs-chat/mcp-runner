# py-exec

A Python execution microservice supporting code execution in a sandboxed Jupyter environment, with support for popular visualization and scientific libraries.

## Features

- Execute Python code blocks in isolated sessions
- Supports visualization libraries: matplotlib, seaborn, plotly, bokeh
- Data science and scientific computing: numpy, pandas, scipy, scikit-learn, sympy
- Image processing: pillow
- HTTP requests: requests
- Testing: pytest

## Requirements

- Python 3.12+
- All dependencies listed in `pyproject.toml`
- [uv](https://github.com/astral-sh/uv) (for running the server)

## Installation

1. Install dependencies:

   ```sh
   uv sync
   ```

   Or use your preferred tool to install from `pyproject.toml`.

2. (Optional) Build and run with Docker (see Dockerfile below).

## Running the Server

To start the server, run:

```sh
uv run main.py
```

This will launch the sse FastAPI MCP server for code execution.

## Docker

See the provided `Dockerfile` for containerized deployment or use `mantrakp04/py_exec:latest`
