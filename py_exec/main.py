import mimetypes
from typing import Dict, List
from mcp.server.fastmcp import FastMCP
from autogen_core import CancellationToken
from autogen_core.code_executor import CodeBlock
from autogen_ext.code_executors.jupyter import JupyterCodeExecutor
from mcp.server.fastmcp.utilities.types import Image
from starlette.requests import Request
from starlette.responses import FileResponse, JSONResponse
import os

mcp = FastMCP("Demo", host="0.0.0.0", port=8000)
os.makedirs("./data", exist_ok=True)
# In-memory map of session_id → JupyterCodeExecutor
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

if __name__ == "__main__":
  mcp.run(transport="sse")