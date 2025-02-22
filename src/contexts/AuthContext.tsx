
import { createContext, useContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface User {
  email: string;
  role: "admin" | "shift-worker" | "company" | "agency";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  loginWithToken: (token: string) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Stub functions - will be connected to Supabase
  const login = async (email: string, password: string): Promise<User> => {
    // Temporary mock authentication
    const mockUser = {
      email,
      role: email.includes("admin") ? "admin" : "shift-worker",
    } as User;
    
    setUser(mockUser);
    return mockUser;
  };

  const loginWithToken = async (token: string): Promise<User> => {
    // Temporary mock token authentication
    const mockUser = {
      email: "agent@example.com",
      role: "company",
    } as User;
    
    setUser(mockUser);
    return mockUser;
  };

  const logout = () => {
    setUser(null);
    navigate("/");
    toast({
      title: "Logged out successfully",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
