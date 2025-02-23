
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import type { AuthUser, AuthContextType, AIToken } from "@/types/auth";
import { setUserFromSupabase, registerUser, loginUser, updateUserProfile, logoutUser, verifyToken } from "@/services/authService";
import { generateToken } from "@/services/aiTokenService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [aiTokens, setAiTokens] = useState<AIToken[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserFromSupabase(session.user).then(setUser);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const userData = await setUserFromSupabase(session.user);
        setUser(userData);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const register = async (
    email: string,
    password: string,
    role: AuthUser["role"],
    name: string,
    category?: string
  ) => {
    try {
      await registerUser(email, password, role, name, category);
      toast({
        title: "Registration successful",
        description: "Please check your email to verify your account."
      });
    } catch (error) {
      console.error('Error in register:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await loginUser(email, password);
      if (result?.profile) {
        if (!result.profile.profile_complete) {
          navigate(`/dashboard/${result.profile.role}/complete-profile`);
        } else {
          navigate(`/dashboard/${result.profile.role}`);
        }
        toast({
          title: "Login successful",
          description: "Welcome back!"
        });
      }
    } catch (error) {
      console.error('Error in login:', error);
      throw error;
    }
  };

  const loginWithToken = async (token: string) => {
    try {
      // Find the AI token in the database
      const { data: aiToken, error: aiTokenError } = await supabase
        .from('ai_agents')
        .select('*')
        .eq('token', token)
        .single();

      if (aiTokenError || !aiToken) {
        throw new Error('Invalid AI token');
      }

      // Get the provider's profile
      const { data: provider, error: providerError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', aiToken.user_id)
        .single();

      if (providerError || !provider) {
        throw new Error('Token provider not found');
      }

      // Set the user context with the provider's information
      setUser({
        ...provider,
        id: provider.id,
        isAIAgent: true,
        providerId: aiToken.user_id
      });

      // Navigate to the provider's dashboard
      navigate(`/dashboard/${provider.role}`);
      
      toast({
        title: "AI Login successful",
        description: `Connected to ${provider.name}'s dashboard`
      });
    } catch (error) {
      console.error('Error in loginWithToken:', error);
      throw error;
    }
  };

  const generateAiToken = async (name: string, userId: string): Promise<AIToken> => {
    const newToken = generateToken(name, userId, user?.name || "");
    setAiTokens([...aiTokens, newToken]);
    return newToken;
  };

  const revokeAiToken = async (tokenId: string) => {
    setAiTokens(aiTokens.map(token => 
      token.id === tokenId ? { ...token, isActive: false } : token
    ));
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      navigate("/login");
      toast({
        title: "Logged out successfully"
      });
    } catch (error) {
      console.error('Error in logout:', error);
      throw error;
    }
  };

  const updateProfile = async (userId: string, profileData: Partial<AuthUser>) => {
    try {
      await updateUserProfile(userId, profileData);
      setUser(prev => prev ? { ...prev, ...profileData, profileComplete: true } : null);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated"
      });
    } catch (error) {
      console.error('Error in updateProfile:', error);
      throw error;
    }
  };

  const value = {
    user,
    register,
    login,
    loginWithToken,
    logout,
    updateProfile,
    generateAiToken,
    revokeAiToken,
    aiTokens
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
