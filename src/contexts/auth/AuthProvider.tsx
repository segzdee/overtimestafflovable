
import { ReactNode, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase/client";
import { AuthContext } from "./AuthContext";
import { AuthUser, AIToken } from "./types";
import { useAuthOperations } from "./useAuthOperations";

// Constants for better maintainability
const SESSION_STORAGE_KEY = 'supabase.auth.token';
const REFRESH_INTERVAL = 30 * 60 * 1000; // 30 minutes instead of 1 hour

interface AuthProviderProps {
  children: ReactNode;
  initialRedirect?: string; // Optional prop to redirect after authentication
  loadingComponent?: ReactNode; // Customizable loading component
}

export function AuthProvider({ 
  children, 
  initialRedirect = '/', 
  loadingComponent = <div className="flex items-center justify-center min-h-screen">Loading...</div> 
}: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [aiTokens, setAiTokens] = useState<AIToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const operations = useAuthOperations({ setUser, setAiTokens, navigate, toast });

  // Memoize session initialization to prevent unnecessary reruns
  const initializeAuth = useCallback(async () => {
    try {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        console.log("Restoring session for user:", session.user.id);
        
        try {
          // Use Promise.all to parallelize where possible
          const [userResult, tokenResult] = await Promise.all([
            operations.setUserFromSupabase(session.user),
            supabase.auth.getUser(session.access_token)
          ]);
          
          // Verify the token is still valid
          if (tokenResult.error) {
            console.log("Invalid session token, signing out");
            await supabase.auth.signOut();
            setUser(null);
            localStorage.removeItem(SESSION_STORAGE_KEY);
            
            toast({
              title: "Session expired",
              description: "Please sign in again to continue.",
              variant: "destructive"
            });
          }
        } catch (error) {
          console.error("User data retrieval error:", error);
          await supabase.auth.signOut();
          setUser(null);
        }
      }
    } catch (error) {
      console.error("Session initialization error:", error);
      setUser(null);
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  }, [operations, toast]);

  // Session refresh function
  const refreshSession = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { error } = await supabase.auth.refreshSession();
        if (error) {
          console.error("Session refresh error:", error);
          await supabase.auth.signOut();
          setUser(null);
          localStorage.removeItem(SESSION_STORAGE_KEY);
          
          toast({
            title: "Session expired",
            description: "Please sign in again to continue.",
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      console.error("Session refresh failed:", error);
    }
  }, [toast]);

  useEffect(() => {
    // Auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        localStorage.setItem(SESSION_STORAGE_KEY, session?.access_token || '');
        
        if (event === 'SIGNED_IN' && session?.user) {
          operations.setUserFromSupabase(session.user)
            .then(() => {
              toast({
                title: "Welcome back!",
                description: "You have successfully signed in.",
                duration: 3000,
              });
              
              if (!initialized && initialRedirect) {
                navigate(initialRedirect);
              }
            })
            .catch(error => {
              console.error("Error setting user data:", error);
            });
        }
      }
      
      if (event === 'SIGNED_OUT') {
        localStorage.removeItem(SESSION_STORAGE_KEY);
        setUser(null);
        setAiTokens([]);
        
        toast({
          title: "Signed out",
          description: "You have been successfully signed out.",
          duration: 3000,
        });
      }
    });

    // Initialize auth on component mount
    initializeAuth();

    // Setup refresh interval - more frequent refresh for better security
    const refreshTimer = setInterval(refreshSession, REFRESH_INTERVAL);

    // Cleanup function
    return () => {
      subscription.unsubscribe();
      clearInterval(refreshTimer);
    };
  }, [initializeAuth, refreshSession, operations, navigate, toast, initialized, initialRedirect]);

  // Protect against memory leaks and unnecessary renders
  useEffect(() => {
    // Add a listener for tab visibility to refresh token when user returns to the app
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && user) {
        refreshSession();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleVisibilityChange);
    };
  }, [refreshSession, user]);

  if (loading) {
    return <>{loadingComponent}</>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        aiTokens,
        isAuthenticated: !!user,
        isInitialized: initialized,
        ...operations
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
