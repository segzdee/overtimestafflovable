
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
  LogOut,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

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
      case 'admin':
        return [
          { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard/admin" },
          { icon: Users, label: "User Management", path: "/users" },
          { icon: Building2, label: "Organizations", path: "/organizations" },
          { icon: FileText, label: "Reports", path: "/reports" },
          { icon: Bell, label: "System Alerts", path: "/alerts" },
          { icon: Settings, label: "System Settings", path: "/settings" },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();
  const portalType = user?.role === 'agency' ? 'Agency Portal' : 
                    user?.role === 'company' ? 'Business Portal' : 
                    user?.role === 'shift-worker' ? 'Staff Portal' : 
                    user?.role === 'admin' ? 'Admin Portal' :
                    'Portal';

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white shadow-sm hover:scale-105 transition-transform duration-200"
        >
          {sidebarOpen ? (
            <X className="h-6 w-6 transition-transform duration-200 rotate-90" />
          ) : (
            <Menu className="h-6 w-6 transition-transform duration-200" />
          )}
        </Button>
      </div>

      {/* Modern Sidebar */}
      <nav className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-all duration-300 ease-in-out lg:translate-x-0",
        "backdrop-blur-lg backdrop-filter",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-20 flex items-center justify-center border-b border-gray-100">
          <Logo className="h-8 transition-transform duration-200 hover:scale-105" />
        </div>

        <div className="p-4">
          <p className="text-sm font-semibold text-[#8898aa] uppercase mb-4 tracking-wider">{portalType}</p>
          
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg",
                  "text-[#525f7f] hover:text-primary hover:bg-[#f6f9fc]",
                  "transition-all duration-200 hover:translate-x-1",
                  "active:scale-95"
                )}
              >
                <item.icon className="h-5 w-5 text-gray-400 transition-transform duration-200 group-hover:text-primary" />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src="" alt={user?.name || "User"} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user?.name || "User"}</p>
                <p className="text-xs text-muted-foreground">{user?.role || "Role"}</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={() => logout()}>
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className={cn(
        "min-h-screen transition-all duration-300 ease-in-out",
        "lg:ml-64 bg-[#f8f9fc]"
      )}>
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 pb-20 pt-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-white text-2xl font-semibold">{portalType}</h1>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
          <div className={cn(
            "bg-white rounded-lg shadow-sm p-6",
            className
          )}>
            {children}
          </div>
        </div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 lg:hidden z-40 animate-fadeIn backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
