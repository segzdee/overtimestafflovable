
import { ReactNode, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { AuthContext } from "./AuthContext";
import { AuthUser, AIToken } from "./types";
import { useAuthOperations } from "./useAuthOperations";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [aiTokens, setAiTokens] = useState<AIToken[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  const operations = useAuthOperations({ setUser, setAiTokens, navigate, toast });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        operations.setUserFromSupabase(session.user);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await operations.setUserFromSupabase(session.user);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        ...operations,
        aiTokens
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
