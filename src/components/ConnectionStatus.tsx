
import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { checkConnection, runConnectionDiagnostics } from '@/lib/robust-connection-handler';
import { Link } from 'react-router-dom';

export function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [supabaseConnected, setSupabaseConnected] = useState(true);
  const [checking, setChecking] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [autoRetrying, setAutoRetrying] = useState(false);

  // Check if we're in production environment
  const isProduction = window.location.hostname === 'www.overtimestaff.com' || 
                      window.location.hostname === 'overtimestaff.com';

  // If we're in production, don't show any connection status
  if (isProduction) {
    return null;
  }

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

  // Check Supabase connection when online
  useEffect(() => {
    if (!isOnline) {
      setSupabaseConnected(false);
      return;
    }

    const checkSupabaseConnection = async () => {
      try {
        const connected = await checkConnection();
        setSupabaseConnected(connected);
        
        // If we're connected, reset retry count
        if (connected) {
          setRetryCount(0);
          setAutoRetrying(false);
        }
      } catch (error) {
        console.error("Connection check error:", error);
        setSupabaseConnected(false);
      }
    };

    // Check connection immediately
    checkSupabaseConnection();
    
    // And then check every 10 seconds
    const interval = setInterval(checkSupabaseConnection, 10000);
    return () => clearInterval(interval);
  }, [isOnline]);

  // Auto-retry logic
  useEffect(() => {
    if (!isOnline || supabaseConnected || !autoRetrying) return;
    
    let retryTimeout: number;
    
    const attemptReconnect = async () => {
      setChecking(true);
      try {
        console.log(`Auto-retry attempt ${retryCount + 1}`);
        const connected = await checkConnection();
        setSupabaseConnected(connected);
        
        if (connected) {
          setRetryCount(0);
          setAutoRetrying(false);
        } else {
          // Exponential backoff with max of 30 seconds
          const nextRetryDelay = Math.min(2000 * Math.pow(1.5, retryCount), 30000);
          console.log(`Will retry in ${nextRetryDelay}ms`);
          
          setRetryCount(prev => prev + 1);
          retryTimeout = window.setTimeout(attemptReconnect, nextRetryDelay);
        }
      } catch (error) {
        console.error("Auto-retry failed:", error);
      } finally {
        setChecking(false);
      }
    };
    
    // Start the first auto-retry
    retryTimeout = window.setTimeout(attemptReconnect, 1000);
    
    return () => {
      clearTimeout(retryTimeout);
    };
  }, [autoRetrying, isOnline, supabaseConnected, retryCount]);

  const handleManualRetry = async () => {
    setChecking(true);
    try {
      const connected = await checkConnection();
      setSupabaseConnected(connected);
      
      if (!connected) {
        // Start auto-retry process
        setAutoRetrying(true);
      }
    } catch (error) {
      console.error("Manual connection retry error:", error);
    } finally {
      setChecking(false);
    }
  };

  const handleRunDiagnostics = async () => {
    const results = await runConnectionDiagnostics();
    console.log("Connection diagnostic results:", results);
  };

  // Don't show anything if everything is connected
  if (isOnline && supabaseConnected) {
    return null;
  }

  return (
    <div className={`p-4 rounded-lg mb-4 ${isOnline ? "bg-orange-100 border border-orange-200" : "bg-red-100 border border-red-200"}`}>
      <div className="flex items-start">
        <div className={`p-2 rounded-full ${isOnline ? "bg-orange-50" : "bg-red-50"} mr-3`}>
          {autoRetrying ? (
            <RefreshCw className={`h-5 w-5 animate-spin ${isOnline ? "text-orange-500" : "text-red-500"}`} />
          ) : (
            <WifiOff className={`h-5 w-5 ${isOnline ? "text-orange-500" : "text-red-500"}`} />
          )}
        </div>
        <div className="flex-1">
          <h3 className={`text-lg font-medium ${isOnline ? "text-orange-800" : "text-red-800"}`}>
            {autoRetrying 
              ? "Attempting to reconnect..." 
              : isOnline 
                ? "Connection Error" 
                : "Network Offline"}
          </h3>
          <p className={`mt-1 text-sm ${isOnline ? "text-orange-700" : "text-red-700"}`}>
            {autoRetrying 
              ? `Retry attempt ${retryCount}... Please wait while we try to restore your connection.`
              : isOnline 
                ? "Unable to connect to the authentication service. This could be due to temporary service issues."
                : "Your device appears to be offline. Please check your internet connection."}
          </p>
          
          {!autoRetrying && (
            <div className="mt-3 flex flex-wrap gap-2">
              <Button 
                type="button"
                variant="outline" 
                size="sm"
                className={`bg-white border ${isOnline ? "border-orange-200 hover:bg-orange-50" : "border-red-200 hover:bg-red-50"}`}
                disabled={checking}
                onClick={handleManualRetry}
              >
                <Wifi className="h-4 w-4 mr-2" /> 
                {checking ? "Checking..." : "Retry Connection"}
              </Button>
              
              {isOnline && (
                <>
                  <Button 
                    type="button"
                    variant="outline" 
                    size="sm"
                    className="bg-white border border-orange-200 hover:bg-orange-50"
                    onClick={() => window.location.reload()}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" /> 
                    Reload Page
                  </Button>
                  
                  <Button 
                    type="button"
                    variant="outline" 
                    size="sm"
                    className="bg-white border border-orange-200 hover:bg-orange-50"
                    onClick={handleRunDiagnostics}
                  >
                    <Terminal className="h-4 w-4 mr-2" /> 
                    Run Diagnostics
                  </Button>
                  
                  <Link to="/debug">
                    <Button 
                      type="button"
                      variant="outline" 
                      size="sm"
                      className="bg-white border border-orange-200 hover:bg-orange-50"
                    >
                      Debug Tools
                    </Button>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
