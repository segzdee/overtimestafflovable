import React, { createContext, useState, useContext, ReactNode } from 'react';
import { createClient } from '@supabase/supabase-js';

// Define role permissions and dashboards
export const ROLE_PERMISSIONS = {
  admin: {
    label: 'Admin',
    permissions: ['create', 'read', 'update', 'delete', 'manage_users'],
    dashboardUrl: '/dashboard/admin',
  },
  company: {
    label: 'Company',
    permissions: ['read', 'update', 'manage_team'],
    dashboardUrl: '/dashboard/company',
  },
  agency: {
    label: 'Agency',
    permissions: ['read', 'update', 'manage_team'],
    dashboardUrl: '/dashboard/agency',
  },
  shift_worker: {
    label: 'Shift Worker',
    permissions: ['read', 'update'],
    dashboardUrl: '/dashboard/shift-worker',
  },
  ai_agent: {
    label: 'AI Agent',
    permissions: ['read'],
    dashboardUrl: '/dashboard/ai-agent',
  },
} as const;

// Define UserRole type based on the roles
export type UserRole = keyof typeof ROLE_PERMISSIONS;

// Define User interface
export interface User {
  id: string;
  email: string;
  role: UserRole;
  tenantId?: string | null;
  accountStatus: 'active' | 'suspended' | 'inactive';
  emailVerified: boolean;
  fullName?: string;
  profileCompleted: boolean;
}

// Define Auth Context Type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  checkAuthorization: (options: {
    requiredRole?: UserRole;
    tenantId?: string;
    permission?: string;
    resourceId?: string;
    action?: string;
  }) => Promise<boolean>;
  hasPermission: (permission: string) => boolean;
  getDashboardUrl: () => string;
}

// Initialize Supabase client once to prevent redundant instantiation
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create Authentication Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Login function
  const login = (userData: User) => {
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  // Check authorization via Supabase edge function
  const checkAuthorization = async ({
    requiredRole,
    tenantId,
    permission,
    resourceId,
    action,
  }: {
    requiredRole?: UserRole;
    tenantId?: string;
    permission?: string;
    resourceId?: string;
    action?: string;
  }): Promise<boolean> => {
    if (!user) return false;

    try {
      const requestBody = {
        role: requiredRole || user.role,
        tenantId: tenantId || user.tenantId,
        permission,
        resourceId,
        action,
      };

      const { data, error } = await supabase.functions.invoke('auth-role-check', {
        body: JSON.stringify(requestBody),
      });

      if (error) {
        console.error('Supabase authorization error:', error);
        return false;
      }

      return data?.authorized ?? false;
    } catch (err) {
      console.error('Authorization check failed:', err);
      return false;
    }
  };

  // Check if user has a specific permission
  const hasPermission = (permission: string): boolean => {
    return user ? ROLE_PERMISSIONS[user.role]?.permissions.includes(permission) : false;
  };

  // Get dashboard URL based on user role
  const getDashboardUrl = (): string => {
    return user ? ROLE_PERMISSIONS[user.role]?.dashboardUrl : '/login';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        checkAuthorization,
        hasPermission,
        getDashboardUrl,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

