
import { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export function OfflineNotification() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  if (!isOffline) {
    return null;
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-yellow-100 text-yellow-800 p-3 z-50 flex items-center justify-center">
      <AlertTriangle className="h-5 w-5 mr-2" />
      <span>You are currently offline. Some features may be unavailable.</span>
    </div>
  );
}
