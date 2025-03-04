
import React, { useState } from 'react';
import { Logo } from '@/components/ui/logo';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import MobileMenu from './MobileMenu';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm py-1.5 sm:py-2 sticky top-0 z-20">
      <div className="container mx-auto px-3 sm:px-4 flex justify-between items-center">
        <Logo />
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-1.5 text-green-600 hover:text-green-700 focus:outline-none transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          ) : (
            <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
          )}
        </button>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-3 lg:gap-6">
          <Link to="/find-shifts" className="text-sm lg:text-base text-gray-600 hover:text-purple-600 transition-colors">
            Find Extra Shifts
          </Link>
          <Link to="/find-staff" className="text-sm lg:text-base text-gray-600 hover:text-purple-600 transition-colors">
            Find Extra Staff
          </Link>
          <Link to="/register">
            <Button className="bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm lg:text-base py-1 px-2 sm:py-1.5 sm:px-3 lg:py-2 lg:px-4">Sign up</Button>
          </Link>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && <MobileMenu onLinkClick={() => setMobileMenuOpen(false)} />}
    </header>
  );
};

export default Header;
