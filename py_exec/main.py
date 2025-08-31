import mimetypes
from typing import Dict, List
from fastmcp import FastMCP
from autogen_core import CancellationToken
from autogen_core.code_executor import CodeBlock
from autogen_ext.code_executors.jupyter import JupyterCodeExecutor
from fastmcp.utilities.types import Image
from starlette.requests import Request
from starlette.responses import FileResponse, JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
import os

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

mcp = FastMCP("Demo")

os.makedirs("./data", exist_ok=True)
executors: Dict[str, JupyterCodeExecutor] = {}

async def get_executor(session_id: str) -> JupyterCodeExecutor:
  """
  Retrieve or create a JupyterCodeExecutor for this session.
  """
  if session_id not in executors:
      executor = JupyterCodeExecutor(kernel_name="python3", timeout=60, output_dir="./data")
      await executor.start()
      executors[session_id] = executor
  return executors[session_id]

@mcp.tool()
async def execute_code(code: str, session_id: str):
  """
  Args:
    code: The Python code to execute.
    session_id: A unique readable task based string identifier. (ex: "ubisoft_rpg_global_sales_analysis")

  Executes a Python code block in a sandboxed Jupyter environment for the specified session.

  - Returns: Standard output/error as text, plus any generated images.
  - Output files are saved in the './data' directory.

  Pre-installed libraries include:
    matplotlib, numpy, seaborn, plotly, pandas, bokeh, scipy, pillow,
    scikit-learn, requests, pytest, sympy, ffmpeg-python

  To install additional libraries, use: uv pip install <library>

  Use the `list_files` tool to get download links for files in the output directory.
  """
  if not code.strip():
    raise Exception("Code must not be empty.")

  executor = await get_executor(session_id)
  cancel_token = CancellationToken()
  code_block = CodeBlock(code=code, language="python")

  try:
    result = await executor.execute_code_blocks([code_block], cancel_token)
  except Exception as e:
    raise Exception(f"Execution error: {e}")

  response: List[dict] = []

  response.append(result.output)

  for path in result.output_files:
    mime_type, _ = mimetypes.guess_type(str(path))
    if mime_type and mime_type.startswith("image/"):
      response.append(Image(path))

  return response

@mcp.tool()
async def stop_executor(session_id: str):
  """
  Stops the JupyterCodeExecutor for this session.
  """
  if session_id in executors:
    await executors[session_id].stop()
    del executors[session_id]
    return "Executor stopped."
  else:
    return "Executor not found."

@mcp.tool()
async def list_files():
  """
  Lists the download links for the files in the output directory.
  """
  return list(map(lambda x: f"{os.getenv('HOST', 'http://localhost:8000')}/data/{x}", os.listdir("./data")))

@mcp.custom_route("/data/{filename}", methods=["GET"])
async def serve_data_file(request: Request):
    filename = request.path_params["filename"]
    file_path = f"./data/{filename}"
    if not os.path.isfile(file_path):
        return JSONResponse({"error": "File not found"}, status_code=404)
    return FileResponse(file_path)

@mcp.custom_route("/healthz", methods=["GET"])
async def health_check(request: Request):
    return JSONResponse({"status": "ok"})

if __name__ == "__main__":
  app = mcp.http_app(transport="http")
  app.add_middleware(TokenAuthMiddleware)
  import uvicorn
  uvicorn.run(app, host="0.0.0.0", port=8000)