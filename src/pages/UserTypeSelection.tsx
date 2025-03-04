
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Building2, Users, Briefcase, ArrowLeft } from "lucide-react";

export default function UserTypeSelection() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  
  const userTypes = [
    {
      id: "company",
      title: "Company",
      description: "Post shifts and find staff for your business",
      icon: <Building2 className="h-10 w-10 text-purple-600" />
    },
    {
      id: "agency",
      title: "Staffing Agency",
      description: "Connect your staff with businesses that need them",
      icon: <Briefcase className="h-10 w-10 text-purple-600" />
    },
    {
      id: "shift-worker",
      title: "Shift Worker",
      description: "Find shifts and earn money on your schedule",
      icon: <Users className="h-10 w-10 text-purple-600" />
    }
  ];
  
  const handleContinue = () => {
    if (selectedType) {
      navigate(`/register/${selectedType}`);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <div className="flex justify-center mb-2">
            <Logo />
          </div>
          <CardTitle className="text-center text-2xl">Join OvertimeStaff</CardTitle>
          <p className="text-center text-gray-600 mt-2">
            Select how you want to use our platform
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userTypes.map((type) => (
              <div
                key={type.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedType === type.id
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-purple-300"
                }`}
                onClick={() => setSelectedType(type.id)}
              >
                <div className="flex items-center">
                  <div className="mr-4">{type.icon}</div>
                  <div>
                    <h3 className="font-medium">{type.title}</h3>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="pt-4 flex flex-col sm:flex-row sm:justify-between space-y-3 sm:space-y-0 sm:space-x-3">
              <Button
                variant="outline"
                onClick={() => navigate("/login")}
                className="text-gray-600"
              >
                Already have an account? Sign in
              </Button>
              
              <Button
                disabled={!selectedType}
                onClick={handleContinue}
                className="bg-purple-900 hover:bg-purple-800 text-white"
              >
                Continue
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
