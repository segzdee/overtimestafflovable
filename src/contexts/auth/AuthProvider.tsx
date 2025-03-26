
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define types
export interface AuthUser {
  id: string;
  email: string;
  role?: string;
  name?: string;
  verified?: boolean;
  avatar?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, role: string) => Promise<void>;
  updateUser: (data: Partial<AuthUser>) => void;
  loginWithToken: (token: string) => Promise<void>;
}

// Create context with initial values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    // Simulate auth check
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Auth check failed", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // This is just a mock - would be replaced with actual auth
      const mockUser: AuthUser = {
        id: "user123",
        email,
        name: email.split("@")[0],
        role: "user",
        verified: true,
      };
      
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Login with token function for AI agents
  const loginWithToken = async (token: string) => {
    setIsLoading(true);
    try {
      // This is a mock implementation
      if (token && token.length > 10) {
        const mockUser: AuthUser = {
          id: "ai" + Date.now().toString(),
          email: "ai-agent@overtimestaff.com",
          name: "AI Assistant",
          role: "aiagent",
          verified: true,
        };
        
        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
        localStorage.setItem("ai_token", token);
      } else {
        throw new Error("Invalid token");
      }
    } catch (error) {
      console.error("Token login failed", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("ai_token");
  };

  // Register function
  const register = async (email: string, password: string, role: string) => {
    setIsLoading(true);
    try {
      // This is just a mock - would be replaced with actual registration
      const mockUser: AuthUser = {
        id: "user" + Date.now().toString(),
        email,
        role,
        name: email.split("@")[0],
        verified: false,
      };
      
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Update user function
  const updateUser = (data: Partial<AuthUser>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        updateUser,
        loginWithToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export type { AuthUser };
