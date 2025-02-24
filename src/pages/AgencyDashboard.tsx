
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/components/ui/use-toast";
import { Bot } from "lucide-react";
import { FormData } from "@/features/agency/types";
import { AgencyProfile } from "@/features/agency/components/AgencyProfile";
import { AIAgents } from "@/features/agency/components/AIAgents";
import { ShiftManagementInfo } from "@/features/agency/components/ShiftManagementInfo";
import { BulkAssignmentWizard } from "@/features/agency/components/BulkAssignmentWizard";

export default function AgencyDashboard() {
  const { user, logout, updateProfile, generateAiToken, aiTokens, revokeAiToken } = useAuth();
  const { toast } = useToast();
  const [isActivatingAI, setIsActivatingAI] = useState(false);
  
  const initialFormData: FormData = {
    name: user?.name || "",
    agencyName: user?.agencyName || "",
    address: user?.address || "",
    phoneNumber: user?.phoneNumber || "",
    specialization: user?.specialization || "",
    staffingCapacity: user?.staffingCapacity || 0,
  };

  const handleUpdateProfile = async (formData: FormData) => {
    if (!user) return;

    try {
      await updateProfile(user.id, {
        ...formData,
        staffingCapacity: Number(formData.staffingCapacity)
      });
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  const handleCreateToken = async (name: string) => {
    if (!user?.id) return;
    return await generateAiToken(name, user.id);
  };

  const handleActivateAI = async () => {
    setIsActivatingAI(true);
    try {
      const token = await generateAiToken("Agency AI Assistant", user?.id || "");
      toast({
        title: "AI Agent Activated",
        description: "Your AI agent has been successfully activated. Save this token for future use.",
      });
      console.log("AI Agent Token:", token);
    } catch (error) {
      toast({
        title: "Activation Failed",
        description: "Failed to activate AI agent. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsActivatingAI(false);
    }
  };

  const agencyTokens = aiTokens.filter(
    token => token.authorizedBy.id === user?.id
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">Agency Dashboard</h2>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => logout()}>Logout</Button>
            <Button
              onClick={handleActivateAI}
              disabled={isActivatingAI}
              className="bg-gradient-to-r from-purple-600 to-green-500 text-white"
            >
              <Bot className="w-4 h-4 mr-2" />
              {isActivatingAI ? "Activating..." : "Activate AI Agent"}
            </Button>
          </div>
        </div>

        <BulkAssignmentWizard />

        <AgencyProfile 
          initialData={initialFormData}
          onSave={handleUpdateProfile}
        />

        <AIAgents 
          tokens={agencyTokens}
          onCreateToken={handleCreateToken}
          onRevokeToken={revokeAiToken}
        />

        <ShiftManagementInfo />
      </div>
    </DashboardLayout>
  );
}
