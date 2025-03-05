
import { useState } from "react";
import { useSupabaseDebugger } from "@/lib/debug/useSupabaseDebugger";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";

export function SupabaseDebugPanel() {
  const { runDiagnostics, isRunning, diagnosticResults, error } = useSupabaseDebugger();
  const [verboseMode, setVerboseMode] = useState(false);
  
  // Check if we're in production environment
  const isProduction = window.location.hostname === 'www.overtimestaff.com' || 
                      window.location.hostname === 'overtimestaff.com';

  // Don't render in production
  if (isProduction) {
    return null;
  }

  const handleRunDiagnostics = () => {
    runDiagnostics({
      logLevel: verboseMode ? 'verbose' : 'normal',
      networkTestCount: 3
    });
  };

  const getStatusBadge = (success: boolean, hasWarning?: boolean) => {
    if (success && !hasWarning) {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 flex items-center">
        <CheckCircle2 className="h-3 w-3 mr-1" />
        Pass
      </Badge>;
    } else if (success && hasWarning) {
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 flex items-center">
        <AlertCircle className="h-3 w-3 mr-1" />
        Warning
      </Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-200 flex items-center">
        <XCircle className="h-3 w-3 mr-1" />
        Fail
      </Badge>;
    }
  };

  return (
    <Card className="p-4 max-w-3xl mx-auto my-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Supabase Connection Diagnostics</h2>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setVerboseMode(!verboseMode)}
          >
            {verboseMode ? 'Simple Mode' : 'Verbose Mode'}
          </Button>
          <Button 
            onClick={handleRunDiagnostics} 
            disabled={isRunning}
            size="sm"
          >
            {isRunning ? 'Running...' : 'Run Diagnostics'}
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
          <h3 className="font-medium">Error running diagnostics</h3>
          <p className="text-sm">{error.message}</p>
        </div>
      )}

      {diagnosticResults && (
        <div className="mt-4">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-medium">Results Summary</h3>
            <div className="flex space-x-2">
              <Badge variant="outline">
                Tests: {Object.keys(diagnosticResults).length}
              </Badge>
              <Badge variant="destructive" className={Object.values(diagnosticResults).filter(r => !r.success).length === 0 ? 'opacity-50' : ''}>
                Issues: {Object.values(diagnosticResults).filter(r => !r.success).length}
              </Badge>
              <Badge variant="secondary" className={Object.values(diagnosticResults).filter(r => r.success && (r.message.includes('high') || r.message.includes('slow'))).length === 0 ? 'opacity-50' : ''}>
                Warnings: {Object.values(diagnosticResults).filter(r => r.success && (r.message.includes('high') || r.message.includes('slow'))).length}
              </Badge>
            </div>
          </div>

          <Tabs defaultValue="summary">
            <TabsList className="mb-4">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="issues">Issues</TabsTrigger>
              <TabsTrigger value="detailed">Detailed</TabsTrigger>
            </TabsList>

            <TabsContent value="summary">
              <div className="space-y-2">
                {Object.entries(diagnosticResults).map(([key, result]) => (
                  <div key={key} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md">
                    <div>
                      <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <p className="text-sm text-gray-600">{result.message}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      {result.timing && (
                        <span className="text-xs text-gray-500">{result.timing.toFixed(0)}ms</span>
                      )}
                      {getStatusBadge(
                        result.success, 
                        result.success && (result.message.includes('high') || result.message.includes('slow'))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="issues">
              <div className="space-y-4">
                {Object.entries(diagnosticResults)
                  .filter(([_, result]) => !result.success)
                  .map(([key, result]) => (
                    <div key={key} className="border border-red-200 rounded-md p-3 bg-red-50">
                      <h3 className="font-medium capitalize text-red-800">{key.replace(/([A-Z])/g, ' $1')}</h3>
                      <p className="text-sm text-red-700 my-1">{result.message}</p>
                      {result.error && (
                        <div className="mt-2 text-xs bg-red-100 p-2 rounded">
                          <p className="font-medium">Error Details:</p>
                          <pre className="whitespace-pre-wrap mt-1">{JSON.stringify(result.error, null, 2)}</pre>
                        </div>
                      )}
                    </div>
                  ))}

                {Object.entries(diagnosticResults)
                  .filter(([_, result]) => result.success && (result.message.includes('high') || result.message.includes('slow')))
                  .map(([key, result]) => (
                    <div key={key} className="border border-yellow-200 rounded-md p-3 bg-yellow-50">
                      <h3 className="font-medium capitalize text-yellow-800">{key.replace(/([A-Z])/g, ' $1')}</h3>
                      <p className="text-sm text-yellow-700 my-1">{result.message}</p>
                      {verboseMode && result.details && (
                        <div className="mt-2 text-xs bg-yellow-100 p-2 rounded">
                          <pre className="whitespace-pre-wrap">{JSON.stringify(result.details, null, 2)}</pre>
                        </div>
                      )}
                    </div>
                  ))}

                {Object.values(diagnosticResults).filter(r => !r.success || r.message.includes('high') || r.message.includes('slow')).length === 0 && (
                  <div className="text-center p-6">
                    <CheckCircle2 className="mx-auto h-12 w-12 text-green-500 mb-2" />
                    <h3 className="text-lg font-medium text-green-800">All tests passed!</h3>
                    <p className="text-green-600">No issues or warnings were detected.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="detailed">
              <div className="space-y-4">
                {Object.entries(diagnosticResults).map(([key, result]) => (
                  <div key={key} className="border rounded-md p-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
                      {getStatusBadge(
                        result.success, 
                        result.message.includes('high') || result.message.includes('slow')
                      )}
                    </div>
                    <p className="text-sm my-1">{result.message}</p>
                    {result.timing && (
                      <p className="text-xs text-gray-500">Completed in {result.timing.toFixed(0)}ms</p>
                    )}
                    
                    {verboseMode && result.details && (
                      <div className="mt-2">
                        <Separator className="my-2" />
                        <p className="text-xs font-medium mb-1">Details:</p>
                        <pre className="text-xs bg-gray-50 p-2 rounded whitespace-pre-wrap overflow-auto max-h-40">
                          {JSON.stringify(result.details, null, 2)}
                        </pre>
                      </div>
                    )}
                    
                    {result.error && (
                      <div className="mt-2">
                        <Separator className="my-2" />
                        <p className="text-xs font-medium mb-1 text-red-700">Error:</p>
                        <pre className="text-xs bg-red-50 p-2 rounded whitespace-pre-wrap overflow-auto max-h-40">
                          {JSON.stringify(result.error, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {!diagnosticResults && !isRunning && (
        <div className="text-center py-8">
          <p className="text-gray-500">Click "Run Diagnostics" to check Supabase connectivity</p>
        </div>
      )}

      {isRunning && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-700">Running diagnostics...</p>
        </div>
      )}
    </Card>
  );
}
