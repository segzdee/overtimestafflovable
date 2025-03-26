
import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth/AuthProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Key, Plus, Trash2, Check, X, Copy, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';

export default function AITokenManager() {
  const { user, aiTokens = [], generateAiToken, revokeAiToken } = useAuth();
  const { toast } = useToast();
  const [tokenName, setTokenName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isRevoking, setIsRevoking] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tokenToRevoke, setTokenToRevoke] = useState('');
  const [newTokenData, setNewTokenData] = useState<{ token: string } | null>(null);

  const handleCreateToken = async () => {
    if (!tokenName.trim()) {
      toast({
        variant: "destructive",
        title: "Token name required",
        description: "Please enter a name for your token"
      });
      return;
    }

    try {
      setIsCreating(true);
      
      if (!user || !generateAiToken) {
        throw new Error("User or generateAiToken function is not available");
      }
      
      const result = await generateAiToken(tokenName, user.id);
      setNewTokenData(result);
      setTokenName('');
      
      toast({
        title: "Token created",
        description: "Your AI token has been created successfully"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to create token",
        description: error instanceof Error ? error.message : "An unknown error occurred"
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleRevokeToken = async (tokenId: string) => {
    try {
      setIsRevoking(true);
      setTokenToRevoke(tokenId);
      
      if (!revokeAiToken) {
        throw new Error("revokeAiToken function is not available");
      }
      
      await revokeAiToken(tokenId);
      
      toast({
        title: "Token revoked",
        description: "The AI token has been successfully revoked"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to revoke token",
        description: error instanceof Error ? error.message : "An unknown error occurred"
      });
    } finally {
      setIsRevoking(false);
      setTokenToRevoke('');
      setDialogOpen(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied!",
        description: "Token copied to clipboard"
      });
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          API Tokens
        </CardTitle>
        <CardDescription>
          Manage your AI API tokens for programmatic access
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <Input
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
              placeholder="Token name (e.g., Billing Bot)"
              className="flex-grow"
              disabled={isCreating}
            />
            <Button 
              onClick={handleCreateToken} 
              disabled={isCreating || !tokenName.trim()}
              className="whitespace-nowrap"
            >
              {isCreating ? (
                <>
                  <span className="animate-spin mr-2">⋯</span>
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Token
                </>
              )}
            </Button>
          </div>

          {aiTokens.length === 0 ? (
            <div className="text-center p-6 border border-dashed rounded-lg">
              <Key className="h-10 w-10 mx-auto opacity-20 mb-2" />
              <p className="text-sm text-muted-foreground">
                No tokens created yet. Create a token to get started.
              </p>
            </div>
          ) : (
            <div className="border rounded-lg divide-y">
              {aiTokens.map((token) => (
                <div 
                  key={token.id} 
                  className="p-4 flex items-center justify-between flex-wrap gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{token.name}</span>
                      <Badge variant={token.isActive ? "default" : "destructive"}>
                        {token.isActive ? "Active" : "Revoked"}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Created {formatDistanceToNow(new Date(token.createdAt))} ago
                    </div>
                  </div>
                  
                  {token.isActive && (
                    <AlertDialog open={dialogOpen && tokenToRevoke === token.id} onOpenChange={(open) => {
                      setDialogOpen(open);
                      if (!open) setTokenToRevoke('');
                    }}>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setDialogOpen(true);
                            setTokenToRevoke(token.id);
                          }}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Revoke
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Revoke API Token</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to revoke this token? This action cannot be undone,
                            and any applications using this token will lose access.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel disabled={isRevoking}>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={(e) => {
                              e.preventDefault();
                              handleRevokeToken(token.id);
                            }}
                            disabled={isRevoking}
                            className="bg-destructive hover:bg-destructive/90"
                          >
                            {isRevoking && tokenToRevoke === token.id ? (
                              <>
                                <span className="animate-spin mr-2">⋯</span>
                                Revoking...
                              </>
                            ) : (
                              <>
                                <Trash2 className="h-4 w-4 mr-2" />
                                Revoke Token
                              </>
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>

      {/* Dialog to show the newly created token */}
      <Dialog 
        open={!!newTokenData} 
        onOpenChange={(open) => !open && setNewTokenData(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Token Created Successfully</DialogTitle>
            <DialogDescription>
              Copy this token now. You won't be able to see it again.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-muted p-4 rounded-lg font-mono text-xs break-all">
            {newTokenData?.token}
          </div>
          <DialogFooter>
            <Button 
              onClick={() => {
                if (newTokenData?.token) {
                  copyToClipboard(newTokenData.token);
                }
              }}
              className="gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy to Clipboard
            </Button>
            <Button
              variant="outline"
              onClick={() => setNewTokenData(null)}
              className="gap-2"
            >
              <Check className="h-4 w-4" />
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
