import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInForm } from "../components/signin-form";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";


export const Route = createRootRoute({
  component: () => (
    <div className="flex flex-col gap-section">
    <div className="text-center">
      <h1 className="text-5xl font-bold text-primary mb-4">0BS</h1>
      <Authenticated>
        <Outlet />
        <TanStackRouterDevtools />
      </Authenticated>
      <Unauthenticated>
        <p className="text-xl text-secondary">Sign in to get started</p>
      </Unauthenticated>
    </div>

    <Unauthenticated>
      <SignInForm />
    </Unauthenticated>
    </div>
  ),
});
