
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth";
import { toast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";

export function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setError("");
      setLoading(true);
      await login(formData.email, formData.password);
      
      toast({
        title: "Welcome back",
        description: "You have successfully logged in."
      });

      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to login");
      toast({
        variant: "destructive",
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to login"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <Input
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            className="w-full pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          variant="link"
          className="p-0 h-auto text-sm"
          onClick={() => navigate("/forgot-password")}
          type="button"
        >
          Forgot password?
        </Button>
      </div>

      {error && (
        <div className="text-sm text-red-500">{error}</div>
      )}

      <Button
        type="submit"
        className="w-full bg-[#0B4A3F] hover:bg-[#0B4A3F]/90"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign in"}
      </Button>

      <p className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Button
          variant="link"
          className="p-0 h-auto font-normal text-primary hover:text-primary/90"
          onClick={() => navigate("/register")}
        >
          Sign up
        </Button>
      </p>
    </form>
  );
}
