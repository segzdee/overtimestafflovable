
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
  profileComplete: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  register: (email: string, password: string, role: AuthUser["role"], name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userId: string, profileData: Partial<AuthUser>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check for initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserFromSupabase(session.user);
      }
    });

    // Listen for auth changes
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
        profileComplete: profile.profile_complete
      });
    }
  };

  const register = async (
    email: string,
    password: string,
    role: AuthUser["role"],
    name: string
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role, name }
      }
    });

    if (error) throw error;

    if (data.user) {
      // Create profile record
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: data.user.id,
            email,
            role,
            name,
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

    // Update local user state
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
    logout,
    updateProfile
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
