
import { supabase } from "@/lib/supabase/client";
import { NavigateFunction } from "react-router-dom";
import { executeWithConnectionRetry } from "@/lib/robust-connection-handler";
import { AuthUser } from "../types";
import { getProfileByUserId, getNotificationPreferences } from "./authUtils";

export const login = async (
  email: string,
  password: string,
  navigate: NavigateFunction,
  toast: any
) => {
  try {
    // Use connection-resilient executor for login
    const { user } = await executeWithConnectionRetry(
      async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        if (!data.user) throw new Error('No user returned from sign in');
        
        return data;
      },
      {
        maxRetries: 4,
        criticalOperation: true
      }
    );

    // Get user profile to determine where to redirect
    const profile = await executeWithConnectionRetry(
      async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .maybeSingle();
          
        if (error) throw error;
        if (!data) throw new Error('User profile not found');
        
        return data;
      },
      {
        maxRetries: 3,
        criticalOperation: true
      }
    );

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
    // Check Supabase connection with retry logic
    const { user } = await executeWithConnectionRetry(
      async () => {
        const { data, error } = await supabase.auth.getUser(token);
        
        if (error) throw error;
        if (!data.user) throw new Error('Invalid token');
        
        return data;
      },
      {
        maxRetries: 3,
        criticalOperation: true
      }
    );

    // Get the user's profile
    const profile = await getProfileByUserId(user.id);

    // Get notification preferences
    const notificationPrefs = await getNotificationPreferences(profile.id);

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
    console.error('Token login error details:', JSON.stringify(error, null, 2));
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
