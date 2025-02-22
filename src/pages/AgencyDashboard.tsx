import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

interface FormData {
  name: string;
  agencyName: string;
  address: string;
  phoneNumber: string;
  specialization: string;
  staffingCapacity: number;
}

export default function AgencyDashboard() {
  const { user, logout, updateProfile, generateAiToken, aiTokens, revokeAiToken } = useAuth();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(!user?.profileComplete);
  const [formData, setFormData] = useState<FormData>({
    name: user?.name || "",
    agencyName: user?.agencyName || "",
    address: user?.address || "",
    phoneNumber: user?.phoneNumber || "",
    specialization: user?.specialization || "",
    staffingCapacity: user?.staffingCapacity || 0,
  });
  
  const [showCreateTokenModal, setShowCreateTokenModal] = useState(false);
  const [newTokenName, setNewTokenName] = useState("");
  const [newToken, setNewToken] = useState<any>(null);

  const handleChange = (name: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [name]: name === 'staffingCapacity' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await updateProfile(user.id, {
        ...formData,
        staffingCapacity: Number(formData.staffingCapacity)
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  const handleCreateToken = async () => {
    if (!newTokenName.trim() || !user) return;

    try {
      const token = await generateAiToken(newTokenName, user.id);
      setNewToken(token);
      setNewTokenName("");
      toast({
        title: "Success",
        description: "AI Agent created successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create AI Agent",
        variant: "destructive",
      });
    }
  };

  const handleRevokeToken = async (tokenId: string) => {
    try {
      await revokeAiToken(tokenId);
      toast({
        title: "Success",
        description: "AI Agent access revoked",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to revoke AI Agent access",
        variant: "destructive",
      });
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
          <Button variant="outline" onClick={() => logout()}>Logout</Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Agency Profile</CardTitle>
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Contact Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="agencyName">Agency Name</Label>
                    <Input
                      id="agencyName"
                      value={formData.agencyName}
                      onChange={(e) => handleChange("agencyName", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="address">Business Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) => handleChange("phoneNumber", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization</Label>
                    <Select 
                      value={formData.specialization}
                      onValueChange={(value) => handleChange("specialization", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select specialization" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hospitality">Hospitality</SelectItem>
                        <SelectItem value="events">Events</SelectItem>
                        <SelectItem value="restaurant">Restaurant</SelectItem>
                        <SelectItem value="catering">Catering</SelectItem>
                        <SelectItem value="generalStaffing">General Staffing</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="staffingCapacity">Staffing Capacity</Label>
                    <Input
                      id="staffingCapacity"
                      type="number"
                      min="1"
                      value={formData.staffingCapacity}
                      onChange={(e) => handleChange("staffingCapacity", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Save Changes
                  </Button>
                </div>
              </form>
            ) : (
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {Object.entries(formData).map(([key, value]) => (
                  <div key={key}>
                    <dt className="text-sm font-medium text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </dt>
                    <dd className="mt-1 text-sm">
                      {value || 'Not provided'}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>AI Agents</CardTitle>
              <Button onClick={() => setShowCreateTokenModal(true)}>
                Create New AI Agent
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {agencyTokens.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent Name</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agencyTokens.map((token) => (
                    <TableRow key={token.id}>
                      <TableCell>{token.name}</TableCell>
                      <TableCell>{new Date(token.createdAt).toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={token.isActive ? "default" : "destructive"}>
                          {token.isActive ? "Active" : "Revoked"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {token.isActive && (
                          <Button 
                            variant="ghost" 
                            className="text-destructive" 
                            onClick={() => handleRevokeToken(token.id)}
                          >
                            Revoke Access
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-sm text-muted-foreground">
                You haven't created any AI agents yet.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shift Worker Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              As an Agency, you can use this dashboard to:
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
              <li>Register and manage shift workers</li>
              <li>Match workers with company needs</li>
              <li>Track worker availability and qualifications</li>
              <li>Process timesheets and payments</li>
              <li>View performance analytics</li>
              <li>Create and manage AI agents to assist with operations</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showCreateTokenModal} onOpenChange={setShowCreateTokenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {newToken ? 'AI Agent Created' : 'Create New AI Agent'}
            </DialogTitle>
          </DialogHeader>
          
          {newToken ? (
            <>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Your AI agent has been created successfully. Save this token - you won't be able to see it again!
                </p>
                <pre className="bg-muted p-4 rounded-lg break-all text-sm">
                  {newToken.token}
                </pre>
              </div>
              <DialogFooter>
                <Button onClick={() => {
                  setShowCreateTokenModal(false);
                  setNewToken(null);
                }}>
                  Close
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tokenName">Agent Name</Label>
                  <Input
                    id="tokenName"
                    value={newTokenName}
                    onChange={(e) => setNewTokenName(e.target.value)}
                    placeholder="e.g., Scheduling Assistant"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowCreateTokenModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateToken}>
                  Create Agent
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
