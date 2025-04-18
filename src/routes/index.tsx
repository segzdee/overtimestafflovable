
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { AuthProvider } from "@/contexts/auth/AuthContext";
import { RootLayout } from "@/components/layout/RootLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";

// Define all routes in a single place
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "dashboard",
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
]);

// Main router component with error handling and suspense
export default function AppRouter() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <AuthProvider>
        <Suspense fallback={<div className="flex h-screen items-center justify-center"><Spinner /></div>}>
          <RouterProvider router={router} />
        </Suspense>
      </AuthProvider>
    </ErrorBoundary>
  );
}
