import { useState, useEffect, useCallback } from "react";
import { useDevMode } from "@/contexts/dev/DevModeContext";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { Bot, Code, Layers, AlertCircle, RefreshCw, FileCode, TestTube, Layout, Zap, Edit, Play, Save, FileUp, Sparkles } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

// Define interfaces for clarity
interface AiSuggestion {
  id: string;
  type: 'fix' | 'enhancement' | 'refactor';
  description: string;
  codeChange: {
    original: string;
    suggested: string;
  };
  applied: boolean;
}

interface FileData {
  name: string;
  path: string;
  content: string;
}

// Quick prompts data - moved outside component
const quickPrompts = [
  { name: "Debug Code", icon: <AlertCircle size={14} />, prompt: "Debug this code and identify potential issues:" },
  { name: "Generate UI", icon: <Layers size={14} />, prompt: "Generate a component for:" },
  { name: "Refactor", icon: <Code size={14} />, prompt: "Refactor this code to improve:" },
  { name: "Write Tests", icon: <TestTube size={14} />, prompt: "Write tests for this component:" },
  { name: "API Endpoint", icon: <Zap size={14} />, prompt: "Create an API endpoint for:" },
  { name: "Page Layout", icon: <Layout size={14} />, prompt: "Design a page layout for:" },
];

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
  const [suggestions, setSuggestions] = useState<AiSuggestion[]>([]);
  const [editingFile, setEditingFile] = useState<FileData | null>(null);
  const [availableFiles, setAvailableFiles] = useState<{name: string, path: string}[]>([]);
  const [fileContent, setFileContent] = useState("");
  const [autoApply, setAutoApply] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
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

  // Load available files for editing when dev mode panel opens
  useEffect(() => {
    if (devMode && thropicPanel) {
      fetchAvailableFiles();
    }
  }, [devMode, thropicPanel]);
  
  const handleRoleChange = useCallback((role: string) => {
    setSelectedRole(role as any);
    
    // Navigate to the appropriate dashboard
    if (role) {
      navigate(`/dashboard/${role.toLowerCase()}`);
    }
  }, [navigate, setSelectedRole]);

  const clearConsole = useCallback(() => {
    setConsoleOutput("");
  }, []);

  const fetchAvailableFiles = async () => {
    setIsLoading(true); // Show loading indicator
    try {
      // This would connect to your development server to get file structure
      // Mocking response for now
      const { data, error } = await supabase.functions.invoke('get-project-files', {
        body: { projectId: 'current' }
      });
      
      if (error) throw error;
      
      setAvailableFiles(data?.files || []);
    } catch (error) {
      console.error("Error fetching files:", error);
      toast({
        title: "Error",
        description: "Failed to fetch project files. Please check your connection.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  const fetchFileContent = async (path: string) => {
    try {
      setIsLoading(true);
      // This would retrieve actual file content from your dev server
      const { data, error } = await supabase.functions.invoke('get-file-content', {
        body: { path }
      });
      
      if (error) throw error;
      
      if (data?.content) {
        setEditingFile({
          name: path.split('/').pop() || '',
          path,
          content: data.content
        });
        setFileContent(data.content);
      }
    } catch (error) {
      console.error("Error fetching file content:", error);
      toast({
        title: "Error",
        description: "Failed to fetch file content",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveFileChanges = async () => {
    if (!editingFile) return;
    
    try {
      setIsLoading(true);
      const { data, error } = await supabase.functions.invoke('save-file-content', {
        body: { 
          path: editingFile.path,
          content: fileContent
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "File changes saved successfully",
      });
    } catch (error) {
      console.error("Error saving file:", error);
      toast({
        title: "Error",
        description: "Failed to save file changes",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
          code: editingFile ? fileContent : codeSnippet,
          filePath: editingFile?.path,
          files: fileContext ? [{ name: "context.tsx", content: fileContext }] : undefined,
          mode: "debug-assist" // New mode for debugging features
        }
      });

      if (error) throw error;
      
      setResponse(data.response);
      
      // Parse AI suggestions if any
      if (data.suggestions && Array.isArray(data.suggestions)) {
        // Transform the suggestions into our format
        const formattedSuggestions = data.suggestions.map((suggestion: any, index: number) => ({
          id: `suggestion-${Date.now()}-${index}`,
          type: suggestion.type || 'fix',
          description: suggestion.description,
          codeChange: {
            original: suggestion.original || '',
            suggested: suggestion.suggested || ''
          },
          applied: false
        }));
        
        setSuggestions(formattedSuggestions);
        
        // Auto-apply if enabled
        if (autoApply && editingFile) {
          let updatedCode = fileContent;
          formattedSuggestions.forEach(suggestion => {
            if (suggestion.codeChange.original && updatedCode.includes(suggestion.codeChange.original)) {
              updatedCode = updatedCode.replace(
                suggestion.codeChange.original,
                suggestion.codeChange.suggested
              );
            }
          });
          setFileContent(updatedCode);
        }
      }
      
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

  const applySuggestion = (suggestion: AiSuggestion) => {
    if (!editingFile || !suggestion.codeChange.original) return;
    
    const updatedContent = fileContent.replace(
      suggestion.codeChange.original,
      suggestion.codeChange.suggested
    );
    
    setFileContent(updatedContent);
    
    // Mark suggestion as applied
    setSuggestions(current => 
      current.map(s => 
        s.id === suggestion.id ? {...s, applied: true} : s
      )
    );
    
    toast({
      title: "Change applied",
      description: "AI suggestion has been applied to the code",
    });
  };

  const handleDebugCurrentCode = () => {
    if (editingFile) {
      setPrompt(`Debug this code and identify any issues, potential improvements, or optimization opportunities:\n\nFile: ${editingFile.name}\n\nPlease analyze the code and provide specific suggestions with exact code changes.`);
      setActiveTab("prompt");
    } else {
      toast({
        title: "No file selected",
        description: "Please select a file to debug first",
        variant: "destructive",
      });
    }
  };

  const handleOptimizeCode = () => {
    if (editingFile) {
      setPrompt(`Optimize this code for performance and readability:\n\nFile: ${editingFile.name}\n\nPlease provide specific refactoring suggestions with exact code changes that would improve this component.`);
      setActiveTab("prompt");
    } else {
      toast({
        title: "No file selected",
        description: "Please select a file to optimize first",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-background border rounded-lg shadow-lg p-4 w-[600px]">
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
                    <span>Thropic AI Developer Assistant</span>
                  </Button>
                </div>
              </>
            )}

            {devMode && thropicPanel && (
              <div className="space-y-3 border-t pt-3">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Bot size={16} className="text-indigo-600" />
                  Thropic AI Developer Assistant
                </h4>
                
                <Tabs defaultValue="files" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-4 mb-2">
                    <TabsTrigger value="files">Files</TabsTrigger>
                    <TabsTrigger value="prompt">Prompt</TabsTrigger>
                    <TabsTrigger value="code">Code Context</TabsTrigger>
                    <TabsTrigger value="console">Console</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="files" className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="text-sm font-medium">Project Files</h5>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={fetchAvailableFiles}
                        className="h-7 w-7 p-0"
                      >
                        <RefreshCw size={12} />
                      </Button>
                    </div>
                    
                    <ScrollArea className="h-[200px] border rounded-md p-2">
                      {availableFiles.length === 0 ? (
                        <div className="text-sm text-muted-foreground p-2">
                          No files available. Click refresh to load project files.
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {availableFiles.map((file) => (
                            <div 
                              key={file.path}
                              className="flex items-center p-1 hover:bg-accent rounded cursor-pointer text-sm"
                              onClick={() => fetchFileContent(file.path)}
                            >
                              <FileCode size={14} className="mr-2 flex-shrink-0" />
                              <span className="truncate">{file.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </ScrollArea>
                    
                    {editingFile && (
                      <div className="border rounded-md">
                        <div className="flex items-center justify-between bg-muted p-2 border-b">
                          <div className="flex items-center">
                            <FileCode size={14} className="mr-2" />
                            <span className="text-sm font-medium truncate">{editingFile.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 w-6 p-0"
                              onClick={handleDebugCurrentCode}
                              title="Debug this file"
                            >
                              <AlertCircle size={12} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 w-6 p-0"
                              onClick={handleOptimizeCode}
                              title="Optimize this file"
                            >
                              <Sparkles size={12} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 w-6 p-0"
                              onClick={saveFileChanges}
                              title="Save changes"
                            >
                              <Save size={12} />
                            </Button>
                          </div>
                        </div>
                        <Textarea
                          value={fileContent}
                          onChange={(e) => setFileContent(e.target.value)}
                          className="min-h-[200px] font-mono text-sm border-0 rounded-t-none"
                        />
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id="auto-apply" 
                        checked={autoApply} 
                        onCheckedChange={(checked) => setAutoApply(checked === true)}
                      />
                      <label htmlFor="auto-apply" className="text-sm">
                        Auto-apply AI suggestions
                      </label>
                    </div>
                  </TabsContent>
                  
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
                
                {suggestions.length > 0 && (
                  <div className="border rounded-md p-2 bg-muted/30">
                    <h5 className="text-sm font-medium mb-2">AI Suggestions</h5>
                    <ScrollArea className="max-h-[200px]">
                      <div className="space-y-2">
                        {suggestions.map((suggestion) => (
                          <Card key={suggestion.id} className="p-2 relative">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant={
                                    suggestion.type === 'fix' ? 'destructive' : 
                                    suggestion.type === 'enhancement' ? 'default' : 'outline'
                                  }>
                                    {suggestion.type}
                                  </Badge>
                                  {suggestion.applied && (
                                    <Badge variant="outline" className="bg-green-50">Applied</Badge>
                                  )}
                                </div>
                                <p className="text-sm">{suggestion.description}</p>
                              </div>
                              {!suggestion.applied && editingFile && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="h-7"
                                  onClick={() => applySuggestion(suggestion)}
                                >
                                  Apply
                                </Button>
                              )}
                            </div>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )}
                
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
