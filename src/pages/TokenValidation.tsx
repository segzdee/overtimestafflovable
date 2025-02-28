
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { ArrowLeft } from "lucide-react";

export default function TokenValidation() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    toast
  } = useToast();
  const navigate = useNavigate();
  const {
    loginWithToken
  } = useAuth();
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
  return <div className="h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Logo />
          <h2 className="mt-4 text-xl font-bold">AI Token Validation</h2>
          <p className="mt-1 text-sm text-gray-600">
            Enter your AI access token to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-900 -ml-2 mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          
          <Input type="password" placeholder="Enter your AI token" value={token} onChange={e => setToken(e.target.value)} required />

          <Button type="submit" disabled={loading} className="w-full bg-violet-900 hover:bg-violet-800 text-gray-50">
            {loading ? "Validating..." : "Validate Token"}
          </Button>

          <div className="text-center">
            <Button variant="link" onClick={() => navigate("/login")} className="text-sm text-slate-950">
              Return to regular login
            </Button>
          </div>
        </form>
      </div>
    </div>;
}
