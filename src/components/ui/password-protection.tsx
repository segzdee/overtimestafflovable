
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Lock } from "lucide-react";

interface PasswordProtectionProps {
  password: string;
  children: React.ReactNode;
  pageTitle: string;
}

export function PasswordProtection({ password, children, pageTitle }: PasswordProtectionProps) {
  const [isLocked, setIsLocked] = useState(true);
  const [inputPassword, setInputPassword] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // Check if page was previously unlocked in this session
  useEffect(() => {
    const unlocked = sessionStorage.getItem(`page_unlocked_${pageTitle}`);
    if (unlocked === 'true') {
      setIsLocked(false);
    } else {
      setIsDialogOpen(true);
    }
  }, [pageTitle]);

  const handlePasswordSubmit = () => {
    if (inputPassword === password) {
      setIsLocked(false);
      setIsDialogOpen(false);
      // Store unlock status in session storage
      sessionStorage.setItem(`page_unlocked_${pageTitle}`, 'true');
      toast({
        title: "Access granted",
        description: "Page is now unlocked for this session.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Access denied",
        description: "Incorrect password. Please try again.",
      });
      setInputPassword('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePasswordSubmit();
    }
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock size={18} /> 
              Protected Page
            </DialogTitle>
            <DialogDescription>
              This page is password protected. Enter the correct password to access.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              type="password"
              placeholder="Enter password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              className="mb-2"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button onClick={handlePasswordSubmit} type="submit">
              Unlock Page
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {!isLocked ? (
        children
      ) : (
        <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-b from-[#f8f9fa] to-[#f1f3f5]">
          <div className="text-center">
            <Lock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">Protected Page</h2>
            <p className="mt-2 text-gray-600">
              This page is locked. Click below to enter password.
            </p>
            <Button 
              onClick={() => setIsDialogOpen(true)} 
              className="mt-4 bg-purple-600 hover:bg-purple-700"
            >
              Unlock Page
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
