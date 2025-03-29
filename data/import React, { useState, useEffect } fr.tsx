import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDevMode } from '@/contexts/dev/DevModeContext';
import { Button } from '@/components/ui/button';

// List of allowed development URLs
const ALLOWED_DEV_URLS = [
  'localhost',
  '127.0.0.1',
  'dev.overtimestaff.com',
  'staging.overtimestaff.com',
  'test.overtimestaff.com'
];

// Development admin password (in a real application, this would be handled securely server-side)
const DEV_PASSWORD = 'overtimedev2023';

export default function DevAdmin() {
  const { devMode, selectedRole, toggleDevMode, setRole } = useDevMode();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  
  // Check if current URL is allowed for dev mode
  const isDevEnvironment = ALLOWED_DEV_URLS.some(url => 
    window.location.hostname.includes(url)
  );
  
  // Check for existing auth in localStorage
  useEffect(() => {
    const devAuth = localStorage.getItem('devAuth') === 'true';
    if (devAuth) {
      setIsAuthorized(true);
    }
  }, []);
  
  // If not in a dev environment, redirect to home
  if (!isDevEnvironment) {
    return <Navigate to="/" replace />;
  }
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === DEV_PASSWORD) {
      setIsAuthorized(true);
      localStorage.setItem('devAuth', 'true');
      setError(null);
    } else {
      setError('Invalid development password');
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('devAuth');
    localStorage.removeItem('devMode');
    localStorage.removeItem('devModeRole');
    setIsAuthorized(false);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">OVERTIMESTAFF Development Console</h1>
          {isAuthorized && (
            <Button 
              variant="outline" 
              className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </div>
        
        {!isAuthorized ? (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Developer Authentication Required</h2>
            <p className="mb-4 text-gray-600">
              This page is only accessible to developers. Please enter the development password to continue.
            </p>
            
            <form onSubmit={handlePasswordSubmit} className="max-w-md">
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                  {error}
                </div>
              )}
              
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Development Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter development password"
                />
              </div>
              
              <Button type="submit" className="w-full">
                Authenticate
              </Button>
            </form>
          </div>
        ) : (
          <div>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
              <p className="text-amber-700">
                <strong>Developer Mode Console</strong> - Changes made here will affect your development experience across the application.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-3">Developer Mode</h2>
                <p className="text-gray-600 mb-4">
                  Toggle developer mode to enable testing features and role-specific views.
                </p>
                
                <div className="flex items-center">
                  <span className="mr-3">Dev Mode:</span>
                  <Button
                    variant={devMode ? "default" : "outline"}
                    size="sm"
                    onClick={toggleDevMode}
                    className={devMode ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {devMode ? 'ON' : 'OFF'}
                  </Button>
                </div>
              </div>
              
              {devMode && (
                <div className="border rounded-lg p-4">
                  <h2 className="text-lg font-semibold mb-3">User Role Simulation</h2>
                  <p className="text-gray-600 mb-4">
                    Select a role to simulate different user experiences.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={selectedRole === 'admin' ? "default" : "outline"}
                      size="sm" 
                      onClick={() => setRole('admin')}
                      className={selectedRole === 'admin' ? "bg-blue-600 hover:bg-blue-700" : ""}
                    >
                      Admin
                    </Button>
                    <Button
                      variant={selectedRole === 'agency' ? "default" : "outline"}
                      size="sm" 
                      onClick={() => setRole('agency')}
                      className={selectedRole === 'agency' ? "bg-blue-600 hover:bg-blue-700" : ""}
                    >
                      Agency
                    </Button>
                    <Button
                      variant={selectedRole === 'company' ? "default" : "outline"}
                      size="sm" 
                      onClick={() => setRole('company')}
                      className={selectedRole === 'company' ? "bg-blue-600 hover:bg-blue-700" : ""}
                    >
                      Company
                    </Button>
                    <Button
                      variant={selectedRole === 'shift-worker' ? "default" : "outline"}
                      size="sm" 
                      onClick={() => setRole('shift-worker')}
                      className={selectedRole === 'shift-worker' ? "bg-blue-600 hover:bg-blue-700" : ""}
                    >
                      Worker
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            {devMode && selectedRole && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <p className="text-green-700">
                  You are now browsing as: <strong>{selectedRole}</strong>
                </p>
                <p className="text-sm text-green-600 mt-1">
                  The DevModeBanner will be visible in the application to indicate your developer status.
                </p>
              </div>
            )}
            
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-3">Development Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a 
                  href="/dev-admin/api-docs" 
                  className="block p-4 border rounded hover:bg-gray-50"
                >
                  <h3 className="font-medium">API Documentation</h3>
                  <p className="text-sm text-gray-600">Explore available API endpoints</p>
                </a>
                <a 
                  href="/dev-admin/component-library" 
                  className="block p-4 border rounded hover:bg-gray-50"
                >
                  <h3 className="font-medium">Component Library</h3>
                  <p className="text-sm text-gray-600">View UI component examples</p>
                </a>
                <a 
                  href="/dev-admin/test-data" 
                  className="block p-4 border rounded hover:bg-gray-50"
                >
                  <h3 className="font-medium">Test Data</h3>
                  <p className="text-sm text-gray-600">Manage test data sets</p>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
