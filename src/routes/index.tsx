
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import publicRoutes from "./public.routes";
import privateRoutes from "./private.routes";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

// Create the router with all routes
export const router = createBrowserRouter([
  ...publicRoutes,
  ...privateRoutes,
]);

// Main router component with error handling and suspense
export default function AppRouter() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<div className="flex h-screen items-center justify-center"><Spinner /></div>}>
        <RouterProvider router={router} />
      </Suspense>
    </ErrorBoundary>
  );
}
