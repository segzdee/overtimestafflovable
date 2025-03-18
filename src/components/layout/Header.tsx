
import React from "react";
import { Button } from "@/components/ui/button";
import { Bell, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  notifications: number;
}

export function Header({ notifications }: HeaderProps) {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
      navigate('/login');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: "There was an error logging out",
      });
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-200 pb-16 pt-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex-1">
          <h1 className="text-gray-800 text-xl font-semibold">Dashboard</h1>
          <p className="text-gray-600 text-sm mt-1">Welcome back, {user?.name || "User"}</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-gray-700 hover:bg-gray-200 relative sm:flex hidden">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                {notifications}
              </span>
            )}
          </Button>
          <div className="flex items-center gap-2">
            <Avatar className="h-9 w-9 border-2 border-white/50">
              <AvatarImage src="" alt={user?.name || "User"} />
              <AvatarFallback className="bg-primary-700 text-white">
                {user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <Button 
              onClick={handleLogout}
              variant="ghost" 
              size="sm" 
              className="text-gray-700 hover:bg-gray-200 hidden sm:flex items-center"
            >
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
