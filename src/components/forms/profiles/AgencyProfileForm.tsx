
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/auth/AuthProvider";
import { AgencyProfileFormData } from "./types";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES } from "@/lib/constants/categories";

interface CommissionTier {
  minVolume: number;
  rate: number;
}

interface CommissionStructure {
  name: string;
  baseRate: number;
  tiers: CommissionTier[];
  specialConditions: string;
}

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

  const [commissionStructure, setCommissionStructure] = useState<CommissionStructure>({
    name: "Standard",
    baseRate: 10,
    tiers: [
      { minVolume: 100, rate: 8 },
      { minVolume: 500, rate: 6 },
      { minVolume: 1000, rate: 5 }
    ],
    specialConditions: ""
  });
  
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!user) throw new Error("No user found");
      
      // Save commission structure
      const { error: commissionError } = await supabase
        .from('agency_commission_structures')
        .insert({
          agency_id: user.id,
          name: commissionStructure.name,
          base_rate: commissionStructure.baseRate,
          volume_discounts: commissionStructure.tiers,
          special_conditions: { notes: commissionStructure.specialConditions }
        });

      if (commissionError) throw commissionError;

      // Update profile
      await updateProfile({
        ...formData,
        profileComplete: true
      });

      toast({
        title: "Profile Updated",
        description: "Your agency profile and commission structure have been saved."
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

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Commission Structure</h3>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Structure Name</label>
          <Input
            value={commissionStructure.name}
            onChange={(e) => setCommissionStructure(prev => ({ ...prev, name: e.target.value }))}
            required
            placeholder="e.g., Standard Plan"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Base Commission Rate (%)</label>
          <Input
            type="number"
            value={commissionStructure.baseRate}
            onChange={(e) => setCommissionStructure(prev => ({ ...prev, baseRate: parseFloat(e.target.value) }))}
            min="0"
            max="100"
            step="0.1"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Volume Discount Tiers</label>
          {commissionStructure.tiers.map((tier, index) => (
            <div key={index} className="flex gap-4">
              <Input
                type="number"
                value={tier.minVolume}
                onChange={(e) => {
                  const newTiers = [...commissionStructure.tiers];
                  newTiers[index].minVolume = parseInt(e.target.value);
                  setCommissionStructure(prev => ({ ...prev, tiers: newTiers }));
                }}
                placeholder="Min. Volume"
                min="0"
              />
              <Input
                type="number"
                value={tier.rate}
                onChange={(e) => {
                  const newTiers = [...commissionStructure.tiers];
                  newTiers[index].rate = parseFloat(e.target.value);
                  setCommissionStructure(prev => ({ ...prev, tiers: newTiers }));
                }}
                placeholder="Rate %"
                min="0"
                max="100"
                step="0.1"
              />
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Special Conditions</label>
          <textarea
            value={commissionStructure.specialConditions}
            onChange={(e) => setCommissionStructure(prev => ({ ...prev, specialConditions: e.target.value }))}
            className="w-full min-h-[100px] px-3 py-2 border rounded-md"
            placeholder="Enter any special conditions or notes"
          />
        </div>
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
