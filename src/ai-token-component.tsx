import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/auth/AuthContext';
import { Trash2, Plus, Copy, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { AiToken } from '@/contexts/auth/AuthContext';

const AiTokenComponent: React.FC = () => {
  const [newTokenDescription, setNewTokenDescription] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copiedTokenId, setCopiedTokenId] = useState<string | null>(null);
  const { toast } = useToast();
  const { aiTokens, generateAiToken, revokeAiToken } = useAuth();

  const handleGenerateToken = async () => {
    if (!newTokenDescription.trim()) {
      toast({
        title: 'Description required',
        description: 'Please provide a description for your token',
        variant: 'destructive',
      });
      return;
    }

    try {
      await generateAiToken(newTokenDescription);
      setNewTokenDescription('');
      setIsDialogOpen(false);
      toast({
        title: 'Token generated',
        description: 'Your new AI token has been created successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate token. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleRevokeToken = async (tokenId: string) => {
    try {
      await revokeAiToken(tokenId);
      toast({
        title: 'Token revoked',
        description: 'The token has been successfully revoked',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to revoke token. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const copyToClipboard = (text: string, tokenId: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedTokenId(tokenId);
      setTimeout(() => setCopiedTokenId(null), 2000);
      toast({
        title: 'Copied to clipboard',
        description: 'Token has been copied to your clipboard',
      });
    });
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">AI Access Tokens</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              Generate New Token
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generate New AI Token</DialogTitle>
              <DialogDescription>
                Create a new token for API access to your AI services.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Label htmlFor="token-description" className="mb-2 block">
                Token Description
              </Label>
              <Input
                id="token-description"
                placeholder="e.g., Production API, Development Testing"
                value={newTokenDescription}
                onChange={(e) => setNewTokenDescription(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleGenerateToken}>Generate Token</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {aiTokens && aiTokens.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          {aiTokens.map((token) => (
            <Card key={token.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <div className="truncate">{token.description}</div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 h-auto"
                    onClick={() => handleRevokeToken(token.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </CardTitle>
                <CardDescription>
                  Created: {formatDate(token.created)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md flex justify-between items-center">
                  <code className="text-sm font-mono truncate max-w-[80%]">
                    {token.token}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 h-auto"
                    onClick={() => copyToClipboard(token.token, token.id)}
                  >
                    {copiedTokenId === token.id ? (
                      <Check size={16} className="text-green-500" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-500">
                  Expires: {formatDate(token.expires)}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-10">
            <div className="text-center space-y-3">
              <p className="text-gray-500">No tokens have been generated yet.</p>
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(true)}
                className="mx-auto"
              >
                Generate Your First Token
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-200 dark:border-blue-800">
        <h3 className="font-medium mb-2">How to use your token</h3>
        <p className="text-sm mb-3">
          Include your token in the Authorization header of your API requests:
        </p>
        <pre className="bg-gray-800 text-gray-200 p-3 rounded-md text-sm overflow-x-auto">
          <code>
            {`curl -X POST https://api.overtimestaff.com/v1/ai-assistant \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"query": "What shifts are available?"}'`}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default AiTokenComponent;