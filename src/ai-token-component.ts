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
        throw