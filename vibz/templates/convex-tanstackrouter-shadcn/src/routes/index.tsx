import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { SignOutButton } from "../components/signout-btn";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const Route = createFileRoute("/")({
  component: App,
});

export default function App() {
  const loggedInUser = useQuery(api.auth.loggedInUser);

  return (
    <div className="h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm h-16 flex justify-between items-center border-b shadow-sm px-4">
        <h2 className="text-xl font-semibold text-primary">0BS</h2>
        <SignOutButton />
      </header>
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md mx-auto">
          <p className="text-xl text-secondary">
            Welcome back, {loggedInUser?.email ?? "friend"}!
          </p>
        </div>
      </main>
      <Toaster />
    </div>
  );
}
