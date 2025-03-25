
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { ArrowLeft, Bot } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function TokenValidation() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginWithToken(token);
      toast({
        title: "Success",
        description: "AI token validated successfully."
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid or expired token.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 pb-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bot className="h-8 w-8 text-indigo-600" />
            </div>
            <h2 className="text-xl font-bold">AI Agent Access</h2>
            <p className="mt-1 text-sm text-gray-600">
              Enter your AI access token to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-gray-900 -ml-2 mb-2"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">AI Token</label>
              <Input 
                type="password" 
                placeholder="Enter your AI token" 
                value={token} 
                onChange={e => setToken(e.target.value)} 
                required 
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                AI tokens are provided by agencies or businesses that have subscribed to the AI service.
              </p>
            </div>

            <Button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
              {loading ? "Validating..." : "Access AI Agent"}
            </Button>

            <div className="text-center">
              <Button variant="link" onClick={() => navigate("/login")} className="text-sm text-slate-950">
                Return to regular login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
