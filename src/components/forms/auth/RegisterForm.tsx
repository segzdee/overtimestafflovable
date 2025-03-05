import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PasswordInput } from "./PasswordInput";
import { TermsCheckbox } from "./TermsCheckbox";
import { RegisterFormAlerts } from "./RegisterFormAlerts";
import { UserTypeFields } from "./UserTypeFields";
import { registrationService } from "@/lib/registration/registration-service";
import { executeWithConnectionRetry } from "@/lib/robust-connection-handler";

interface RegisterFormProps {
  onNetworkError?: (formData: any) => void;
  pendingRegistration?: any;
  onRegistrationSuccess?: () => void;
  initialRole?: string | null;
}

export function RegisterForm({ 
  onNetworkError, 
  pendingRegistration,
  onRegistrationSuccess,
  initialRole
}: RegisterFormProps = {}) {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: initialRole || "",
    category: "",
    name: ""
  });
  
  useEffect(() => {
    if (initialRole) {
      setFormData(prev => ({
        ...prev,
        role: initialRole
      }));
    }
  }, [initialRole]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [networkError, setNetworkError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    if (pendingRegistration) {
      setFormData(pendingRegistration);
      setAgreedToTerms(true); // Assume they agreed previously
      
      toast({
        title: "Registration Data Restored",
        description: "We've restored your previous registration data.",
      });
    }
  }, [pendingRegistration, toast]);
  
  const validateForm = () => {
    if (!agreedToTerms) {
      setError("Please agree to the Terms and Privacy Policy");
      return false;
    }
    
    if (!formData.email || !formData.name) {
      setError("All fields are required");
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    
    if (!formData.role) {
      setError("Please select an account type");
      return false;
    }
    
    if (formData.role !== "shift-worker" && !formData.category) {
      setError("Please select a category");
      return false;
    }
    
    return true;
  };

  const submitForm = async () => {
    try {
      setError("");
      setNetworkError(false);
      setLoading(true);
      
      const validRole = ["company", "agency", "shift-worker", "admin", "aiagent"].includes(formData.role) 
        ? formData.role 
        : null;
        
      if (!validRole) {
        setError("Invalid account type selected");
        return;
      }
      
      const result = await executeWithConnectionRetry(
        async () => registrationService.register({
          email: formData.email,
          password: formData.password,
          role: validRole as "company" | "agency" | "shift-worker" | "admin" | "aiagent",
          name: formData.name,
          category: formData.category
        }),
        { criticalOperation: true }
      );
      
      if (result.success) {
        setSuccessMessage(result.message || "Account created successfully! Please check your email to verify your account before logging in.");
        toast({
          title: "Account created successfully",
          description: "Please check your email to verify your account",
        });
        
        if (onRegistrationSuccess) {
          onRegistrationSuccess();
        }
        
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
          role: "",
          category: "",
          name: ""
        });
        
        navigate("/registration-success");
      } else {
        setError(result.message || "Registration failed");
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: result.message || "An error occurred during registration"
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create account";
      
      if (err instanceof Error && 
          (errorMessage.includes('network') || 
           errorMessage.includes('connection') || 
           errorMessage.includes('offline'))) {
        setNetworkError(true);
        
        if (onNetworkError) {
          onNetworkError(formData);
        }
      }
      
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: errorMessage
      });
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      await submitForm();
    }
  };
  
  const retryRegistration = () => {
    setNetworkError(false);
    setError("");
    if (validateForm()) {
      submitForm();
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <RegisterFormAlerts 
        error={error}
        networkError={networkError}
        successMessage={successMessage}
        retryRegistration={retryRegistration}
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">I am a</label>
        <Select 
          value={formData.role} 
          onValueChange={value => setFormData({
            ...formData,
            role: value,
            category: ""
          })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select account type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="company">Business (Hiring Staff)</SelectItem>
            <SelectItem value="agency">Staffing Agency</SelectItem>
            <SelectItem value="shift-worker">Shift Worker</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <UserTypeFields 
        role={formData.role}
        category={formData.category}
        onCategoryChange={(value) => setFormData({
          ...formData,
          category: value
        })}
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <Input 
          type="text" 
          placeholder="Enter your full name" 
          value={formData.name} 
          onChange={e => setFormData({
            ...formData,
            name: e.target.value
          })} 
          required 
          className="w-full" 
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <Input 
          type="email" 
          placeholder="Enter your email" 
          value={formData.email} 
          onChange={e => setFormData({
            ...formData,
            email: e.target.value
          })} 
          required 
          className="w-full" 
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <PasswordInput 
          value={formData.password}
          onChange={e => setFormData({
            ...formData,
            password: e.target.value
          })}
          placeholder="Create a password"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
        <Input 
          type="password" 
          placeholder="Confirm your password" 
          value={formData.confirmPassword} 
          onChange={e => setFormData({
            ...formData,
            confirmPassword: e.target.value
          })} 
          required 
          className="w-full" 
        />
      </div>

      <TermsCheckbox 
        agreedToTerms={agreedToTerms}
        onAgreedToTermsChange={setAgreedToTerms}
      />

      <Button 
        type="submit" 
        disabled={loading} 
        className="w-full text-stone-50 bg-violet-900 hover:bg-violet-800"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </Button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Button 
          variant="link" 
          className="p-0 h-auto font-normal text-primary hover:text-primary/90" 
          onClick={() => navigate("/login")}
          type="button"
        >
          Sign in
        </Button>
      </p>
    </form>
  );
}
