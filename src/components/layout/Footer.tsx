
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="py-1 border-t border-gray-100 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-center gap-4 md:gap-6 text-xs md:text-sm">
          <Link to="/terms" className="text-gray-600 hover:text-purple-600">Terms</Link>
          <Link to="/privacy" className="text-gray-600 hover:text-purple-600">Privacy</Link>
          <Link to="/contact" className="text-gray-600 hover:text-purple-600">Contact</Link>
          <Link to="/blog" className="text-gray-600 hover:text-purple-600">Blog</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
