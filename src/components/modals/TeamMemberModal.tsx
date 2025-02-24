
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TeamMemberModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (member: TeamMember) => void;
  initialData?: TeamMember;
}

interface TeamMember {
  name: string;
  email: string;
  role: string;
  accessLevel: string;
}

const ACCESS_LEVELS = ["admin", "manager", "viewer"];
const TEAM_ROLES = ["HR Manager", "Shift Supervisor", "Recruiter", "Account Manager"];

export function TeamMemberModal({ open, onClose, onSave, initialData }: TeamMemberModalProps) {
  const [member, setMember] = useState<TeamMember>(
    initialData || {
      name: "",
      email: "",
      role: "",
      accessLevel: "viewer"
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(member);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Team Member" : "Add Team Member"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input
              value={member.name}
              onChange={(e) => setMember({ ...member, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              value={member.email}
              onChange={(e) => setMember({ ...member, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Role</label>
            <Select
              value={member.role}
              onValueChange={(value) => setMember({ ...member, role: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {TEAM_ROLES.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Access Level</label>
            <Select
              value={member.accessLevel}
              onValueChange={(value) => setMember({ ...member, accessLevel: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select access level" />
              </SelectTrigger>
              <SelectContent>
                {ACCESS_LEVELS.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? "Update" : "Add"} Member
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
