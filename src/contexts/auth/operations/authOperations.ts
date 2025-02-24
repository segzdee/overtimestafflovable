
import { supabase } from "@/lib/supabase/client";
import { AuthUser } from "../types";
import { setUserFromSupabase, DEV_PASSWORD } from "../utils/authUtils";
import { NavigateFunction } from "react-router-dom";

export const register = async (
  email: string,
  password: string,
  role: AuthUser["role"],
  name: string,
  toast: any,
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

export const login = async (
  email: string,
  password: string,
  navigate: NavigateFunction,
  toast: any
) => {
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

export const loginWithToken = async (
  token: string,
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>
) => {
  const { data, error } = await supabase.auth.verifyOtp({
    token_hash: token,
    type: 'magiclink'
  });

  if (error) throw error;
  
  if (data.user) {
    await setUserFromSupabase(data.user, setUser);
  }
};

export const devLogin = async (
  password: string,
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>,
  toast: any
) => {
  if (password !== DEV_PASSWORD) {
    throw new Error("Invalid developer password");
  }

  const devUser: AuthUser = {
    id: "dev-user",
    email: "dev@example.com",
    role: "admin",
    name: "Developer",
    profileComplete: true,
    verificationStatus: "verified",
    emailVerified: true,
    verificationCompletedAt: new Date().toISOString()
  };

  setUser(devUser);
  
  toast({
    title: "Developer Access Granted",
    description: "Logged in with developer privileges"
  });
};
