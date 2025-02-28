
import { NavigateFunction } from "react-router-dom";
import { AuthUser, AIToken } from "./types";
import { setUserFromSupabase } from "./utils/authUtils";
import { register, login, loginWithToken, devLogin } from "./operations/authOperations";
import { updateProfile, generateAiToken, revokeAiToken } from "./operations/profileOperations";
import { supabase } from "@/lib/supabase/client";
import { NotificationPreferences } from "@/lib/types";

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
    role: AuthUser["role"],
    name: string,
    category?: string
  ) => {
    try {
      await register(email, password, role, name, category);
      toast({
        title: "Account created successfully",
        description: "Please check your email to verify your account",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Failed to create account"
      });
      throw error;
    }
  };

  const handleLogin = async (email: string, password: string) => {
    await login(email, password, navigate, toast);
  };

  const handleLoginWithToken = async (token: string) => {
    await loginWithToken(token, setUser);
  };

  const handleDevLogin = async (password: string) => {
    await devLogin(password, setUser, toast);
  };

  const handleUpdateProfile = async (userId: string, profileData: Partial<AuthUser>) => {
    await updateProfile(userId, profileData, setUser, toast);
  };

  const handleUpdateNotificationPreferences = async (preferences: Partial<NotificationPreferences>) => {
    if (!setUser) return;
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No user found");

    const { error } = await supabase
      .from('notification_preferences')
      .update(preferences)
      .eq('user_id', user.id);

    if (error) throw error;

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

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    setUser(null);
    navigate("/login");
    
    toast({
      title: "Logged out successfully"
    });
  };

  return {
    setUserFromSupabase: (user: any) => setUserFromSupabase(user, setUser),
    register: handleRegister,
    login: handleLogin,
    loginWithToken: handleLoginWithToken,
    devLogin: handleDevLogin,
    logout,
    updateProfile: handleUpdateProfile,
    updateNotificationPreferences: handleUpdateNotificationPreferences,
    generateAiToken: handleGenerateAiToken,
    revokeAiToken: handleRevokeAiToken
  };
}
