
import { ReactNode, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { AuthContext } from "./AuthContext";
import { AuthUser, AIToken } from "./types";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { loginUser, registerUser } from "@/services/authService";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [aiTokens, setAiTokens] = useState<AIToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // User registration that works with the new auth schema
  const register = async (
    email: string,
    password: string,
    role: AuthUser["role"],
    name: string,
    category?: string
  ) => {
    try {
      // In a real implementation, this would call the API to insert into auth.users
      // and the appropriate profile table based on role
      const userData = await registerUser({
        email,
        password,
        role,
        name,
        category
      });
      
      // Store the user data in localStorage for this demo
      localStorage.setItem('auth_user', JSON.stringify(userData));
      
      toast({
        title: "Account created successfully",
        description: "You can now log in with your credentials",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Failed to create account"
      });
      throw error;
    }
  };

  // Login with the new auth schema
  const login = async (email: string, password: string) => {
    try {
      // In a real implementation, this would verify credentials against auth.users
      const userData = await loginUser(email, password);
      
      if (userData) {
        setUser(userData);
        localStorage.setItem('auth_user', JSON.stringify(userData));
        
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
        
        // Redirect based on user role
        navigate(`/dashboard/${userData.role}`);
        return;
      }
      
      throw new Error("Invalid credentials");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid credentials"
      });
      throw error;
    }
  };

  const loginWithToken = async (token: string) => {
    // This would verify against auth.ai_agent_profiles.api_token
    toast({
      variant: "destructive", 
      title: "Not implemented",
      description: "Token-based login is not available in this demo"
    });
  };

  const devLogin = async (password: string) => {
    // For development purposes only
    toast({
      variant: "destructive",
      title: "Not implemented", 
      description: "Dev login is not available in this demo"
    });
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('auth_user');
    navigate("/login");
    
    toast({
      title: "Logged out successfully"
    });
  };

  const updateProfile = async (userId: string, profileData: Partial<AuthUser>) => {
    if (user && user.id === userId) {
      const updatedUser = { ...user, ...profileData, profileComplete: true };
      setUser(updatedUser);
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated"
      });
    }
  };

  const updateNotificationPreferences = async (preferences: Partial<any>) => {
    if (user) {
      const updatedUser = {
        ...user,
        notificationPreferences: {
          ...user.notificationPreferences,
          ...preferences
        }
      };
      setUser(updatedUser);
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
      
      toast({
        title: "Preferences Updated",
        description: "Your notification preferences have been saved."
      });
    }
  };

  const generateAiToken = async (name: string, userId: string): Promise<AIToken> => {
    const newToken: AIToken = {
      id: Math.random().toString(36).substring(2),
      name,
      createdAt: new Date().toISOString(),
      isActive: true,
      authorizedBy: {
        id: userId,
        name: user?.name || ""
      }
    };
    setAiTokens((current) => [...current, newToken]);
    return newToken;
  };

  const revokeAiToken = async (tokenId: string) => {
    setAiTokens((current) => 
      current.map(token => 
        token.id === tokenId ? { ...token, isActive: false } : token
      )
    );
  };

  // Load user from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Error parsing stored user:", err);
      }
    }
    setLoading(false);
  }, []);

  if (error) {
    return (
      <ErrorBoundary>
        <div className="flex flex-col items-center justify-center h-screen p-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full text-center">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Authentication Error</h2>
            <p className="text-red-700 mb-4">{error.message}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <ErrorBoundary>
      <AuthContext.Provider
        value={{
          user,
          aiTokens,
          loading, // Add the missing loading property
          register,
          login,
          loginWithToken,
          devLogin,
          logout,
          updateProfile,
          updateNotificationPreferences,
          generateAiToken,
          revokeAiToken
        }}
      >
        {children}
      </AuthContext.Provider>
    </ErrorBoundary>
  );
}
