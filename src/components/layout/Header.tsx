
import React from "react";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/auth";

interface HeaderProps {
  notifications: number;
}

export function Header({ notifications }: HeaderProps) {
  const { user } = useAuth();
  
  const portalType = user?.role === 'agency' ? 'Agency Portal' : 
                    user?.role === 'company' ? 'Business Portal' : 
                    user?.role === 'shift-worker' ? 'Staff Portal' : 
                    user?.role === 'admin' ? 'Admin Portal' :
                    'Staff Portal';

  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 pb-20 pt-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-white text-2xl font-semibold">{portalType}</h1>
          <p className="text-white/80 text-sm mt-1">Welcome back, {user?.name || "User"}</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-white hover:bg-white/10 relative">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                {notifications}
              </span>
            )}
          </Button>
          <Avatar className="h-9 w-9 border-2 border-white/50">
            <AvatarImage src="" alt={user?.name || "User"} />
            <AvatarFallback className="bg-primary-700 text-white">
              {user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
