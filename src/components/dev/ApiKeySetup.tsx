
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface ApiKeySetupProps {
  onSave?: (apiKey: string) => void;
  savedKey?: string;
  onApiKeySet?: () => void;
}

export function ApiKeySetup({ onSave, savedKey, onApiKeySet }: ApiKeySetupProps) {
  const [apiKey, setApiKey] = useState(savedKey || '');
  const [showKey, setShowKey] = useState(false);
  const [hasStoredKey, setHasStoredKey] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if API key is already stored
    const storedKey = localStorage.getItem("ANTHROPIC_API_KEY");
    setHasStoredKey(!!storedKey);
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem("ANTHROPIC_API_KEY", apiKey.trim());
    setHasStoredKey(true);
    
    toast({
      title: "Success",
      description: "API key saved successfully",
    });
    
    if (onSave) {
      onSave(apiKey.trim());
    }
    
    if (onApiKeySet) {
      onApiKeySet();
    }
  };

  const handleClearApiKey = () => {
    localStorage.removeItem("ANTHROPIC_API_KEY");
    setApiKey("");
    setHasStoredKey(false);
    
    toast({
      title: "API Key Removed",
      description: "Your API key has been removed from local storage",
    });
  };

  return (
    <div className="space-y-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-800">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">API Key Setup</h3>
      </div>

      <div className="space-y-2">
        <Label htmlFor="api-key">API Key</Label>
        <div className="flex items-center space-x-2">
          <Input
            id="api-key"
            type={showKey ? "text" : "password"}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API key"
            className="flex-1"
          />
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowKey(!showKey)}
          >
            {showKey ? "Hide" : "Show"}
          </Button>
        </div>
        <Button onClick={handleSave} disabled={!apiKey.trim()}>
          {hasStoredKey ? "Update" : "Save"} Key
        </Button>

        {hasStoredKey && (
          <div className="flex items-center justify-between mt-2">
            <p className="text-sm text-green-600">✓ API key is configured</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleClearApiKey}
            >
              Clear API Key
            </Button>
          </div>
        )}
        
        <p className="text-xs text-gray-500">
          Your API key is stored locally and never shared.
        </p>
      </div>
    </div>
  );
}

export default ApiKeySetup;
