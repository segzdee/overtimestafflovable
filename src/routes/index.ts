
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import publicRoutes from "./public.routes";
import privateRoutes from "./private.routes";

// Create the router with all routes
export const router = createBrowserRouter([
  ...publicRoutes,
  ...privateRoutes,
]);

// Main router component
export default function AppRouter() {
  return <RouterProvider router={router} />;
}
