
import { NavigateFunction } from "react-router-dom";
import { AuthUser, AIToken } from "./types";
import { setUserFromSupabase } from "./utils/authUtils";
import { register, login, loginWithToken, devLogin } from "./operations/authOperations";
import { updateProfile, generateAiToken, revokeAiToken } from "./operations/profileOperations";
import { supabase } from "@/lib/supabase";

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
    await register(email, password, role, name, toast, category);
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
    generateAiToken: handleGenerateAiToken,
    revokeAiToken: handleRevokeAiToken
  };
}
