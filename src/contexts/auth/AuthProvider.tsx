
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/User";
import { AuthContext, AuthContextType } from "./AuthContext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check for existing user session on load
  useEffect(() => {
    const checkAuthState = async () => {
      try {
        // Check localStorage for user data (simulated auth for now)
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Auth state check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthState();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate login API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, validate credentials with an API call
      // For demo purposes, create a mock user
      const mockUser: User = {
        id: "1",
        email: email,
        name: email.split('@')[0],
        role: "shift-worker", // Default role, would be returned from backend
      };
      
      // Store user in state and localStorage
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      
      // Redirect to dashboard based on role
      navigate(`/dashboard/${mockUser.role}`);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    email: string, 
    password: string, 
    userData: Partial<User>
  ): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate registration API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new user with provided data
      const newUser: User = {
        id: Date.now().toString(), // In real app, this would come from the backend
        email,
        name: userData.name || email.split('@')[0],
        role: userData.role || 'user',
      };
      
      // Store user in state and localStorage
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      
      // Redirect to profile completion page
      navigate(`/complete-profile/${newUser.role}`);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Clear user data
      setUser(null);
      localStorage.removeItem("user");
      
      // Redirect to home page
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  const updateProfile = async (profileData: Partial<User>): Promise<void> => {
    if (!user) {
      throw new Error("No authenticated user");
    }
    
    try {
      // Update user data
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Profile update failed:", error);
      throw error;
    }
  };

  const authContextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Re-export the useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
