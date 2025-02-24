
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { FileInput } from "@/components/ui/file-input";
import { useAuth } from "@/contexts/auth";
import { FileText } from "lucide-react";

interface ShiftReportFormData {
  title: string;
  description: string;
  date: string;
  hours: number;
  attachment?: File;
}

export function ShiftReportForm() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ShiftReportFormData>({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    hours: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // Here we would handle the report submission
      // This would typically involve uploading any attachments to storage
      // and saving the report data to the database
      toast({
        title: "Report Submitted",
        description: "Your shift report has been successfully submitted.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit report. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Report Title</label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter report title"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <Input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Hours Worked</label>
        <Input
          type="number"
          value={formData.hours}
          onChange={(e) => setFormData({ ...formData, hours: Number(e.target.value) })}
          min="0"
          step="0.5"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe the work performed during this shift"
          rows={4}
          required
        />
      </div>

      <div>
        <FileInput
          label="Attachments"
          accept="image/*,.pdf,.doc,.docx"
          maxSize={5}
          onFileSelect={(file) => setFormData({ ...formData, attachment: file })}
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2"
      >
        <FileText className="w-4 h-4" />
        {loading ? "Submitting..." : "Submit Report"}
      </Button>
    </form>
  );
}
