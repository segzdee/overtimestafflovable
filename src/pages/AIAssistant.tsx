
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClaudeChat from "@/components/ClaudeChat";
import AITokensManager from "@/components/AITokensManager";
import { useAuth } from "@/contexts/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase/client";
import { useNavigate } from "react-router-dom";

export default function AIAssistant() {
  const { user } = useAuth();
  const [hasSubscription, setHasSubscription] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      checkSubscriptionStatus();
    } else {
      setIsLoading(false);
    }
  }, [user]);
  
  const checkSubscriptionStatus = async () => {
    try {
      setIsLoading(true);
      // Check if the user has an active AI token
      const { data, error } = await supabase
        .from("ai_tokens")
        .select("*")
        .eq("tenant_id", user?.id)
        .eq("is_active", true)
        .maybeSingle();
        
      if (error) throw error;
      setHasSubscription(!!data);
    } catch (error) {
      console.error("Error checking subscription:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to verify your subscription status."
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSubscribe = async () => {
    try {
      // Redirect to a payment page or process (mock for now)
      toast({
        title: "Subscribing...",
        description: "Processing your subscription request."
      });
      
      // For demo purposes, we'll simulate a successful subscription
      // In a real implementation, you would integrate with a payment processor
      setTimeout(() => {
        navigate("/ai-assistant?tab=tokens");
        toast({
          title: "Subscription active!",
          description: "Please add your API token to start using the AI assistant."
        });
      }, 1500);
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        variant: "destructive",
        title: "Subscription failed",
        description: "There was an error processing your subscription."
      });
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">AI Assistant</h1>
          <Card className="p-6 text-center">
            <h2 className="text-lg font-semibold mb-4">Authentication Required</h2>
            <p className="mb-4">Please log in to access the AI assistant features.</p>
            <Button onClick={() => navigate("/auth/login")}>
              Login
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">AI Assistant</h1>
          <Card className="p-6 text-center">
            <p>Loading subscription status...</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">AI Assistant</h1>
        
        {hasSubscription ? (
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
        ) : (
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Subscribe to AI Assistant</h2>
            <p className="mb-6">
              Unlock the power of our AI Assistant for just $10/month. Automate tasks, get recommendations, and streamline your operations with advanced AI.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium mb-2">Features:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Automate scheduling and staff assignments</li>
                <li>Get personalized recommendations</li>
                <li>Answer complex questions about your business</li>
                <li>24/7 AI assistance for your staffing needs</li>
              </ul>
            </div>
            <Button onClick={handleSubscribe} className="w-full">
              Subscribe for $10/month
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
