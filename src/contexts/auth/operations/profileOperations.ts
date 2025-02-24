
import { supabase } from "@/lib/supabase/client";
import { AuthUser, AIToken } from "../types";

export const updateProfile = async (
  userId: string,
  profileData: Partial<AuthUser>,
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>,
  toast: any
) => {
  const { error } = await supabase
    .from('profiles')
    .update({
      ...profileData,
      profile_complete: true,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId);

  if (error) throw error;

  setUser((prev: AuthUser | null) => prev ? { ...prev, ...profileData, profileComplete: true } : null);

  toast({
    title: "Profile Updated",
    description: "Your profile has been successfully updated"
  });
};

export const generateAiToken = async (
  name: string,
  userId: string,
  setAiTokens: React.Dispatch<React.SetStateAction<AIToken[]>>
): Promise<AIToken> => {
  const newToken: AIToken = {
    id: Math.random().toString(36).substring(2),
    name,
    createdAt: new Date().toISOString(),
    isActive: true,
    authorizedBy: {
      id: userId,
      name: ""
    }
  };
  
  setAiTokens((current: AIToken[]) => [...current, newToken]);
  return newToken;
};

export const revokeAiToken = async (
  tokenId: string,
  setAiTokens: React.Dispatch<React.SetStateAction<AIToken[]>>
) => {
  setAiTokens((current: AIToken[]) => 
    current.map(token => 
      token.id === tokenId ? { ...token, isActive: false } : token
    )
  );
};
