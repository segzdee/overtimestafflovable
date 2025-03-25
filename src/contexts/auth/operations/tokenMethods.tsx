
import { AIToken } from "../types";
import { useToast } from "@/components/ui/use-toast";

export function useTokenMethods(
  setAiTokens: React.Dispatch<React.SetStateAction<AIToken[]>>
) {
  const { toast } = useToast();

  const generateAiToken = async (name: string, userId: string): Promise<AIToken> => {
    const newToken: AIToken = {
      id: Math.random().toString(36).substring(2),
      name,
      createdAt: new Date().toISOString(),
      isActive: true,
      authorizedBy: {
        id: userId,
        name: "User" // This would be replaced with actual user name
      }
    };
    
    setAiTokens((current) => [...current, newToken]);
    
    toast({
      title: "Token Generated",
      description: "Your AI token has been created successfully"
    });
    
    return newToken;
  };

  const revokeAiToken = async (tokenId: string) => {
    setAiTokens((current) => 
      current.map(token => 
        token.id === tokenId ? { ...token, isActive: false } : token
      )
    );
    
    toast({
      title: "Token Revoked",
      description: "Your AI token has been revoked"
    });
  };

  const updateNotificationPreferences = async (preferences: Partial<any>) => {
    toast({
      title: "Preferences Updated",
      description: "Your notification preferences have been saved."
    });
  };

  return {
    generateAiToken,
    revokeAiToken,
    updateNotificationPreferences
  };
}
