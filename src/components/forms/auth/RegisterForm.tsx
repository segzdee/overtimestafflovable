
import { useState, FormEvent, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { RoleSelector } from "./components/RoleSelector";
import { UserTypeFields } from "./UserTypeFields";
import { UserDataFields } from "./components/UserDataFields";
import { PasswordFields } from "./components/PasswordFields";
import { TermsCheckbox } from "./TermsCheckbox";
import { RegisterFormAlerts } from "./RegisterFormAlerts";
import { RegistrationFooter } from "./components/RegistrationFooter";
import { useAuth } from "@/contexts/auth";
import { checkConnection } from "@/lib/robust-connection-handler";
import { AuthFormData } from "./types";
import { registerUser, storeRegistrationForLater } from "@/services/authService";

interface RegisterFormProps {
  onNetworkError?: (formData: any) => void;
  pendingRegistration?: any;
  onRegistrationSuccess?: () => void;
  initialRole?: string;
}

export function RegisterForm({ 
  onNetworkError, 
  pendingRegistration,
  onRegistrationSuccess,
  initialRole = ""
}: RegisterFormProps) {
  const { toast } = useToast();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState<AuthFormData>({
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
      
      // First check connection
      const isConnected = await checkConnection();
      if (!isConnected) {
        setNetworkError(true);
        if (onNetworkError) {
          onNetworkError(formData);
        }
        // Store registration data for later submission
        storeRegistrationForLater({
          email: formData.email,
          password: formData.password || "",
          role: validRole as "company" | "agency" | "shift-worker" | "admin" | "aiagent",
          name: formData.name || "",
          category: formData.category
        });
        setLoading(false);
        return;
      }
      
      // Use the auth context register function
      await register(
        formData.email,
        formData.password || "",
        validRole as "company" | "agency" | "shift-worker" | "admin" | "aiagent",
        formData.name || "",
        formData.category
      );
      
      setSuccessMessage("Account created successfully! You can now login.");
      
      if (onRegistrationSuccess) {
        onRegistrationSuccess();
      }
      
      resetForm();
    } catch (err) {
      handleRegistrationError(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleRegistrationError = (err: any) => {
    const errorMessage = err instanceof Error ? err.message : "Failed to create account";
    
    if (err instanceof Error && 
        (errorMessage.includes('network') || 
         errorMessage.includes('connection') || 
         errorMessage.includes('offline'))) {
      setNetworkError(true);
      
      if (onNetworkError) {
        onNetworkError(formData);
      }
      
      // Store registration data for later
      storeRegistrationForLater({
        email: formData.email,
        password: formData.password || "",
        role: formData.role as "company" | "agency" | "shift-worker" | "admin" | "aiagent",
        name: formData.name || "",
        category: formData.category
      });
    }
    
    toast({
      variant: "destructive",
      title: "Registration failed",
      description: errorMessage
    });
    setError(errorMessage);
  };
  
  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      category: "",
      name: ""
    });
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
  
  const updateFormValue = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <RegisterFormAlerts 
        error={error}
        networkError={networkError}
        successMessage={successMessage}
        retryRegistration={retryRegistration}
      />

      <RoleSelector 
        value={formData.role}
        onChange={(value) => updateFormValue("role", value)}
      />

      <UserTypeFields 
        role={formData.role}
        category={formData.category}
        onCategoryChange={(value) => updateFormValue("category", value)}
      />

      <UserDataFields 
        name={formData.name}
        email={formData.email}
        onNameChange={(value) => updateFormValue("name", value)}
        onEmailChange={(value) => updateFormValue("email", value)}
      />

      <PasswordFields 
        password={formData.password}
        confirmPassword={formData.confirmPassword}
        onPasswordChange={(value) => updateFormValue("password", value)}
        onConfirmPasswordChange={(value) => updateFormValue("confirmPassword", value)}
      />

      <TermsCheckbox 
        agreedToTerms={agreedToTerms}
        onAgreedToTermsChange={setAgreedToTerms}
      />

      <RegistrationFooter loading={loading} />
    </form>
  );
}
