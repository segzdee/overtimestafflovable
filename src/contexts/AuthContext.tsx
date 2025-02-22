import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

interface AuthUser {
  id: string;
  email: string;
  role: "admin" | "shift-worker" | "company" | "agency" | "aiagent";
  name: string;
  category?: string;
  profileComplete: boolean;
  agencyName?: string;
  address?: string;
  phoneNumber?: string;
  specialization?: string;
  staffingCapacity?: number;
}

interface AIToken {
  id: string;
  name: string;
  createdAt: string;
  isActive: boolean;
  authorizedBy: {
    id: string;
    name: string;
  };
}

interface AuthContextType {
  user: AuthUser | null;
  register: (email: string, password: string, role: AuthUser["role"], name: string, category?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithToken: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userId: string, profileData: Partial<AuthUser>) => Promise<void>;
  generateAiToken: (name: string, userId: string) => Promise<AIToken>;
  revokeAiToken: (token: string) => Promise<void>;
  aiTokens: AIToken[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [aiTokens, setAiTokens] = useState<AIToken[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserFromSupabase(session.user);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await setUserFromSupabase(session.user);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const setUserFromSupabase = async (supabaseUser: User) => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', supabaseUser.id)
      .single();

    if (profile) {
      setUser({
        id: supabaseUser.id,
        email: supabaseUser.email!,
        role: profile.role,
        name: profile.name,
        category: profile.category,
        profileComplete: profile.profile_complete,
        agencyName: profile.agency_name,
        address: profile.address,
        phoneNumber: profile.phone_number,
        specialization: profile.specialization,
        staffingCapacity: profile.staffing_capacity
      });
    }
  };

  const register = async (
    email: string,
    password: string,
    role: AuthUser["role"],
    name: string,
    category?: string
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role, name, category }
      }
    });

    if (error) throw error;

    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: data.user.id,
            email,
            role,
            name,
            category,
            profile_complete: false
          }
        ]);

      if (profileError) throw profileError;

      toast({
        title: "Registration successful",
        description: "Please check your email to verify your account."
      });
    }
  };

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    if (data.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profile && !profile.profile_complete) {
        navigate(`/dashboard/${profile.role}/complete-profile`);
      }
    }

    toast({
      title: "Login successful",
      description: "Welcome back!"
    });
  };

  const loginWithToken = async (token: string) => {
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: 'magiclink'
    });

    if (error) throw error;
    
    if (data.user) {
      await setUserFromSupabase(data.user);
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
    
    setAiTokens([...aiTokens, newToken]);
    return newToken;
  };

  const revokeAiToken = async (tokenId: string) => {
    setAiTokens(aiTokens.map(token => 
      token.id === tokenId ? { ...token, isActive: false } : token
    ));
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    setUser(null);
    navigate("/login");
    
    toast({
      title: "Logged out successfully"
    });
  };

  const updateProfile = async (userId: string, profileData: Partial<AuthUser>) => {
    const { error } = await supabase
      .from('profiles')
      .update({
        ...profileData,
        profile_complete: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (error) throw error;

    setUser(prev => prev ? { ...prev, ...profileData, profileComplete: true } : null);

    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated"
    });
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
