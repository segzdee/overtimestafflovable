
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
  console.log("Starting registration process");

  // First check if user already exists
  const { data: existingUser } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', email)
    .single();

  if (existingUser) {
    throw new Error('An account with this email already exists');
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { role, name, category },
      emailRedirectTo: `${window.location.origin}/verify-email`
    }
  });

  if (error) {
    console.error("Registration error:", error);
    throw error;
  }

  if (!data.user) {
    throw new Error('Registration failed');
  }

  // Create profile after successful registration
  const { error: profileError } = await supabase
    .from('profiles')
    .insert([
      {
        id: data.user.id,
        email,
        role,
        name,
        category,
        email_verified: false,
        profile_complete: false,
        verification_status: 'pending'
      }
    ]);

  if (profileError) {
    console.error("Profile creation error:", profileError);
    throw profileError;
  }

  toast({
    title: "Registration successful",
    description: "Please check your email to verify your account.",
  });

  return data;
};

export const login = async (
  email: string,
  password: string,
  navigate: NavigateFunction,
  toast: any
) => {
  console.log("Starting login process");

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    console.error("Login error:", error);
    throw error;
  }

  if (!data.user) {
    throw new Error('Login failed');
  }

  // Check email verification status
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single();

  if (!profile?.email_verified) {
    const { error: resendError } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/verify-email`
      }
    });

    if (!resendError) {
      toast({
        title: "Email verification required",
        description: "We've sent you a new verification email. Please check your inbox.",
        variant: "warning"
      });
    }
    throw new Error('Please verify your email before logging in');
  }

  // Update last login timestamp
  await supabase
    .from('profiles')
    .update({ last_login: new Date().toISOString() })
    .eq('id', data.user.id);

  toast({
    title: "Login successful",
    description: "Welcome back!"
  });

  // Navigate based on profile completion
  if (!profile.profile_complete) {
    navigate(`/dashboard/${profile.role}/complete-profile`);
  } else {
    navigate(`/dashboard/${profile.role}`);
  }

  return data;
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
    throw new Error('Invalid development password');
  }

  const testUser = {
    id: 'dev-user',
    email: 'dev@example.com',
    role: 'agency' as AuthUser['role'],
    name: 'Dev User',
    profileComplete: true,
    emailVerified: true,
    verificationStatus: 'verified' as AuthUser['verificationStatus']
  };

  setUser(testUser);
  
  toast({
    title: "Development login successful",
    description: "Logged in with development account"
  });
};
