
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { NotificationPreferences } from "../../../types/form-types";

export function NotificationPreferencesForm() {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email: true,
    sms: false,
    push: true,
    types: {
      shifts: true,
      payments: true,
      messages: true,
      system: false,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(preferences);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>
          Customize how you receive notifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Notification Methods</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email">Email Notifications</Label>
                <Switch
                  id="email"
                  checked={preferences.email}
                  onCheckedChange={(checked) =>
                    setPreferences((prev) => ({ ...prev, email: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sms">SMS Notifications</Label>
                <Switch
                  id="sms"
                  checked={preferences.sms}
                  onCheckedChange={(checked) =>
                    setPreferences((prev) => ({ ...prev, sms: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push">Push Notifications</Label>
                <Switch
                  id="push"
                  checked={preferences.push}
                  onCheckedChange={(checked) =>
                    setPreferences((prev) => ({ ...prev, push: checked }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Notification Types</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="shifts">Shift Updates</Label>
                <Switch
                  id="shifts"
                  checked={preferences.types.shifts}
                  onCheckedChange={(checked) =>
                    setPreferences((prev) => ({
                      ...prev,
                      types: { ...prev.types, shifts: checked },
                    }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="payments">Payment Updates</Label>
                <Switch
                  id="payments"
                  checked={preferences.types.payments}
                  onCheckedChange={(checked) =>
                    setPreferences((prev) => ({
                      ...prev,
                      types: { ...prev.types, payments: checked },
                    }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="messages">Messages</Label>
                <Switch
                  id="messages"
                  checked={preferences.types.messages}
                  onCheckedChange={(checked) =>
                    setPreferences((prev) => ({
                      ...prev,
                      types: { ...prev.types, messages: checked },
                    }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="system">System Updates</Label>
                <Switch
                  id="system"
                  checked={preferences.types.system}
                  onCheckedChange={(checked) =>
                    setPreferences((prev) => ({
                      ...prev,
                      types: { ...prev.types, system: checked },
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">Save Preferences</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
