import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { AlertTriangle } from "lucide-react";

type UserRole = "company" | "agency" | "shift-worker" | "admin" | "aiagent";

interface RegistrationFormState {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  role: UserRole | "";
}

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState<RegistrationFormState>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    role: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState<{
    score: number;
    feedback: string;
  }>({ score: 0, feedback: "" });
  
  const handleChange = (
    name: keyof RegistrationFormState,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === "password") {
      checkPasswordStrength(value);
    }
  };
  
  const checkPasswordStrength = (password: string): void => {
    let score = 0;
    let feedback = "";
    
    if (password.length < 8) {
      feedback = "Password must be at least 8 characters";
    } else {
      if (/[A-Z]/.test(password)) score += 1;
      if (/[a-z]/.test(password)) score += 1;
      if (/[0-9]/.test(password)) score += 1;
      if (/[^A-Za-z0-9]/.test(password)) score += 1;
      
      if (score <= 2) feedback = "Weak password";
      else if (score === 3) feedback = "Moderate password";
      else feedback = "Strong password";
    }
    
    setPasswordStrength({ score, feedback });
  };
  
  const getPasswordStrengthColor = (): string => {
    switch (passwordStrength.score) {
      case 0:
      case 1:
      case 2:
        return "bg-destructive";
      case 3:
        return "bg-yellow-500";
      case 4:
        return "bg-emerald-500";
      default:
        return "bg-gray-300";
    }
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    
    if (passwordStrength.score < 3) {
      setError("Please use a stronger password");
      return;
    }
    
    if (!formData.role) {
      setError("Please select a user type");
      return;
    }
    
    try {
      setLoading(true);
      setError("");
      
      await register(
        formData.email,
        formData.password,
        formData.role as UserRole,
        formData.name
      );
      
      // Registration successful - AuthContext will handle the redirect
    } catch (error) {
      setError(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <img
            src="/logo.svg"
            alt="OvertimeStaff"
            className="h-8 w-auto"
          />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "OvertimeStaff has revolutionized how we manage our shift workers and staffing needs."
            </p>
            <footer className="text-sm">Sofia Davis, HR Manager</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your details below to create your account
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
              {formData.password && (
                <div className="mt-2">
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className={`${getPasswordStrengthColor()} h-2 rounded-full transition-all`} 
                      style={{ width: `${passwordStrength.score * 25}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {passwordStrength.feedback}
                  </p>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">I am a...</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => handleChange("role", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="company">Company (Hiring Staff)</SelectItem>
                  <SelectItem value="agency">Staffing Agency</SelectItem>
                  <SelectItem value="shift-worker">Shift Worker</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Sign up"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>

          <p className="px-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Button
              variant="link"
              className="underline underline-offset-4 hover:text-primary"
              onClick={() => navigate("/login")}
            >
              Sign in
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
