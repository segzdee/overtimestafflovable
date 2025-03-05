
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { runSupabaseDiagnostics } from "./supabaseDebugger";

export function useSupabaseDebugger() {
  const [isRunning, setIsRunning] = useState(false);
  const [diagnosticResults, setDiagnosticResults] = useState<Record<string, any> | null>(null);
  const [error, setError] = useState<Error | null>(null);

  // Get configuration from current environment
  const getSupabaseConfig = () => {
    // Extract from the current client
    const url = import.meta.env.VITE_SUPABASE_URL || 'https://qdyyfxgonldvghrtjhnn.supabase.co';
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkeXlmeGdvbmxkdmdocnRqaG5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0MDAzMTMsImV4cCI6MjA1NTk3NjMxM30.eS660marbWwss7pQFbMUBJ_e2mhH7JBJvaP7Kr3ZU0M';

    return { url, key };
  };

  const runDiagnostics = async (options: { 
    logLevel?: 'verbose' | 'normal' | 'minimal',
    networkTestCount?: number,
    testEmail?: string,
    testPassword?: string
  } = {}) => {
    setIsRunning(true);
    setError(null);
    setDiagnosticResults(null);

    try {
      const { url, key } = getSupabaseConfig();
      
      const results = await runSupabaseDiagnostics(
        url,
        key,
        {
          logLevel: options.logLevel || 'normal',
          networkTestCount: options.networkTestCount || 3,
          testEmail: options.testEmail,
          testPassword: options.testPassword
        }
      );
      
      setDiagnosticResults(results);
      return results;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error during diagnostics');
      setError(error);
      throw error;
    } finally {
      setIsRunning(false);
    }
  };

  return {
    runDiagnostics,
    isRunning,
    diagnosticResults,
    error
  };
}
