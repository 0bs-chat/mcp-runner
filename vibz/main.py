import os
import shutil
import subprocess
import time
import git
import queue
import threading
from pathlib import Path
from typing import List, Set, Dict
from mcp.server.fastmcp import FastMCP
from pydantic import BaseModel

mcp = FastMCP("vibz", host="0.0.0.0", port=8000)

# Base directories
BASE_DIR = "./data"
DATA_DIR = "./data"
TEMPLATE_DIR = "templates/convex-tanstackrouter-shadcn"

template_description = open(f"{TEMPLATE_DIR}/desc.md", "r").read()

diff = ""

# Lint server state
lint_process = None
lint_output_queue = queue.Queue()
lint_errors: Set[str] = set()
lint_thread = None
lint_running = False

# Bun dev server state
dev_process = None
dev_output_queue = queue.Queue()
dev_thread = None
dev_running = False

def stream_dev_logs():
    """Stream bun dev server logs in a separate thread"""
    global dev_process, dev_output_queue, dev_running
    
    if dev_process is None:
        return
    
    dev_running = True
    
    def stream_output(pipe, prefix):
        try:
            for line in iter(pipe.readline, ''):
                if line:
                    log_line = line.strip()
                    if log_line:
                        print(f"[BUN DEV {prefix}] {log_line}")
                        dev_output_queue.put(f"[{prefix}] {log_line}")
        except Exception as e:
            print(f"Error streaming {prefix}: {e}")
    
    # Start streaming stdout and stderr in separate threads
    stdout_thread = threading.Thread(target=stream_output, args=(dev_process.stdout, "STDOUT"))
    stderr_thread = threading.Thread(target=stream_output, args=(dev_process.stderr, "STDERR"))
    
    stdout_thread.daemon = True
    stderr_thread.daemon = True
    
    stdout_thread.start()
    stderr_thread.start()
    
    # Wait for the process to complete
    dev_process.wait()
    dev_running = False

def setup_template():
    """Ensure /mnt/data exists, copy template, initialize git, and run bun dev."""
    global dev_process, dev_thread
    
    # Ensure the /mnt/data directory exists
    Path(DATA_DIR).mkdir(parents=True, exist_ok=True)

    # Copy the template to /mnt/data directory
    if os.path.exists(BASE_DIR):
        shutil.move(BASE_DIR, f"{BASE_DIR}.bak.{time.time()}")
    shutil.copytree(TEMPLATE_DIR, BASE_DIR)
    git.Repo.init(BASE_DIR)
    git.Repo(BASE_DIR).git.add('.')
    git.Repo(BASE_DIR).git.commit('-m', 'Initial commit')
    print(f"Template copied to {BASE_DIR}")

    # Run bun dev in the /mnt/data directory
    try:
        subprocess.run(["bun", "install"], cwd=BASE_DIR, check=True)
        # Start bun dev in the background with streaming
        dev_process = subprocess.Popen(
            ["bun", "dev"], 
            cwd=BASE_DIR, 
            stdout=subprocess.PIPE, 
            stderr=subprocess.PIPE,
            bufsize=1,
            universal_newlines=True
        )
        print(f"Started bun dev in background (PID: {dev_process.pid})")
        
        # Start streaming logs in a separate thread
        dev_thread = threading.Thread(target=stream_dev_logs)
        dev_thread.daemon = True
        dev_thread.start()
        
    except subprocess.CalledProcessError as e:
        print(f"Error running bun install: {e}")
    except FileNotFoundError:
        print("bun not found. Please install bun first.")

def git_commit_response(project_name: str):
    """Commit the response to git"""
    try:
        repo = git.Repo(DATA_DIR)
        
        # Create a commit message
        commit_message = f"feat: {project_name} - Generated code response"
        
        # Add all files
        repo.git.add('.')
        
        # Commit with the message
        repo.index.commit(commit_message)
        
        return True
    except Exception as e:
        print(f"Error committing to git: {e}")
        return False

def run_lint() -> str:
    """Run TypeScript linting using bunx tsc --noEmit and return output string"""
    result = subprocess.run(
        ["bunx", "tsc", "--noEmit"],
        cwd=BASE_DIR,
        capture_output=True,
        text=True
    )
    return result.stdout + result.stderr

class CodeFile(BaseModel):
    name: str
    content: str

@mcp.tool(description=template_description + f'\n\nDiff: {diff}' + """
Create a complete code project with multiple files.

Args:
    project_name: str : A descriptive name for the project (e.g., 'Stopwatch', 'Email Form', 'Dashboard'). Used as the project identifier.
    planning: str : A brief planning statement that outlines the project structure, styling approach, and key considerations before implementation.
    code: {'name': str, 'content': str}[] : List of code files that make up the complete project. Each file should be a complete, functional component or module.
        Each item should have 'name' (filename with extension, must use kebab-case) and 'content' (complete file content as string, production-ready without placeholders or mocks, no explanatory comments).
""")
def code_project(project_name: str, planning: str, code: List[Dict[str, str]]):
    try:
        for file in code:
            file_path = os.path.join(BASE_DIR, file['name'])
            
            # Ensure directory exists
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            
            # Write file content
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(file['content'])
        
        # Add to git
        git_commit_response(project_name)

        # Run and return lint output
        return run_lint()
    except Exception as e:
        return {
            "status": "error",
            "message": f"Error creating project: {str(e)}"
        }

@mcp.tool()
def install_packages(packages: List[str]):
    """
    Installs the specified packages using bun.
    
    Args:
        packages: List of package names to install (e.g., ['@radix-ui/react-dialog', 'lucide-react'])
    """
    try:
        # Ensure we're in the data directory
        if not os.path.exists(DATA_DIR):
            setup_template()
        
        # Install packages using npm
        cmd = ["bun", "install"] + packages
        result = subprocess.run(cmd, cwd=BASE_DIR, capture_output=True, text=True)
        
        if result.returncode == 0:
            return {
                "status": "success",
                "message": f"Successfully installed packages: {', '.join(packages)}",
                "output": result.stdout
            }
        else:
            return {
                "status": "error",
                "message": f"Failed to install packages: {result.stderr}",
                "packages": packages
            }
              
    except Exception as e:
        return {
            "status": "error",
            "message": f"Error installing packages: {str(e)}",
            "packages": packages
        }

# Startup operations
if __name__ == "__main__":
    print("Starting vibz MCP server...")
    setup_template()
    mcp.run(transport="sse")
