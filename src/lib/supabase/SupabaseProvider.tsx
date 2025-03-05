
import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { supabase, checkSupabaseConnection } from './client';
import { useToast } from '@/hooks/use-toast';

const SupabaseContext = createContext<SupabaseClient | undefined>(undefined);

export function SupabaseProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const { toast } = useToast();
  
  // Check if we're in production/live environment
  const isProduction = window.location.hostname === 'www.overtimestaff.com' || 
                      window.location.hostname === 'overtimestaff.com';

  useEffect(() => {
    const checkConnection = async () => {
      setIsChecking(true);
      try {
        const connected = await checkSupabaseConnection(3, 2000);
        setIsConnected(connected);
        
        if (!connected && retryCount < 3) {
          // Attempt to reconnect, but only show toast in development
          if (!isProduction) {
            toast({
              variant: "default",
              title: "Reconnecting...",
              description: "Attempting to reconnect to the server",
            });
          }
          
          setRetryCount(prev => prev + 1);
          
          // Wait 3 seconds before retrying
          setTimeout(() => {
            checkConnection();
          }, 3000);
        } else if (!connected && !isProduction) {
          // Only show toast in development
          toast({
            variant: "destructive",
            title: "Connection Error",
            description: "Please check your internet connection and reload the page",
          });
        } else if (connected && retryCount > 0 && !isProduction) {
          // Successfully reconnected, only show toast in development
          toast({
            title: "Connected",
            description: "Connection to the server has been restored",
          });
          setRetryCount(0);
        }
      } catch (error) {
        console.error("Error checking Supabase connection:", error);
        setIsConnected(false);
        
        // Only show toast in development
        if (!isProduction) {
          toast({
            variant: "destructive",
            title: "Connection Error",
            description: "Unable to connect to the server. Please try again later.",
          });
        }
      } finally {
        setIsChecking(false);
      }
    };

    // Initial check
    checkConnection();

    // Set up periodic connection checks
    const interval = setInterval(() => {
      if (!isChecking) {
        checkConnection();
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [toast, retryCount, isChecking, isProduction]);

  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
}

export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
}
