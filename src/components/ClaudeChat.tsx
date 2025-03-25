
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { getAITokens, getAIToken } from "@/lib/supabase/aiTokens";
import { Loader2, Send, User, Bot } from "lucide-react";
import { useAuth } from "@/contexts/auth";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ClaudeChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tokens, setTokens] = useState<{ id: string; name: string }[]>([]);
  const [selectedToken, setSelectedToken] = useState("");
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadTokens();
    }
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadTokens = async () => {
    const allTokens = await getAITokens("anthropic");
    setTokens(allTokens.filter(t => t.isActive).map(t => ({ id: t.id, name: t.name })));
    if (allTokens.length > 0 && allTokens[0].isActive) {
      setSelectedToken(allTokens[0].id);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    if (!selectedToken) {
      toast({
        title: "Error",
        description: "Please select an API token",
        variant: "destructive",
      });
      return;
    }

    const userMessage = { role: 'user' as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Get the token value
      const tokenData = await getAIToken(selectedToken);
      if (!tokenData) {
        throw new Error("Token not found or inactive");
      }

      // Format messages for Anthropic API
      const formattedMessages = messages.concat(userMessage).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Call the Edge Function
      const { data, error } = await supabase.functions.invoke('claude-chat', {
        body: {
          messages: formattedMessages,
          apiKey: tokenData.token,
          model: "claude-3-haiku-20240307" // You can make this configurable
        }
      });

      if (error) throw error;

      // Add response to chat
      if (data && data.content && data.content.length > 0) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.content[0].text }
        ]);
      } else {
        throw new Error("Invalid response from Claude API");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      });
      
      // Add error message
      setMessages((prev) => [
        ...prev,
        { 
          role: 'assistant', 
          content: "I'm sorry, I encountered an error processing your request. Please try again later."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p>Please log in to use the AI chat.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Claude AI Assistant</CardTitle>
          <select
            value={selectedToken}
            onChange={(e) => setSelectedToken(e.target.value)}
            className="p-2 rounded-md border text-sm"
            disabled={isLoading}
          >
            <option value="">Select API Token</option>
            {tokens.map((token) => (
              <option key={token.id} value={token.id}>
                {token.name}
              </option>
            ))}
          </select>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto flex flex-col space-y-4 p-4">
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-center text-muted-foreground p-4">
            <div>
              <h3 className="font-medium">Welcome to the Claude AI Assistant</h3>
              <p className="text-sm mt-2">
                Start a conversation to get responses from Claude.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    {message.role === 'user' ? (
                      <>
                        <span className="font-medium">You</span>
                        <User size={14} />
                      </>
                    ) : (
                      <>
                        <Bot size={14} />
                        <span className="font-medium">Claude</span>
                      </>
                    )}
                  </div>
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
        
        {isLoading && (
          <div className="flex justify-center items-center py-2">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}
      </CardContent>
      
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={isLoading || !selectedToken}
            className="flex-1"
          />
          <Button
            onClick={sendMessage}
            disabled={isLoading || !input.trim() || !selectedToken}
          >
            <Send size={18} />
          </Button>
        </div>
        {tokens.length === 0 && (
          <p className="text-xs text-muted-foreground mt-2">
            You need to add an Anthropic API token in the token manager to use this feature.
          </p>
        )}
      </div>
    </Card>
  );
}
