
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { BaseRole } from '@/lib/types';

export interface AuthUser {
  id: string;
  email: string;
  role: BaseRole;
  name: string;
  profileComplete?: boolean;
  emailVerified?: boolean;
  avatar_url?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role: BaseRole, name: string, category?: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (profile: Partial<AuthUser>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch user profile from profiles table
  const fetchUserProfile = async (userId: string): Promise<AuthUser | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      if (!data) return null;

      return {
        id: data.id,
        email: data.email,
        role: data.role as BaseRole,
        name: data.name,
        profileComplete: data.profile_complete,
        emailVerified: data.email_verified,
        avatar_url: data.avatar_url
      };
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      return null;
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession);
        
        if (currentSession && currentSession.user) {
          const profile = await fetchUserProfile(currentSession.user.id);
          setUser(profile);
        } else {
          setUser(null);
        }
        
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      setSession(currentSession);
      
      if (currentSession && currentSession.user) {
        const profile = await fetchUserProfile(currentSession.user.id);
        setUser(profile);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: error.message || "An error occurred during sign in",
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, role: BaseRole, name: string, category?: string) => {
    try {
      // First, create the auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
            category
          }
        }
      });
      
      if (authError) throw authError;

      // We'll rely on the database trigger to create the profile record
      // But we can fetch it to confirm it was created
      if (authData.user) {
        const profile = await fetchUserProfile(authData.user.id);
        if (profile) {
          setUser(profile);
        }
      }

      toast({
        title: "Account created",
        description: "Your account has been created successfully. Please check your email for verification.",
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: error.message || "An error occurred during sign up",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      setUser(null);
      setSession(null);
      
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      
      navigate('/login');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign out failed",
        description: error.message || "An error occurred during sign out",
      });
      throw error;
    }
  };

  const updateProfile = async (profile: Partial<AuthUser>) => {
    try {
      if (!user) throw new Error('No user is logged in');

      const { error } = await supabase
        .from('profiles')
        .update({
          name: profile.name,
          avatar_url: profile.avatar_url,
          profile_complete: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      // Update the local user state
      setUser(prev => prev ? { ...prev, ...profile } : null);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Profile update failed",
        description: error.message || "An error occurred while updating profile",
      });
      throw error;
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
