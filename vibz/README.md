# Vibz MCP

A Model Context Protocol (MCP) server that creates and manages full-stack web applications using Convex, TanStack Router, and shadcn/ui components.

## Overview

Vibz MCP is a development tool that provides an AI-powered code generation service for building complete web applications. It uses a pre-configured template with:

- **Convex** - Backend database and real-time sync
- **TanStack Router** - Type-safe routing
- **shadcn/ui** - Beautiful, accessible UI components
- **React 19** - Latest React features
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling
- **Bun** - Fast JavaScript runtime

## Features

- 🚀 **Instant Project Setup** - Creates complete applications from scratch
- 🎨 **Modern UI Components** - Pre-configured shadcn/ui component library
- 🔄 **Real-time Sync** - Convex backend with live data updates
- 📱 **Type-safe Routing** - TanStack Router for navigation
- 🛠️ **Development Server** - Hot reload with bun dev
- 📦 **Package Management** - Install additional packages on demand
- 🔍 **TypeScript Linting** - Built-in type checking
- 📝 **Git Integration** - Automatic version control

## Installation

### Prerequisites

- Python 3.13 or higher
- [uv](https://docs.astral.sh/uv/) package manager
- [Bun](https://bun.sh/) JavaScript runtime

### Install with uv

```bash
# Clone the repository (if not already done)
git clone --recurse-submodules https://github.com/0bs-chat/zerobs.git
cd services/mcps/vibz

# Install dependencies with uv
uv sync
```

## Usage

### Starting the MCP Server

```bash
# Run the MCP server
uv run main.py
```

### MCP Tools

The server provides two main tools:

#### `code_project`
Creates a complete code project with multiple files.

**Parameters:**
- `project_name` (str): Descriptive name for the project (e.g., 'Stopwatch', 'Email Form', 'Dashboard')
- `planning` (str): Brief planning statement outlining project structure and approach
- `code` (List[Dict]): List of code files with `name` (kebab-case filename) and `content` (complete file content)

**Example:**
```python
{
    "project_name": "Todo App",
    "planning": "Create a todo app with add, complete, and delete functionality using shadcn/ui components",
    "code": [
        {
            "name": "src/routes/todos.tsx",
            "content": "// Complete React component code..."
        }
    ]
}
```

#### `install_packages`
Installs additional packages using bun.

**Parameters:**
- `packages` (List[str]): List of package names to install

**Example:**
```python
{
    "packages": ["@radix-ui/react-dialog", "lucide-react"]
}
```

## Project Structure

The template creates a full-stack application with this structure:

```
.
├── convex/                 # Convex backend functions
│   ├── schema.ts          # Database schema
│   ├── auth.ts            # Authentication
│   └── http.ts            # HTTP endpoints
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # shadcn/ui components
│   │   └── *.tsx         # Custom components
│   ├── routes/           # TanStack Router routes
│   ├── hooks/            # Custom React hooks
│   └── lib/              # Utility functions
├── public/               # Static assets
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## Development

### Running the Development Server

The MCP automatically starts a development server that runs on `http://localhost:3000` with:
- Hot reload for React components
- Convex backend with real-time sync
- TypeScript compilation
- Tailwind CSS processing

### Available Scripts

- `bun dev` - Start development server
- `bun build` - Build for production
- `bun test` - Run tests
- `bunx tsc --noEmit` - Type checking

## Configuration

### Environment Variables

- `MCP_HOST` - Server host (default: 0.0.0.0)
- `MCP_PORT` - Server port (default: 8000)

### Template Customization

The template is located in `templates/convex-tanstackrouter-shadcn/` and includes:
- Pre-configured Convex backend
- Complete shadcn/ui component library
- TanStack Router setup
- Authentication system
- TypeScript configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request
