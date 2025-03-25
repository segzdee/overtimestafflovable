
import { useState } from "react";
import { useDevMode } from "@/contexts/dev/DevModeContext";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { Bot, Code, Layers, AlertCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase/client";

export const DevModeToggle = () => {
  const { devMode, toggleDevMode, selectedRole, setSelectedRole } = useDevMode();
  const [isOpen, setIsOpen] = useState(false);
  const [thropicPanel, setThropicPanel] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Only show in development environment
  if (import.meta.env.PROD) {
    return null;
  }
  
  const handleRoleChange = (role: string) => {
    setSelectedRole(role as any);
    
    // Navigate to the appropriate dashboard
    if (role) {
      navigate(`/dashboard/${role.toLowerCase()}`);
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
        body: { prompt, context: "development" }
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
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-background border rounded-lg shadow-lg p-4 w-80">
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
                
                <div className="space-y-2">
                  <Textarea
                    placeholder="Ask Thropic about code, debugging, UI generation..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[100px] text-sm"
                  />
                  
                  <div className="flex justify-between gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex items-center gap-1"
                      onClick={() => setPrompt(prompt + "\n\nDebug this code:")}
                    >
                      <AlertCircle size={14} />
                      Debug
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex items-center gap-1"
                      onClick={() => setPrompt(prompt + "\n\nGenerate component:")}
                    >
                      <Layers size={14} />
                      UI
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex items-center gap-1"
                      onClick={() => setPrompt(prompt + "\n\nRefactor this code:")}
                    >
                      <Code size={14} />
                      Refactor
                    </Button>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={handleThropicRequest}
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Generate Response"}
                  </Button>
                  
                  {response && (
                    <div className="mt-3 border p-3 rounded-md bg-muted/50 text-sm">
                      <h5 className="font-medium mb-1 text-xs text-muted-foreground">Response:</h5>
                      <div className="whitespace-pre-wrap">{response}</div>
                    </div>
                  )}
                </div>
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
