
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/auth";
import { FreelancerProfileFormData } from "./types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES } from "@/lib/constants/categories";

const LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Chinese",
  "Japanese",
  "Korean",
  "Arabic"
];

export function FreelancerProfileForm() {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FreelancerProfileFormData>({
    name: user?.name || "",
    address: user?.address || "",
    phoneNumber: user?.phoneNumber || "",
    specialization: user?.specialization || "",
    skills: [],
    languages: [],
    ratePerHour: 0
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
        description: "Your profile has been successfully updated."
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
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          placeholder="Enter your full name"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Specialization</label>
        <Select
          value={formData.specialization}
          onValueChange={(value) => setFormData({ ...formData, specialization: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your specialization" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES["shift-worker"].map((group) => (
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
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <Input
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          required
          placeholder="Enter your address"
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
        <label className="block text-sm font-medium text-gray-700">Languages</label>
        <Select
          value={formData.languages[0]} // For now, just handle primary language
          onValueChange={(value) => setFormData({ ...formData, languages: [value] })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select primary language" />
          </SelectTrigger>
          <SelectContent>
            {LANGUAGES.map((language) => (
              <SelectItem key={language} value={language}>
                {language}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Hourly Rate ($)</label>
        <Input
          type="number"
          value={formData.ratePerHour}
          onChange={(e) => setFormData({ ...formData, ratePerHour: parseFloat(e.target.value) })}
          min="0"
          step="0.01"
          required
          placeholder="Enter your hourly rate"
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
