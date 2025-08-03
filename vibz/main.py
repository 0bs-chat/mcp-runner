import os
import shutil
import subprocess
import time
import git
import queue
import threading
from pathlib import Path
from typing import List, Dict, Set
from mcp.server.fastmcp import FastMCP
from pydantic import BaseModel

mcp = FastMCP("vibz", host="0.0.0.0", port=8000)

# Base directories
BASE_DIR = "./data"
DATA_DIR = "./data"
TEMPLATE_DIR = "templates/convex-tanstackrouter-shadcn"

template_description = Path(f"{TEMPLATE_DIR}/desc.md").read_text()
diff = ""

# Lint server state
lint_errors: Set[str] = set()

# Bun dev server state
dev_process = None
dev_output_queue = queue.Queue()
dev_running = False

# VS Code server state
code_server_process = None
code_server_output_queue = queue.Queue()
code_server_running = False

def stream_logs():
    """Stream bun dev output (stdout+stderr) in one thread."""
    global dev_running
    global code_server_running

    if (
        dev_process is None
        or dev_process.stdout is None
        or code_server_process is None
        or code_server_process.stdout is None
    ):
        print("Warning: One or both processes not properly initialized for streaming")
        return

    dev_running = True
    code_server_running = True

    def _dev_reader():
        global dev_running
        try:
            for raw_line in iter(dev_process.stdout.readline, ''):
                line = raw_line.strip()
                if line:
                    msg = f"[DEV] {line}"
                    print(msg)
                    dev_output_queue.put(msg)
        except Exception as e:
            print(f"Error reading dev process output: {e}")
        finally:
            dev_running = False
    
    def _code_server_reader():
        global code_server_running
        try:
            for raw_line in iter(code_server_process.stdout.readline, ''):
                line = raw_line.strip()
                if line:
                    msg = f"[CODE SERVER] {line}"
                    print(msg)
                    code_server_output_queue.put(msg)
        except Exception as e:
            print(f"Error reading code server process output: {e}")
        finally:
            code_server_running = False

    threading.Thread(target=_dev_reader, daemon=True).start()
    threading.Thread(target=_code_server_reader, daemon=True).start()

def setup_template():
    """Copy template into DATA_DIR, init git, bun install & dev."""
    global dev_process
    global code_server_process

    Path(DATA_DIR).mkdir(parents=True, exist_ok=True)

    if os.path.exists(BASE_DIR):
        shutil.move(BASE_DIR, f"{BASE_DIR}.bak.{time.time()}")

    shutil.copytree(TEMPLATE_DIR, BASE_DIR)
    repo = git.Repo.init(BASE_DIR)
    repo.git.add(".")
    repo.index.commit("Initial commit")
    print(f"Template copied to {BASE_DIR}")

    try:
        subprocess.run(["bun", "install"], cwd=BASE_DIR, check=True)

        dev_process = subprocess.Popen(
            ["bun", "dev"],
            cwd=BASE_DIR,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            bufsize=1,
            universal_newlines=True,
            text=True,
        )
        print(f"Started bun dev in background (PID: {dev_process.pid})")

        code_server_process = subprocess.Popen(
            ["bun", "run", "code-server", "--auth", "none", "--port", "8080", BASE_DIR],
            cwd=BASE_DIR,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            bufsize=1,
            universal_newlines=True,
            text=True,
        )
        print(f"Started VS Code server in background (PID: {code_server_process.pid})")

        # Start streaming logs
        stream_logs()
    except subprocess.CalledProcessError as e:
        print(f"Error running bun install: {e}")
    except FileNotFoundError:
        print("bun not found. Please install bun first.")

def git_commit_response(project_name: str) -> bool:
    try:
        repo = git.Repo(DATA_DIR)
        repo.git.add(".")
        repo.index.commit(f"feat: {project_name} - Generated code response")
        return True
    except Exception as e:
        print(f"Error committing to git: {e}")
        return False

def run_lint() -> str:
    result = subprocess.run(
        ["bunx", "tsc", "--noEmit"],
        cwd=BASE_DIR,
        capture_output=True,
        text=True,
    )
    return result.stdout + result.stderr

class CodeFile(BaseModel):
    name: str
    content: str

@mcp.tool(description=template_description + f"\n\nDiff: {diff}" + """
Create a complete code project with multiple files.

Args:
    project_name: str : A descriptive name for the project.
    planning: str : A brief planning statement.
    code: {'name': str, 'content': str}[] : List of code files.
""")
def code_project(project_name: str, planning: str, code: List[Dict[str, str]]):
    try:
        for file in code:
            path = os.path.join(BASE_DIR, file["name"])
            os.makedirs(os.path.dirname(path), exist_ok=True)
            with open(path, "w", encoding="utf-8") as f:
                f.write(file["content"])
        git_commit_response(project_name)
        return run_lint()
    except Exception as e:
        return {"status": "error", "message": str(e)}

@mcp.tool()
def install_packages(packages: List[str]):
    try:
        if not os.path.exists(DATA_DIR):
            setup_template()
        result = subprocess.run(
            ["bun", "install"] + packages, cwd=BASE_DIR, capture_output=True, text=True
        )
        if result.returncode == 0:
            return {"status": "success", "message": f"Installed: {', '.join(packages)}"}
        return {"status": "error", "message": result.stderr, "packages": packages}
    except Exception as e:
        return {"status": "error", "message": str(e), "packages": packages}

if __name__ == "__main__":
    print("Starting vibz MCP server...")
    setup_template()
    mcp.run(transport="sse")
