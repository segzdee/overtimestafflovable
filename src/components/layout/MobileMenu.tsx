
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface MobileMenuProps {
  onLinkClick: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onLinkClick }) => {
  return (
    <div className="bg-white shadow-lg animate-fadeIn">
      <div className="p-4 flex flex-col space-y-3">
        <Link 
          to="/find-shifts" 
          className="flex justify-between items-center text-gray-700 hover:text-purple-600 transition-colors py-2 border-b border-gray-100"
          onClick={onLinkClick}
        >
          <span>Find Extra Shifts</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
        <Link 
          to="/find-staff" 
          className="flex justify-between items-center text-gray-700 hover:text-purple-600 transition-colors py-2 border-b border-gray-100"
          onClick={onLinkClick}
        >
          <span>Find Extra Staff</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
        <Link 
          to="/login" 
          className="flex justify-between items-center text-gray-700 hover:text-purple-600 transition-colors py-2 border-b border-gray-100"
          onClick={onLinkClick}
        >
          <span>Login</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
        <Link 
          to="/register" 
          onClick={onLinkClick}
        >
          <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full">
            Sign up
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
