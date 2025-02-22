
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Calendar,
  Clock,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  const navigate = useNavigate();
  
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Calendar, label: "Shifts", path: "/shifts" },
    { icon: Clock, label: "Attendance", path: "/attendance" },
    { icon: Users, label: "Staff", path: "/staff" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r">
          <div className="flex flex-col flex-1 min-h-0">
            <div className="flex items-center h-16 flex-shrink-0 px-4 border-b">
              <h1 className="text-xl font-semibold text-brand-900">
                OVERTIMESTAFF
              </h1>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => navigate(item.path)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              ))}
            </nav>
            <div className="p-4 border-t">
              <Button variant="ghost" className="w-full justify-start text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="py-6">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className={cn("animate-in", className)}>
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
