import { NavigateFunction } from "react-router-dom";
import { AuthUser, AIToken } from "./types";
import { setUserFromSupabase } from "./utils/authUtils";
import { 
  register, 
  login, 
  logout,
  updateProfile,
  generateAiToken,
  revokeAiToken,
  resetPassword,
  updatePassword
} from "./operations/authOperations";
import { supabase } from "@/lib/supabase/client";
import { BaseRole, NotificationPreferences } from "@/lib/types";
import { executeWithConnectionRetry } from "@/lib/robust-connection-handler";

interface AuthOperationsProps {
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
  setAiTokens: React.Dispatch<React.SetStateAction<AIToken[]>>;
  navigate: NavigateFunction;
  toast: any;
}

export function useAuthOperations({ setUser, setAiTokens, navigate, toast }: AuthOperationsProps) {
  const handleRegister = async (
    email: string,
    password: string,
    userData: any
  ) => {
    try {
      const role = userData?.role as BaseRole || 'shift-worker';
      const name = userData?.firstName && userData?.lastName 
        ? `${userData.firstName} ${userData.lastName}` 
        : userData?.name || '';
      const category = userData?.category || '';
      
      await register(email, password, role, name, category);
      toast({
        title: "Account created successfully",
        description: "Please check your email to verify your account",
      });
      return { error: null, user: { email, role } };
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Failed to create account"
      });
      return { error: error instanceof Error ? error : new Error("Registration failed"), user: null };
    }
  };

  const handleLogin = async (email: string, password: string) => {
    await login(email, password, navigate, toast);
  };

  const handleUpdateProfile = async (userId: string, profileData: Partial<AuthUser>) => {
    await updateProfile(userId, profileData, setUser, toast);
  };

  const handleUpdateNotificationPreferences = async (preferences: Partial<NotificationPreferences>) => {
    if (!setUser) return;
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No user found");

    const result = await executeWithConnectionRetry(
      async () => {
        const { error } = await supabase
          .from('notification_preferences')
          .update(preferences)
          .eq('user_id', user.id);

        if (error) throw error;
        return { success: true, error: null };
      },
      {
        maxRetries: 3,
        criticalOperation: false
      }
    );

    if (result.error) throw result.error;

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
  };

  const handleGenerateAiToken = async (name: string, userId: string): Promise<AIToken> => {
    return await generateAiToken(name, userId, setAiTokens);
  };

  const handleRevokeAiToken = async (tokenId: string) => {
    await revokeAiToken(tokenId, setAiTokens);
  };

  const handleLogout = async () => {
    const result = await executeWithConnectionRetry(
      async () => {
        await logout();
        return { success: true, error: null };
      },
      {
        maxRetries: 3,
        criticalOperation: true
      }
    );
    
    if (result.error) throw result.error;
    
    setUser(null);
    navigate("/login");
    
    toast({
      title: "Logged out successfully"
    });
  };

  const handleResetPassword = async (email: string) => {
    try {
      await resetPassword(email);
      toast({
        title: "Password reset email sent",
        description: "Please check your email for further instructions"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Password reset failed",
        description: error instanceof Error ? error.message : "Failed to send reset email"
      });
      throw error;
    }
  };

  const handleUpdatePassword = async (password: string) => {
    try {
      await updatePassword(password);
      toast({
        title: "Password updated",
        description: "Your password has been successfully changed"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Password update failed",
        description: error instanceof Error ? error.message : "Failed to update password"
      });
      throw error;
    }
  };

  return {
    setUserFromSupabase: (user: any) => setUserFromSupabase(user, setUser),
    register: handleRegister,
    login: handleLogin,
    logout: handleLogout,
    updateProfile: handleUpdateProfile,
    updateNotificationPreferences: handleUpdateNotificationPreferences,
    generateAiToken: handleGenerateAiToken,
    revokeAiToken: handleRevokeAiToken,
    resetPassword: handleResetPassword,
    updatePassword: handleUpdatePassword
  };
}
