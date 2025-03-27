import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/auth/AuthContext';
import { Bot, Key } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AiTokenComponent from '@/ai-token-component';

const AIAgentWidget: React.FC = () => {
  const [isTokenDialogOpen, setIsTokenDialogOpen] = useState(false);
  const { user } = useAuth();

  // Only show this widget to admin, company, or agency users
  if (!user || !['admin', 'company', 'agency'].includes(user.role)) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-md flex items-center gap-2">
          <Bot className="h-5 w-5 text-indigo-500" />
          AI Hiring Assistant
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">
          Integrate our AI hiring assistant with your systems to automate candidate screening, scheduling, and more.
        </p>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">API Integration</span>
            <Dialog open={isTokenDialogOpen} onOpenChange={setIsTokenDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline" className="flex items-center gap-1">
                  <Key className="h-4 w-4" />
                  Manage API Keys
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>AI Hiring Assistant API</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <AiTokenComponent />
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-md">
            <p className="font-medium mb-1">Quick Start:</p>
            <ol className="list-decimal pl-4 space-y-1">
              <li>Generate an API key</li>
              <li>Add the key to your HTTP request headers</li>
              <li>Send candidate data to our API endpoints</li>
            </ol>
            <p className="mt-2">
              <a href="/docs/ai-assistant" className="text-indigo-600 hover:underline">
                View API Documentation
              </a>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAgentWidget;