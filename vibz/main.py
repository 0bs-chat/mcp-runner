import os
import subprocess
import git
from pathlib import Path
from typing import List, Dict, Set
from fastmcp import FastMCP
from starlette.requests import Request
from starlette.responses import JSONResponse, HTMLResponse
from starlette.middleware.base import BaseHTTPMiddleware
import mimetypes

class TokenAuthMiddleware(BaseHTTPMiddleware):
    """Middleware to verify Bearer token authorization"""
    
    def __init__(self, app):
        super().__init__(app)
        self.oauth_token = os.getenv('OAUTH_TOKEN')

    async def dispatch(self, request: Request, call_next):
        allowed_paths = ["/healthz"]
        if request.url.path in allowed_paths:
            return await call_next(request)

        if self.oauth_token:
          # Check for Authorization header
          auth_header = request.headers.get("Authorization")
          if not auth_header:
              return JSONResponse(
                  {"error": "Authorization header required"}, 
                  status_code=401
              )
          
          # Verify Bearer token format
          if not auth_header.startswith("Bearer "):
              return JSONResponse(
                  {"error": "Invalid authorization format. Expected 'Bearer <token>'"}, 
                  status_code=401
              )
          
          # Extract and verify token
          token = auth_header[7:]  # Remove "Bearer " prefix
          if token != self.oauth_token:
              return JSONResponse(
                  {"error": "Invalid token"}, 
                  status_code=401
              )
          
        # Token is valid, proceed with request
        return await call_next(request)

mcp = FastMCP("vibz")

# Base directories - inferred from environment variables
BASE_DIR = os.getenv("BASE_DIR", "./data")
DATA_DIR = os.getenv("DATA_DIR", "./data")
TEMPLATE_DIR = os.getenv("TEMPLATE_DIR", "templates/convex-tanstackrouter-shadcn")

template_description = Path(f"{TEMPLATE_DIR}/desc.md").read_text()

lint_errors: Set[str] = set()

def git_stage_n_commit_response(commit_message: str) -> bool:
    try:
        repo = git.Repo(BASE_DIR)
        repo.git.add(".")
        repo.git.commit("-m", commit_message)
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
        untracked_result = subprocess.run(
            ["git", "ls-files", "--others", "--exclude-standard"],
            cwd=BASE_DIR,
            capture_output=True,
            text=True,
        )
        untracked_files = untracked_result.stdout.strip().split('\n') if untracked_result.stdout.strip() else []
        
        # Add intent to add for new files
        if untracked_files:
            subprocess.run(["git", "add", "-N"] + untracked_files, cwd=BASE_DIR)
        
        # Get the diff
        result = subprocess.run(
            ["git", "diff"],
            cwd=BASE_DIR,
            capture_output=True,
            text=True,
        )
        
        # Reset intent to add for new files
        if untracked_files:
            subprocess.run(["git", "reset", "--"] + untracked_files, cwd=BASE_DIR)
        return result.stdout or "(No uncommitted changes)"
    except Exception as e:
        return f"Error getting diff: {e}"

@mcp.prompt()
def prompt():
    return template_description + f"\n\nDiff: {get_diff()}"

@mcp.tool(description="""
MANDATORY: Create/edit web application files. You MUST provide actual code in the 'code' parameter.

Use this tool to build complete, production-ready web applications using Convex + TanStack Router + shadcn/ui.

Args:
    project_name: str : A descriptive name for the project.
    planning: str : A brief planning statement.
    code: {'name': str, 'content': str, 'type': 'new' | 'edit'}[] : List of code files.

FILE TYPES:
- type: 'new' = Full file content (creates or overwrites). Use for: new files, substantial changes (>10 lines), replacing empty structures with complex ones, complete rewrites
- type: 'edit' = GNU unified diff patch (modifies existing file). Use for: small targeted changes (<10 lines), fixing specific bugs, adding single functions

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
def code_project(project_name: str, planning: str, code: List[Dict[str, str]], commit_message: str):
    allow_paths = ["src", "convex", "README.md"]
    exclude_paths = [
        "src/routes/__root.tsx", "src/main.tsx", "src/components/ui", "src/styles.css",
        "convex/auth.ts", "convex/auth.config.ts", "convex/_generated"
    ]
    # Validate that code is actually provided
    if not code or len(code) == 0:
        return {"status": "error", "message": "FAILED: 'code' parameter is required and cannot be empty. You must provide actual file contents."}

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
                    # Auto-retry: diff failed, try to reconstruct and overwrite the full file
                    try:
                        # Read the current file
                        with open(full_path, "r", encoding="utf-8") as f:
                            current_content = f.read()
                        
                        # Try to apply the patch manually to reconstruct the intended result
                        # For now, we'll suggest the user switch to 'new' type
                        return {
                            "status": "error", 
                            "message": f"Diff failed for {relative_path}: {result.stderr}. Auto-retry not implemented yet. Use type: 'new' with complete file content instead."
                        }
                    except Exception as e:
                        return {
                            "status": "error", 
                            "message": f"Failed to apply diff to {relative_path} and auto-retry failed: {str(e)}"
                        }
                files_processed.append(f"{relative_path} (edited)")
            else:
                # Create/overwrite full file
                path = os.path.join(BASE_DIR, relative_path)
                os.makedirs(os.path.dirname(path), exist_ok=True)
                with open(path, "w", encoding="utf-8") as f:
                    f.write(file["content"])
                files_processed.append(f"{relative_path} (created)")

        git_stage_n_commit_response(commit_message)
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
    file_paths: str[] : Relative paths to files to read, if you want to read multiple files, just pass in a list of paths
""")
def read_files(file_paths: List[str]):
    results = []
    for file_path in file_paths:
        try:
            full_path = os.path.join(BASE_DIR, file_path)
            if not os.path.exists(full_path):
                results.append({
                    "file_path": file_path,
                    "message": f"File does not exist: {file_path}"
                })
                continue

            mime_type, _ = mimetypes.guess_type(full_path)
            if not mime_type or not mime_type.startswith("text/"):
                results.append({
                    "file_path": file_path,
                    "message": f"File is not a text file (detected mime type: {mime_type})"
                })
                continue

            with open(full_path, "r", encoding="utf-8") as f:
                content = f.read()

            results.append({
                "file_path": file_path,
                "content": content
            })
        except Exception as e:
            results.append({
                "status": "error",
                "file_path": file_path,
                "message": str(e)
            })
    return results

@mcp.custom_route("/healthz", methods=["GET"])
async def health_check(request: Request):
    return JSONResponse({"status": "ok"})

@mcp.custom_route("/dashboard", methods=["GET"])
async def dashboard(request: Request):
    """Serve embedded Convex dashboard"""
    deployment_details = {
        "deploymentName": os.getenv('CONVEX_DEPLOYMENT_NAME'),
        "deploymentUrl": os.getenv('CONVEX_DEPLOYMENT_URL'),
        "adminKey": os.getenv('CONVEX_DEPLOY_KEY')
    }
    
    if not deployment_details:
        return HTMLResponse(
            "<html><body><h1>Dashboard Unavailable</h1><p>No Convex deployment key found.</p></body></html>",
            status_code=503
        )
    
    # Create the embedded dashboard HTML based on Convex documentation
    html_content = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Convex Dashboard</title>
        <style>
            body {{
                margin: 0;
                padding: 0;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
                background-color: #f5f5f5;
            }}
            .dashboard-container {{
                width: 100vw;
                height: 100vh;
                display: flex;
                flex-direction: column;
            }}
            .dashboard-header {{
                background: #1a1a1a;
                color: white;
                padding: 1rem;
                text-align: center;
            }}
            .dashboard-frame {{
                flex: 1;
                border: none;
                background: white;
            }}
            .loading {{
                display: flex;
                justify-content: center;
                align-items: center;
                height: 200px;
                color: #666;
            }}
        </style>
    </head>
    <body>
        <div class="dashboard-container">
            <div class="loading" id="loading">Loading dashboard...</div>
            <iframe
                id="dashboard-frame"
                class="dashboard-frame"
                src="https://dashboard-embedded.convex.dev/data"
                allow="clipboard-write"
                style="display: none;"
            ></iframe>
        </div>
        
        <script>
            const iframe = document.getElementById('dashboard-frame');
            const loading = document.getElementById('loading');
            
            function showDashboard() {{
                loading.style.display = 'none';
                iframe.style.display = 'block';
            }}
            
            function handleMessage(event) {{
                // Wait for the iframe to send a dashboard-credentials-request message
                if (event.data?.type !== "dashboard-credentials-request") {{
                    return;
                }}
                
                iframe.contentWindow?.postMessage(
                    {{
                        type: "dashboard-credentials",
                        adminKey: "{deployment_details['adminKey']}",
                        deploymentUrl: "{deployment_details['deploymentUrl']}",
                        deploymentName: "{deployment_details['deploymentName']}"
                    }},
                    "*"
                );
                
                // Show the dashboard after a short delay to avoid flashing
                setTimeout(showDashboard, 1000);
            }}
            
            window.addEventListener("message", handleMessage);
            
            // Fallback: show dashboard after 3 seconds even if no message received
            setTimeout(showDashboard, 3000);
        </script>
    </body>
    </html>
    """
    
    return HTMLResponse(html_content)

if __name__ == "__main__":
    print("Starting vibz MCP server...")
    app = mcp.http_app(transport="http")
    app.add_middleware(TokenAuthMiddleware)
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
