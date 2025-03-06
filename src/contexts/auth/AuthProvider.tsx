
import { ReactNode, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase/client";
import { AuthContext } from "./AuthContext";
import { AuthUser, AIToken } from "./types";
import { useAuthOperations } from "./useAuthOperations";
import { useAuthHooks } from "@/hooks/useAuthHooks";
import { RegistrationService } from "@/lib/registration/registration-service";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [aiTokens, setAiTokens] = useState<AIToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const operations = useAuthOperations({ setUser, setAiTokens, navigate, toast });
  const authHooks = useAuthHooks();
  
  useEffect(() => {
    const registrationService = new RegistrationService();
    registrationService.setAuthHooks(authHooks);
    
    const processPending = async () => {
      try {
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
      } catch (err) {
        console.error("Error processing pending registration:", err);
      }
    };
    
    processPending();
  }, [authHooks, toast]);

  useEffect(() => {
    const handleAuthChange = supabase.auth.onAuthStateChange((event, session) => {
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
      setLoading(true);
      setError(null);
      
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
        setError(error instanceof Error ? error : new Error('Unknown authentication error'));
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const refreshInterval = setInterval(async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const { error } = await supabase.auth.refreshSession();
          if (error) {
            console.error("Session refresh error:", error);
            await supabase.auth.signOut();
            setUser(null);
          }
        }
      } catch (err) {
        console.error("Error refreshing session:", err);
      }
    }, 3600000);

    return () => {
      clearInterval(refreshInterval);
      handleAuthChange.data.subscription.unsubscribe();
    };
  }, [authHooks, operations, user?.id]);

  if (error) {
    return (
      <ErrorBoundary>
        <div className="flex flex-col items-center justify-center h-screen p-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full text-center">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Authentication Error</h2>
            <p className="text-red-700 mb-4">{error.message}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <ErrorBoundary>
      <AuthContext.Provider
        value={{
          user,
          aiTokens,
          ...operations
        }}
      >
        {children}
      </AuthContext.Provider>
    </ErrorBoundary>
  );
}
