
import { useState, useEffect } from "react";
import { 
  Bot, 
  Loader2, 
  Terminal,
  X
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth";

type AIAgentWidgetProps = {
  userType: "agency" | "company";
  entityId?: string;
};

export const AIAgentWidget = ({ userType, entityId }: AIAgentWidgetProps) => {
  const [hasSubscription, setHasSubscription] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState<any>(null);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user, generateAiToken } = useAuth();

  useEffect(() => {
    if (user?.id) {
      checkSubscription();
    }
  }, [userType, entityId, user?.id]);

  const checkSubscription = async () => {
    setLoading(true);
    try {
      // Since we're using the existing AI tokens approach from the auth context
      // instead of a separate subscription table
      const { data, error } = await supabase
        .from("ai_tokens")
        .select("*")
        .eq("tenant_id", user?.id)
        .order("created_at", { ascending: false })
        .limit(1);

      if (error) {
        console.error("Token check error:", error);
        setHasSubscription(false);
      } else if (data && data.length > 0) {
        setHasSubscription(true);
        setSubscriptionData(data[0]);
      } else {
        setHasSubscription(false);
      }
    } catch (err) {
      console.error("Error checking tokens:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = () => {
    setShowSubscribeModal(true);
  };

  const createSubscription = async () => {
    try {
      if (!user?.id) {
        throw new Error("User not authenticated");
      }
      
      // Use the existing generateAiToken function from auth context
      const token = await generateAiToken(`${userType} AI Assistant`, user.id);
      
      if (token) {
        setHasSubscription(true);
        setSubscriptionData(token);
        setShowSubscribeModal(false);
        
        toast({
          title: "AI Assistant Activated",
          description: "Your AI assistant is now active and ready to use.",
        });
      }
    } catch (err: any) {
      console.error("Error creating token:", err);
      toast({
        variant: "destructive",
        title: "Activation Failed",
        description: err.message || "Could not activate AI assistant.",
      });
    }
  };

  const openAssistant = () => {
    toast({
      title: "AI Assistant",
      description: "Opening AI Assistant interface...",
    });
    // This would open the full AI assistant interface
  };

  const viewAPI = () => {
    toast({
      title: "API Token",
      description: `Your API token: ${subscriptionData?.token?.substring(0, 8)}...`,
    });
    // This would show API token details
  };

  return (
    <div className="fixed bottom-4 right-4 z-30">
      {loading ? (
        <div className="bg-white p-3 rounded-lg shadow-lg flex items-center">
          <Loader2 className="h-5 w-5 text-purple-600 mr-2 animate-spin" />
          <span>Loading...</span>
        </div>
      ) : hasSubscription ? (
        <div className="bg-white rounded-lg shadow-lg p-4 w-64">
          <div className="flex items-center mb-3">
            <Bot className="w-6 h-6 text-purple-600 mr-2" />
            <h3 className="font-medium">AI Assistant</h3>
          </div>
          
          <div className="text-xs text-gray-600 mb-3">
            Your AI Assistant is active and ready to help.
          </div>
          
          <div className="flex space-x-2">
            <Button 
              onClick={openAssistant}
              variant="default" 
              size="sm"
              className="text-white bg-purple-900 hover:bg-purple-800 flex-1"
            >
              Open Assistant
            </Button>
            <Button 
              onClick={viewAPI}
              variant="outline" 
              size="sm"
            >
              <Terminal className="h-3.5 w-3.5 mr-1" />
              API
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-4 w-64">
          <div className="flex items-center mb-3">
            <Bot className="w-6 h-6 text-gray-400 mr-2" />
            <h3 className="font-medium">AI Assistant</h3>
          </div>
          
          <div className="text-xs text-gray-600 mb-3">
            Upgrade to AI Assistant for automated staffing and insights.
          </div>
          
          <Button 
            onClick={handleSubscribe}
            className="w-full bg-purple-900 hover:bg-purple-800 text-white"
            size="sm"
          >
            Activate Now
          </Button>
        </div>
      )}
      
      {/* Subscription Modal */}
      <Dialog open={showSubscribeModal} onOpenChange={setShowSubscribeModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Activate AI Assistant</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-4 top-4"
              onClick={() => setShowSubscribeModal(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          
          <div className="py-4">
            <p className="mb-4">Activate our AI Assistant to unlock automated staffing and operational insights.</p>
            
            {/* Mock payment form - in a real app, integrate with a payment provider */}
            <div className="mb-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="4242 4242 4242 4242" />
              </div>
              
              <div className="flex space-x-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input id="expiryDate" placeholder="MM/YY" />
                </div>
                <div className="w-1/3 space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                onClick={() => setShowSubscribeModal(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={createSubscription}
                className="flex-1 bg-purple-900 hover:bg-purple-800 text-white"
              >
                Activate
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIAgentWidget;
