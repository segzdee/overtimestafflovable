import React, { useState, useEffect } from "react";
import { Bot } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase/client";
import { AiSuggestion, FileData } from "./types";
import { FilesTab } from "./FilesTab";
import { PromptTab } from "./PromptTab";
import { CodeContextTab } from "./CodeContextTab";
import { ConsoleTab } from "./ConsoleTab";
import { AiSuggestions } from "./AiSuggestions";
import { AiResponse } from "./AiResponse";
import { ApiKeySetup } from "./ApiKeySetup";
import { quickPrompts } from "./quickPrompts";

interface ThropicPanelProps {
  devMode: boolean;
}

export const ThropicPanel: React.FC<ThropicPanelProps> = ({ devMode }) => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("files");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [fileContext, setFileContext] = useState("");
  const [consoleOutput, setConsoleOutput] = useState("");
  const [suggestions, setSuggestions] = useState<AiSuggestion[]>([]);
  const [editingFile, setEditingFile] = useState<FileData | null>(null);
  const [availableFiles, setAvailableFiles] = useState<{name: string, path: string}[]>([]);
  const [fileContent, setFileContent] = useState("");
  const [autoApply, setAutoApply] = useState(false);
  const [isApiKeyConfigured, setIsApiKeyConfigured] = useState(false);
  
  const { toast } = useToast();

  // Check if API key is configured
  useEffect(() => {
    const apiKey = localStorage.getItem("ANTHROPIC_API_KEY") || import.meta.env.VITE_ANTHROPIC_API_KEY;
    setIsApiKeyConfigured(!!apiKey);
  }, []);

  // Capture console outputs for debugging
  useEffect(() => {
    if (devMode) {
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
  }, [devMode]);

  // Load available files when dev mode panel opens
  useEffect(() => {
    if (devMode) {
      fetchAvailableFiles();
    }
  }, [devMode]);
  
  const clearConsole = () => {
    setConsoleOutput("");
  };

  const fetchAvailableFiles = async () => {
    setIsLoading(true);
    try {
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
      setIsLoading(false);
    }
  };

  const fetchFileContent = async (path: string) => {
    try {
      setIsLoading(true);
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
      // Get Anthropic API key from environment variable or local storage
      const anthropicApiKey = import.meta.env.VITE_ANTHROPIC_API_KEY || localStorage.getItem('ANTHROPIC_API_KEY');
      
      if (!anthropicApiKey) {
        throw new Error("Anthropic API key is not configured");
      }
      
      // Call Anthropic API directly instead of using Supabase function
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': anthropicApiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: "claude-3-opus-20240229",
          max_tokens: 4000,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `You are a developer assistant called Thropic. Help with the following request related to the file ${editingFile?.path || 'unknown'}:
                  
                  ${prompt}
                  
                  ${editingFile ? `Here's the current file content:
                  
                  \`\`\`
                  ${fileContent}
                  \`\`\`
                  ` : ''}
                  
                  ${codeSnippet ? `Additional code context:
                  
                  \`\`\`
                  ${codeSnippet}
                  \`\`\`
                  ` : ''}
                  
                  ${fileContext ? `File context:
                  
                  \`\`\`
                  ${fileContext}
                  \`\`\`
                  ` : ''}
                  
                  If you identify code improvements, return them in this format:
                  1. Provide an explanation of each issue/improvement
                  2. For each one, provide the original code snippet and your suggested replacement
                  
                  SUGGESTIONS: [
                    {
                      "type": "fix|refactor|optimization",
                      "description": "Description of the issue and fix",
                      "original": "original code to replace",
                      "suggested": "suggested replacement code"
                    },
                    // More suggestions
                  ]`
                }
              ]
            }
          ]
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API error: ${errorData.error?.message || response.statusText}`);
      }
      
      const data = await response.json();
      const aiResponse = data.content[0].text;
      
      // Extract suggestions if present
      const suggestionsMatch = aiResponse.match(/SUGGESTIONS:\s*(\[[\s\S]*\])/);
      let extractedSuggestions = [];
      
      if (suggestionsMatch && suggestionsMatch[1]) {
        try {
          // Try to parse the JSON suggestions block
          const suggestionsJson = suggestionsMatch[1].replace(/(\w+):/g, '"$1":').replace(/'/g, '"');
          extractedSuggestions = JSON.parse(suggestionsJson);
        } catch (e) {
          console.error("Failed to parse suggestions:", e);
        }
      }
      
      setResponse(aiResponse);
      
      if (extractedSuggestions.length > 0) {
        const formattedSuggestions = extractedSuggestions.map((suggestion: any, index: number) => ({
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
        description: `Failed to get response from Thropic AI: ${error instanceof Error ? error.message : 'Unknown error'}`,
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

  // If API key not configured, show setup screen
  if (!isApiKeyConfigured) {
    return (
      <div className="space-y-3 border-t pt-3">
        <h4 className="text-sm font-medium flex items-center gap-2">
          <Bot size={16} className="text-indigo-600" />
          Thropic AI Developer Assistant
        </h4>
        
        <ApiKeySetup onApiKeySet={() => setIsApiKeyConfigured(true)} />
      </div>
    );
  }

  return (
    <div className="space-y-3 border-t pt-3">
      <h4 className="text-sm font-medium flex items-center gap-2">
        <Bot size={16} className="text-indigo-600" />
        Thropic AI Developer Assistant
      </h4>
      
      <Tabs defaultValue="files" className="w-full" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-4 mb-2">
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="prompt">Prompt</TabsTrigger>
          <TabsTrigger value="code">Code Context</TabsTrigger>
          <TabsTrigger value="console">Console</TabsTrigger>
        </TabsList>
        
        <TabsContent value="files">
          <FilesTab
            availableFiles={availableFiles}
            fetchAvailableFiles={fetchAvailableFiles}
            fetchFileContent={fetchFileContent}
            editingFile={editingFile}
            fileContent={fileContent}
            setFileContent={setFileContent}
            handleDebugCurrentCode={handleDebugCurrentCode}
            handleOptimizeCode={handleOptimizeCode}
            saveFileChanges={saveFileChanges}
            autoApply={autoApply}
            setAutoApply={setAutoApply}
          />
        </TabsContent>
        
        <TabsContent value="prompt">
          <PromptTab 
            prompt={prompt} 
            setPrompt={setPrompt}
            quickPrompts={quickPrompts}
          />
        </TabsContent>
        
        <TabsContent value="code">
          <CodeContextTab
            codeSnippet={codeSnippet}
            setCodeSnippet={setCodeSnippet}
            fileContext={fileContext}
            setFileContext={setFileContext}
          />
        </TabsContent>
        
        <TabsContent value="console">
          <ConsoleTab consoleOutput={consoleOutput} clearConsole={clearConsole} />
        </TabsContent>
      </Tabs>
      
      <Button 
        className="w-full" 
        onClick={handleThropicRequest}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Generate Response"}
      </Button>
      
      <AiSuggestions 
        suggestions={suggestions} 
        editingFile={editingFile}
        applySuggestion={applySuggestion}
      />
      
      <AiResponse response={response} />
    </div>
  );
};
