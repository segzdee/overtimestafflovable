
import { useState, useEffect } from 'react';

export type ConnectionStatus = 'online' | 'offline' | 'reconnecting';

/**
 * Custom hook for tracking online status with more reliability than just using navigator.onLine
 */
export const useOnlineStatus = () => {
  const [status, setStatus] = useState<ConnectionStatus>(
    navigator.onLine ? 'online' : 'offline'
  );
  const [lastPingTime, setLastPingTime] = useState<number>(Date.now());

  // Function to check connection by making a network request
  const checkConnection = async (): Promise<boolean> => {
    try {
      // Try to fetch a minimal resource to check connection
      const res = await fetch('/favicon.ico', { 
        method: 'HEAD',
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
        // Add a cache-busting parameter
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });
      return res.ok;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    // Function to update status based on navigator.onLine
    const handleStatusChange = async () => {
      if (navigator.onLine) {
        // Double-check with a real network request
        const isConnected = await checkConnection();
        if (isConnected) {
          setStatus('online');
        } else {
          setStatus('reconnecting');
        }
      } else {
        setStatus('offline');
      }
    };

    // Setup periodical checks for more reliable status reporting
    const pingInterval = setInterval(async () => {
      // Only ping if we think we're online or reconnecting
      if (status !== 'offline') {
        const isConnected = await checkConnection();
        if (!isConnected) {
          // If we can't reach the server but browser thinks we're online
          if (status === 'online') {
            setStatus('reconnecting');
          }
        } else if (status === 'reconnecting') {
          // We reconnected successfully
          setStatus('online');
        }
      }
      setLastPingTime(Date.now());
    }, 30000); // Check every 30 seconds

    // Setup listeners for online/offline events
    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);
    
    // Initial check
    handleStatusChange();

    // Clean up
    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
      clearInterval(pingInterval);
    };
  }, [status]);

  return { status, lastPingTime };
};
