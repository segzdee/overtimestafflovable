
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Trash2, Check, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { saveAIToken, getAITokens, deleteAIToken, updateAITokenStatus, AIToken } from "@/lib/supabase/aiTokens";
import { useAuth } from "@/contexts/auth";

type ProviderOption = {
  id: string;
  name: string;
}

const providers: ProviderOption[] = [
  { id: "anthropic", name: "Anthropic Claude" },
  { id: "openai", name: "OpenAI" }
];

export default function AITokensManager() {
  const [tokens, setTokens] = useState<AIToken[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [tokenName, setTokenName] = useState("");
  const [tokenValue, setTokenValue] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("anthropic");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadTokens();
    }
  }, [user]);

  const loadTokens = async () => {
    const loadedTokens = await getAITokens();
    setTokens(loadedTokens);
  };

  const handleSaveToken = async () => {
    if (!tokenName.trim() || !tokenValue.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const savedToken = await saveAIToken(tokenName, tokenValue, selectedProvider);
    setIsLoading(false);

    if (savedToken) {
      toast({
        title: "Success",
        description: "API token saved successfully",
      });
      setShowDialog(false);
      setTokenName("");
      setTokenValue("");
      loadTokens();
    } else {
      toast({
        title: "Error",
        description: "Failed to save API token",
        variant: "destructive",
      });
    }
  };

  const handleDeleteToken = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this token?");
    if (!confirmed) return;

    const success = await deleteAIToken(id);
    if (success) {
      toast({
        title: "Success",
        description: "API token deleted successfully",
      });
      loadTokens();
    } else {
      toast({
        title: "Error",
        description: "Failed to delete API token",
        variant: "destructive",
      });
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    const success = await updateAITokenStatus(id, !currentStatus);
    if (success) {
      toast({
        title: "Success",
        description: `API token ${!currentStatus ? "activated" : "deactivated"} successfully`,
      });
      loadTokens();
    } else {
      toast({
        title: "Error",
        description: "Failed to update API token status",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p>Please log in to manage API tokens.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>AI API Tokens</CardTitle>
        <Button onClick={() => setShowDialog(true)}>Add New Token</Button>
      </CardHeader>
      <CardContent>
        {tokens.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No API tokens found. Add a new token to get started.
          </p>
        ) : (
          <div className="space-y-4">
            {tokens.map((token) => (
              <div
                key={token.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <div className="font-medium">{token.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Provider: {providers.find(p => p.id === token.provider)?.name || token.provider}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Added: {new Date(token.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={token.isActive ? "default" : "secondary"}>
                    {token.isActive ? "Active" : "Inactive"}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleToggleStatus(token.id, token.isActive)}
                    title={token.isActive ? "Deactivate token" : "Activate token"}
                  >
                    {token.isActive ? <X size={16} /> : <Check size={16} />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteToken(token.id)}
                    className="text-destructive"
                    title="Delete token"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New API Token</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="tokenName">Token Name</Label>
              <Input
                id="tokenName"
                placeholder="e.g., My Claude API Key"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="provider">Provider</Label>
              <select 
                id="provider"
                className="w-full p-2 rounded-md border"
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
              >
                {providers.map(provider => (
                  <option key={provider.id} value={provider.id}>
                    {provider.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tokenValue">API Token</Label>
              <Input
                id="tokenValue"
                type="password"
                placeholder="sk-ant-api03-..."
                value={tokenValue}
                onChange={(e) => setTokenValue(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Your API key will be stored securely and never shared.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDialog(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveToken} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Token"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
