
import { supabase } from "@/lib/supabase/client";
import { NavigateFunction } from "react-router-dom";
import { AuthUser } from "../types";
import { createUserProfile } from "../utils/authUtils";
import { NotificationPreferences } from "@/lib/types";

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
    toast({
      variant: "destructive",
      title: "Registration failed",
      description: error instanceof Error ? error.message : "An error occurred during registration"
    });
    throw error;
  }
};

export const login = async (
  email: string,
  password: string,
  navigate: NavigateFunction,
  toast: any
) => {
  try {
    const { data: { user }, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    if (!user) throw new Error('No user returned from sign in');

    // Get user profile to determine where to redirect
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profileError) throw profileError;

    if (profile) {
      // Show success message
      toast({
        title: "Success",
        description: "Logged in successfully",
      });
      
      // Redirect based on user role
      switch (profile.role) {
        case 'shift-worker':
          navigate('/dashboard/shift-worker');
          break;
        case 'company':
          navigate('/dashboard/company');
          break;
        case 'agency':
          navigate('/dashboard/agency');
          break;
        case 'admin':
          navigate('/dashboard/admin');
          break;
        default:
          navigate('/login');
      }
    } else {
      // If no profile exists, redirect to login
      toast({
        variant: "destructive",
        title: "Error",
        description: "User profile not found"
      });
      navigate('/login');
    }
  } catch (error) {
    console.error('Login error:', error);
    toast({
      variant: "destructive",
      title: "Login failed",
      description: error instanceof Error ? error.message : "Invalid credentials"
    });
    throw error;
  }
};

export const loginWithToken = async (
  token: string,
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>
) => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error) throw error;
    if (!user) throw new Error('Invalid token');

    // Get the user's profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) throw profileError;
    if (!profile) throw new Error('No profile found for token');

    // Get notification preferences
    const { data: notificationPrefs, error: prefError } = await supabase
      .from('notification_preferences')
      .select('*')
      .eq('user_id', profile.id)
      .single();

    if (prefError && prefError.code !== 'PGRST116') throw prefError;

    setUser({
      id: profile.id,
      email: profile.email,
      role: profile.role,
      name: profile.name,
      profileComplete: profile.profile_complete,
      emailVerified: user.email_confirmed_at ? true : false,
      verificationStatus: 'pending',
      notificationPreferences: notificationPrefs || {
        id: 0,
        userId: profile.id,
        email: true,
        sms: false,
        push: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Token login error:', error);
    throw error;
  }
};

export const devLogin = async (
  password: string,
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>,
  toast: any
) => {
  // Implementation for dev login if needed
  throw new Error('Dev login not implemented');
};
