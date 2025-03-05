
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Bug } from "lucide-react";
import { SupabaseDebugRunner } from './SupabaseDebugRunner';

export function DebugButton() {
  const [open, setOpen] = useState(false);
  
  // Don't show the debug button in production
  const isProduction = window.location.hostname === 'www.overtimestaff.com' || 
                      window.location.hostname === 'overtimestaff.com';
  
  if (isProduction) {
    return null;
  }
  
  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        className="fixed bottom-4 right-4 z-50 bg-white shadow-lg flex items-center"
        onClick={() => setOpen(true)}
      >
        <Bug className="h-4 w-4 mr-2" />
        Debug
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Supabase Debug Tools</DialogTitle>
          </DialogHeader>
          <SupabaseDebugRunner />
        </DialogContent>
      </Dialog>
    </>
  );
}
