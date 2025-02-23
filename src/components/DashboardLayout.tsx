
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Link, useNavigate } from "react-router-dom";
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
import { useAuth } from "@/contexts/AuthContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const getMenuItems = () => {
    switch (user?.role) {
      case 'agency':
        return [
          { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard/agency" },
          { icon: Users, label: "Worker Roster", path: "/workers" },
          { icon: Building2, label: "Clients", path: "/clients" },
          { icon: CalendarDays, label: "Shift Management", path: "/shifts" },
          { icon: DollarSign, label: "Finance", path: "/finance" },
          { icon: Bell, label: "Announcements", path: "/announcements" },
          { icon: Settings, label: "Settings", path: "/settings" },
        ];
      case 'company':
        return [
          { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard/company" },
          { icon: CalendarDays, label: "Shift Posts", path: "/shifts" },
          { icon: Users, label: "Applicants", path: "/applicants" },
          { icon: DollarSign, label: "Payments", path: "/payments" },
          { icon: FileText, label: "Work Reports", path: "/reports" },
          { icon: Bell, label: "Announcements", path: "/announcements" },
          { icon: Settings, label: "Settings", path: "/settings" },
        ];
      case 'shift-worker':
        return [
          { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard/shift-worker" },
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Fixed Header */}
      <header className="h-16 bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="h-full max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
            <Link to="/" className="flex items-center">
              <Logo />
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link to="/find-shifts">
              <Button variant="ghost">Find Extra Shifts</Button>
            </Link>
            <Link to="/find-staff">
              <Button variant="ghost">Find Extra Staff</Button>
            </Link>
            {user ? (
              <Button 
                variant="ghost"
                onClick={() => logout()}
              >
                Logout
              </Button>
            ) : (
              <Link to="/register">
                <Button
                  variant="default"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Sign up
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar - Fixed on desktop, overlay on mobile */}
        <aside 
          className={cn(
            "fixed lg:relative lg:flex flex-shrink-0",
            "h-[calc(100vh-4rem)] w-64",
            "bg-[#0B4A3F] z-40",
            "transition-transform duration-200 ease-in-out",
            "lg:translate-x-0",
            !sidebarOpen && "-translate-x-full"
          )}
        >
          <div className="flex flex-col h-full">
            <div className="h-16 flex items-center px-6 border-b border-white/10">
              <p className="text-sm text-white/60">{portalType}</p>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-4">
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <Link 
                    key={item.label}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start text-white/70 hover:text-white hover:bg-white/10",
                        "focus:bg-white/10 focus:text-white"
                      )}
                    >
                      <item.icon className="mr-3 h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-h-[calc(100vh-4rem)] bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <div className={cn("animate-in", className)}>
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-8 text-sm text-gray-600">
            <Link to="/terms" className="hover:text-gray-900">Terms</Link>
            <Link to="/privacy" className="hover:text-gray-900">Privacy</Link>
            <Link to="/contact" className="hover:text-gray-900">Contact</Link>
            <Link to="/blog" className="hover:text-gray-900">Blog</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
