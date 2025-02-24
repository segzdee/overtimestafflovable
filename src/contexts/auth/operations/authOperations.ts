
import { supabase } from "@/lib/supabase/client";
import { NavigateFunction } from "react-router-dom";
import { AuthUser } from "../types";
import { createUserProfile } from "../utils/authUtils";

export const register = async (
  email: string,
  password: string,
  role: AuthUser["role"],
  name: string,
  toast: any,
  category?: string
) => {
  try {
    const { data: { user }, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) throw signUpError;
    if (!user) throw new Error('No user returned from sign up');

    // Create the user profile
    const { error: profileError } = await createUserProfile(
      user.id,
      email,
      role,
      name
    );

    if (profileError) throw profileError;

    toast({
      title: "Success",
      description: "Please check your email to verify your account",
    });

  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const login = async (
  email: string,
  password: string,
  navigate: NavigateFunction,
  toast: any
) => {
  const { data: { user }, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  if (!user) throw new Error('No user returned from sign in');

  // Get user profile to determine where to redirect
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile) {
    // Redirect based on user role
    navigate(`/dashboard/${profile.role.toLowerCase()}`);
  } else {
    // If no profile exists, redirect to login
    navigate('/login');
  }
};

export const loginWithToken = async (
  token: string,
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>
) => {
  // Implementation for AI agent token login
  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  if (error) throw error;
  if (!user) throw new Error('Invalid token');

  // Get the user's profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile) throw new Error('No profile found for token');

  setUser({
    id: profile.id,
    email: profile.email,
    role: profile.role,
    name: profile.name,
    profileComplete: profile.profile_complete,
    emailVerified: user.email_confirmed_at ? true : false,
    verificationStatus: 'pending',
    notificationPreferences: {}
  });
};

export const devLogin = async (
  password: string,
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>,
  toast: any
) => {
  // Implementation for dev login if needed
  throw new Error('Dev login not implemented');
};
