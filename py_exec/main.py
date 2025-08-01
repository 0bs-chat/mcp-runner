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

mcp = FastMCP(
  "Python Data Analysis MCP",
  host="0.0.0.0",
  port=8000,
  description="""
A comprehensive Python-based data analysis tool that provides a sandboxed Jupyter environment for executing Python code with extensive data science and analytics capabilities.

## Core Capabilities

This MCP enables sophisticated data analysis workflows through Python execution with pre-installed data science libraries including:
- **Data Manipulation**: pandas, numpy for data processing and analysis
- **Visualization**: matplotlib, seaborn, plotly, bokeh for creating charts and graphs
- **Machine Learning**: scikit-learn for predictive modeling and statistical analysis
- **Scientific Computing**: scipy, sympy for mathematical operations
- **Image Processing**: pillow for image manipulation
- **Web Scraping**: requests for data collection
- **Testing**: pytest for code validation

## Data Analysis Framework

The tool supports comprehensive data analysis following these key phases:

### 1. Data Collection and Exploration
- Import and load datasets from various sources (CSV, JSON, databases, APIs)
- Perform initial data exploration with descriptive statistics
- Identify data types, missing values, and basic patterns

### 2. Deep Dive Analysis
- Break down datasets into smaller, manageable components
- Segment data by categories, time periods, or other relevant factors
- Perform stratified analysis to understand subgroup differences

### 3. Pattern and Trend Examination
- Identify temporal trends, seasonal patterns, and cyclical behaviors
- Detect correlations and relationships between variables
- Apply time series analysis for forecasting

### 4. Statistical Modeling
- Implement regression analysis (linear, logistic, polynomial)
- Perform hypothesis testing (t-tests, chi-square, ANOVA)
- Apply clustering algorithms (K-means, hierarchical clustering)
- Use classification models (random forests, SVM, neural networks)

### 5. Qualitative Analysis
- Text analysis and sentiment analysis
- Content analysis and thematic coding
- Narrative analysis for qualitative data

### 6. Comparative Analysis
- Compare and contrast different datasets or time periods
- Perform A/B testing and experimental analysis
- Benchmark against industry standards or historical data

### 7. Root Cause Analysis
- Identify underlying factors driving observed patterns
- Apply causal inference methods
- Trace relationships through correlation and regression analysis

### 8. Advanced Analytics
- Predictive modeling and forecasting
- Anomaly detection and outlier analysis
- Risk assessment and probability modeling

### 9. Visualization and Communication
- Create compelling visualizations (charts, graphs, dashboards)
- Generate interactive plots for exploration
- Design presentation-ready graphics

### 10. Synthesis and Insights
- Synthesize findings across multiple analyses
- Generate actionable insights and recommendations
- Document assumptions, limitations, and potential biases

## Analysis Best Practices

### SWOT Analysis Framework
- **Strengths**: Identify competitive advantages and positive patterns
- **Weaknesses**: Recognize data quality issues and analytical limitations
- **Opportunities**: Discover potential improvements and growth areas
- **Threats**: Assess risks and potential negative outcomes

### Bias Awareness and Mitigation
- Identify and document potential sources of bias
- Apply techniques to reduce selection bias, confirmation bias
- Consider external factors that may influence results

### Evidence-Based Conclusions
- Support all findings with statistical evidence
- Provide confidence intervals and significance levels
- Document methodology and assumptions clearly

## Usage Guidelines

1. **Session Management**: Each analysis session maintains its own Jupyter kernel with persistent variables
2. **File Output**: Generated files (charts, data exports) are saved to './data' directory
3. **Code Execution**: Execute Python code blocks with full access to data science ecosystem
4. **Error Handling**: Robust error handling with detailed feedback for debugging
5. **Resource Management**: Automatic cleanup of completed sessions

## Key Questions to Address

- What are the main patterns and trends in the data?
- What factors are driving the observed outcomes?
- How do different segments or groups compare?
- What predictions can be made based on historical patterns?
- What are the key insights and actionable recommendations?
- What are the limitations and potential biases in the analysis?

This tool empowers comprehensive data-driven decision making through rigorous statistical analysis, visualization, and insight generation.
""",
)
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