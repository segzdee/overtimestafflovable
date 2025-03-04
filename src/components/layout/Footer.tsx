
import React from 'react';
import { Link } from 'react-router-dom';
const Footer: React.FC = () => {
  return (
    <footer className="py-3 md:py-4 border-t border-gray-100 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm bg-zinc-50 rounded-sm p-2">
            <Link to="/terms" className="text-gray-600 hover:text-purple-600">Terms</Link>
            <Link to="/privacy" className="text-gray-600 hover:text-purple-600">Privacy</Link>
            <Link to="/contact" className="text-gray-600 hover:text-purple-600">Contact</Link>
            <Link to="/blog" className="text-gray-600 hover:text-purple-600">Blog</Link>
          </div>
          <div className="text-xs text-gray-500 mt-2 sm:mt-0">
            © {new Date().getFullYear()} OVERTIMESTAFF. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
