
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-center gap-6 mb-6">
          <Link to="/terms" className="text-gray-700 hover:text-purple-600 transition-colors">Terms</Link>
          <Link to="/privacy" className="text-gray-700 hover:text-purple-600 transition-colors">Privacy</Link>
          <Link to="/contact" className="text-gray-700 hover:text-purple-600 transition-colors">Contact</Link>
          <Link to="/blog" className="text-gray-700 hover:text-purple-600 transition-colors">Blog</Link>
        </div>
        <p className="text-center text-gray-700 text-sm">
          &copy; {new Date().getFullYear()} OVERTIMESTAFF. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
