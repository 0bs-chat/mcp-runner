# Instructions

## Rules

- **Template Structure**: Project uses existing template with Convex + TanStack Router + shadcn/ui. Never overwrite these files unless specified by the user.
- **Existing Components**: Reuse existing UI components from `src/components/ui/` instead of creating new ones
- **Project Structure**: Work within existing `src/` directory structure
- **Package Management**: Don't recreate package.json - it already exists in template
- **File Conflicts**: Check existing files before creating new ones
- **Component Naming**: Use kebab-case for file names (e.g., `todo-item.tsx`)
- **TypeScript**: All files must be production-ready with proper types
- **No Placeholders**: Complete, functional code only - no explanatory comments or mocks

## Environment Configuration

- Node available via bun (bunx)
- Python available via uv (uvx)
- Template includes: Convex backend, TanStack Router, shadcn/ui components
- Git initialized in data directory
- Development server runs on bun dev
- TypeScript linting enabled
- Existing project structure in `src/` with components, routes, hooks, lib

## Template Structure

.
├── README.md
├── components.json
├── convex
│   ├── README.md
│   ├── _generated
│   │   ├── api.d.ts
│   │   ├── api.js
│   │   ├── dataModel.d.ts
│   │   ├── server.d.ts
│   │   └── server.js
│   ├── auth.config.ts
│   ├── auth.ts
│   ├── http.ts
│   ├── schema.ts
│   └── tsconfig.json
├── desc.md
├── index.html
├── package.json
├── public
│   ├── favicon.ico
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── components
│   │   ├── signin-form.tsx
│   │   ├── signout-btn.tsx
│   │   └── ui
│   │       ├── accordion.tsx
│   │       ├── alert-dialog.tsx
│   │       ├── alert.tsx
│   │       ├── aspect-ratio.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── breadcrumb.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── chart.tsx
│   │       ├── checkbox.tsx
│   │       ├── collapsible.tsx
│   │       ├── command.tsx
│   │       ├── context-menu.tsx
│   │       ├── dialog.tsx
│   │       ├── drawer.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── hover-card.tsx
│   │       ├── input-otp.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── menubar.tsx
│   │       ├── navigation-menu.tsx
│   │       ├── pagination.tsx
│   │       ├── popover.tsx
│   │       ├── progress.tsx
│   │       ├── radio-group.tsx
│   │       ├── resizable.tsx
│   │       ├── scroll-area.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       ├── slider.tsx
│   │       ├── sonner.tsx
│   │       ├── switch.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       ├── toggle-group.tsx
│   │       ├── toggle.tsx
│   │       └── tooltip.tsx
│   ├── hooks
│   │   └── use-mobile.ts
│   ├── lib
│   │   └── utils.ts
│   ├── logo.svg
│   ├── main.tsx
│   ├── reportWebVitals.ts
│   ├── routeTree.gen.ts
│   ├── routes
│   │   ├── __root.tsx
│   │   └── index.tsx
│   └── styles.css
├── tsconfig.json
└── vite.config.ts

**Note**: These files are template files and are already present, NEVER under any circumstances overwrite these files unless requested by the user.

## First Commit Diff

Following code is already avilable in the template, under no circumstances modify the auth configuration:

### convex/schema.ts

```js
import { defineSchema } from "convex/server";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {};

const schema = defineSchema({
  ...authTables,
  ...applicationTables,
});

export default schema;
```

### convex/http.ts

```js
import { httpRouter } from "convex/server";
import { auth } from "./auth";

const http = httpRouter();

auth.addHttpRoutes(http);

export default http;

```

### convex/auth.ts

```js
import { convexAuth, getAuthUserId } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";
import { Anonymous } from "@convex-dev/auth/providers/Anonymous";
import { query } from "./_generated/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password, Anonymous],
});

export const loggedInUser = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    const user = await ctx.db.get(userId);
    if (!user) {
      return null;
    }
    return user;
  },
});
```

### src/route/index.tsx

```jsx
import { createFileRoute } from "@tanstack/react-router";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SignInForm } from "../components/signin-form";
import { Toaster } from "sonner";
import { SignOutButton } from "../components/signout-btn";

export const Route = createFileRoute("/")({
  component: App,
});

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm h-16 flex justify-between items-center border-b shadow-sm px-4">
        <h2 className="text-xl font-semibold text-primary">0BS</h2>
        <SignOutButton />
      </header>
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md mx-auto">
          <Content />
        </div>
      </main>
      <Toaster />
    </div>
  );
}

function Content() {
  const loggedInUser = useQuery(api.auth.loggedInUser);

  if (loggedInUser === undefined) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-section">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-primary mb-4">0BS</h1>
        <Authenticated>
          <p className="text-xl text-secondary">
            Welcome back, {loggedInUser?.email ?? "friend"}!
          </p>
        </Authenticated>
        <Unauthenticated>
          <p className="text-xl text-secondary">Sign in to get started</p>
        </Unauthenticated>
      </div>

      <Unauthenticated>
        <SignInForm />
      </Unauthenticated>
    </div>
  );
}
```

### package.json

```json
{
  "name": "convex-tanstackrouter-shadcn",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --port 3000 & bunx convex dev",
    "start": "vite --port 3000",
    "build": "vite build && tsc",
    "serve": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "@auth/core": "0.37.0",
    "@convex-dev/auth": "^0.0.88",
    "@hookform/resolvers": "^5.2.1",
    "@radix-ui/react-accordion": "^1.2.11",
    "@radix-ui/react-alert-dialog": "^1.1.14",
    "@radix-ui/react-aspect-ratio": "^1.1.7",
    "@radix-ui/react-avatar": "^1.1.10",
    "@radix-ui/react-checkbox": "^1.3.2",
    "@radix-ui/react-collapsible": "^1.1.11",
    "@radix-ui/react-context-menu": "^2.2.15",
    "@radix-ui/react-dialog": "^1.1.14",
    "@radix-ui/react-dropdown-menu": "^2.1.15",
    "@radix-ui/react-hover-card": "^1.1.14",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-menubar": "^1.1.15",
    "@radix-ui/react-navigation-menu": "^1.2.13",
    "@radix-ui/react-popover": "^1.1.14",
    "@radix-ui/react-progress": "^1.1.7",
    "@radix-ui/react-radio-group": "^1.3.7",
    "@radix-ui/react-scroll-area": "^1.2.9",
    "@radix-ui/react-select": "^2.2.5",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slider": "^1.3.5",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.2.5",
    "@radix-ui/react-tabs": "^1.1.12",
    "@radix-ui/react-toggle": "^1.1.9",
    "@radix-ui/react-toggle-group": "^1.1.10",
    "@radix-ui/react-tooltip": "^1.2.7",
    "@tailwindcss/vite": "^4.0.6",
    "@tanstack/react-router": "^1.130.2",
    "@tanstack/router-devtools": "^1.130.13",
    "@tanstack/router-plugin": "^1.121.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "convex": "^1.25.4",
    "date-fns": "^4.1.0",
    "embla-carousel-react": "^8.6.0",
    "input-otp": "^1.4.2",
    "lucide-react": "^0.536.0",
    "next-themes": "^0.4.6",
    "react": "^19.0.0",
    "react-day-picker": "^9.8.1",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.62.0",
    "react-resizable-panels": "^3.0.4",
    "recharts": "2.15.4",
    "sonner": "^2.0.6",
    "tailwind-merge": "^3.0.2",
    "tailwindcss": "^4.0.6",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^1.1.2",
    "zod": "^4.0.14"
  },
  "devDependencies": {
    "@testing-library/dom": "^10.4.0",
    "@testing-library/react": "^16.2.0",
    "@types/react": "^19.0.8",
    "@types/react-dom": "^19.0.3",
    "@vitejs/plugin-react": "^4.3.4",
    "jsdom": "^26.0.0",
    "typescript": "^5.7.2",
    "vite": "^6.3.5",
    "vitest": "^3.0.5",
    "web-vitals": "^4.2.4"
  }
}
```

# TanStack Router

## File-Based Routing

### Directory Structure

- Place route files in `src/routes/` directory
- Use `index.tsx` for index routes
- Use `route.tsx` for layout routes
- Use `$paramName.tsx` for dynamic routes
- Use `$.tsx` for catch-all routes

### File Naming Conventions

- `__root.tsx` - Root route configuration
- `index.tsx` - Index routes (matches parent path exactly)
- `route.tsx` - Layout routes (renders at specified path)
- `$paramName.tsx` - Dynamic routes with parameters
- `$.tsx` - Catch-all routes for 404 handling
- `_pathlessLayout/` - Pathless layout directories

### Route File Structure

#### Basic Route

```typescript
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/path/')({
  component: () => <div>Route Component</div>,
  loader: () => ({ data: 'example' }),
  validateSearch: (search) => ({ query: search.query || '' }),
})
```

#### Dynamic Route with Parameters

```typescript
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$postId/")({
  component: PostDetail,
  loader: ({ params }) => fetchPost(params.postId),
  validateParams: (params) => ({ postId: params.postId }),
});
```

#### Layout Route

```typescript
import { createFileRoute } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  component: () => (
    <div>
      <nav>Dashboard Navigation</nav>
      <Outlet />
    </div>
  ),
})
```

#### Index Route

```typescript
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/")({
  component: PostsList,
  loader: () => fetchPosts(),
});
```

## Route Configuration

### Route Options

- `path` - URL path pattern
- `component` - React component to render
- `loader` - Data loading function
- `validateSearch` - Search parameter validation
- `errorComponent` - Error boundary component
- `pendingComponent` - Loading component
- `notFoundComponent` - 404 component

### Dynamic Routes

- Use `$paramName` syntax for dynamic segments
- Access params via `useParams()` hook
- Validate params with `validateParams` function

### Layout Routes

- Create layout routes with `route.tsx` files
- Use `<Outlet />` to render child routes
- Nest layouts by creating nested directories

## Navigation & Links

### Link Component

- Use `<Link>` component for navigation
- Access route with `useNavigate()` hook
- Use `useRouter()` for router instance

### Programmatic Navigation

#### Basic Navigation

```typescript
const navigate = useNavigate();

// Navigate to route
navigate({ to: "/path" });

// Navigate with params
navigate({ to: "/posts/$postId", params: { postId: "123" } });

// Navigate with search params
navigate({ to: "/search", search: { query: "term" } });
```

#### Navigation with History

```typescript
// Navigate and replace current history entry
navigate({ to: "/path", replace: true });

// Navigate with specific history behavior
navigate({ to: "/path", from: "/previous" });
```

#### Link Component Usage

```typescript
import { Link } from '@tanstack/react-router'

// Basic link
<Link to="/posts">Posts</Link>

// Link with params
<Link to="/posts/$postId" params={{ postId: '123' }}>
  View Post
</Link>

// Link with search params
<Link to="/search" search={{ query: 'term', page: 1 }}>
  Search
</Link>

// Active link styling
<Link
  to="/posts"
  className="[&.active]:font-bold [&.active]:text-blue-600"
>
  Posts
</Link>
```

### Active Link Styling

- Use `[&.active]:font-bold` for active link styling
- Access active state via `useMatch()` hook

## Data Loading & Caching

### Loader Functions

#### Basic Loader

```typescript
export const Route = createFileRoute("/posts/")({
  component: PostsList,
  loader: async () => {
    const posts = await fetchPosts();
    return { posts };
  },
});
```

#### Loader with Parameters

```typescript
export const Route = createFileRoute("/posts/$postId/")({
  component: PostDetail,
  loader: async ({ params }) => {
    const post = await fetchPost(params.postId);
    return { post };
  },
});
```

#### Loader with Search Params

```typescript
export const Route = createFileRoute("/search/")({
  component: SearchResults,
  loader: async ({ search }) => {
    const results = await searchPosts(search.query);
    return { results, query: search.query };
  },
  validateSearch: (search) => ({ query: search.query || "" }),
});
```

### Caching Strategy

#### Route-Level Caching

```typescript
export const Route = createFileRoute("/posts/")({
  component: PostsList,
  loader: async () => {
    const posts = await fetchPosts();
    return { posts };
  },
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 10 * 60 * 1000, // 10 minutes
});
```

#### Router-Level Caching

```typescript
const router = createRouter({
  routeTree,
  defaultStaleTime: 5 * 60 * 1000,
  defaultGcTime: 10 * 60 * 1000,
  defaultPreloadStaleTime: 30 * 1000,
});
```

### React Query Integration

#### Setup with Query Client

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
```

#### Using Queries in Components

```typescript
import { useQuery } from '@tanstack/react-query'

function PostsList() {
  const { data: posts } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })

  return (
    <div>
      {posts?.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
```

## Search Parameters

### Parameter Validation

#### Basic Search Validation

```typescript
export const Route = createFileRoute("/search/")({
  component: SearchResults,
  validateSearch: (search) => ({
    query: search.query || "",
    page: Number(search.page) || 1,
    sort: search.sort || "relevance",
  }),
});
```

#### Advanced Search Validation

```typescript
import { z } from "zod";

const searchSchema = z.object({
  query: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  sort: z.enum(["relevance", "date", "title"]).default("relevance"),
  filters: z.record(z.string()).optional(),
});

export const Route = createFileRoute("/search/")({
  component: SearchResults,
  validateSearch: (search) => searchSchema.parse(search),
});
```

### Search Parameter Updates

#### Basic Updates

```typescript
const search = useSearch();
const navigate = useNavigate();

// Update search params
navigate({
  search: (prev) => ({ ...prev, page: prev.page + 1 }),
});

// Set specific search params
navigate({
  search: { query: "new term", page: 1 },
});
```

#### Search Parameter Hooks

```typescript
import { useSearch, useNavigate } from '@tanstack/react-router'

function SearchFilters() {
  const search = useSearch({ from: '/search' })
  const navigate = useNavigate()

  const updateFilter = (key: string, value: string) => {
    navigate({
      search: (prev) => ({ ...prev, [key]: value }),
      replace: true,
    })
  }

  return (
    <div>
      <input
        value={search.query}
        onChange={(e) => updateFilter('query', e.target.value)}
        placeholder="Search..."
      />
      <select
        value={search.sort}
        onChange={(e) => updateFilter('sort', e.target.value)}
      >
        <option value="relevance">Relevance</option>
        <option value="date">Date</option>
        <option value="title">Title</option>
      </select>
    </div>
  )
}
```

# Convex guidelines

## Function guidelines

### New function syntax

- ALWAYS use the new function syntax for Convex functions. For example:
  `typescript
    import { query } from "./_generated/server";
    import { v } from "convex/values";
    export const f = query({
        args: {},
        returns: v.null(),
        handler: async (ctx, args) => {
        // Function body
        },
    });
    `

### Http endpoint syntax

- HTTP endpoints are defined in `convex/http.ts` and require an `httpAction` decorator. For example:
  `typescript
    import { httpRouter } from "convex/server";
    import { httpAction } from "./_generated/server";
    const http = httpRouter();
    http.route({
        path: "/echo",
        method: "POST",
        handler: httpAction(async (ctx, req) => {
        const body = await req.bytes();
        return new Response(body, { status: 200 });
        }),
    });
    `
- HTTP endpoints are always registered at the exact path you specify in the `path` field. For example, if you specify `/api/someRoute`, the endpoint will be registered at `/api/someRoute`.

### Validators

- Below is an example of an array validator:
  ```typescript
  import { mutation } from "./\_generated/server";
  import { v } from "convex/values";

                            export default mutation({
                            args: {
                                simpleArray: v.array(v.union(v.string(), v.number())),
                            },
                            handler: async (ctx, args) => {
                                //...
                            },
                            });
                            ```

- Below is an example of a schema with validators that codify a discriminated union type:
  ```typescript
  import { defineSchema, defineTable } from "convex/server";
  import { v } from "convex/values";

                            export default defineSchema({
                                results: defineTable(
                                    v.union(
                                        v.object({
                                            kind: v.literal("error"),
                                            errorMessage: v.string(),
                                        }),
                                        v.object({
                                            kind: v.literal("success"),
                                            value: v.number(),
                                        }),
                                    ),
                                )
                            });
                            ```

- Always use the `v.null()` validator when returning a null value. Below is an example query that returns a null value:
  ```typescript
  import { query } from "./\_generated/server";
  import { v } from "convex/values";

                                  export const exampleQuery = query({
                                    args: {},
                                    returns: v.null(),
                                    handler: async (ctx, args) => {
                                        console.log("This query returns a null value");
                                        return null;
                                    },
                                  });
                                  ```

- Here are the valid Convex types along with their respective validators:
  Convex Type | TS/JS type | Example Usage | Validator for argument validation and schemas | Notes |
  | ----------- | ------------| -----------------------| -----------------------------------------------| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
  | Id | string | `doc._id` | `v.id(tableName)` | |
  | Null | null | `null` | `v.null()` | JavaScript's `undefined` is not a valid Convex value. Functions the return `undefined` or do not return will return `null` when called from a client. Use `null` instead. |
  | Int64 | bigint | `3n` | `v.int64()` | Int64s only support BigInts between -2^63 and 2^63-1. Convex supports `bigint`s in most modern browsers. |
  | Float64 | number | `3.1` | `v.number()` | Convex supports all IEEE-754 double-precision floating point numbers (such as NaNs). Inf and NaN are JSON serialized as strings. |
  | Boolean | boolean | `true` | `v.boolean()` |
  | String | string | `"abc"` | `v.string()` | Strings are stored as UTF-8 and must be valid Unicode sequences. Strings must be smaller than the 1MB total size limit when encoded as UTF-8. |
  | Bytes | ArrayBuffer | `new ArrayBuffer(8)` | `v.bytes()` | Convex supports first class bytestrings, passed in as `ArrayBuffer`s. Bytestrings must be smaller than the 1MB total size limit for Convex types. |
  | Array | Array] | `[1, 3.2, "abc"]` | `v.array(values)` | Arrays can have at most 8192 values. |
  | Object | Object | `{a: "abc"}` | `v.object({property: value})` | Convex only supports "plain old JavaScript objects" (objects that do not have a custom prototype). Objects can have at most 1024 entries. Field names must be nonempty and not start with "$" or "_". |
| Record      | Record      | `{"a": "1", "b": "2"}` | `v.record(keys, values)`                       | Records are objects at runtime, but can have dynamic keys. Keys must be only ASCII characters, nonempty, and not start with "$" or "\_". |

### Function registration

- Use `internalQuery`, `internalMutation`, and `internalAction` to register internal functions. These functions are private and aren't part of an app's API. They can only be called by other Convex functions. These functions are always imported from `./_generated/server`.
- Use `query`, `mutation`, and `action` to register public functions. These functions are part of the public API and are exposed to the public Internet. Do NOT use `query`, `mutation`, or `action` to register sensitive internal functions that should be kept private.
- You CANNOT register a function through the `api` or `internal` objects.
- ALWAYS include argument and return validators for all Convex functions. This includes all of `query`, `internalQuery`, `mutation`, `internalMutation`, `action`, and `internalAction`. If a function doesn't return anything, include `returns: v.null()` as its output validator.
- If the JavaScript implementation of a Convex function doesn't have a return value, it implicitly returns `null`.

### Function calling

- Use `ctx.runQuery` to call a query from a query, mutation, or action.
- Use `ctx.runMutation` to call a mutation from a mutation or action.
- Use `ctx.runAction` to call an action from an action.
- ONLY call an action from another action if you need to cross runtimes (e.g. from V8 to Node). Otherwise, pull out the shared code into a helper async function and call that directly instead.
- Try to use as few calls from actions to queries and mutations as possible. Queries and mutations are transactions, so splitting logic up into multiple calls introduces the risk of race conditions.
- All of these calls take in a `FunctionReference`. Do NOT try to pass the callee function directly into one of these calls.
- When using `ctx.runQuery`, `ctx.runMutation`, or `ctx.runAction` to call a function in the same file, specify a type annotation on the return value to work around TypeScript circularity limitations. For example,
  ```
  export const f = query({
  args: { name: v.string() },
  returns: v.string(),
  handler: async (ctx, args) => {
  return "Hello " + args.name;
  },
  });

                            export const g = query({
                              args: {},
                              returns: v.null(),
                              handler: async (ctx, args) => {
                                const result: string = await ctx.runQuery(api.example.f, { name: "Bob" });
                                return null;
                              },
                            });
                            ```

### Function references

- Function references are pointers to registered Convex functions.
- Use the `api` object defined by the framework in `convex/_generated/api.ts` to call public functions registered with `query`, `mutation`, or `action`.
- Use the `internal` object defined by the framework in `convex/_generated/api.ts` to call internal (or private) functions registered with `internalQuery`, `internalMutation`, or `internalAction`.
- Convex uses file-based routing, so a public function defined in `convex/example.ts` named `f` has a function reference of `api.example.f`.
- A private function defined in `convex/example.ts` named `g` has a function reference of `internal.example.g`.
- Functions can also registered within directories nested within the `convex/` folder. For example, a public function `h` defined in `convex/messages/access.ts` has a function reference of `api.messages.access.h`.

### Api design

- Convex uses file-based routing, so thoughtfully organize files with public query, mutation, or action functions within the `convex/` directory.
- Use `query`, `mutation`, and `action` to define public functions.
- Use `internalQuery`, `internalMutation`, and `internalAction` to define private, internal functions.

### Pagination

- Paginated queries are queries that return a list of results in incremental pages.
- You can define pagination using the following syntax:

                            ```ts
                            import { v } from "convex/values";
                            import { query, mutation } from "./_generated/server";
                            import { paginationOptsValidator } from "convex/server";
                            export const listWithExtraArg = query({
                                args: { paginationOpts: paginationOptsValidator, author: v.string() },
                                handler: async (ctx, args) => {
                                    return await ctx.db
                                    .query("messages")
                                    .filter((q) => q.eq(q.field("author"), args.author))
                                    .order("desc")
                                    .paginate(args.paginationOpts);
                                },
                            });
                            ```
                            Note: `paginationOpts` is an object with the following properties:
                            - `numItems`: the maximum number of documents to return (the validator is `v.number()`)
                            - `cursor`: the cursor to use to fetch the next page of documents (the validator is `v.union(v.string(), v.null())`)

- A query that ends in `.paginate()` returns an object that has the following properties: - page (contains an array of documents that you fetches) - isDone (a boolean that represents whether or not this is the last page of documents) - continueCursor (a string that represents the cursor to use to fetch the next page of documents)

## Validator guidelines

- `v.bigint()` is deprecated for representing signed 64-bit integers. Use `v.int64()` instead.
- Use `v.record()` for defining a record type. `v.map()` and `v.set()` are not supported.

## Schema guidelines

- Always define your schema in `convex/schema.ts`.
- Always import the schema definition functions from `convex/server`:
- System fields are automatically added to all documents and are prefixed with an underscore. The two system fields that are automatically added to all documents are `_creationTime` which has the validator `v.number()` and `_id` which has the validator `v.id(tableName)`.
- Always include all index fields in the index name. For example, if an index is defined as `["field1", "field2"]`, the index name should be "by_field1_and_field2".
- Index fields must be queried in the same order they are defined. If you want to be able to query by "field1" then "field2" and by "field2" then "field1", you must create separate indexes.

## Typescript guidelines

- You can use the helper typescript type `Id` imported from './\_generated/dataModel' to get the type of the id for a given table. For example if there is a table called 'users' you can use `Id<'users'>` to get the type of the id for that table.
- If you need to define a `Record` make sure that you correctly provide the type of the key and value in the type. For example a validator `v.record(v.id('users'), v.string())` would have the type `Record<Id<'users'>, string>`. Below is an example of using `Record` with an `Id` type in a query:
  ```ts
  import { query } from "./\_generated/server";
  import { Doc, Id } from "./\_generated/dataModel";

                    export const exampleQuery = query({
                        args: { userIds: v.array(v.id("users")) },
                        returns: v.record(v.id("users"), v.string()),
                        handler: async (ctx, args) => {
                            const idToUsername: Record<Id<"users">, string> = {};
                            for (const userId of args.userIds) {
                                const user = await ctx.db.get(userId);
                                if (user) {
                                    users[user._id] = user.username;
                                }
                            }

                            return idToUsername;
                        },
                    });
                    ```

- Be strict with types, particularly around id's of documents. For example, if a function takes in an id for a document in the 'users' table, take in `Id<'users'>` rather than `string`.
- Always use `as const` for string literals in discriminated union types.
- When using the `Array` type, make sure to always define your arrays as `const array: Array<T> = [...];`
- When using the `Record` type, make sure to always define your records as `const record: Record<KeyType, ValueType> = {...};`
- Always add `@types/node` to your `package.json` when using any Node.js built-in modules.

## Full text search guidelines

- A query for "10 messages in channel '#general' that best match the query 'hello hi' in their body" would look like:

const messages = await ctx.db
.query("messages")
.withSearchIndex("search_body", (q) =>
q.search("body", "hello hi").eq("channel", "#general"),
)
.take(10);

## Query guidelines

- Do NOT use `filter` in queries. Instead, define an index in the schema and use `withIndex` instead.
- Convex queries do NOT support `.delete()`. Instead, `.collect()` the results, iterate over them, and call `ctx.db.delete(row._id)` on each result.
- Use `.unique()` to get a single document from a query. This method will throw an error if there are multiple documents that match the query.
- When using async iteration, don't use `.collect()` or `.take(n)` on the result of a query. Instead, use the `for await (const row of query)` syntax.

### Ordering

- By default Convex always returns documents in ascending `_creationTime` order.
- You can use `.order('asc')` or `.order('desc')` to pick whether a query is in ascending or descending order. If the order isn't specified, it defaults to ascending.
- Document queries that use indexes will be ordered based on the columns in the index and can avoid slow table scans.

## Mutation guidelines

- Use `ctx.db.replace` to fully replace an existing document. This method will throw an error if the document does not exist.
- Use `ctx.db.patch` to shallow merge updates into an existing document. This method will throw an error if the document does not exist.

## Action guidelines

- Always add `"use node";` to the top of files containing actions that use Node.js built-in modules.
- Never use `ctx.db` inside of an action. Actions don't have access to the database.
- Below is an example of the syntax for an action:
  ```ts
  import { action } from "./\_generated/server";

                    export const exampleAction = action({
                        args: {},
                        returns: v.null(),
                        handler: async (ctx, args) => {
                            console.log("This action does not return anything");
                            return null;
                        },
                    });
                    ```

## Scheduling guidelines

### Cron guidelines

- Only use the `crons.interval` or `crons.cron` methods to schedule cron jobs. Do NOT use the `crons.hourly`, `crons.daily`, or `crons.weekly` helpers.
- Both cron methods take in a FunctionReference. Do NOT try to pass the function directly into one of these methods.
- Define crons by declaring the top-level `crons` object, calling some methods on it, and then exporting it as default. For example,
  ```ts
  import { cronJobs } from "convex/server";
  import { internal } from "./\_generated/api";
  import { internalAction } from "./\_generated/server";

                            const empty = internalAction({
                              args: {},
                              returns: v.null(),
                              handler: async (ctx, args) => {
                                console.log("empty");
                              },
                            });

                            const crons = cronJobs();

                            // Run `internal.crons.empty` every two hours.
                            crons.interval("delete inactive users", { hours: 2 }, internal.crons.empty, {});

                            export default crons;
                            ```

- You can register Convex functions within `crons.ts` just like any other file.
- If a cron calls an internal function, always import the `internal` object from '\_generated/api', even if the internal function is registered in the same file.

## File storage guidelines

- Convex includes file storage for large files like images, videos, and PDFs.
- The `ctx.storage.getUrl()` method returns a signed URL for a given file. It returns `null` if the file doesn't exist.
- Do NOT use the deprecated `ctx.storage.getMetadata` call for loading a file's metadata.

                    Instead, query the `_storage` system table. For example, you can use `ctx.db.system.get` to get an `Id<"_storage">`.
                    ```
                    import { query } from "./_generated/server";
                    import { Id } from "./_generated/dataModel";

                    type FileMetadata = {
                        _id: Id<"_storage">;
                        _creationTime: number;
                        contentType?: string;
                        sha256: string;
                        size: number;
                    }

                    export const exampleQuery = query({
                        args: { fileId: v.id("_storage") },
                        returns: v.null();
                        handler: async (ctx, args) => {
                            const metadata: FileMetadata | null = await ctx.db.system.get(args.fileId);
                            console.log(metadata);
                            return null;
                        },
                    });
                    ```

- Convex storage stores items as `Blob` objects. You must convert all items to/from a `Blob` when using Convex storage.
