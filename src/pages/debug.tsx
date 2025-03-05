
import { SupabaseDebugPanel } from "@/components/debug/SupabaseDebugPanel";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { runConnectionDiagnostics } from "@/lib/robust-connection-handler";
import { checkSupabaseConnection } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function DebugPage() {
  const [connectionStatus, setConnectionStatus] = useState<boolean | null>(null);
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);
  
  // Check if we're in production environment
  const isProduction = window.location.hostname === 'www.overtimestaff.com' || 
                      window.location.hostname === 'overtimestaff.com';

  useEffect(() => {
    // Initial connection check
    checkConnection();
  }, []);

  const checkConnection = async () => {
    setIsCheckingConnection(true);
    try {
      const connected = await checkSupabaseConnection();
      setConnectionStatus(connected);
    } catch (error) {
      console.error("Connection check failed:", error);
      setConnectionStatus(false);
    } finally {
      setIsCheckingConnection(false);
    }
  };

  const handleRunDiagnostics = async () => {
    const results = await runConnectionDiagnostics();
    console.log("Diagnostic results:", results);
  };

  if (isProduction) {
    return (
      <div className="container py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Debug tools are disabled in production</AlertTitle>
          <AlertDescription>
            These tools are only available in development environments for security reasons.
          </AlertDescription>
        </Alert>
        
        <div className="mt-4">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Supabase Connection Debugging</h1>
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to App
            </Button>
          </Link>
        </div>
        <p className="text-gray-600 mt-2">
          This page contains tools to help diagnose and debug Supabase connection issues.
        </p>
      </div>

      <div className="grid gap-8 grid-cols-1">
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Quick Connection Check</h2>
          
          <div className="flex items-center space-x-4 mb-4">
            <Button 
              onClick={checkConnection}
              disabled={isCheckingConnection}
              variant="outline"
            >
              {isCheckingConnection ? 'Checking...' : 'Check Connection'}
            </Button>
            
            {connectionStatus !== null && (
              <span className={`flex items-center ${connectionStatus ? 'text-green-600' : 'text-red-600'}`}>
                {connectionStatus ? '✓ Connected' : '✗ Not Connected'}
              </span>
            )}
          </div>
          
          <Button 
            onClick={handleRunDiagnostics}
            disabled={isCheckingConnection}
          >
            Run Full Diagnostics (Check Console)
          </Button>
        </Card>

        <SupabaseDebugPanel />

        <div className="text-sm text-gray-500 mt-4">
          <p>Note: All diagnostic information is logged to the browser console. Open the developer tools to view detailed results.</p>
        </div>
      </div>
    </div>
  );
}
