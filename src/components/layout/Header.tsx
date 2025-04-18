
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth/AuthContext';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-purple-600 text-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">OVERTIMESTAFF</Link>
        
        <nav className="flex space-x-4">
          <Link to="/" className="hover:text-purple-200">Home</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="hover:text-purple-200">Dashboard</Link>
              <button 
                onClick={handleLogout}
                className="hover:text-purple-200 cursor-pointer"
              >
                Logout
              </button>
              <span className="ml-4 text-sm">
                Welcome, {user?.name || user?.email}
              </span>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-purple-200">Login</Link>
              <Link to="/register" className="hover:text-purple-200">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
