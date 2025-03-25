
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase/client";
import { Eye, EyeOff } from "lucide-react";

export function NewPasswordForm() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.updateUser({
        password: formData.password
      });

      if (error) throw error;

      toast({
        title: "Password updated",
        description: "Your password has been successfully reset.",
      });
      
      navigate("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset password");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to reset password. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">New Password</label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
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

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
        <Input
          type="password"
          placeholder="Confirm new password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          required
          className="w-full"
        />
      </div>

      {error && (
        <div className="text-sm text-red-500">{error}</div>
      )}

      <Button
        type="submit"
        className="w-full bg-[#0B4A3F] hover:bg-[#0B4A3F]/90"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Password"}
      </Button>
    </form>
  );
}
