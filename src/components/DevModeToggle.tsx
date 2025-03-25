
import { useState, useEffect } from "react";
import { useDevMode } from "@/contexts/dev/DevModeContext";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { Bot, Code, Layers, AlertCircle, RefreshCw, FileCode, TestTube, Layout, Zap } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export const DevModeToggle = () => {
  const { devMode, toggleDevMode, selectedRole, setSelectedRole } = useDevMode();
  const [isOpen, setIsOpen] = useState(false);
  const [thropicPanel, setThropicPanel] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("prompt");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [fileContext, setFileContext] = useState("");
  const [consoleOutput, setConsoleOutput] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Only show in development environment - REMOVING THIS CHECK TO ALWAYS SHOW
  // if (import.meta.env.PROD) {
  //   return null;
  // }
  
  // Capture console outputs for debugging
  useEffect(() => {
    if (devMode && thropicPanel) {
      const originalConsoleLog = console.log;
      const originalConsoleError = console.error;
      const originalConsoleWarn = console.warn;
      
      const captureLog = (...args: any[]) => {
        originalConsoleLog(...args);
        setConsoleOutput(prev => prev + "\n[log] " + args.join(" "));
      };
      
      const captureError = (...args: any[]) => {
        originalConsoleError(...args);
        setConsoleOutput(prev => prev + "\n[error] " + args.join(" "));
      };
      
      const captureWarn = (...args: any[]) => {
        originalConsoleWarn(...args);
        setConsoleOutput(prev => prev + "\n[warn] " + args.join(" "));
      };
      
      console.log = captureLog;
      console.error = captureError;
      console.warn = captureWarn;
      
      return () => {
        console.log = originalConsoleLog;
        console.error = originalConsoleError;
        console.warn = originalConsoleWarn;
      };
    }
  }, [devMode, thropicPanel]);
  
  const handleRoleChange = (role: string) => {
    setSelectedRole(role as any);
    
    // Navigate to the appropriate dashboard
    if (role) {
      navigate(`/dashboard/${role.toLowerCase()}`);
    }
  };

  const clearConsole = () => {
    setConsoleOutput("");
  };

  const handleThropicRequest = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a prompt to generate a response",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Call the Thropic API through a Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('thropic-assistant', {
        body: { 
          prompt, 
          context: "development",
          code: codeSnippet || undefined,
          files: fileContext ? [{ name: "context.tsx", content: fileContext }] : undefined
        }
      });

      if (error) throw error;
      
      setResponse(data.response);
      toast({
        title: "Response generated",
        description: "Thropic AI has processed your request",
      });
    } catch (error) {
      console.error("Error calling Thropic API:", error);
      toast({
        title: "Error",
        description: "Failed to get response from Thropic API",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    { name: "Debug Code", icon: <AlertCircle size={14} />, prompt: "Debug this code and identify potential issues:" },
    { name: "Generate UI", icon: <Layers size={14} />, prompt: "Generate a component for:" },
    { name: "Refactor", icon: <Code size={14} />, prompt: "Refactor this code to improve:" },
    { name: "Write Tests", icon: <TestTube size={14} />, prompt: "Write tests for this component:" },
    { name: "API Endpoint", icon: <Zap size={14} />, prompt: "Create an API endpoint for:" },
    { name: "Page Layout", icon: <Layout size={14} />, prompt: "Design a page layout for:" },
  ];
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-background border rounded-lg shadow-lg p-4 w-[480px]">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Developer Mode</h3>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              ✕
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Enable Dev Mode</span>
              <Switch checked={devMode} onCheckedChange={toggleDevMode} />
            </div>
            
            {devMode && (
              <>
                <div className="space-y-2">
                  <label className="text-sm block">Role</label>
                  <Select value={selectedRole || ''} onValueChange={handleRoleChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="shift-worker">Shift Worker</SelectItem>
                      <SelectItem value="company">Company</SelectItem>
                      <SelectItem value="agency">Agency</SelectItem>
                      <SelectItem value="aiagent">AI Agent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border-t pt-3">
                  <Button
                    variant="outline" 
                    size="sm"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => setThropicPanel(!thropicPanel)}
                  >
                    <Bot size={16} />
                    <span>Thropic AI Assistant</span>
                  </Button>
                </div>
              </>
            )}

            {devMode && thropicPanel && (
              <div className="space-y-3 border-t pt-3">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Bot size={16} className="text-indigo-600" />
                  Thropic AI Development Assistant
                </h4>
                
                <Tabs defaultValue="prompt" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-3 mb-2">
                    <TabsTrigger value="prompt">Prompt</TabsTrigger>
                    <TabsTrigger value="code">Code Context</TabsTrigger>
                    <TabsTrigger value="console">Console</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="prompt" className="space-y-3">
                    <Textarea
                      placeholder="Ask Thropic about code, debugging, UI generation..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-[100px] text-sm"
                    />
                    
                    <div className="flex flex-wrap gap-2">
                      {quickPrompts.map((item) => (
                        <Button 
                          key={item.name}
                          size="sm" 
                          variant="outline"
                          className="flex items-center gap-1"
                          onClick={() => setPrompt(prompt ? `${prompt}\n\n${item.prompt}` : item.prompt)}
                        >
                          {item.icon}
                          {item.name}
                        </Button>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="code" className="space-y-3">
                    <Textarea
                      placeholder="Paste code snippet for better context..."
                      value={codeSnippet}
                      onChange={(e) => setCodeSnippet(e.target.value)}
                      className="min-h-[100px] text-sm font-mono"
                    />
                    <Input
                      placeholder="File path for context (optional)"
                      value={fileContext}
                      onChange={(e) => setFileContext(e.target.value)}
                      className="text-sm"
                    />
                  </TabsContent>
                  
                  <TabsContent value="console" className="space-y-3">
                    <div className="relative">
                      <ScrollArea className="h-[150px] w-full rounded-md border p-2 bg-muted/40">
                        <pre className="text-xs font-mono whitespace-pre-wrap">
                          {consoleOutput || "Console output will appear here..."}
                        </pre>
                      </ScrollArea>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="absolute top-2 right-2 h-6 w-6 p-0" 
                        onClick={clearConsole}
                      >
                        <RefreshCw size={12} />
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <Button 
                  className="w-full" 
                  onClick={handleThropicRequest}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Generate Response"}
                </Button>
                
                {response && (
                  <Collapsible className="mt-3 border rounded-md bg-muted/30">
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="flex items-center justify-between w-full">
                        <span className="text-xs font-medium">Response</span>
                        <FileCode size={12} />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <ScrollArea className="p-3 max-h-[300px]">
                        <div className="whitespace-pre-wrap text-sm">{response}</div>
                      </ScrollArea>
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <Button 
          onClick={() => setIsOpen(true)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white"
        >
          Dev Mode {devMode ? 'ON' : 'OFF'}
        </Button>
      )}
    </div>
  );
};
