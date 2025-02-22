
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [loginMethod, setLoginMethod] = useState<"credentials" | "token">("credentials");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, loginWithToken } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setError("");
      setLoading(true);
      
      let user;
      
      if (loginMethod === "credentials") {
        user = await login(email, password);
        
        if (user.role === "admin") {
          navigate("/dashboard/admin");
        } else {
          navigate(`/dashboard/${user.role.toLowerCase()}`);
        }
      } else {
        user = await loginWithToken(token);
        navigate(`/dashboard/${user.role.toLowerCase()}`);
      }

      toast({
        title: "Login successful",
        description: `Welcome back!`,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Sign in to your account</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="mb-6">
            <ToggleGroup
              type="single"
              value={loginMethod}
              onValueChange={(value) => value && setLoginMethod(value as "credentials" | "token")}
              className="justify-center"
            >
              <ToggleGroupItem value="credentials">Standard Login</ToggleGroupItem>
              <ToggleGroupItem value="token">AI Agent Login</ToggleGroupItem>
            </ToggleGroup>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {loginMethod === "credentials" ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="token">AI Agent Token</Label>
                <Input
                  id="token"
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Enter the authentication token provided by your Company or Agency.
                </p>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? "Signing in..." : loginMethod === "token" ? "Access with Token" : "Sign in"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
