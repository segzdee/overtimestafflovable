import { supabase } from "@/lib/supabase/client";
import { AuthUser } from "../types";
import { setUserFromSupabase, DEV_PASSWORD } from "../utils/authUtils";
import { NavigateFunction } from "react-router-dom";
import { NotificationPreferences } from "@/lib/types";

export const register = async (
  email: string,
  password: string,
  role: AuthUser["role"],
  name: string,
  toast: any,
  category?: string
) => {
  console.log("Starting registration process:", { email, role, name, category });
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { role, name, category }
    }
  });

  if (error) {
    console.error("Registration error:", error);
    throw error;
  }

  if (data.user) {
    console.log("User registered successfully, creating profile...");
    
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

    if (profileError) {
      console.error("Profile creation error:", profileError);
      throw profileError;
    }

    console.log("Profile created successfully, setting up notification preferences...");

    const { error: notificationError } = await supabase
      .from('notification_preferences')
      .insert([
        {
          user_id: data.user.id,
          email: true,
          sms: false,
          push: true
        }
      ]);

    if (notificationError) {
      console.error("Notification preferences setup error:", notificationError);
      throw notificationError;
    }

    console.log("Registration process completed successfully");

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
  console.log("Starting login process:", { email });
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    console.error("Login error:", error);
    throw error;
  }

  if (data.user) {
    console.log("User authenticated, fetching profile...");
    
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError) {
      console.error("Profile fetch error:", profileError);
      throw profileError;
    }

    console.log("Profile fetched:", profile);

    if (profile && !profile.profile_complete) {
      console.log("Redirecting to complete profile:", `${profile.role}/complete-profile`);
      navigate(`/dashboard/${profile.role}/complete-profile`);
    } else {
      console.log("Login successful, profile is complete");
    }

    toast({
      title: "Login successful",
      description: "Welcome back!"
    });
  }
};

export const loginWithToken = async (
  token: string,
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>
) => {
  console.log("Starting token login process");
  
  const { data, error } = await supabase.auth.verifyOtp({
    token_hash: token,
    type: 'magiclink'
  });

  if (error) {
    console.error("Token verification error:", error);
    throw error;
  }
  
  if (data.user) {
    console.log("Token verified, setting up user session");
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
    verificationCompletedAt: new Date().toISOString(),
    notificationPreferences: {
      id: 0,
      userId: "dev-user",
      email: true,
      sms: false,
      push: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  };

  setUser(devUser);
  
  toast({
    title: "Developer Access Granted",
    description: "Logged in with developer privileges"
  });
};

export const updateNotificationPreferences = async (
  userId: string,
  preferences: Partial<NotificationPreferences>,
  toast: any
) => {
  const { error } = await supabase
    .from('notification_preferences')
    .update(preferences)
    .eq('user_id', userId);

  if (error) throw error;

  toast({
    title: "Preferences Updated",
    description: "Your notification preferences have been saved."
  });
};
