
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  hasMFA?: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  setupMFA: () => Promise<boolean>;
  verifyMFA: (code: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  login: async () => {},
  logout: () => {},
  requestPasswordReset: async () => {},
  resetPassword: async () => {},
  verifyEmail: async () => {},
  setupMFA: async () => false,
  verifyMFA: async () => false
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing user session on mount
  useEffect(() => {
    const checkAuthState = () => {
      try {
        // Check if there's a stored user in local storage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth state check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthState();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login - replace with actual authentication
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, validate credentials with an API call
      const mockUser = {
        id: '123',
        email,
        name: email.split('@')[0],
        role: 'shift-worker', // Default role, would be returned from backend
        hasMFA: false
      };
      
      // Store user in state and localStorage
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Clear user data
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const requestPasswordReset = async (email: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would trigger a password reset email
      return;
    } catch (error) {
      console.error('Password reset request failed:', error);
      throw error;
    }
  };

  const resetPassword = async (token: string, password: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would validate the token and update the password
      return;
    } catch (error) {
      console.error('Password reset failed:', error);
      throw error;
    }
  };

  const verifyEmail = async (token: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would verify the email address
      return;
    } catch (error) {
      console.error('Email verification failed:', error);
      throw error;
    }
  };

  const setupMFA = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would set up MFA and return MFA details
      
      // Update user with MFA enabled
      if (user) {
        const updatedUser = { ...user, hasMFA: true };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      return true;
    } catch (error) {
      console.error('MFA setup failed:', error);
      return false;
    }
  };

  const verifyMFA = async (code: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would verify the MFA code
      return code === '123456'; // Mock validation
    } catch (error) {
      console.error('MFA verification failed:', error);
      return false;
    }
  };

  const value = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    requestPasswordReset,
    resetPassword,
    verifyEmail,
    setupMFA,
    verifyMFA
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
