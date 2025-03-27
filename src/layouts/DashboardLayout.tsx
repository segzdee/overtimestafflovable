
import React from "react";
import { Outlet } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
