
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

  const { data: updatedProfile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (updatedProfile) {
    setUser((prev: AuthUser | null) => prev ? {
      ...prev,
      ...profileData,
      profileComplete: true,
      verificationStatus: updatedProfile.verification_status,
      emailVerified: updatedProfile.email_verified,
      verificationSentAt: updatedProfile.verification_sent_at,
      verificationCompletedAt: updatedProfile.verification_completed_at,
      reviewNotes: updatedProfile.review_notes
    } : null);

    // Show appropriate toast message based on verification status
    switch (updatedProfile.verification_status) {
      case 'pending':
        toast({
          title: "Profile Updated",
          description: "Please check your email to verify your account"
        });
        break;
      case 'under_review':
        toast({
          title: "Profile Submitted",
          description: "Your profile is under review. We'll notify you once it's approved."
        });
        break;
      case 'verified':
        toast({
          title: "Profile Updated",
          description: "Your profile has been verified"
        });
        break;
      case 'rejected':
        toast({
          title: "Profile Updated",
          description: `Your profile needs attention: ${updatedProfile.review_notes || 'No specific notes provided'}`
        });
        break;
      default:
        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated"
        });
    }
  }
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
