
// This file provides a simple API for monitoring online status

// Function to check connection
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

// Initialize and start online status monitoring
export const startOnlineStatusMonitoring = (): void => {
  // Initial status check
  const isOnline = navigator.onLine;
  console.log(`Initial connection status: ${isOnline ? 'online' : 'offline'}`);
  
  // Set up event listeners for online and offline events
  window.addEventListener('online', () => {
    console.log('Connection restored');
    // You could trigger a notification here or other actions
  });
  
  window.addEventListener('offline', async () => {
    // Double-check the connection to avoid false negatives
    const isActuallyConnected = await checkConnection();
    
    if (!isActuallyConnected) {
      console.log('Connection lost');
      // You could trigger a notification here or other actions
    }
  });
  
  // Additional heartbeat check every minute to ensure we're really online
  setInterval(async () => {
    const isConnected = await checkConnection();
    if (isConnected !== navigator.onLine) {
      // If there's a discrepancy, update the browser's online status
      console.log(`Connection status corrected: ${isConnected ? 'online' : 'offline'}`);
      // Dispatch the appropriate event to update browser's status
      window.dispatchEvent(new Event(isConnected ? 'online' : 'offline'));
    }
  }, 60000); // Check every minute
};

// Export a function to manually check current connection
export const checkCurrentConnection = async (): Promise<boolean> => {
  return await checkConnection();
};
