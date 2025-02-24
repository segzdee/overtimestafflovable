
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormData } from "../types";

interface AgencyProfileProps {
  initialData: FormData;
  onSave: (data: FormData) => Promise<void>;
}

export function AgencyProfile({ initialData, onSave }: AgencyProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialData);

  const handleChange = (name: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [name]: name === 'staffingCapacity' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
    setIsEditing(false);
  };

  return (
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
  );
}
