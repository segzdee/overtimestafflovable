
import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { supabase, checkSupabaseConnection } from './client';
import { useToast } from '@/components/ui/use-toast';

const SupabaseContext = createContext<SupabaseClient | undefined>(undefined);

export function SupabaseProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkConnection = async () => {
      const connected = await checkSupabaseConnection();
      setIsConnected(connected);
      
      if (!connected) {
        toast({
          variant: "destructive",
          title: "Connection Error",
          description: "Unable to connect to the database. Please try again later."
        });
      }
    };

    checkConnection();
  }, []);

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
