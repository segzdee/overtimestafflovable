
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { AIToken } from "../types";

interface AIAgentsProps {
  tokens: AIToken[];
  onCreateToken: (name: string) => Promise<any>;
  onRevokeToken: (id: string) => Promise<void>;
}

export function AIAgents({ tokens, onCreateToken, onRevokeToken }: AIAgentsProps) {
  const [showCreateTokenModal, setShowCreateTokenModal] = useState(false);
  const [newTokenName, setNewTokenName] = useState("");
  const [newToken, setNewToken] = useState<any>(null);

  const handleCreateToken = async () => {
    if (!newTokenName.trim()) return;

    const token = await onCreateToken(newTokenName);
    setNewToken(token);
    setNewTokenName("");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>AI Agents</CardTitle>
          <Button onClick={() => setShowCreateTokenModal(true)}>
            Create New AI Agent
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {tokens.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent Name</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tokens.map((token) => (
                <TableRow key={token.id}>
                  <TableCell>{token.name}</TableCell>
                  <TableCell>{new Date(token.createdAt).toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={token.isActive ? "default" : "destructive"}>
                      {token.isActive ? "Active" : "Revoked"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {token.isActive && (
                      <Button 
                        variant="ghost" 
                        className="text-destructive" 
                        onClick={() => onRevokeToken(token.id)}
                      >
                        Revoke Access
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-sm text-muted-foreground">
            You haven't created any AI agents yet.
          </p>
        )}
      </CardContent>

      <Dialog open={showCreateTokenModal} onOpenChange={setShowCreateTokenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {newToken ? 'AI Agent Created' : 'Create New AI Agent'}
            </DialogTitle>
          </DialogHeader>
          
          {newToken ? (
            <>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Your AI agent has been created successfully. Save this token - you won't be able to see it again!
                </p>
                <pre className="bg-muted p-4 rounded-lg break-all text-sm">
                  {newToken.token}
                </pre>
              </div>
              <DialogFooter>
                <Button onClick={() => {
                  setShowCreateTokenModal(false);
                  setNewToken(null);
                }}>
                  Close
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tokenName">Agent Name</Label>
                  <Input
                    id="tokenName"
                    value={newTokenName}
                    onChange={(e) => setNewTokenName(e.target.value)}
                    placeholder="e.g., Scheduling Assistant"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowCreateTokenModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateToken}>
                  Create Agent
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
