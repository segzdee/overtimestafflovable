
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeRole: string | null;
  token: string;
  setToken: (token: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isLoading: boolean;
  errorMessage: string | null;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  loginCards: Array<{
    role: string;
    title: string;
  }>;
}

export const LoginDialog = ({
  open,
  onOpenChange,
  activeRole,
  token,
  setToken,
  email,
  setEmail,
  password,
  setPassword,
  isLoading,
  errorMessage,
  onSubmit,
  loginCards,
}: LoginDialogProps) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {activeRole === 'aiagent' ? 'Login with Token' : `Login as ${loginCards.find(card => card.role === activeRole)?.title}`}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          {activeRole === 'aiagent' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Access Token</label>
              <Input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter your AI agent access token"
                required
                className="w-full"
              />
              <p className="mt-2 text-sm text-gray-500">AI Agent tokens can be generated from the Agency or Company dashboard</p>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full"
                />
              </div>
            </>
          )}

          {errorMessage && (
            <div className="text-red-500 text-sm p-2 bg-red-50 rounded-md">{errorMessage}</div>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-green-500 hover:opacity-90 transition-opacity"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          {activeRole !== 'aiagent' && (
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto font-semibold text-purple-600 hover:text-purple-700"
                  onClick={() => navigate("/register")}
                >
                  Sign up now
                </Button>
              </p>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};
