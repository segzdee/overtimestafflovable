
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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const operations = useAuthOperations({ setUser, setAiTokens, navigate, toast });

  useEffect(() => {
    // Persist session in localStorage
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        localStorage.setItem('supabase.auth.token', session?.access_token || '');
      }
      if (event === 'SIGNED_OUT') {
        localStorage.removeItem('supabase.auth.token');
        setUser(null);
      }
    });

    // Check for existing session
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          console.log("Restoring session for user:", session.user.id);
          await operations.setUserFromSupabase(session.user);
          
          // Verify the token is still valid
          const { error: tokenError } = await supabase.auth.getUser(session.access_token);
          if (tokenError) {
            console.log("Invalid session token, signing out");
            await supabase.auth.signOut();
            setUser(null);
          }
        }
      } catch (error) {
        console.error("Session initialization error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Refresh session periodically
    const refreshInterval = setInterval(async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { error } = await supabase.auth.refreshSession();
        if (error) {
          console.error("Session refresh error:", error);
          await supabase.auth.signOut();
          setUser(null);
        }
      }
    }, 3600000); // Refresh every hour

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

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
