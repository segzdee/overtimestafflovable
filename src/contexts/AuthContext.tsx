
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: string;
  email: string;
  role: "admin" | "shift-worker" | "company" | "agency" | "aiagent";
  name: string;
  profileComplete: boolean;
  password?: string; // Optional as it won't be included in currentUser
  authorizedBy?: {
    id: string;
    name: string;
    role: "company" | "agency";
  };
  token?: string;
}

interface AIToken {
  id: string;
  token: string;
  name: string;
  authorizedBy: {
    id: string;
    name: string;
    role: "company" | "agency";
  };
  createdAt: string;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  users: User[];
  aiTokens: AIToken[];
  register: (email: string, password: string, role: User["role"], name: string) => Promise<User>;
  login: (email: string, password: string) => Promise<User>;
  loginWithToken: (token: string) => Promise<User>;
  logout: () => void;
  updateProfile: (userId: string, profileData: Partial<User>) => void;
  generateAiToken: (name: string, authorizedByUserId: string) => AIToken;
  revokeAiToken: (tokenId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Initialize users from localStorage or with default admin
  const [users, setUsers] = useState<User[]>(() => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [
      {
        id: 'admin1',
        email: 'admin@example.com',
        password: 'Admin123!',
        role: 'admin',
        name: 'System Admin',
        profileComplete: true
      }
    ];
  });

  // Initialize AI tokens from localStorage
  const [aiTokens, setAiTokens] = useState<AIToken[]>(() => {
    const storedTokens = localStorage.getItem('aiTokens');
    return storedTokens ? JSON.parse(storedTokens) : [];
  });

  // Check for stored user session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Persist users and tokens to localStorage
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('aiTokens', JSON.stringify(aiTokens));
  }, [aiTokens]);

  const register = async (email: string, password: string, role: User["role"], name: string): Promise<User> => {
    if (users.find(user => user.email === email)) {
      throw new Error('User with this email already exists');
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      password,
      role,
      name,
      profileComplete: false
    };

    setUsers(prev => [...prev, newUser]);
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    toast({
      title: "Registration successful",
      description: "Welcome to the platform!"
    });

    return newUser;
  };

  const login = async (email: string, password: string): Promise<User> => {
    const foundUser = users.find(user => user.email === email && user.password === password);
    
    if (!foundUser) {
      throw new Error('Invalid email or password');
    }
    
    setUser(foundUser);
    localStorage.setItem('currentUser', JSON.stringify(foundUser));
    
    toast({
      title: "Login successful",
      description: `Welcome back, ${foundUser.name}!`
    });
    
    return foundUser;
  };

  const loginWithToken = async (token: string): Promise<User> => {
    const aiToken = aiTokens.find(t => t.token === token && t.isActive);
    
    if (!aiToken) {
      throw new Error('Invalid or inactive token');
    }
    
    const aiUser: User = {
      id: aiToken.id,
      email: `ai-${aiToken.id}@system.local`,
      name: aiToken.name,
      role: 'aiagent',
      authorizedBy: aiToken.authorizedBy,
      token: token,
      profileComplete: true
    };
    
    setUser(aiUser);
    localStorage.setItem('currentUser', JSON.stringify(aiUser));
    
    toast({
      title: "AI Agent Login successful",
      description: `Welcome, ${aiUser.name}`
    });
    
    return aiUser;
  };

  const generateAiToken = (name: string, authorizedByUserId: string): AIToken => {
    const authUser = users.find(user => user.id === authorizedByUserId);
    
    if (!authUser || (authUser.role !== 'company' && authUser.role !== 'agency')) {
      throw new Error('Only Company and Agency users can authorize AI agents');
    }
    
    const token = Math.random().toString(36).substring(2, 15) + 
                 Math.random().toString(36).substring(2, 15);
    
    const newToken: AIToken = {
      id: Date.now().toString(),
      token,
      name,
      authorizedBy: {
        id: authUser.id,
        name: authUser.name,
        role: authUser.role
      },
      createdAt: new Date().toISOString(),
      isActive: true
    };
    
    setAiTokens(prev => [...prev, newToken]);
    
    toast({
      title: "AI Token Generated",
      description: `Token created for ${name}`
    });
    
    return newToken;
  };

  const revokeAiToken = (tokenId: string): void => {
    setAiTokens(prev => 
      prev.map(token => 
        token.id === tokenId 
          ? { ...token, isActive: false } 
          : token
      )
    );
    
    toast({
      title: "AI Token Revoked",
      description: "The token has been deactivated"
    });
  };

  const updateProfile = (userId: string, profileData: Partial<User>): void => {
    const updatedUsers = users.map(u => {
      if (u.id === userId) {
        const updatedUser = { ...u, ...profileData, profileComplete: true };
        
        if (user && user.id === userId) {
          setUser(updatedUser);
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        }
        
        return updatedUser;
      }
      return u;
    });
    
    setUsers(updatedUsers);
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated"
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    navigate("/");
    toast({
      title: "Logged out successfully"
    });
  };

  const value = {
    user,
    users,
    aiTokens,
    register,
    login,
    loginWithToken,
    logout,
    updateProfile,
    generateAiToken,
    revokeAiToken
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
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
