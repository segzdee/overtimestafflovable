import { ReactNode, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase/client";
import { AuthContext } from "./AuthContext";
import { AuthUser, AIToken } from "./types";
import { useAuthOperations } from "./useAuthOperations";
import { useAuthHooks } from "@/hooks/useAuthHooks";
import { RegistrationService } from "@/lib/registration/registration-service";

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
  const authHooks = useAuthHooks();
  
  useEffect(() => {
    const registrationService = new RegistrationService();
    registrationService.setAuthHooks(authHooks);
    
    const processPending = async () => {
      const pendingRegistration = registrationService.getPendingRegistration();
      if (pendingRegistration) {
        const result = await registrationService.processPendingRegistration();
        if (result && result.success) {
          toast({
            title: "Registration Complete",
            description: "Your pending registration was successfully processed.",
            variant: "default",
          });
          registrationService.clearPendingRegistration();
        }
      }
    };
    
    processPending();
  }, [authHooks, toast]);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      const handleAuthEvent = (event: string, session: any) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          authHooks.sendAuthDiagnostic('login_success', 
            { userId: session?.user?.id }, 
            { event, sessionId: session?.access_token?.substring(0, 8) }
          );
        }
        if (event === 'SIGNED_OUT') {
          authHooks.sendAuthDiagnostic('logout', 
            { userId: user?.id }, 
            { event, manual: true }
          );
        }
      };
      
      handleAuthEvent(event, session);
      
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        localStorage.setItem('supabase.auth.token', session?.access_token || '');
      }
      if (event === 'SIGNED_OUT') {
        localStorage.removeItem('supabase.auth.token');
        setUser(null);
      }
    });

    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          console.log("Restoring session for user:", session.user.id);
          await operations.setUserFromSupabase(session.user);
          
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
    }, 3600000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, [authHooks, user?.id]);

  if (loading) {
    return <div>Loading...</div>;
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
