
import { AuthUser, AIToken } from "../types";
import { loginUser, registerUser } from "@/services/authService";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export function useAuthMethods(
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>,
  setAiTokens: React.Dispatch<React.SetStateAction<AIToken[]>>
) {
  const navigate = useNavigate();
  const { toast } = useToast();

  const register = async (
    email: string,
    password: string,
    role: AuthUser["role"],
    name: string,
    category?: string
  ) => {
    try {
      const userData = await registerUser({
        email,
        password,
        role,
        name,
        category
      });
      
      localStorage.setItem('auth_user', JSON.stringify(userData));
      
      toast({
        title: "Account created successfully",
        description: "You can now log in with your credentials",
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

  const login = async (email: string, password: string) => {
    try {
      const userData = await loginUser(email, password);
      
      if (userData) {
        setUser(userData);
        localStorage.setItem('auth_user', JSON.stringify(userData));
        
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
        
        navigate(`/dashboard/${userData.role}`);
        return;
      }
      
      throw new Error("Invalid credentials");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid credentials"
      });
      throw error;
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('auth_user');
    navigate("/login");
    
    toast({
      title: "Logged out successfully"
    });
  };

  const updateProfile = async (userId: string, profileData: Partial<AuthUser>) => {
    setUser(currentUser => {
      if (currentUser && currentUser.id === userId) {
        const updatedUser = { ...currentUser, ...profileData, profileComplete: true };
        localStorage.setItem('auth_user', JSON.stringify(updatedUser));
        
        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated"
        });
        
        return updatedUser;
      }
      return currentUser;
    });
  };

  return {
    register,
    login,
    logout,
    updateProfile
  };
}
