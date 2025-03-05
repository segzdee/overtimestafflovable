
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RotateCw, Check, AlertTriangle, XCircle } from "lucide-react";
import { runSupabaseDiagnostics } from '@/lib/debug/supabaseDebugger';
import { toast } from "sonner";

interface DiagnosticResult {
  success: boolean;
  message: string;
  details?: any;
  timing?: number;
  error?: any;
}

export function SupabaseDebugRunner() {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<Record<string, DiagnosticResult> | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  const runDiagnostics = async () => {
    setIsRunning(true);
    setResults(null);
    
    try {
      // Get configuration from env vars
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qdyyfxgonldvghrtjhnn.supabase.co';
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkeXlmeGdvbmxkdmdocnRqaG5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0MDAzMTMsImV4cCI6MjA1NTk3NjMxM30.eS660marbWwss7pQFbMUBJ_e2mhH7JBJvaP7Kr3ZU0M';
      
      toast.info("Running Supabase diagnostics...");
      
      const diagnosticResults = await runSupabaseDiagnostics(
        supabaseUrl,
        supabaseAnonKey,
        {
          logLevel: 'verbose',
          networkTestCount: 5,
          timeoutThreshold: 10000 // Increase timeout to 10 seconds
        }
      );
      
      setResults(diagnosticResults);
      
      // Count issues
      const issueCount = Object.values(diagnosticResults).filter(r => !r.success).length;
      if (issueCount > 0) {
        toast.error(`Diagnostics complete. Found ${issueCount} issues.`);
      } else {
        toast.success("Diagnostics complete. No issues found!");
      }
    } catch (error) {
      console.error("Error running diagnostics:", error);
      toast.error("Error running diagnostics. Check console for details.");
    } finally {
      setIsRunning(false);
    }
  };

  const getIssuesOnly = () => {
    if (!results) return {};
    
    return Object.entries(results)
      .filter(([_, result]) => !result.success)
      .reduce((obj, [key, value]) => ({...obj, [key]: value}), {});
  };

  const getWarningsOnly = () => {
    if (!results) return {};
    
    return Object.entries(results)
      .filter(([_, result]) => result.success && (result.message.includes('high') || result.message.includes('slow')))
      .reduce((obj, [key, value]) => ({...obj, [key]: value}), {});
  };

  const getPassedOnly = () => {
    if (!results) return {};
    
    return Object.entries(results)
      .filter(([_, result]) => result.success && !(result.message.includes('high') || result.message.includes('slow')))
      .reduce((obj, [key, value]) => ({...obj, [key]: value}), {});
  };

  const renderResultCard = (key: string, result: DiagnosticResult) => {
    let icon;
    let colorClass;
    
    if (!result.success) {
      icon = <XCircle className="h-5 w-5 text-red-500" />;
      colorClass = "border-red-200 bg-red-50";
    } else if (result.message.includes('high') || result.message.includes('slow')) {
      icon = <AlertTriangle className="h-5 w-5 text-amber-500" />;
      colorClass = "border-amber-200 bg-amber-50";
    } else {
      icon = <Check className="h-5 w-5 text-green-500" />;
      colorClass = "border-green-200 bg-green-50";
    }
    
    return (
      <Card key={key} className={`p-4 mb-4 ${colorClass}`}>
        <div className="flex items-start">
          <div className="mr-3 mt-1">{icon}</div>
          <div className="flex-1">
            <h3 className="text-lg font-medium mb-1">{key}</h3>
            <p className="text-gray-700 mb-2">{result.message}</p>
            {result.timing && (
              <p className="text-sm text-gray-500 mb-2">Time: {result.timing.toFixed(2)}ms</p>
            )}
            
            {result.error && (
              <div className="mt-2 p-3 bg-gray-100 rounded text-sm font-mono overflow-auto">
                <p className="font-bold mb-1">Error details:</p>
                <pre className="whitespace-pre-wrap">
                  {JSON.stringify(result.error, null, 2)}
                </pre>
              </div>
            )}
            
            {result.details && (
              <details className="mt-2">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                  Show details
                </summary>
                <div className="mt-2 p-3 bg-gray-100 rounded text-sm font-mono overflow-auto">
                  <pre className="whitespace-pre-wrap">
                    {JSON.stringify(result.details, null, 2)}
                  </pre>
                </div>
              </details>
            )}
          </div>
        </div>
      </Card>
    );
  };

  // Count results by type
  const issueCount = results ? Object.values(results).filter(r => !r.success).length : 0;
  const warningCount = results ? Object.values(results).filter(r => r.success && (r.message.includes('high') || r.message.includes('slow'))).length : 0;
  const passedCount = results ? Object.values(results).filter(r => r.success && !(r.message.includes('high') || r.message.includes('slow'))).length : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Supabase Connection Diagnostics</h2>
        <Button 
          onClick={runDiagnostics} 
          disabled={isRunning}
          className="flex items-center"
        >
          {isRunning && <RotateCw className="h-4 w-4 mr-2 animate-spin" />}
          {isRunning ? 'Running Tests...' : 'Run Diagnostics'}
        </Button>
      </div>
      
      {results && (
        <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">
              All Tests ({Object.keys(results).length})
            </TabsTrigger>
            <TabsTrigger value="failed" disabled={issueCount === 0}>
              Issues ({issueCount})
            </TabsTrigger>
            <TabsTrigger value="warnings" disabled={warningCount === 0}>
              Warnings ({warningCount})
            </TabsTrigger>
            <TabsTrigger value="passed" disabled={passedCount === 0}>
              Passed ({passedCount})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            {Object.entries(results).map(([key, result]) => renderResultCard(key, result))}
          </TabsContent>
          
          <TabsContent value="failed" className="mt-0">
            {Object.entries(getIssuesOnly()).map(([key, result]) => renderResultCard(key, result))}
          </TabsContent>
          
          <TabsContent value="warnings" className="mt-0">
            {Object.entries(getWarningsOnly()).map(([key, result]) => renderResultCard(key, result))}
          </TabsContent>
          
          <TabsContent value="passed" className="mt-0">
            {Object.entries(getPassedOnly()).map(([key, result]) => renderResultCard(key, result))}
          </TabsContent>
        </Tabs>
      )}
      
      {!results && !isRunning && (
        <Card className="p-6 flex flex-col items-center justify-center text-center">
          <p className="text-gray-600 mb-4">
            Run the diagnostics to test your Supabase connection and identify potential issues.
          </p>
          <p className="text-sm text-gray-500">
            Tests will check environment variables, network latency, authentication, database connection, 
            and more to help troubleshoot connection problems.
          </p>
        </Card>
      )}
      
      {isRunning && (
        <Card className="p-6 flex flex-col items-center justify-center text-center">
          <RotateCw className="h-10 w-10 text-primary animate-spin mb-4" />
          <p className="text-lg font-medium">Running diagnostic tests...</p>
          <p className="text-sm text-gray-500 mt-2">
            This may take up to 30 seconds. Please don't navigate away from this page.
          </p>
        </Card>
      )}
    </div>
  );
}
