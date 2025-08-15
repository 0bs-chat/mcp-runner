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
from git.exc import InvalidGitRepositoryError, NoSuchPathError

mcp = FastMCP("vibz", host="0.0.0.0", port=8000)

# Base directories - inferred from environment variables
BASE_DIR = os.getenv("BASE_DIR", "./data")
DATA_DIR = os.getenv("DATA_DIR", "./data")
TEMPLATE_DIR = os.getenv("TEMPLATE_DIR", "templates/convex-tanstackrouter-shadcn")

# Read template description safely to avoid startup failures if missing
try:
    template_description = Path(f"{TEMPLATE_DIR}/desc.md").read_text()
except Exception as e:
    template_description = ""

lint_errors: Set[str] = set()

def git_commit_response(project_name: str) -> bool:
    """Stage and commit changes in the project repository.

    Uses BASE_DIR as the repository root to match where the repo is initialized.
    """
    try:
        repo = git.Repo(BASE_DIR)
        repo.git.add(".")
        # Only commit if there are staged changes
        if repo.is_dirty(index=True, working_tree=True, untracked_files=True):
            repo.index.commit(f"feat: {project_name} - Generated code response")
        return True
    except (NoSuchPathError, InvalidGitRepositoryError) as e:
        print(f"Error committing to git (repo not found): {e}")
        return False
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
    """Return a human-readable diff string.

    Preference:
    - If there are at least 2 commits: diff between HEAD~1 and HEAD
    - Else: show working tree diff vs HEAD
    - Fallback: explanatory message
    """
    try:
        repo = Repo(BASE_DIR)
    except (NoSuchPathError, InvalidGitRepositoryError) as e:
        return f"(Diff unavailable: repository not found at {BASE_DIR}: {e})"
    except Exception as e:
        return f"(Diff error: {e})"

    try:
        commits = list(repo.iter_commits("HEAD", max_count=2))
        if len(commits) >= 2:
            return repo.git.diff("HEAD~1", "HEAD") or "(No changes between last two commits)"
    except Exception:
        # If we cannot iterate commits, fall back to working tree diff
        pass

    # Fallback to working tree diff vs HEAD (or empty if none)
    try:
        wt_diff = repo.git.diff()
        return wt_diff or "(No uncommitted changes)"
    except Exception as e:
        return f"(Diff unavailable: {e})"

@mcp.prompt()
def diff_prompt():
    return template_description + f"\n\nDiff: {get_diff()}"

@mcp.tool(description="""
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
