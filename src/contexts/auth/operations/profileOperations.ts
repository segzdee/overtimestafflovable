
import { supabase } from "@/lib/supabase/client";
import { AuthUser, AIToken } from "../types";
import { executeWithConnectionRetry } from "@/lib/robust-connection-handler";
import { BaseRole } from "@/lib/types";

export const updateProfile = async (
  userId: string,
  profileData: Partial<AuthUser>,
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>,
  toast: any
) => {
  try {
    if (!userId) throw new Error("No user ID provided");

    const result = await executeWithConnectionRetry(
      async () => {
        const { data, error } = await supabase
          .from('profiles')
          .update(profileData)
          .eq('id', userId)
          .select('*')
          .single();

        if (error) throw error;
        return { data, error: null };
      },
      {
        maxRetries: 3,
        criticalOperation: true
      }
    );

    if (result.error) throw result.error;

    // Update user state with new profile data
    setUser(currentUser => {
      if (!currentUser) return null;
      return { ...currentUser, ...profileData };
    });

    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated."
    });

  } catch (error) {
    toast({
      variant: "destructive",
      title: "Profile Update Failed",
      description: error instanceof Error ? error.message : "Failed to update profile"
    });
    throw error;
  }
};

export const generateAiToken = async (
  name: string,
  userId: string,
  setAiTokens: React.Dispatch<React.SetStateAction<AIToken[]>>
): Promise<AIToken> => {
  try {
    const result = await executeWithConnectionRetry(
      async () => {
        // Generate a token through Supabase function
        const { data, error } = await supabase.functions.invoke('generate-ai-token', {
          body: { name, userId }
        });

        if (error) throw error;
        return { data, error: null };
      },
      {
        maxRetries: 3,
        criticalOperation: true
      }
    );

    if (result.error) throw result.error;

    const newToken: AIToken = {
      id: result.data.id,
      name: result.data.name,
      createdAt: result.data.created_at,
      isActive: true,
      token: result.data.token
    };

    // Update tokens in state
    setAiTokens(current => [...current, newToken]);

    return newToken;
  } catch (error) {
    console.error('Error generating AI token:', error);
    throw error;
  }
};

export const revokeAiToken = async (
  tokenId: string,
  setAiTokens: React.Dispatch<React.SetStateAction<AIToken[]>>
) => {
  try {
    const result = await executeWithConnectionRetry(
      async () => {
        const { error } = await supabase.functions.invoke('revoke-ai-token', {
          body: { tokenId }
        });

        if (error) throw error;
        return { error: null };
      },
      {
        maxRetries: 3,
        criticalOperation: true
      }
    );

    if (result.error) throw result.error;

    // Update the token status in state
    setAiTokens(current =>
      current.map(token =>
        token.id === tokenId
          ? { ...token, isActive: false }
          : token
      )
    );
  } catch (error) {
    console.error('Error revoking AI token:', error);
    throw error;
  }
};
