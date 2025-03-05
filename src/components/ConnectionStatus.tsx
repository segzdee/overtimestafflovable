
import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Wifi, WifiOff } from "lucide-react";
import { checkConnection } from '@/lib/robust-connection-handler';

export function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [supabaseConnected, setSupabaseConnected] = useState(true);
  const [checking, setChecking] = useState(false);

  // Check browser online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Check actual Supabase connection periodically
  useEffect(() => {
    if (!isOnline) {
      setSupabaseConnected(false);
      return;
    }

    const checkSupabaseConnection = async () => {
      try {
        const connected = await checkConnection();
        setSupabaseConnected(connected);
      } catch (error) {
        console.error("Connection check error:", error);
        setSupabaseConnected(false);
      }
    };

    // Check connection immediately and then every 30 seconds
    checkSupabaseConnection();
    const interval = setInterval(checkSupabaseConnection, 30000);

    return () => clearInterval(interval);
  }, [isOnline]);

  const handleRetryConnection = async () => {
    setChecking(true);
    try {
      const connected = await checkConnection();
      setSupabaseConnected(connected);
    } catch (error) {
      console.error("Retry connection error:", error);
      setSupabaseConnected(false);
    } finally {
      setChecking(false);
    }
  };

  // Don't show anything if everything is connected
  if (isOnline && supabaseConnected) {
    return null;
  }

  return (
    <Alert className={isOnline ? "bg-orange-50 border-orange-200" : "bg-red-50 border-red-200"}>
      <WifiOff className={`h-4 w-4 ${isOnline ? "text-orange-600" : "text-red-600"}`} />
      <AlertTitle className={isOnline ? "text-orange-800" : "text-red-800"}>
        {isOnline ? "Service Connection Issue" : "Network Offline"}
      </AlertTitle>
      <AlertDescription className={isOnline ? "text-orange-700" : "text-red-700"}>
        {isOnline 
          ? "Unable to connect to the authentication service. We'll automatically retry when the service is available."
          : "Your device appears to be offline. Please check your internet connection."}
        
        <Button 
          type="button"
          variant="outline" 
          size="sm"
          className="mt-2 bg-white"
          disabled={checking}
          onClick={handleRetryConnection}
        >
          <Wifi className="h-4 w-4 mr-2" /> 
          {checking ? "Checking..." : "Check Connection"}
        </Button>
      </AlertDescription>
    </Alert>
  );
}
