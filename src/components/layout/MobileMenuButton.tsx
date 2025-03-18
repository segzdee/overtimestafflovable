
import React from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface MobileMenuButtonProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function MobileMenuButton({ sidebarOpen, setSidebarOpen }: MobileMenuButtonProps) {
  return (
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
  );
}
