
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase/client';

// Update the AIToken interface to include a required token property
interface AIToken {
  id?: string;
  token: string;
  name?: string;
  created_at?: string;
}

const AiTokenComponent: React.FC = () => {
  const [tokens, setTokens] = useState<AIToken[]>([]);
  const [newTokenName, setNewTokenName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentToken, setCurrentToken] = useState<{ token: string }>({ token: '' });
  const { toast } = useToast();

  useEffect(() => {
    fetchTokens();
  }, []);

  const fetchTokens = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('ai_tokens')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setTokens(data || []);
    } catch (error) {
      console.error('Error fetching tokens:', error);
      toast({
        title: 'Error',
        description: 'Failed to load API tokens',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateToken = async () => {
    if (!newTokenName.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a name for your token',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      // Generate a token on the server
      const { data, error } = await supabase.functions.invoke('generate-ai-token', {
        body: { name: newTokenName.trim() }
      });

      if (error) throw error;
      
      if (data?.token) {
        // Update the current token to show to the user
        setCurrentToken({ token: data.token });
        setNewTokenName('');
        // Refresh the token list
        fetchTokens();
        
        toast({
          title: 'Success',
          description: 'New API token generated',
        });
      }
    } catch (error) {
      console.error('Error generating token:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate API token',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const revokeToken = async (tokenId: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.functions.invoke('revoke-ai-token', {
        body: { token_id: tokenId }
      });

      if (error) throw error;
      
      // Refresh the token list
      fetchTokens();
      
      toast({
        title: 'Success',
        description: 'API token revoked successfully',
      });
    } catch (error) {
      console.error('Error revoking token:', error);
      toast({
        title: 'Error',
        description: 'Failed to revoke API token',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <h3 className="text-sm font-medium">Generate New API Token</h3>
        <div className="flex space-x-2">
          <Input
            placeholder="Token name (e.g., Development, Production)"
            value={newTokenName}
            onChange={(e) => setNewTokenName(e.target.value)}
            disabled={isLoading}
          />
          <Button onClick={generateToken} disabled={isLoading || !newTokenName.trim()}>
            Generate
          </Button>
        </div>
      </div>

      {currentToken.token && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-sm font-medium text-yellow-800 mb-1">Your new API token:</p>
          <div className="flex items-center">
            <Input
              value={currentToken.token}
              readOnly
              className="font-mono text-xs"
              onClick={(e) => e.currentTarget.select()}
            />
            <Button
              variant="outline"
              size="sm"
              className="ml-2"
              onClick={() => {
                navigator.clipboard.writeText(currentToken.token);
                toast({
                  title: "Copied",
                  description: "Token copied to clipboard",
                });
              }}
            >
              Copy
            </Button>
          </div>
          <p className="text-xs text-yellow-700 mt-2">
            Save this token somewhere secure. You won't be able to see it again!
          </p>
        </div>
      )}

      <div>
        <h3 className="text-sm font-medium mb-2">Your API Tokens</h3>
        {isLoading ? (
          <p className="text-sm text-gray-500">Loading tokens...</p>
        ) : tokens.length > 0 ? (
          <div className="space-y-2">
            {tokens.map((token) => (
              <div key={token.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                <div>
                  <p className="font-medium">{token.name}</p>
                  <p className="text-xs text-gray-500">
                    Created: {new Date(token.created_at || '').toLocaleString()}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => token.id && revokeToken(token.id)}
                >
                  Revoke
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No API tokens generated yet.</p>
        )}
      </div>
    </div>
  );
};

export default AiTokenComponent;
