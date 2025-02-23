
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

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
        description: "AI token validated successfully.",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid or expired token.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Logo />
          <h2 className="mt-6 text-2xl font-bold">AI Token Validation</h2>
          <p className="mt-2 text-gray-600">
            Enter your AI access token to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <Input
            type="password"
            placeholder="Enter your AI token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Validating..." : "Validate Token"}
          </Button>

          <div className="text-center">
            <Button
              variant="link"
              className="text-sm text-gray-600"
              onClick={() => navigate("/login")}
            >
              Return to regular login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
