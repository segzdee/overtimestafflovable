
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/components/ui/use-toast";
import { Logo } from "@/components/ui/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, AlertCircle } from "lucide-react";

const RegisterPage = () => {
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "shift-worker",
    category: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await register(
        formData.email,
        formData.password,
        formData.role as "shift-worker" | "agency" | "company" | "admin" | "aiagent",
        formData.name,
        formData.category || undefined
      );
      
      setSuccess(true);
      toast({
        title: "Registration successful!",
        description: "Please check your email to verify your account.",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Registration failed";
      setError(message);
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: message
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Logo />
        </div>
        
        <div className="p-6 rounded-lg shadow-sm border bg-neutral-50">
          <h2 className="text-xl font-semibold text-center mb-4">Create Account</h2>
          <p className="text-center text-gray-600 mb-4 text-sm">Join OVERTIMESTAFF</p>
          
          {!success ? (
            <>
              <Alert className="mb-4 bg-blue-50 border-blue-200">
                <Mail className="h-4 w-4 mr-2 text-blue-600" />
                <AlertDescription className="text-blue-700">
                  After registering, you'll receive a verification email. Please check your inbox.
                </AlertDescription>
              </Alert>
              
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Password</label>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                    placeholder="Create a secure password"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Account Type</label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => setFormData({...formData, role: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shift-worker">Shift Worker</SelectItem>
                      <SelectItem value="agency">Agency</SelectItem>
                      <SelectItem value="company">Company</SelectItem>
                      <SelectItem value="aiagent">AI Agent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </Button>
                
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Button 
                      variant="link" 
                      className="p-0" 
                      onClick={() => navigate("/login")}
                      type="button"
                    >
                      Sign in
                    </Button>
                  </p>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="mb-4 text-green-500">
                <Mail className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium mb-2">Registration Successful!</h3>
              <p className="text-gray-600 mb-4">
                Please check your email to verify your account before logging in.
              </p>
              <Button onClick={() => navigate("/login")}>
                Go to Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
