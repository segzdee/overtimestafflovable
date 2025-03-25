
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Logo } from "@/components/ui/logo";
import { ArrowLeft } from "lucide-react";
import { PasswordInput } from "@/components/forms/auth/PasswordInput";
import { LoginFormSkeleton } from "@/components/forms/auth/LoginFormSkeleton";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Simulate page loading
  useState(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast({
        title: "Success",
        description: "Logged in successfully"
      });
      // Note: No need to navigate here since the login function in AuthProvider already handles redirection
    } catch (error) {
      const message = error instanceof Error ? error.message : "Invalid credentials";
      toast({
        variant: "destructive",
        title: "Error",
        description: message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <Logo />
            <h2 className="mt-4 text-xl font-bold">Welcome back</h2>
            <p className="mt-1 text-sm text-gray-600">
              Please sign in to your account
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-900 -ml-2 mb-2"
              disabled={isPageLoading || isLoading}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to home
            </Button>
            
            {isPageLoading ? (
              <LoginFormSkeleton />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <PasswordInput
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-purple-600 hover:text-purple-500"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full text-slate-50 bg-purple-900 hover:bg-purple-800"
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>

                <div className="text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto font-semibold text-purple-600 hover:text-purple-500"
                    onClick={() => navigate("/register")}
                    disabled={isLoading}
                  >
                    Sign up
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
