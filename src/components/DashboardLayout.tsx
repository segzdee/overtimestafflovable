import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import {
  LayoutDashboard,
  Users,
  Building2,
  CalendarDays,
  DollarSign,
  Bell,
  Settings,
  ChevronRight,
  Search,
  Clock,
  FileText,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const getMenuItems = () => {
    switch (user?.role) {
      case 'agency':
        return [
          { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
          { icon: Users, label: "Worker Roster", path: "/workers" },
          { icon: Building2, label: "Clients", path: "/clients" },
          { icon: CalendarDays, label: "Shift Management", path: "/shifts" },
          { icon: DollarSign, label: "Finance", path: "/finance" },
          { icon: Bell, label: "Announcements", path: "/announcements" },
          { icon: Settings, label: "Settings", path: "/settings" },
        ];
      case 'company':
        return [
          { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
          { icon: CalendarDays, label: "Shift Posts", path: "/shifts" },
          { icon: Users, label: "Applicants", path: "/applicants" },
          { icon: DollarSign, label: "Payments", path: "/payments" },
          { icon: FileText, label: "Work Reports", path: "/reports" },
          { icon: Bell, label: "Announcements", path: "/announcements" },
          { icon: Settings, label: "Settings", path: "/settings" },
        ];
      case 'shift-worker':
        return [
          { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
          { icon: Clock, label: "Availability", path: "/availability" },
          { icon: Search, label: "Find Shifts", path: "/find-shifts" },
          { icon: ChevronRight, label: "Performance", path: "/performance" },
          { icon: DollarSign, label: "Earnings", path: "/earnings" },
          { icon: Bell, label: "Notifications", path: "/notifications" },
          { icon: Settings, label: "Settings", path: "/settings" },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();
  const portalType = user?.role === 'agency' ? 'Agency Portal' : 
                    user?.role === 'company' ? 'Business Portal' : 
                    'Staff Portal';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white shadow-sm"
        >
          {sidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-[#0B4A3F] text-white transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:relative",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <Logo />
        </div>
        <div className="px-3 py-2">
          <p className="text-sm text-white/60 px-3 mb-4">{portalType}</p>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-white/70 hover:text-white hover:bg-white/10",
                  "focus:bg-white/10 focus:text-white",
                  "active:bg-white/10 active:text-white"
                )}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "min-h-screen transition-all duration-200 ease-in-out",
        "lg:ml-64"
      )}>
        <div className="p-4 sm:p-6 lg:p-8">
          <div className={cn("animate-in", className)}>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
