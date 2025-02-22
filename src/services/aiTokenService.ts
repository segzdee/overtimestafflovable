
import type { AIToken } from "@/types/auth";

export const generateToken = (name: string, userId: string, userName: string): AIToken => {
  return {
    id: Math.random().toString(36).substring(2),
    name,
    createdAt: new Date().toISOString(),
    isActive: true,
    authorizedBy: {
      id: userId,
      name: userName
    }
  };
};
