
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/components/ui/use-toast";
import { Bot, BarChart4, Users, Building2, Calendar, Activity, TrendingUp } from "lucide-react";
import { FormData } from "@/features/agency/types";
import { AgencyProfile } from "@/features/agency/components/AgencyProfile";
import { AIAgents } from "@/features/agency/components/AIAgents";
import { ShiftManagementInfo } from "@/features/agency/components/ShiftManagementInfo";
import { BulkAssignmentWizard } from "@/features/agency/components/BulkAssignmentWizard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

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

  const [workers] = useState([
    { id: 1, name: "John Doe", role: "Chef", status: "Active", assignedShifts: 5 },
    { id: 2, name: "Jane Smith", role: "Server", status: "Active", assignedShifts: 3 },
    { id: 3, name: "Alex Johnson", role: "Bartender", status: "Inactive", assignedShifts: 0 },
    { id: 4, name: "Sarah Williams", role: "Host", status: "Active", assignedShifts: 2 }
  ]);

  const [clients] = useState([
    { id: 1, name: "Downtown Restaurant", shiftsThisMonth: 12, revenue: 2400 },
    { id: 2, name: "Midtown Cafe", shiftsThisMonth: 8, revenue: 1600 },
    { id: 3, name: "Harbor View Hotel", shiftsThisMonth: 15, revenue: 3000 }
  ]);

  const [agencyPerformance] = useState({
    placements: 85,
    retention: 92,
    clientSatisfaction: 88
  });

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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Agency Dashboard</h2>
            <p className="text-gray-500 mt-1">Manage your staffing operations and client relationships</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2" onClick={() => logout()}>
              <BarChart4 className="h-4 w-4" />
              Reports
            </Button>
            <Button
              onClick={handleActivateAI}
              disabled={isActivatingAI}
              className="bg-primary text-white flex items-center gap-2"
            >
              <Bot className="w-4 h-4" />
              {isActivatingAI ? "Activating..." : "AI Assistant"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Activity className="h-5 w-5 text-primary" />
                Agency Performance
              </CardTitle>
              <CardDescription>
                Key metrics for service quality and effectiveness
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Placement Rate</span>
                    <span className="text-sm font-medium">{agencyPerformance.placements}%</span>
                  </div>
                  <Progress value={agencyPerformance.placements} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Worker Retention</span>
                    <span className="text-sm font-medium">{agencyPerformance.retention}%</span>
                  </div>
                  <Progress value={agencyPerformance.retention} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Client Satisfaction</span>
                    <span className="text-sm font-medium">{agencyPerformance.clientSatisfaction}%</span>
                  </div>
                  <Progress value={agencyPerformance.clientSatisfaction} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Calendar className="h-5 w-5 text-primary" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-3">
                  <div className="font-medium">Worker Training Session</div>
                  <div className="text-sm text-muted-foreground mt-1">Tomorrow, 10:00 AM</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="font-medium">Client Meeting - Downtown Restaurant</div>
                  <div className="text-sm text-muted-foreground mt-1">Wed, Jun 18, 2:00 PM</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="font-medium">Monthly Performance Review</div>
                  <div className="text-sm text-muted-foreground mt-1">Fri, Jun 20, 9:00 AM</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <BulkAssignmentWizard />

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Users className="h-5 w-5 text-primary" />
                Worker Roster
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Shifts</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workers.map((worker) => (
                    <TableRow key={worker.id}>
                      <TableCell className="font-medium">{worker.name}</TableCell>
                      <TableCell>{worker.role}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          worker.status === 'Active' ? 
                          'bg-green-100 text-green-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {worker.status}
                        </span>
                      </TableCell>
                      <TableCell>{worker.assignedShifts}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Building2 className="h-5 w-5 text-primary" />
                Clients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Business Name</TableHead>
                    <TableHead>Shifts</TableHead>
                    <TableHead>Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">{client.name}</TableCell>
                      <TableCell>{client.shiftsThisMonth}</TableCell>
                      <TableCell>${client.revenue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <AIAgents 
          tokens={agencyTokens}
          onCreateToken={handleCreateToken}
          onRevokeToken={revokeAiToken}
        />

        <AgencyProfile 
          initialData={initialFormData}
          onSave={handleUpdateProfile}
        />

        <ShiftManagementInfo />
      </div>
    </DashboardLayout>
  );
}
