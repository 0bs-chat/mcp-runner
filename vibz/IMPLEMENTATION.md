# vibz MCP Service Implementation

## Overview

The vibz MCP service provides tools for creating and managing code projects based on the Convex + TanStack Router + shadcn/ui template. The service operates with `/mnt` as the base directory and `/mnt/data` as the working directory for project files.

## Features

### 1. Startup Operations

- **Base Directory**: `/mnt` (as specified)
- **Data Directory**: `/mnt/data` (where updated files appear)
- **Template Copy**: On startup, copies the `convex-tanstackrouter-shadcn` template to `/mnt/data`
- **Bun Dev**: Automatically runs `bun dev` in the background

### 2. Tools Implemented

#### `code_project` Tool

- **Purpose**: Creates complete projects based on provided code files and planning
- **Input**: `CodeProject` model with project name, planning, and list of code files
- **Operations**:
  - Ensures `/mnt/data` directory exists
  - Copies template to data directory
  - Creates all specified files with their content
  - Starts `bun dev` in background
  - **Git Commit**: Automatically commits the response to git with descriptive message
- **Output**: Status message with project details

#### `install_packages` Tool

- **Purpose**: Installs npm packages in the project
- **Input**: List of package names
- **Operations**:
  - Ensures data directory exists and template is copied
  - Runs `npm install` with specified packages
  - Returns success/error status with output
- **Output**: Installation status and output

### 3. Git Integration

Every time `code_project` is called, the service:

1. Creates all project files
2. Adds all files to git
3. Commits with message: `"feat: {project_name} - Generated code response"`

## File Structure

```
services/mcps/vibz/
├── main.py              # Main MCP service implementation
├── start.sh             # Startup script for initialization
├── pyproject.toml       # Python dependencies
├── templates/
│   └── convex-tanstackrouter-shadcn/  # Template directory
└── IMPLEMENTATION.md    # This documentation
```

## Dependencies

### Python Dependencies

- `fastmcp>=2.11.0` - MCP server framework
- `gitpython>=3.1.0` - Git operations

### System Requirements

- `bun` - JavaScript runtime
- `npm` - Node.js package manager
- `git` - Version control

## Usage

### Starting the Service

```bash
cd services/mcps/vibz
./start.sh
```

### Manual Startup

```bash
# Install Python dependencies
pip install -e .

# Run the service
python main.py
```

## Tool Examples

### code_project Example

```python
{
  "project_name": "Todo App",
  "planning": "Create a simple todo app with Convex backend and TanStack Router frontend",
  "code": [
    {
      "name": "src/routes/__root.tsx",
      "content": "import { createRootRoute } from '@tanstack/react-router'..."
    },
    {
      "name": "src/routes/index.tsx",
      "content": "import { createFileRoute } from '@tanstack/react-router'..."
    }
  ]
}
```

### install_packages Example

```python
["@tanstack/react-query", "lucide-react", "clsx"]
```

## Directory Operations

### Base Directory: `/mnt`

- Root directory for all operations
- Created automatically if not exists

### Data Directory: `/mnt/data`

- Working directory for project files
- Template is copied here on startup
- All project files are created here
- `bun dev` runs from this directory

## Error Handling

The service includes comprehensive error handling for:

- Directory creation failures
- File write operations
- Git operations
- Package installation
- Process execution

All errors are logged and returned with descriptive messages.

## Background Processes

- `bun dev` runs in background with output redirected to `/tmp/bun-dev.log`
- Process ID is logged for management
- Service continues running even if background process fails

## Security Considerations

- Uses `sudo` for directory creation (if needed)
- Proper file permissions are set
- User ownership is maintained
- Git operations are safe and non-destructive
