
import { ReactNode, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase/client";
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
    console.log("AuthProvider: Checking initial session");
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        console.log("Initial session found, setting up user");
        operations.setUserFromSupabase(session.user);
      } else {
        console.log("No initial session found");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state change event:", event);
      
      if (session?.user) {
        console.log("Session updated, refreshing user data");
        await operations.setUserFromSupabase(session.user);
      } else {
        console.log("Session ended, clearing user data");
        setUser(null);
      }
    });

    return () => {
      console.log("Cleaning up auth subscriptions");
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        aiTokens,
        ...operations
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
