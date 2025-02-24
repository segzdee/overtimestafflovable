
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Logo } from "@/components/ui/logo";
import { ArrowLeft, ChefHat, Building2, Briefcase, Users } from "lucide-react";
import { LoginCard } from "@/components/auth/LoginCard";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const demoAccounts = [
    {
      role: "shift-worker",
      title: "Shift Worker",
      subtitle: "Access available shifts and manage your schedule",
      icon: ChefHat,
      email: "chef@demo.com",
      password: "demopass123"
    },
    {
      role: "company",
      title: "Company",
      subtitle: "Post shifts and manage your staff requirements",
      icon: Building2,
      email: "company@demo.com",
      password: "demopass123"
    },
    {
      role: "agency",
      title: "Staffing Agency",
      subtitle: "Manage your workforce and client relationships",
      icon: Users,
      email: "agency@demo.com",
      password: "demopass123"
    },
    {
      role: "admin",
      title: "Admin",
      subtitle: "Platform administration and oversight",
      icon: Briefcase,
      email: "admin@demo.com",
      password: "demopass123"
    }
  ];

  const handleDemoLogin = (role: string) => {
    const account = demoAccounts.find(acc => acc.role === role);
    if (account) {
      setSelectedRole(role);
      setEmail(account.email);
      setPassword(account.password);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast({
        title: "Success",
        description: "Logged in successfully",
      });
      navigate("/dashboard");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Invalid credentials";
      toast({
        variant: "destructive",
        title: "Error",
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl space-y-6">
        <div className="text-center">
          <Logo />
          <h2 className="mt-4 text-xl font-bold">Welcome back</h2>
          <p className="mt-1 text-sm text-gray-600">
            Please sign in to your account or use one of our demo accounts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {demoAccounts.map((account) => (
            <LoginCard
              key={account.role}
              role={account.role}
              title={account.title}
              subtitle={account.subtitle}
              icon={account.icon}
              isActive={selectedRole === account.role}
              onClick={handleDemoLogin}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border space-y-4 max-w-md mx-auto">
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
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
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
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>

          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Button
              variant="link"
              className="p-0 h-auto font-semibold text-purple-600 hover:text-purple-500"
              onClick={() => navigate("/register")}
            >
              Sign up
            </Button>
          </div>
        </form>

        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
