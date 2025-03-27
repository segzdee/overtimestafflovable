
import { Session, User } from '@supabase/supabase-js';
import { BaseRole } from '@/lib/types';

export interface AuthUser {
  id: string;
  email: string;
  role?: string;
  name?: string;
  verified?: boolean;
  avatar?: string;
  address?: string;
  phoneNumber?: string;
  specialization?: string;
  staffingCapacity?: number;
  category?: string;
  agencyName?: string;
  profileComplete?: boolean;
  notificationPreferences?: Record<string, any>;
}

export interface AIToken {
  id: string;
  name: string;
  createdAt: string;
  isActive: boolean;
  token?: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: {
    id: string;
    email: string;
    role: BaseRole;
    metadata?: Record<string, any>;
  } | null;
  login: (email: string, password: string) => Promise<{ error: Error | null }>;
  logout: () => Promise<void>;
  register: (email: string, password: string, userData: any) => Promise<{ error: Error | null; user: any | null }>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  updateUser: (data: any) => Promise<{ error: Error | null; data: any | null }>;
  generateAiToken: (name: string) => Promise<{ error: Error | null; token: string | null }>;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
