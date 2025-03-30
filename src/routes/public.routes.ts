import { RouteObject } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import HomePage from "../features/home/components/HomePage";

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { path: "/", element: <HomePage /> },
    ],
  },
];

export default publicRoutes;
