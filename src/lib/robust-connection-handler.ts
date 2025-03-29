
import { useState, useEffect } from 'react';

// Define the types for online status
type OnlineStatus = 'online' | 'offline' | 'reconnecting';

interface OnlineStatusHook {
  status: OnlineStatus;
  lastOnline: Date | null;
  checkConnection: () => Promise<boolean>;
}

// Function to check connection by fetching a minimal resource
const checkConnection = async (): Promise<boolean> => {
  try {
    // Try to fetch a minimal resource to check connection
    const res = await fetch('/favicon.ico', { 
      method: 'HEAD',
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache' }
    });
    return res.ok;
  } catch (error) {
    return false;
  }
};

// Custom hook for online status monitoring
export const useOnlineStatus = (): OnlineStatusHook => {
  const [status, setStatus] = useState<OnlineStatus>(
    navigator.onLine ? 'online' : 'offline'
  );
  const [lastOnline, setLastOnline] = useState<Date | null>(
    navigator.onLine ? new Date() : null
  );
  const [isReconnecting, setIsReconnecting] = useState(false);

  // Handler for online event
  const handleOnline = () => {
    setStatus('online');
    setLastOnline(new Date());
  };

  // Handler for offline event
  const handleOffline = async () => {
    // Double-check the connection to avoid false negatives
    const isActuallyConnected = await checkConnection();
    
    if (!isActuallyConnected) {
      setStatus('offline');
      setIsReconnecting(true);
      // Try to reconnect
      const reconnect = setInterval(async () => {
        const connected = await checkConnection();
        if (connected) {
          setStatus('online');
          setLastOnline(new Date());
          setIsReconnecting(false);
          clearInterval(reconnect);
        }
      }, 5000); // Check every 5 seconds
    }
  };

  useEffect(() => {
    // Set up event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check the connection on mount
    checkConnection().then(connected => {
      setStatus(connected ? 'online' : 'offline');
      if (connected) {
        setLastOnline(new Date());
      }
    });

    // Clean up event listeners
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return {
    status: isReconnecting ? 'reconnecting' : status,
    lastOnline,
    checkConnection
  };
};
