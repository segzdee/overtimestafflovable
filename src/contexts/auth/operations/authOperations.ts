
import { supabase } from "@/lib/supabase/client";
import { NavigateFunction } from "react-router-dom";
import { AuthUser } from "../types";
import { NotificationPreferences } from "@/lib/types";

export const register = async (
  email: string,
  password: string,
  role: AuthUser["role"],
  name: string,
  category?: string
) => {
  try {
    // First check Supabase connection before attempting registration
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    console.log("Supabase connection check:", sessionData ? "Connected" : "Not connected", sessionError);
    
    if (sessionError) {
      console.error('Supabase connection error:', JSON.stringify(sessionError, null, 2));
      throw new Error('Unable to connect to authentication service. Please try again later.');
    }

    // First create the auth user
    const { data: { user }, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
          role: role,
          category: category
        }
      }
    });

    if (signUpError) {
      console.error('Signup error:', signUpError);
      console.error('Signup error details:', JSON.stringify(signUpError, null, 2));
      throw signUpError;
    }
    
    if (!user) {
      throw new Error('No user returned from sign up');
    }

    // Create the user profile with retry logic
    const { error: profileError } = await supabase.from('profiles').insert({
      id: user.id,
      email: email,
      role: role,
      name: name,
      category: category,
      profile_complete: false
    }).maybeSingle();

    if (profileError) {
      console.error('Profile creation error:', profileError);
      console.error('Profile creation error details:', JSON.stringify(profileError, null, 2));
      throw profileError;
    }

    // Create notification preferences
    const { error: prefsError } = await supabase.from('notification_preferences').insert({
      user_id: user.id,
      email: true,
      sms: false,
      push: true
    }).maybeSingle();

    if (prefsError) {
      console.error('Notification preferences error:', prefsError);
      console.error('Notification preferences error details:', JSON.stringify(prefsError, null, 2));
      throw prefsError;
    }

    console.log('Registration completed successfully');
    
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
    // Check Supabase connection before attempting login
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    console.log("Supabase connection check:", sessionData ? "Connected" : "Not connected", sessionError);
    
    if (sessionError) {
      console.error('Supabase connection error:', JSON.stringify(sessionError, null, 2));
      throw new Error('Unable to connect to authentication service. Please try again later.');
    }

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
      .maybeSingle();

    if (profileError) throw profileError;
    if (!profile) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "User profile not found"
      });
      navigate('/login');
      return;
    }

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
    // Check Supabase connection before attempting token login
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    console.log("Supabase connection check:", sessionData ? "Connected" : "Not connected", sessionError);
    
    if (sessionError) {
      console.error('Supabase connection error:', JSON.stringify(sessionError, null, 2));
      throw new Error('Unable to connect to authentication service. Please try again later.');
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error) throw error;
    if (!user) throw new Error('Invalid token');

    // Get the user's profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (profileError) throw profileError;
    if (!profile) throw new Error('No profile found for token');

    // Get notification preferences
    const { data: notificationPrefs, error: prefError } = await supabase
      .from('notification_preferences')
      .select('*')
      .eq('user_id', profile.id)
      .maybeSingle();

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
