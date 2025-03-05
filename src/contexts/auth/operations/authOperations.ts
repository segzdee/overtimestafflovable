
import { supabase } from "@/lib/supabase/client";
import { NavigateFunction } from "react-router-dom";
import { AuthUser } from "../types";
import { NotificationPreferences } from "@/lib/types";
import { executeWithConnectionRetry } from "@/lib/robust-connection-handler";

// Optimized registration function with connection resiliency
export const register = async (
  email: string,
  password: string,
  role: AuthUser["role"],
  name: string,
  category?: string
) => {
  try {
    // Use our connection-resilient executor for the critical signup operation
    const data = await executeWithConnectionRetry(
      async () => {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
              role,
              category
            },
            emailRedirectTo: `${window.location.origin}/verify-email`
          }
        });
        
        if (error) {
          // Enhanced error handling
          if (error.message.includes("duplicate key") || error.message.includes("already registered")) {
            throw new Error('This email is already registered. Please use a different email or try logging in.');
          }
          throw error;
        }
        
        if (!data.user) throw new Error('No user returned from sign up');
        
        return data;
      },
      {
        maxRetries: 5,
        initialBackoff: 1000,
        maxBackoff: 30000,
        criticalOperation: true
      }
    );
    
    console.log("Supabase signup response:", data);

    // Now handle the secondary operations
    try {
      // These operations are important but non-blocking for registration
      await Promise.allSettled([
        createProfile(data.user.id, email, role, name, category),
        createNotificationPreferences(data.user.id)
      ]);
      console.log('Registration completed successfully - all data created');
    } catch (innerError) {
      console.warn('Some profile data creation failed, but user was created successfully:', innerError);
      // Don't block the signup process if secondary operations fail
    }
    
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    
    // Improve error messages for common issues
    if (error instanceof Error) {
      if (error.message.includes('network') || error.message.includes('fetch')) {
        throw new Error('Network connection issue. Please check your internet connection and try again.');
      } else if (error.message.includes('timeout')) {
        throw new Error('The request timed out. Please try again when you have a stronger connection.');
      } else if (error.message.includes('rate') || error.message.includes('too many requests')) {
        throw new Error('Too many registration attempts. Please wait a moment before trying again.');
      }
    }
    
    // If we can't provide a better message, rethrow the original
    throw error;
  }
};

// Extracted profile creation function with connection resiliency
const createProfile = async (
  userId: string,
  email: string,
  role: AuthUser["role"],
  name: string,
  category?: string
) => {
  return executeWithConnectionRetry(
    async () => {
      const { error } = await supabase.from('profiles').insert({
        id: userId,
        email,
        role,
        name,
        category,
        profile_complete: false
      });
      
      if (error) throw error;
      return { success: true };
    },
    {
      maxRetries: 3,
      criticalOperation: false // Non-blocking for registration
    }
  );
};

// Extracted notification preferences creation function with connection resiliency
const createNotificationPreferences = async (userId: string) => {
  return executeWithConnectionRetry(
    async () => {
      const { error } = await supabase.from('notification_preferences').insert({
        user_id: userId,
        email: true,
        sms: false,
        push: true
      });
      
      if (error) throw error;
      return { success: true };
    },
    {
      maxRetries: 3,
      criticalOperation: false // Non-blocking for registration
    }
  );
};

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

    // Get the user's profile with retry logic
    const profile = await executeWithConnectionRetry(
      async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();
          
        if (error) throw error;
        if (!data) throw new Error('No profile found for token');
        
        return data;
      },
      {
        maxRetries: 3,
        criticalOperation: true
      }
    );

    // Get notification preferences with retry logic
    const notificationPrefs = await executeWithConnectionRetry(
      async () => {
        const { data, error } = await supabase
          .from('notification_preferences')
          .select('*')
          .eq('user_id', profile.id)
          .maybeSingle();
          
        if (error && error.code !== 'PGRST116') throw error;
        return data;
      },
      {
        maxRetries: 3,
        criticalOperation: false
      }
    );

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
