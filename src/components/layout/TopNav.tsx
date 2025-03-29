import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/auth/AuthContext";
import { useDevMode } from "@/contexts/dev/DevModeContext";

interface TopNavProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const TopNav = ({ mobileMenuOpen, setMobileMenuOpen }: TopNavProps) => {
  const navigate = useNavigate();
  const { isAuthenticated, user, signOut } = useAuth();
  const { devMode, selectedRole } = useDevMode();
  const isDevelopment = process.env.NODE_ENV === "development";

  // Navigation handlers
  const handleFindShiftsClick = () => {
    navigate("/live-market");
    setMobileMenuOpen(false);
  };

  const handleFindStaffClick = () => {
    navigate("/find-staff");
    setMobileMenuOpen(false);
  };

  const handleSignUpClick = () => {
    navigate("/register");
    setMobileMenuOpen(false);
  };

  const handleLoginClick = () => {
    navigate("/login");
    setMobileMenuOpen(false);
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate("/");
    setMobileMenuOpen(false);
  };

  const handleSignOutClick = () => {
    signOut();
    setMobileMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center px-4 md:px-6 py-3 bg-white shadow-sm">
      {/* Logo */}
      <button 
        onClick={handleLogoClick} 
        className="flex items-center focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-md"
        aria-label="Go to homepage"
      >
        <span className="font-bold text-xl">
          OVERTIME<span className="text-purple-600">STAFF</span>
        </span>
      </button>
      
      {/* Mobile menu button */}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
        className="lg:hidden text-gray-600"
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-menu"
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Desktop navigation */}
      <nav className="hidden lg:flex items-center gap-6">
        <button 
          onClick={handleFindShiftsClick}
          className="text-gray-700 hover:text-gray-900 transition-colors px-3 py-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          aria-label="Find extra shifts"
        >
          Find Extra Shifts
        </button>
        <button 
          onClick={handleFindStaffClick}
          className="text-gray-700 hover:text-gray-900 transition-colors px-3 py-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          aria-label="Find extra staff"
        >
          Find Extra Staff
        </button>
        
        {/* Developer links that can be conditionally rendered based on environment or user role */}
        {isDevelopment && (
          <div className="text-gray-700">
            <Link to="/implementation-guide" className="hover:text-gray-900 transition-colors px-3 py-2 rounded-md hover:bg-gray-100">
              Implementation Guide
            </Link>
          </div>
        )}

        {/* Authentication buttons */}
        {!isAuthenticated ? (
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost"
              onClick={handleLoginClick}
              className="text-gray-700"
            >
              Login
            </Button>
            <Button 
              onClick={handleSignUpClick} 
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Sign up
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            {devMode && selectedRole && (
              <span className="text-amber-600 text-sm bg-amber-100 px-2 py-1 rounded-md">
                Dev Mode: {selectedRole}
              </span>
            )}
            <Button 
              variant="ghost" 
              onClick={handleProfileClick}
              className="text-gray-600 flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              {user?.name || "Profile"}
            </Button>
            <Button 
              variant="ghost" 
              onClick={handleSignOutClick}
              className="text-gray-600 flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </div>
        )}
      </nav>

      {/* Mobile menu (off-canvas) */}
      {mobileMenuOpen && (
        <div 
          id="mobile-menu" 
          className="lg:hidden fixed inset-0 top-16 bg-white z-40 p-4 flex flex-col"
        >
          <div className="flex flex-col gap-2">
            <button
              onClick={handleFindShiftsClick}
              className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded-md text-gray-700"
            >
              Find Extra Shifts
            </button>
            <button
              onClick={handleFindStaffClick}
              className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded-md text-gray-700"
            >
              Find Extra Staff
            </button>
            
            <hr className="my-4" />
            
            {!isAuthenticated ? (
              <>
                <Button 
                  variant="outline"
                  onClick={handleLoginClick}
                  className="w-full justify-start"
                >
                  Login
                </Button>
                <Button 
                  onClick={handleSignUpClick} 
                  className="w-full justify-start bg-green-600 hover:bg-green-700 text-white mt-2"
                >
                  Sign up
                </Button>
              </>
            ) : (
              <>
                {devMode && selectedRole && (
                  <div className="text-amber-600 bg-amber-100 px-4 py-2 rounded-md mb-4">
                    Development Mode: {selectedRole}
                  </div>
                )}
                <Button 
                  variant="outline" 
                  onClick={handleProfileClick}
                  className="w-full justify-start flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  {user?.name || "Profile"}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleSignOutClick}
                  className="w-full justify-start flex items-center gap-2 mt-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default TopNav;