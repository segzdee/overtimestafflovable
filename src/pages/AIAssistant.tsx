
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClaudeChat from "@/components/ClaudeChat";
import AITokensManager from "@/components/AITokensManager";
import { useAuth } from "@/contexts/auth";

export default function AIAssistant() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">AI Assistant</h1>
          <p>Please log in to access the AI assistant features.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">AI Assistant</h1>
        
        <Tabs defaultValue="chat">
          <TabsList className="mb-6">
            <TabsTrigger value="chat">Chat with Claude</TabsTrigger>
            <TabsTrigger value="tokens">Manage API Tokens</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat">
            <ClaudeChat />
          </TabsContent>
          
          <TabsContent value="tokens">
            <AITokensManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
