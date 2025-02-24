
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/auth";
import { supabase } from "@/lib/supabase/client";
import { Briefcase } from "lucide-react";

interface ShiftApplicationFormData {
  coverLetter: string;
  availability: string;
}

export function ShiftApplicationForm({ shiftId }: { shiftId: string }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ShiftApplicationFormData>({
    coverLetter: "",
    availability: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // Here we would handle the shift application
      // Store application in the database with status "pending"
      toast({
        title: "Application Submitted",
        description: "Your application has been sent successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit application. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Cover Letter</label>
        <Textarea
          value={formData.coverLetter}
          onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
          placeholder="Why are you a good fit for this shift?"
          rows={4}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Availability Details</label>
        <Textarea
          value={formData.availability}
          onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
          placeholder="Please confirm your availability for this shift"
          rows={2}
          required
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2"
      >
        <Briefcase className="w-4 h-4" />
        {loading ? "Submitting..." : "Apply for Shift"}
      </Button>
    </form>
  );
}
