
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export default function CompleteProfile() {
  const { userType } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Placeholder for profile completion
  const handleCompleteProfile = async () => {
    setIsLoading(true);
    
    try {
      // In a real implementation, this would save the profile data
      // For now, we'll just simulate a successful profile completion
      toast({
        title: "Profile completed",
        description: "Your profile has been successfully updated.",
      });
      
      // Redirect to the appropriate dashboard
      switch (userType) {
        case 'shift-worker':
          navigate('/dashboard/shift-worker');
          break;
        case 'agency':
          navigate('/dashboard/agency');
          break;
        case 'company':
          navigate('/dashboard/company');
          break;
        case 'admin':
          navigate('/dashboard/admin');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to complete your profile. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Complete Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6 text-center">
            Welcome {user?.name || "User"}! Please complete your profile information to continue.
          </p>
          
          {/* This would be replaced with actual form fields based on user type */}
          <div className="space-y-4">
            <div className="p-4 bg-gray-100 rounded-md text-center text-gray-500">
              Profile form for {userType} would appear here
            </div>
            
            <Button 
              onClick={handleCompleteProfile}
              className="w-full text-slate-50 bg-purple-900 hover:bg-purple-800"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Complete Profile"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
