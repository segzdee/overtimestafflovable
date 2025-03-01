
import { createContext } from "react";
import { AuthContextType } from "./types";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  aiTokens: [],
  isAuthenticated: false,
  isInitialized: false,
  register: async () => {},
  login: async () => {},
  loginWithToken: async () => {},
  devLogin: async () => {},
  logout: async () => {},
  updateProfile: async () => {},
  updateNotificationPreferences: async () => {},
  generateAiToken: async () => { throw new Error("Not implemented") },
  revokeAiToken: async () => {},
});
