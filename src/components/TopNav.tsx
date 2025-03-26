
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface TopNavProps {
  mobileMenuOpen?: boolean;
  setMobileMenuOpen?: (open: boolean) => void;
}

export default function TopNav({ mobileMenuOpen, setMobileMenuOpen }: TopNavProps) {
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center px-4 sm:px-6 h-14 sm:h-16 bg-white/80 backdrop-blur-sm border-b">
      <Link to="/" className="flex items-center">
        <span className="font-bold text-xl">OVERTIME<span className="text-purple-600">STAFF</span></span>
      </Link>
      
      {setMobileMenuOpen && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="lg:hidden text-gray-600"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      )}

      <nav className="hidden lg:flex items-center gap-6">
        <Link to="/find-shifts" className="text-gray-600 hover:text-gray-900 transition-colors">
          Find Extra Shifts
        </Link>
        <Link to="/find-staff" className="text-gray-600 hover:text-gray-900 transition-colors">
          Find Extra Staff
        </Link>
        <Link to="/login">
          <Button variant="outline" className="mr-2">Sign in</Button>
        </Link>
        <Link to="/register">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">Sign up</Button>
        </Link>
      </nav>
    </header>
  );
}
