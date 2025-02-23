
import { User } from "@supabase/supabase-js";

export interface AuthUser {
  id: string;
  email: string;
  role: "admin" | "shift-worker" | "company" | "agency" | "aiagent";
  name: string;
  category?: string;
  profileComplete: boolean;
  agencyName?: string;
  address?: string;
  phoneNumber?: string;
  specialization?: string;
  staffingCapacity?: number;
}

export interface AIToken {
  id: string;
  name: string;
  createdAt: string;
  isActive: boolean;
  authorizedBy: {
    id: string;
    name: string;
  };
}

export interface AuthContextType {
  user: AuthUser | null;
  register: (email: string, password: string, role: AuthUser["role"], name: string, category?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithToken: (token: string) => Promise<void>;
  devLogin: (password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userId: string, profileData: Partial<AuthUser>) => Promise<void>;
  generateAiToken: (name: string, userId: string) => Promise<AIToken>;
  revokeAiToken: (token: string) => Promise<void>;
  aiTokens: AIToken[];
}
