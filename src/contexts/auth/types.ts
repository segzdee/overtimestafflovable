
export interface User {
  id: string;
  email: string;
  role?: string;
  [key: string]: any;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp?: (email: string, password: string, data?: any) => Promise<void>;
  resetPassword?: (email: string) => Promise<void>;
}
