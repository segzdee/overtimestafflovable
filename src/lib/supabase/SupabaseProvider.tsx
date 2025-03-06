
import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { supabase, checkSupabaseConnection } from './client';
import { useToast } from '@/hooks/use-toast';

const SupabaseContext = createContext<SupabaseClient | undefined>(undefined);

export function SupabaseProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(true); // Optimistic initialization
  const [isChecking, setIsChecking] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const { toast } = useToast();
  
  // Check if we're in production/live environment
  const isProduction = window.location.hostname === 'www.overtimestaff.com' || 
                      window.location.hostname === 'overtimestaff.com';

  useEffect(() => {
    const checkConnection = async () => {
      if (isChecking) return; // Prevent parallel checks
      
      setIsChecking(true);
      try {
        const connected = await checkSupabaseConnection(3, 5000);
        
        if (!connected && isConnected) {
          // We've lost connection
          setIsConnected(false);
          
          // Don't show toast in production for transient issues
          if (!isProduction || retryCount > 1) {
            toast({
              variant: "default",
              title: "Connection Issue",
              description: "Attempting to reconnect to our servers...",
            });
          }
          
          setRetryCount(prev => prev + 1);
        } else if (connected && !isConnected) {
          // Connection restored
          setIsConnected(true);
          
          if (retryCount > 0) {
            toast({
              title: "Connected",
              description: "Connection to the server has been restored",
            });
            setRetryCount(0);
          }
        }
        
        // Update connection state
        setIsConnected(connected);
      } catch (error) {
        console.error("Error checking Supabase connection:", error);
        setIsConnected(false);
        
        if (!isProduction || retryCount > 2) {
          toast({
            variant: "destructive",
            title: "Connection Error",
            description: "Unable to connect to our servers. Please check your internet connection.",
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
    }, isConnected ? 60000 : 15000); // Check more frequently when disconnected

    return () => clearInterval(interval);
  }, [toast, retryCount, isChecking, isConnected, isProduction]);

  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
      {!isConnected && !isProduction && (
        <div className="fixed bottom-4 left-4 bg-amber-50 border border-amber-200 text-amber-700 px-4 py-2 rounded-md shadow-md z-50 flex items-center space-x-2">
          <span className="animate-ping h-2 w-2 rounded-full bg-amber-400 opacity-75"></span>
          <span>Connection issues detected. Attempting to reconnect...</span>
        </div>
      )}
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
