
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { BaseRole } from "@/lib/types";

// Define types
export interface AuthUser {
  id: string;
  email: string;
  role?: string;
  name?: string;
  verified?: boolean;
  avatar?: string;
  address?: string;
  phoneNumber?: string;
  specialization?: string;
  staffingCapacity?: number;
  category?: string;
  agencyName?: string;
  profileComplete?: boolean;
}

export interface AIToken {
  id: string;
  name: string;
  createdAt: string;
  isActive: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, role: string) => Promise<void>;
  updateUser: (data: Partial<AuthUser>) => void;
  loginWithToken?: (token: string) => Promise<void>;
  updateProfile?: (data: Partial<AuthUser>) => Promise<void>;
  aiTokens?: AIToken[];
  generateAiToken?: (name: string, userId: string) => Promise<AIToken>;
  revokeAiToken?: (tokenId: string) => Promise<void>;
}

// Create context with initial values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [aiTokens, setAiTokens] = useState<AIToken[]>([]);

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

  // Update profile function
  const updateProfile = async (data: Partial<AuthUser>) => {
    updateUser(data);
    return Promise.resolve();
  };

  // Generate AI token function
  const generateAiToken = async (name: string, userId: string): Promise<AIToken> => {
    const newToken: AIToken = {
      id: `token_${Date.now()}`,
      name,
      createdAt: new Date().toISOString(),
      isActive: true
    };
    
    setAiTokens(prev => [...prev, newToken]);
    return newToken;
  };

  // Revoke AI token function
  const revokeAiToken = async (tokenId: string): Promise<void> => {
    setAiTokens(prev => 
      prev.map(token => 
        token.id === tokenId 
          ? { ...token, isActive: false } 
          : token
      )
    );
    return Promise.resolve();
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
        updateProfile,
        aiTokens,
        generateAiToken,
        revokeAiToken
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
