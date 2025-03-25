
import { useState, useEffect } from "react";
import { AuthUser, AIToken } from "../types";

export function useAuthState() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [aiTokens, setAiTokens] = useState<AIToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Error parsing stored user:", err);
      }
    }
    setLoading(false);
  }, []);

  return {
    user,
    setUser,
    aiTokens,
    setAiTokens,
    loading,
    setLoading,
    error,
    setError
  };
}
