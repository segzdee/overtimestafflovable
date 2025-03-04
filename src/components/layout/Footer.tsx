
import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/ui/logo';

const Footer: React.FC = () => {
  return (
    <footer className="py-6 md:py-8 bg-white border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <Logo />
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-6 text-sm">
            <Link to="/find-shifts" className="text-gray-600 hover:text-purple-600 transition-colors">
              Find Shifts
            </Link>
            <Link to="/find-staff" className="text-gray-600 hover:text-purple-600 transition-colors">
              Find Staff
            </Link>
            <Link to="/blog" className="text-gray-600 hover:text-purple-600 transition-colors">
              Blog
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-purple-600 transition-colors">
              Contact
            </Link>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs py-2 px-4 bg-gray-50 rounded-lg mb-4">
            <Link to="/terms" className="text-gray-500 hover:text-purple-600 transition-colors">Terms</Link>
            <Link to="/privacy" className="text-gray-500 hover:text-purple-600 transition-colors">Privacy</Link>
            <Link to="/contact" className="text-gray-500 hover:text-purple-600 transition-colors">Contact</Link>
            <Link to="/blog" className="text-gray-500 hover:text-purple-600 transition-colors">Blog</Link>
          </div>
          
          <div className="text-xs text-gray-500">
            © {new Date().getFullYear()} OVERTIMESTAFF. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
