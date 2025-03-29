import React, { createContext, useContext, useState, useEffect } from 'react';

type RoleType = 'admin' | 'agency' | 'company' | 'shift-worker' | null;

interface DevModeContextType {
  devMode: boolean;
  selectedRole: RoleType;
  setRole: (role: RoleType) => void;
  toggleDevMode: () => void;
}

// Create the context with a default value
const DevModeContext = createContext<DevModeContextType>({
  devMode: false,
  selectedRole: null,
  setRole: () => {},
  toggleDevMode: () => {},
});

// List of allowed development URLs
const ALLOWED_DEV_URLS = [
  'localhost',
  '127.0.0.1',
  'dev.overtimestaff.com',
  'staging.overtimestaff.com',
  'test.overtimestaff.com'
];

// DevModeProvider component
export const DevModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [devMode, setDevMode] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<RoleType>(null);

  // Check if current URL is allowed for dev mode
  const isDevEnvironment = () => {
    return ALLOWED_DEV_URLS.some(url => window.location.hostname.includes(url));
  };

  // Check if we're on the specific dev admin route
  const isOnDevRoute = () => {
    return window.location.pathname.startsWith('/dev-admin');
  };

  // Initialize dev mode based on environment and route
  useEffect(() => {
    const initializeDevMode = () => {
      // Only allow dev mode in allowed environments and on the dev route
      if (isDevEnvironment() && isOnDevRoute()) {
        const storedDevMode = localStorage.getItem('devMode') === 'true';
        const storedRole = localStorage.getItem('devModeRole') as RoleType;
        
        if (storedDevMode) {
          setDevMode(true);
          setSelectedRole(storedRole);
        }
      } else {
        // Clear dev mode if not on dev route or not in dev environment
        setDevMode(false);
        setSelectedRole(null);
      }
    };

    initializeDevMode();

    // Update when route changes
    window.addEventListener('popstate', initializeDevMode);
    
    return () => {
      window.removeEventListener('popstate', initializeDevMode);
    };
  }, []);

  // Toggle dev mode
  const toggleDevMode = () => {
    // Only allow toggling in development environment and on dev route
    if (isDevEnvironment() && isOnDevRoute()) {
      const newDevMode = !devMode;
      setDevMode(newDevMode);
      
      if (newDevMode) {
        localStorage.setItem('devMode', 'true');
      } else {
        localStorage.removeItem('devMode');
        localStorage.removeItem('devModeRole');
        setSelectedRole(null);
      }
    }
  };

  // Set selected role
  const setRole = (role: RoleType) => {
    // Only allow role setting in development environment and on dev route
    if (isDevEnvironment() && isOnDevRoute()) {
      setSelectedRole(role);
      
      if (role) {
        localStorage.setItem('devModeRole', role);
      } else {
        localStorage.removeItem('devModeRole');
      }
    }
  };

  return (
    <DevModeContext.Provider
      value={{
        devMode,
        selectedRole,
        toggleDevMode,
        setRole,
      }}
    >
      {children}
    </DevModeContext.Provider>
  );
};

// Custom hook for using the dev mode context
export const useDevMode = () => useContext(DevModeContext);

export default DevModeContext;
