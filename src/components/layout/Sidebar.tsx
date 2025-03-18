
import React from "react";
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
  Search,
  Clock,
  FileText,
  LogOut,
  User,
  MessageSquare,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
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
import { Badge } from "@/components/ui/badge";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [notifications] = React.useState(3);
  
  const getMenuItems = () => {
    switch (user?.role) {
      case 'agency':
        return [
          { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard/agency" },
          { icon: Users, label: "Worker Roster", path: "/dashboard/agency/workers" },
          { icon: Building2, label: "Clients", path: "/dashboard/agency/clients" },
          { icon: CalendarDays, label: "Shift Management", path: "/dashboard/agency/shifts" },
          { icon: DollarSign, label: "Finance", path: "/dashboard/agency/finance" },
          { icon: Bell, label: "Announcements", path: "/dashboard/agency/announcements" },
          { icon: Settings, label: "Settings", path: "/dashboard/agency/settings" },
        ];
      case 'company':
        return [
          { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard/company" },
          { icon: CalendarDays, label: "Shift Posts", path: "/dashboard/company/shifts" },
          { icon: Users, label: "Applicants", path: "/dashboard/company/applicants" },
          { icon: DollarSign, label: "Payments", path: "/dashboard/company/payments" },
          { icon: FileText, label: "Work Reports", path: "/dashboard/company/reports" },
          { icon: Bell, label: "Announcements", path: "/dashboard/company/announcements" },
          { icon: Settings, label: "Settings", path: "/dashboard/company/settings" },
        ];
      case 'shift-worker':
      default:
        return [
          { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard/shift-worker" },
          { icon: CalendarDays, label: "My Shifts", path: "/dashboard/shift-worker/shifts" },
          { icon: DollarSign, label: "My Earnings", path: "/dashboard/shift-worker/earnings" },
          { icon: Search, label: "Find Shifts", path: "/dashboard/shift-worker/find-shifts" },
          { icon: Building2, label: "Companies", path: "/dashboard/shift-worker/companies" },
          { icon: Users, label: "Teams", path: "/dashboard/shift-worker/teams" },
          { icon: MessageSquare, label: "Messages", path: "/dashboard/shift-worker/messages", badge: notifications },
          { icon: User, label: "Profile", path: "/dashboard/shift-worker/profile" },
          { icon: Settings, label: "Settings", path: "/dashboard/shift-worker/settings" },
        ];
      case 'admin':
        return [
          { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard/admin" },
          { icon: Users, label: "User Management", path: "/dashboard/admin/users" },
          { icon: Building2, label: "Organizations", path: "/dashboard/admin/organizations" },
          { icon: FileText, label: "Reports", path: "/dashboard/admin/reports" },
          { icon: Bell, label: "System Alerts", path: "/dashboard/admin/alerts" },
          { icon: Settings, label: "System Settings", path: "/dashboard/admin/settings" },
        ];
    }
  };

  const menuItems = getMenuItems();
  const portalType = user?.role === 'agency' ? 'Agency Portal' : 
                    user?.role === 'company' ? 'Business Portal' : 
                    user?.role === 'shift-worker' ? 'Staff Portal' : 
                    user?.role === 'admin' ? 'Admin Portal' :
                    'Staff Portal';

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className={cn(
      "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-all duration-300 ease-in-out lg:translate-x-0",
      "backdrop-blur-lg backdrop-filter",
      sidebarOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="h-20 flex items-center justify-center border-b border-gray-100">
        <Logo className="h-8 transition-transform duration-200 hover:scale-105" />
        <span className="ml-2 font-semibold text-lg">ShiftMate</span>
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
                "w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg",
                isActive(item.path)
                  ? "bg-primary/10 text-primary"
                  : "text-[#525f7f] hover:text-primary hover:bg-[#f6f9fc]",
                "transition-all duration-200 hover:translate-x-1",
                "active:scale-95"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn(
                  "h-5 w-5", 
                  isActive(item.path) ? "text-primary" : "text-gray-400"
                )} />
                {item.label}
              </div>
              {item.badge && (
                <Badge variant="default" className="bg-primary text-white">
                  {item.badge}
                </Badge>
              )}
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
              <p className="text-sm font-medium">{user?.name || "Staff Member"}</p>
              <p className="text-xs text-muted-foreground">{user?.role || "Shift Worker"}</p>
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
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/dashboard/shift-worker/profile")}>
                <User className="mr-2 h-4 w-4" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/dashboard/shift-worker/settings")}>
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
  );
}
