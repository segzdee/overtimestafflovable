
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface MobileMenuProps {
  onLinkClick: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onLinkClick }) => {
  return (
    <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md z-10 animate-fadeIn">
      <div className="p-3 sm:p-4 flex flex-col space-y-2 sm:space-y-3">
        <Link 
          to="/find-shifts" 
          className="text-sm sm:text-base text-gray-600 hover:text-purple-600 transition-colors py-1.5 sm:py-2 border-b border-gray-100"
          onClick={onLinkClick}
        >
          Find Extra Shifts
        </Link>
        <Link 
          to="/find-staff" 
          className="text-sm sm:text-base text-gray-600 hover:text-purple-600 transition-colors py-1.5 sm:py-2 border-b border-gray-100"
          onClick={onLinkClick}
        >
          Find Extra Staff
        </Link>
        <Link 
          to="/register" 
          onClick={onLinkClick}
          className="py-1.5 sm:py-2"
        >
          <Button className="bg-green-600 hover:bg-green-700 text-white w-full text-sm">Sign up</Button>
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
