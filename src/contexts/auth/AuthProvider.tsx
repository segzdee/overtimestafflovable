
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { BaseRole } from '@/lib/types';
import { AuthUser, AuthContextType, AIToken } from './types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { type AuthUser };

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [aiTokens, setAiTokens] = useState<AIToken[]>([]);
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
        avatar_url: data.avatar_url,
        category: data.category,
        address: data.address,
        phoneNumber: data.phone_number,
        agencyName: data.agency_name,
        specialization: data.specialization,
        staffingCapacity: data.staffing_capacity,
        verificationStatus: data.verification_status
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
      
      navigate('/auth/login');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign out failed",
        description: error.message || "An error occurred during sign out",
      });
      throw error;
    }
  };

  const updateProfile = async (profileData: Partial<AuthUser>) => {
    try {
      if (!user) throw new Error('No user is logged in');

      const { error } = await supabase
        .from('profiles')
        .update({
          name: profileData.name,
          avatar_url: profileData.avatar_url,
          profile_complete: true,
          category: profileData.category,
          agency_name: profileData.agencyName,
          address: profileData.address,
          phone_number: profileData.phoneNumber,
          specialization: profileData.specialization,
          staffing_capacity: profileData.staffingCapacity,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      // Update the local user state
      setUser(prev => prev ? { ...prev, ...profileData } : null);
      
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

  // Generate an AI token for API access
  const generateAiToken = async (name: string, userId: string): Promise<AIToken> => {
    try {
      const { data, error } = await supabase
        .from('ai_tokens')
        .insert({
          name,
          user_id: userId,
          is_active: true
        })
        .select()
        .single();

      if (error) throw error;

      const newToken: AIToken = {
        id: data.id,
        name: data.name,
        createdAt: data.created_at,
        isActive: data.is_active,
        authorizedBy: {
          id: userId,
          name: user?.name || "Unknown"
        }
      };

      setAiTokens(prev => [...prev, newToken]);
      return newToken;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to generate token",
        description: error.message || "An error occurred"
      });
      throw error;
    }
  };

  // Revoke an AI token
  const revokeAiToken = async (tokenId: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('ai_tokens')
        .update({ is_active: false })
        .eq('id', tokenId);

      if (error) throw error;

      setAiTokens(prev => 
        prev.map(token => 
          token.id === tokenId ? { ...token, isActive: false } : token
        )
      );
      
      toast({
        title: "Token revoked",
        description: "The AI token has been successfully revoked."
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to revoke token",
        description: error.message || "An error occurred"
      });
      throw error;
    }
  };

  // Login with token (for AI agent access)
  const loginWithToken = async (token: string): Promise<void> => {
    try {
      // In a real implementation, validate the token against ai_tokens table
      toast({
        title: "Token login",
        description: "This feature is not fully implemented yet."
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Token login failed",
        description: error.message || "An error occurred"
      });
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    // Aliases for consistent naming
    login: signIn,
    register: signUp,
    logout: signOut,
    // Optional methods
    generateAiToken,
    revokeAiToken,
    loginWithToken,
    aiTokens
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
