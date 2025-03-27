
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ApiKeySetupProps {
  onSave: (apiKey: string) => void;
  savedKey?: string;
}

export function ApiKeySetup({ onSave, savedKey }: ApiKeySetupProps) {
  const [apiKey, setApiKey] = useState(savedKey || '');
  const [showKey, setShowKey] = useState(false);

  const handleSave = () => {
    if (apiKey.trim()) {
      onSave(apiKey.trim());
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-800">
      <h3 className="font-medium">API Key Setup</h3>
      <div className="flex items-center space-x-2">
        <Input
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
        Save Key
      </Button>
      <p className="text-xs text-gray-500">
        Your API key is stored locally and never shared.
      </p>
    </div>
  );
}

export default ApiKeySetup;
