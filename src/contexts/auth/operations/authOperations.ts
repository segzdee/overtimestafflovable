
import { supabase, checkSupabaseConnection } from "@/lib/supabase/client";
import { NavigateFunction } from "react-router-dom";
import { AuthUser } from "../types";
import { NotificationPreferences } from "@/lib/types";

// Helper function to add retry functionality for Supabase operations
const withRetry = async (operation: () => Promise<any>, maxRetries = 3, delay = 1000) => {
  let attempts = 0;
  
  while (attempts < maxRetries) {
    try {
      console.log(`Attempting operation (attempt ${attempts + 1}/${maxRetries})...`);
      const result = await operation();
      return result;
    } catch (error) {
      console.error(`Operation attempt ${attempts + 1} failed:`, error);
      attempts++;
      
      if (attempts < maxRetries) {
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error; // Rethrow if all retries failed
      }
    }
  }
};

export const register = async (
  email: string,
  password: string,
  role: AuthUser["role"],
  name: string,
  category?: string
) => {
  try {
    // First check Supabase connection with retry logic
    const connected = await checkSupabaseConnection(3, 1500);
    if (!connected) {
      throw new Error('Unable to connect to authentication service. Please check your internet connection and try again.');
    }

    // First create the auth user with retry logic
    const signUpOperation = async () => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
            role: role,
            category: category
          },
          emailRedirectTo: `${window.location.origin}/verify-email`
        }
      });
      
      if (error) throw error;
      if (!data.user) throw new Error('No user returned from sign up');
      
      return data;
    };
    
    const data = await withRetry(signUpOperation, 3, 1500);
    console.log("Supabase signup response:", data);

    try {
      // Create the user profile with retry logic
      const createProfileOperation = async () => {
        const { error } = await supabase.from('profiles').insert({
          id: data.user.id,
          email: email,
          role: role,
          name: name,
          category: category,
          profile_complete: false
        });
        
        if (error) throw error;
        return { success: true };
      };
      
      await withRetry(createProfileOperation, 3, 1000);
      console.log('Profile created successfully');

      // Create notification preferences with retry logic
      const createPreferencesOperation = async () => {
        const { error } = await supabase.from('notification_preferences').insert({
          user_id: data.user.id,
          email: true,
          sms: false,
          push: true
        });
        
        if (error) throw error;
        return { success: true };
      };
      
      await withRetry(createPreferencesOperation, 3, 1000);
      console.log('Notification preferences created successfully');

      console.log('Registration completed successfully');
      return data;
    } catch (innerError) {
      console.error('Inner registration error:', innerError);
      // Registration worked, but profile creation failed - don't block the signup
      return data;
    }
    
  } catch (error) {
    console.error('Registration error:', error);
    console.error('Registration error details:', JSON.stringify(error, null, 2));
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
    // Check Supabase connection with retry logic
    const connected = await checkSupabaseConnection(3, 1500);
    if (!connected) {
      throw new Error('Unable to connect to authentication service. Please check your internet connection and try again.');
    }

    const loginOperation = async () => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      if (!data.user) throw new Error('No user returned from sign in');
      
      return data;
    };
    
    const { user } = await withRetry(loginOperation, 3, 1500);

    // Get user profile to determine where to redirect
    const getProfileOperation = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .maybeSingle();
        
      if (error) throw error;
      if (!data) throw new Error('User profile not found');
      
      return data;
    };
    
    const profile = await withRetry(getProfileOperation, 3, 1000);

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
    console.error('Login error details:', JSON.stringify(error, null, 2));
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
    const connected = await checkSupabaseConnection(3, 1500);
    if (!connected) {
      throw new Error('Unable to connect to authentication service. Please check your internet connection and try again.');
    }

    const getUserOperation = async () => {
      const { data, error } = await supabase.auth.getUser(token);
      
      if (error) throw error;
      if (!data.user) throw new Error('Invalid token');
      
      return data;
    };
    
    const { user } = await withRetry(getUserOperation, 3, 1500);

    // Get the user's profile with retry logic
    const getProfileOperation = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();
        
      if (error) throw error;
      if (!data) throw new Error('No profile found for token');
      
      return data;
    };
    
    const profile = await withRetry(getProfileOperation, 3, 1000);

    // Get notification preferences with retry logic
    const getPreferencesOperation = async () => {
      const { data, error } = await supabase
        .from('notification_preferences')
        .select('*')
        .eq('user_id', profile.id)
        .maybeSingle();
        
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    };
    
    const notificationPrefs = await withRetry(getPreferencesOperation, 3, 1000);

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
