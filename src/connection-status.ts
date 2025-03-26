import React, { useEffect, useState } from 'react';
import { useSupabase } from '@/lib/supabase/SupabaseProvider';
import { WifiOff, Wifi, Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';

export function ConnectionStatus() {
  const { isConnected, isChecking, retryConnection } = useSupabase();
  const [visible, setVisible] = useState(false);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);

  // Show indicator only when connection is lost for more than 3 seconds
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (!isConnected) {
      timeout = setTimeout(() => {
        setVisible(true);
      }, 3000);
    } else {
      setVisible(false);
      setReconnectAttempts(0);
    }
    
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isConnected]);

  // Handle automatic retry logic
  useEffect(() => {
    let retryTimeout: NodeJS.Timeout;
    
    if (!isConnected && !isChecking && reconnectAttempts < 5) {
      const delay = Math.min(2000 * Math.pow(1.5, reconnectAttempts), 30000);
      
      retryTimeout = setTimeout(() => {
        handleRetryConnection();
      }, delay);
    }
    
    return () => {
      if (retryTimeout) clearTimeout(retryTimeout);
    };
  }, [isConnected, isChecking, reconnectAttempts]);

  const handleRetryConnection = async () => {
    if (!isChecking) {
      setReconnectAttempts(prev => prev + 1);
      
      const success = await retryConnection();
      
      if (success) {
        toast({
          title: "Connection restored",
          description: "You're back online."
        });
      } else if (reconnectAttempts >= 3) {
        toast({
          variant: "destructive", 
          title: "Connection issues",
          description: "We're having trouble connecting to our servers."
        });
      }
    }
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 flex items-center space-x-3">
          {isChecking ? (
            <Loader2 className="h-5 w-5 text-amber-500 animate-spin" />
          ) : (
            <WifiOff className="h-5 w-5 text-red-500" />
          )}
          
          <div>
            <p className="text-sm font-medium">
              {isChecking
                ? "Reconnecting..."
                : "Connection lost"}
            </p>
            <p className="text-xs text-gray-500">
              {isChecking
                ? "Attempting to restore connection"
                : "Check your internet connection"}
            </p>
          </div>
          
          {!isChecking && (
            <button
              onClick={handleRetryConnection}
              className="ml-2 px-3 py-1 text-xs bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Retry
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}