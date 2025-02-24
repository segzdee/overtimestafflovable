
import { useState } from "react";
import { Send, Upload } from "lucide-react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { MessageFormData } from "../../../types/form-types";

export function MessageForm() {
  const [message, setMessage] = useState<MessageFormData>({
    recipient: "",
    subject: "",
    content: "",
    priority: "medium",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setMessage((prev) => ({ ...prev, attachments: files }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(message);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compose Message</CardTitle>
        <CardDescription>Send a message to workers or clients</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient</Label>
              <Input
                id="recipient"
                value={message.recipient}
                onChange={(e) =>
                  setMessage((prev) => ({ ...prev, recipient: e.target.value }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Priority</Label>
              <Select
                value={message.priority}
                onValueChange={(value: "low" | "medium" | "high") =>
                  setMessage((prev) => ({ ...prev, priority: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                