import { User } from "@supabase/supabase-js";
import { NavigateFunction } from "react-router-dom";
import { ToastType } from "@/components/ui/toast";
import { supabase } from "@/lib/supabase";
import { AuthUser, AIToken } from "./types";

const DEV_PASSWORD = 'king8844';

interface AuthOperationsProps {
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
  setAiTokens: React.Dispatch<React.SetStateAction<AIToken[]>>;
  navigate: NavigateFunction;
  toast: typeof ToastType;
}

export function useAuthOperations({ setUser, setAiTokens, navigate, toast }: AuthOperationsProps) {
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

  const devLogin = async (password: string) => {
    if (password !== DEV_PASSWORD) {
      throw new Error("Invalid developer password");
    }

    const devUser: AuthUser = {
      id: "dev-user",
      email: "dev@example.com",
      role: "admin",
      name: "Developer",
      profileComplete: true
    };

    setUser(devUser);
    
    toast({
      title: "Developer Access Granted",
      description: "Logged in with developer privileges"
    });
  };

  const generateAiToken = async (name: string, userId: string): Promise<AIToken> => {
    const newToken: AIToken = {
      id: Math.random().toString(36).substring(2),
      name,
      createdAt: new Date().toISOString(),
      isActive: true,
      authorizedBy: {
        id: userId,
        name: ""
      }
    };
    
    setAiTokens((current: AIToken[]) => [...current, newToken]);
    return newToken;
  };

  const revokeAiToken = async (tokenId: string) => {
    setAiTokens((current: AIToken[]) => 
      current.map(token => 
        token.id === tokenId ? { ...token, isActive: false } : token
      )
    );
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

    setUser((prev: AuthUser | null) => prev ? { ...prev, ...profileData, profileComplete: true } : null);

    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated"
    });
  };

  return {
    setUserFromSupabase,
    register,
    login,
    loginWithToken,
    devLogin,
    logout,
    updateProfile,
    generateAiToken,
    revokeAiToken
  };
}
