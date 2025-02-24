
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/auth";
import { AgencyProfileFormData } from "./types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES } from "@/lib/constants/categories";

export function AgencyProfileForm() {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<AgencyProfileFormData>({
    agencyName: user?.agencyName || "",
    address: user?.address || "",
    phoneNumber: user?.phoneNumber || "",
    specialization: user?.specialization || "",
    staffingCapacity: user?.staffingCapacity || 0,
    commissionRate: 0
  });
  
  const [loading, setLoading] = useState(false);

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
        description: "Your agency profile has been successfully updated."
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
        <label className="block text-sm font-medium text-gray-700">Agency Name</label>
        <Input
          value={formData.agencyName}
          onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
          required
          placeholder="Enter agency name"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Specialization</label>
        <Select
          value={formData.specialization}
          onValueChange={(value) => setFormData({ ...formData, specialization: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select agency specialization" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.agency.map((group) => (
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
          placeholder="Number of staff available"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Commission Rate (%)</label>
        <Input
          type="number"
          value={formData.commissionRate}
          onChange={(e) => setFormData({ ...formData, commissionRate: parseFloat(e.target.value) })}
          min="0"
          max="100"
          step="0.1"
          required
          placeholder="Enter commission rate"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-[#0B4A3F] hover:bg-[#0B4A3F]/90"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Profile"}
      </Button>
    </form>
  );
}
