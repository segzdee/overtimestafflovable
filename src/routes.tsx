
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Register from "./pages/register";
import Login from "./pages/login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/verify-email";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";
import RegisterPage from "./components/forms/auth/RegisterPage";

// Import dashboard pages
import AdminDashboard from "./pages/AdminDashboard";
import CompanyDashboard from "./pages/CompanyDashboard";
import AgencyDashboard from "./pages/AgencyDashboard";
import ShiftWorkerDashboard from "./pages/ShiftWorkerDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/register-new",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
  {
    path: "/dashboard/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/company",
    element: (
      <ProtectedRoute allowedRoles={["company"]}>
        <CompanyDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/agency",
    element: (
      <ProtectedRoute allowedRoles={["agency"]}>
        <AgencyDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/shift-worker",
    element: (
      <ProtectedRoute allowedRoles={["shift-worker"]}>
        <ShiftWorkerDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
