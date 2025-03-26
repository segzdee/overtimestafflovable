import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { BaseRole } from '@/lib/types';
import { AuthUser, AuthContextType, AIToken } from './types';
import { executeWithConnectionRetry } from '@/lib/robust-connection-handler';

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
  const navigate = useNavigate();

  // Fetch user profile from profiles table
  const fetchUserProfile = async (userId: string): Promise<AuthUser | null> => {
    try {
      // Use connection retry for better resilience
      const result = await executeWithConnectionRetry(
        async () => {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

          if (error) throw error;
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
        },
        { maxRetries: 3, criticalOperation: true }
      );

      return result;
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      return null;
    }
  };

  // Fetch AI tokens for the user
  const fetchAITokens = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('ai_tokens')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const tokens: AIToken[] = data.map(token => ({
          id: token.id,
          name: token.name,
          createdAt: token.created_at,
          isActive: token.is_active,
          authorizedBy: {
            id: userId,
            name: user?.name || "Unknown"
          }
        }));
        setAiTokens(tokens);
      }
    } catch (error) {
      console.error('Error fetching AI tokens:', error);
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
          
          // Also fetch AI tokens when user logs in
          if (profile) {
            fetchAITokens(currentSession.user.id);
          }
        } else {
          setUser(null);
          setAiTokens([]);
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

        // Also fetch AI tokens
        if (profile) {
          fetchAITokens(currentSession.user.id);
        }
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const result = await executeWithConnectionRetry(
        async () => {
          const { data, error } = await supabase.auth.signInWithPassword({ email, password });
          if (error) throw error;
          return data;
        },
        { maxRetries: 3, criticalOperation: true }
      );
      
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
      
      navigate('/dashboard');
      return result;
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
      const result = await executeWithConnectionRetry(
        async () => {
          const { data, error } = await supabase.auth.signUp({
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
          if (error) throw error;
          return data;
        },
        { maxRetries: 3, criticalOperation: true }
      );

      if (result.user) {
        const profile = await fetchUserProfile(result.user.id);
        if (profile) setUser(profile);
      }

      toast({
        title: "Account created",
        description: "Check your email for verification.",
      });

      navigate('/dashboard');
      return result;
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
      setAiTokens([]);
      
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

      const result = await executeWithConnectionRetry(
        async () => {
          const { data, error } = await supabase
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
            .eq('id', user.id)
            .select()
            .single();

          if (error) throw error;
          return data;
        },
        { maxRetries: 3, criticalOperation: true }
      );

      // Update the local user state
      setUser(prev => prev ? { ...prev, ...profileData } : null);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });

      return result;
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
      const result = await executeWithConnectionRetry(
        async () => {
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
          return data;
        },
        { maxRetries: 2 }
      );

      const newToken: AIToken = {
        id: result.id,
        name: result.name,
        createdAt: result.created_at,
        isActive: result.is_active,
        authorizedBy: {
          id: userId,
          name: user?.name || "Unknown"
        }
      };

      setAiTokens(prev => [...prev, newToken]);
      
      toast({
        title: "Token generated",
        description: "Your new AI token has been created successfully."
      });
      
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
      await executeWithConnectionRetry(
        async () => {
          const { error } = await supabase
            .from('ai_tokens')
            .update({ is_active: false })
            .eq('id', tokenId);

          if (error) throw error;
          return true;
        },
        { maxRetries: 2 }
      );

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
      // Fetch the token information
      const { data, error } = await supabase
        .from('ai_tokens')
        .select('user_id, is_active')
        .eq('token', token)
        .single();
      
      if (error) throw error;
      if (!data || !data.is_active) throw new Error('Invalid or inactive token');
      
      // Get the user profile associated with this token
      const profile = await fetchUserProfile(data.user_id);
      if (!profile) throw new Error('User profile not found');
      
      // Set user and session manually
      setUser(profile);
      
      toast({
        title: "Token login successful",
        description: "You are now logged in as an AI agent"
      });
      
      navigate('/dashboard/aiagent');
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