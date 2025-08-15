import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInForm } from "@/components/signin-form";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="h-screen w-full">
      <Authenticated>
        <Outlet />
        <TanStackRouterDevtools />
      </Authenticated>

      <Unauthenticated>
        <SignInForm />
      </Unauthenticated>
    </div>
  ),
});
