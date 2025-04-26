
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/auth/AuthContext';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { isAuthenticated, signOut } = useAuth();

  return (
    <header className="bg-white border-b py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="font-bold text-xl">App Logo</Link>
        
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-purple-600">Home</Link></li>
            
            {isAuthenticated ? (
              <>
                <li><Link to="/dashboard" className="hover:text-purple-600">Dashboard</Link></li>
                <li>
                  <Button variant="ghost" onClick={signOut}>
                    Logout
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="hover:text-purple-600">Login</Link></li>
                <li><Link to="/register" className="hover:text-purple-600">Register</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
