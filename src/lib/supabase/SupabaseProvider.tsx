
import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { supabase, checkSupabaseConnection } from './client';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Loader2 } from 'lucide-react';

const SupabaseContext = createContext<{
  client: SupabaseClient;
  isConnected: boolean;
  isChecking: boolean;
  retryConnection: () => Promise<boolean>;
} | undefined>(undefined);

export function SupabaseProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(true); // Optimistic initialization
  const [isChecking, setIsChecking] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const { toast } = useToast();
  
  // Check if we're in production/live environment
  const isProduction = window.location.hostname === 'www.overtimestaff.com' || 
                      window.location.hostname === 'overtimestaff.com';

  const checkConnection = async () => {
    if (isChecking) return false; // Prevent parallel checks
    
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
      setIsChecking(false);
      return connected;
    } catch (error) {
      console.error("Error checking Supabase connection:", error);
      setIsConnected(false);
      setIsChecking(false);
      
      if (!isProduction || retryCount > 2) {
        toast({
          variant: "destructive",
          title: "Connection Error",
          description: "Unable to connect to our servers. Please check your internet connection.",
        });
      }
      return false;
    }
  };

  // Manual retry function that can be called from components
  const retryConnection = async () => {
    if (isChecking) return false;
    toast({
      title: "Retrying Connection",
      description: "Attempting to reconnect to servers..."
    });
    return await checkConnection();
  };

  useEffect(() => {
    // Initial check
    const initialCheck = async () => {
      await checkConnection();
    };
    
    initialCheck();

    // Set up periodic connection checks
    const interval = setInterval(() => {
      if (!isChecking) {
        checkConnection();
      }
    }, isConnected ? 60000 : 15000); // Check more frequently when disconnected

    return () => clearInterval(interval);
  }, [retryCount, isChecking, isConnected, isProduction]);

  return (
    <SupabaseContext.Provider value={{
      client: supabase,
      isConnected,
      isChecking,
      retryConnection
    }}>
      {children}
      {!isConnected && (
        <div className={`fixed bottom-4 left-4 ${isProduction ? 'hidden md:flex' : 'flex'} bg-amber-50 border border-amber-200 text-amber-700 px-4 py-2 rounded-md shadow-md z-50 items-center space-x-2`}>
          {isChecking ? (
            <Loader2 className="h-4 w-4 animate-spin text-amber-600" />
          ) : (
            <AlertCircle className="h-4 w-4 text-amber-600" />
          )}
          <span>Connection issues detected. {isChecking ? 'Reconnecting...' : 'Click to retry connection'}</span>
          {!isChecking && (
            <button 
              onClick={() => retryConnection()} 
              className="ml-2 px-2 py-1 bg-amber-200 text-amber-800 rounded text-xs font-medium hover:bg-amber-300 transition-colors"
            >
              Retry
            </button>
          )}
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
