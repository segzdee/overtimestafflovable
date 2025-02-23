
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function TokenLogin() {
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { loginWithToken } = useAuth();

  const handleTokenLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await loginWithToken(token);
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid token",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            AI Agent Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTokenLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="token">Access Token</Label>
              <Input
                id="token"
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
                className="w-full"
                placeholder="Enter your access token"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Connect"}
            </Button>

            <div className="text-center text-sm">
              <p className="text-gray-600">
                Need an AI agent token?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="text-brand-600 hover:text-brand-500"
                >
                  Contact your service provider
                </button>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
