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
MANDATORY: Create/edit web application files. You MUST provide actual code in the 'code' parameter.

Use this tool to build complete, production-ready web applications using Convex + TanStack Router + shadcn/ui.

Args:
    project_name: str : A descriptive name for the project.
    planning: str : A brief planning statement.
    code: {'name': str, 'content': str, 'type': 'new' | 'edit'}[] : List of code files.

FILE TYPES:
- type: 'new' = Full file content (creates or overwrites)
- type: 'edit' = GNU unified diff patch (modifies existing file)

EDIT TYPE DIFF FORMAT:
--- a/src/components/example.tsx
+++ b/src/components/example.tsx
@@ -10,7 +10,7 @@
 export function Example() {
   const [count, setCount] = useState(0)
   
-  return <div>Count: {count}</div>
+  return <div className="font-bold">Count: {count}</div>
 }

FAIL if code array is empty or contains placeholder text.
""")
def code_project(project_name: str, planning: str, code: List[Dict[str, str]]):
    allow_paths = ["src", "convex", "README.md"]
    exclude_paths = [
        "src/routes/__root.tsx", "src/main.tsx", "src/components/ui", "src/styles.css",
        "convex/auth.ts", "convex/auth.config.ts", "convex/_generated"
    ]
    # Validate that code is actually provided
    if not code or len(code) == 0:
        return {"status": "error", "message": "FAILED: 'code' parameter is required and cannot be empty. You must provide actual file contents."}
    
    for file in code:
        if not file.get("content") or len(file["content"].strip()) < 10:
            return {"status": "error", "message": f"FAILED: File {file.get('name', 'unknown')} has no content. Provide actual working code."}
        if file.get("type", "new") == "new" and ("TODO" in file["content"] or "placeholder" in file["content"].lower()):
            return {"status": "error", "message": f"FAILED: File {file['name']} contains placeholder text. Provide complete working code only."}

    try:
        # Helper predicates for allow/exclude
        def is_allowed(relative_path: str) -> bool:
            norm = Path(relative_path).as_posix()
            for allowed in allow_paths:
                if norm == allowed or norm.startswith(f"{allowed}/"):
                    return True
            return False

        def is_excluded(relative_path: str) -> bool:
            norm = Path(relative_path).as_posix()
            for excluded in exclude_paths:
                if norm == excluded or norm.startswith(f"{excluded}/"):
                    return True
            return False

        files_processed = []
        
        for file in code:
            relative_path = file["name"]
            if not is_allowed(relative_path):
                continue
            if is_excluded(relative_path):
                continue

            file_type = file.get("type", "new")
            
            if file_type == "edit":
                # Apply GNU diff patch
                full_path = os.path.join(BASE_DIR, relative_path)
                if not os.path.exists(full_path):
                    return {"status": "error", "message": f"Cannot apply diff - file does not exist: {relative_path}"}

                # Create temporary patch file
                patch_file = os.path.join(BASE_DIR, ".tmp_patch")
                with open(patch_file, "w", encoding="utf-8") as f:
                    f.write(file["content"])

                # Apply the patch using git apply
                result = subprocess.run(
                    ["git", "apply", "--verbose", patch_file],
                    cwd=BASE_DIR,
                    capture_output=True,
                    text=True
                )
                
                # Clean up temp file
                os.remove(patch_file)
                
                if result.returncode != 0:
                    return {
                        "status": "error", 
                        "message": f"Failed to apply diff to {relative_path}: {result.stderr}"
                    }
                files_processed.append(f"{relative_path} (edited)")
            else:
                # Create/overwrite full file
                path = os.path.join(BASE_DIR, relative_path)
                os.makedirs(os.path.dirname(path), exist_ok=True)
                with open(path, "w", encoding="utf-8") as f:
                    f.write(file["content"])
                files_processed.append(f"{relative_path} (created)")

        git_commit_response(project_name)
        lint_output = run_lint()
        
        return {
            "status": "success",
            "files_processed": files_processed,
            "lint_output": lint_output
        }
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

@mcp.tool(description="""
Read existing file contents to understand current code before making edits.

Args:
    file_path: str : Relative path to file to read
""")
def read_file(file_path: str):
    try:
        full_path = os.path.join(BASE_DIR, file_path)
        if not os.path.exists(full_path):
            return {"status": "error", "message": f"File does not exist: {file_path}"}
        
        with open(full_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        return {
            "status": "success",
            "file_path": file_path,
            "content": content
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    print("Starting vibz MCP server...")
    mcp.run(transport="streamable-http")
