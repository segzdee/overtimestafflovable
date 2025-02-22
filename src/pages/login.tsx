
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

export default function AdminLogin() {
  // Add meta tags to prevent indexing
  useEffect(() => {
    // Add noindex meta tag
    const metaRobots = document.createElement('meta');
    metaRobots.name = 'robots';
    metaRobots.content = 'noindex, nofollow';
    document.head.appendChild(metaRobots);

    // Clean up
    return () => {
      document.head.removeChild(metaRobots);
    };
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(true); // Default to admin login
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  // Ensure we're in admin mode
  useEffect(() => {
    if (!isAdmin) {
      setIsAdmin(true);
    }
  }, [isAdmin]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Admin login only
      const { data, error } = await supabase
        .from('admin_users')
        .select('admin_id, email, name, role')
        .eq('email', email)
        .eq('password_hash', password) // Note: In production, use proper password hashing
        .single();

      if (error || !data) {
        throw new Error('Invalid admin credentials');
      }

      // Update last login timestamp
      await supabase
        .from('admin_users')
        .update({ last_login: new Date().toISOString() })
        .eq('admin_id', data.admin_id);

      // Log admin activity
      await supabase.rpc('log_admin_activity', {
        p_admin_id: data.admin_id,
        p_action_type: 'LOGIN',
        p_action_details: { timestamp: new Date().toISOString() }
      });

      navigate('/dashboard/admin');
      
      toast({
        title: "Admin login successful",
        description: "Welcome back!",
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again",
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
            Platform Administrator Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Admin Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
                placeholder="Enter admin email"
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
                className="w-full"
                placeholder="Enter password"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login as Administrator"}
            </Button>

            <p className="text-center text-xs text-gray-600 mt-4">
              This is a protected administrator login page.
              <br />
              If you're looking to sign up as a worker or business, please visit our{" "}
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-brand-600 hover:text-brand-500"
              >
                homepage
              </button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
