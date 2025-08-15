import os
import subprocess
import git
from pathlib import Path
from typing import List, Dict, Set
from mcp.server.fastmcp import FastMCP
from git import Repo

mcp = FastMCP("vibz", host="0.0.0.0", port=8000)

# Base directories - inferred from environment variables
BASE_DIR = os.getenv("BASE_DIR", "./data")
DATA_DIR = os.getenv("DATA_DIR", "./data")
TEMPLATE_DIR = os.getenv("TEMPLATE_DIR", "templates/convex-tanstackrouter-shadcn")

template_description = Path(f"{TEMPLATE_DIR}/desc.md").read_text()

lint_errors: Set[str] = set()

def git_commit_response(project_name: str) -> bool:
    try:
        repo = git.Repo(BASE_DIR)
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
    try:
        subprocess.run(["git", "add", "."], cwd=BASE_DIR)
        result = subprocess.run(
            ["git", "diff", "--staged"],
            cwd=BASE_DIR,
            capture_output=True,
            text=True,
        )
        subprocess.run(["git", "commit", "-m", "user modified code"], cwd=BASE_DIR)
        return result.stdout or "(No uncommitted changes)"
    except Exception as e:
        return f"Error getting diff: {e}"

@mcp.prompt()
def diff_prompt():
    return template_description + f"\n\nDiff: {get_diff()}"

@mcp.tool(description="""
This tool builds a complete, production-ready web application based on your requirements.
It uses a pre-configured template with a Convex backend, TanStack Router for navigation, and shadcn/ui for components.

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
