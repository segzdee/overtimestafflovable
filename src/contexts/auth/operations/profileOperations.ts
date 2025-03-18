import { supabase } from "@/lib/supabase/client";
import { AuthUser, AIToken } from "../types";
import { executeWithConnectionRetry } from "@/lib/robust-connection-handler";
import { NotificationPreferences } from "@/lib/types";

export const updateProfile = async (
  userId: string,
  profileData: Partial<AuthUser>,
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>,
  toast: any
) => {
  try {
    await executeWithConnectionRetry(
      async () => {
        const response = await supabase
          .from('profiles')
          .update({
            ...profileData,
            profile_complete: true,
            updated_at: new Date().toISOString()
          })
          .eq('id', userId);
          
        if (response.error) throw response.error;
        return response;
      },
      {
        maxRetries: 3,
        criticalOperation: true
      }
    );

    // Get the updated profile data
    const updatedProfile = await executeWithConnectionRetry(
      async () => {
        const response = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();
          
        if (response.error) throw response.error;
        return response.data;
      },
      {
        maxRetries: 2,
        criticalOperation: true
      }
    );

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
  } catch (error) {
    console.error('Profile update error:', error);
    toast({
      variant: "destructive",
      title: "Update failed",
      description: error instanceof Error ? error.message : "Failed to update profile"
    });
    throw error;
  }
};

export const updateNotificationPreferences = async (
  userId: string,
  preferences: Partial<NotificationPreferences>,
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>,
  toast: any
) => {
  try {
    await executeWithConnectionRetry(
      async () => {
        const { error } = await supabase
          .from('notification_preferences')
          .update(preferences)
          .eq('user_id', userId);
          
        if (error) throw error;
        return { success: true };
      },
      {
        maxRetries: 2,
        criticalOperation: false
      }
    );

    setUser(currentUser => {
      if (!currentUser) return null;
      return {
        ...currentUser,
        notificationPreferences: {
          ...currentUser.notificationPreferences,
          ...preferences
        } as NotificationPreferences
      };
    });

    toast({
      title: "Preferences Updated",
      description: "Your notification preferences have been saved."
    });
  } catch (error) {
    console.error('Notification preferences update error:', error);
    toast({
      variant: "destructive",
      title: "Update failed",
      description: error instanceof Error ? error.message : "Failed to update preferences"
    });
    throw error;
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
