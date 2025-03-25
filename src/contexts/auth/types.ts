
import { BaseRole } from "@/lib/types";

export type VerificationStatus = 'pending' | 'verified' | 'under_review' | 'rejected';

export interface AuthUser {
  id: string;
  email: string;
  role: BaseRole;
  name: string;
  category?: string;
  profileComplete?: boolean;
  agencyName?: string;
  address?: string;
  phoneNumber?: string;
  specialization?: string;
  staffingCapacity?: number;
  verificationStatus?: VerificationStatus;
  emailVerified?: boolean;
  verificationSentAt?: string;
  verificationCompletedAt?: string;
  reviewNotes?: string;
  avatar_url?: string;
}

export interface AIToken {
  id: string;
  name: string;
  createdAt: string;
  isActive: boolean;
  authorizedBy?: {
    id: string;
    name: string;
  };
}

export interface AuthContextType {
  user: AuthUser | null;
  session: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role: BaseRole, name: string, category?: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (profile: Partial<AuthUser>) => Promise<void>;
  
  // Aliases for consistent naming
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role: BaseRole, name: string, category?: string) => Promise<void>;
  logout: () => Promise<void>;
  
  // Optional methods
  loginWithToken?: (token: string) => Promise<void>;
  generateAiToken?: (name: string, userId: string) => Promise<AIToken>;
  revokeAiToken?: (tokenId: string) => Promise<void>;
  aiTokens?: AIToken[];
}
