import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/auth";
import { CompanyProfileFormData } from "./types";
import { FileInput } from "@/components/ui/file-input";
import { supabase } from "@/lib/supabase/client";
import { TeamMemberModal } from "@/components/modals/TeamMemberModal";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { CATEGORIES } from "@/lib/constants/categories";

interface TeamMember {
  id?: string;
  name: string;
  email: string;
  role: string;
  accessLevel: string;
}

export function CompanyProfileForm() {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<CompanyProfileFormData>({
    name: user?.name || "",
    address: user?.address || "",
    phoneNumber: user?.phoneNumber || "",
    category: user?.category || "",
    staffingCapacity: user?.staffingCapacity || 0
  });
  
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    if (user) {
      loadTeamMembers();
    }
  }, [user]);

  const loadTeamMembers = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('company_id', user.id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load team members"
      });
      return;
    }

    setTeamMembers(data.map(member => ({
      id: member.id,
      name: member.name,
      email: member.email,
      role: member.role,
      accessLevel: member.access_level
    })));
  };

  const handleSaveMember = async (member: TeamMember) => {
    if (!user) return;

    try {
      if (member.id) {
        // Update existing member
        const { error } = await supabase
          .from('team_members')
          .update({
            name: member.name,
            email: member.email,
            role: member.role,
            access_level: member.accessLevel
          })
          .eq('id', member.id);

        if (error) throw error;
      } else {
        // Add new member
        const { error } = await supabase
          .from('team_members')
          .insert({
            company_id: user.id,
            name: member.name,
            email: member.email,
            role: member.role,
            access_level: member.accessLevel
          });

        if (error) throw error;
      }

      await loadTeamMembers();
      toast({
        title: "Success",
        description: `Team member ${member.id ? "updated" : "added"} successfully`
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save team member"
      });
    }
  };

  const handleDeleteMember = async (memberId: string) => {
    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', memberId);

      if (error) throw error;

      setTeamMembers(prev => prev.filter(m => m.id !== memberId));
      toast({
        title: "Success",
        description: "Team member removed successfully"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove team member"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!user) throw new Error("No user found");
      
      await updateProfile(user.id, {
        ...formData,
        profileComplete: true
      });

      toast({
        title: "Profile Updated",
        description: "Your company profile has been successfully updated."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update profile"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Company Name</label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          placeholder="Enter company name"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <Select
          value={formData.category}
          onValueChange={(value) => setFormData({ ...formData, category: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select company category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.company.map((group) => (
              <div key={group.group}>
                {group.items.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </div>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Business Address</label>
        <Input
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          required
          placeholder="Enter business address"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
        <Input
          type="tel"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          required
          placeholder="Enter phone number"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Staffing Capacity</label>
        <Input
          type="number"
          value={formData.staffingCapacity}
          onChange={(e) => setFormData({ ...formData, staffingCapacity: parseInt(e.target.value) })}
          min="1"
          required
          placeholder="Number of staff needed"
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Team Members</h3>
          <Button
            type="button"
            onClick={() => {
              setEditingMember(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Member
          </Button>
        </div>

        <div className="border rounded-md divide-y">
          {teamMembers.map((member) => (
            <div key={member.id} className="p-4 flex items-center justify-between">
              <div>
                <h4 className="font-medium">{member.name}</h4>
                <p className="text-sm text-gray-500">{member.email}</p>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {member.role}
                  </span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {member.accessLevel}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setEditingMember(member);
                    setShowModal(true);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => member.id && handleDeleteMember(member.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {teamMembers.length === 0 && (
            <p className="p-4 text-center text-gray-500">
              No team members added yet
            </p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-[#0B4A3F] hover:bg-[#0B4A3F]/90"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Profile"}
      </Button>

      <TeamMemberModal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingMember(null);
        }}
        onSave={handleSaveMember}
        initialData={editingMember || undefined}
      />
    </form>
  );
}
