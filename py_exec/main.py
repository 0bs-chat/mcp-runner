import mimetypes
from typing import List
from fastmcp import FastMCP
from autogen_core import CancellationToken
from autogen_core.code_executor import CodeBlock
from autogen_ext.code_executors.jupyter import JupyterCodeExecutor
from fastmcp.utilities.types import Image, Audio
import os

mcp = FastMCP("Demo")

os.makedirs("/mnt", exist_ok=True)

# Create single executor instance at startup
executor = JupyterCodeExecutor(kernel_name="python3", timeout=60, output_dir="/mnt")

@mcp.tool()
async def execute_code(code: str):
  """
  Args:
    code: The Python code to execute.

  Executes a Python code block in a sandboxed Jupyter environment.

  - Returns: Standard output/error as text, plus any generated images and audio files.
  - Output files are saved in the '/mnt' directory.

  Pre-installed libraries include:
    matplotlib, numpy, seaborn, plotly, pandas, bokeh, scipy, pillow,
    scikit-learn, requests, pytest, sympy, ffmpeg-python

  To install additional libraries, use: uv pip install <library>
  """
  if not code.strip():
    raise Exception("Code must not be empty.")

  cancel_token = CancellationToken()
  code_block = CodeBlock(code=code, language="python")

  try:
    await executor.start()
    result = await executor.execute_code_blocks([code_block], cancel_token)
  except Exception as e:
    raise Exception(f"Execution error: {e}")

  response: List[dict] = []

  response.append(result.output)

  for path in result.output_files:
    mime_type, _ = mimetypes.guess_type(str(path))
    if mime_type and mime_type.startswith("image/"):
      response.append(Image(path))
    elif mime_type and mime_type.startswith("audio/"):
      response.append(Audio(path))

  return response

if __name__ == "__main__":
  mcp.run(transport="stdio")