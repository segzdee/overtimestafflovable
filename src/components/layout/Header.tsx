
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export function Header() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await logout();
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
    <div className="bg-white border-b shadow-sm py-2 px-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <User className="h-4 w-4 text-gray-500 mr-2" />
          <p className="text-gray-700 text-sm">
            Welcome, <span className="font-medium">{user?.name || "User"}</span>
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 border border-gray-200">
            <AvatarImage src="" alt={user?.name || "User"} />
            <AvatarFallback className="bg-primary-700 text-white text-xs">
              {user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          
          <Button 
            onClick={handleLogout}
            variant="ghost" 
            size="sm" 
            className="text-gray-700 hover:bg-gray-100 flex items-center"
          >
            <LogOut className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
