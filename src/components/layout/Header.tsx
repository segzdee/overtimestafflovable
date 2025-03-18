import React, { useState, useEffect } from 'react';
import { Logo } from '@/components/ui/logo';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import MobileMenu from './MobileMenu';
const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-2' : 'bg-white py-3'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Logo />
        
        {/* Mobile menu button */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label={mobileMenuOpen ? "Close menu" : "Open menu"} className="md:hidden p-2 text-gray-600 hover:text-purple-600 focus:outline-none transition-colors bg-violet-300">
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link to="/find-shifts" className="text-base text-gray-700 hover:text-purple-600 transition-colors font-medium">
            Find Extra Shifts
          </Link>
          <Link to="/find-staff" className="text-base text-gray-700 hover:text-purple-600 transition-colors font-medium">
            Find Extra Staff
          </Link>
          <Link to="/login" className="text-base text-gray-700 hover:text-purple-600 transition-colors font-medium">
            Login
          </Link>
          <Link to="/register">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 shadow-sm hover:shadow-md transition-all">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown with animation */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
        {mobileMenuOpen && <MobileMenu onLinkClick={() => setMobileMenuOpen(false)} />}
      </div>
    </header>;
};
export default Header;