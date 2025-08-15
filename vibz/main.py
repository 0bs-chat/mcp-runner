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
from difflib import unified_diff
from git import Repo

mcp = FastMCP("vibz", host="0.0.0.0", port=8000)

# Base directories - inferred from environment variables
BASE_DIR = os.getenv("BASE_DIR", "./data")
DATA_DIR = os.getenv("DATA_DIR", "./data")
TEMPLATE_DIR = os.getenv("TEMPLATE_DIR", "templates/convex-tanstackrouter-shadcn")

template_description = f"""

Args:
    project_name: str : A descriptive name for the project.
    planning: str : A brief planning statement.
    code: {'name': str, 'content': str}[] : List of code files.

{Path(f"{TEMPLATE_DIR}/desc.md").read_text()}
"""

lint_errors: Set[str] = set()

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

def get_diff() -> str:
    repo = Repo(DATA_DIR)
    diff = unified_diff(
        repo.head.commit.tree.blobs[0].data_stream.read().decode("utf-8"),
        repo.head.commit.tree.blobs[1].data_stream.read().decode("utf-8"),
        fromfile="old",
        tofile="new",
    )
    print(diff)
    return "\n".join(diff)

@mcp.tool(description=template_description + f"\n\nDiff: {get_diff()}" + """
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
    mcp.run(transport="streamable-http")
