import { RouteObject } from "react-router-dom";
import PrivateLayout from "../layouts/PrivateLayout";
import DashboardPage from "../features/dashboard/components/DashboardPage";
import AuthGuard from "./guards/AuthGuard";

const privateRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: (
      <AuthGuard>
        <PrivateLayout />
      </AuthGuard>
    ),
    children: [
      { path: "/dashboard", element: <DashboardPage /> },
    ],
  },
];

export default privateRoutes;
