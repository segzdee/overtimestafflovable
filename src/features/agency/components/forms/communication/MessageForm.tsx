
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
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={message.subject}
              onChange={(e) =>
                setMessage((prev) => ({ ...prev, subject: e.target.value }))
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Message</Label>
            <Textarea
              id="content"
              value={message.content}
              onChange={(e) =>
                setMessage((prev) => ({ ...prev, content: e.target.value }))
              }
              className="min-h-[200px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="attachments">Attachments</Label>
            <div className="flex items-center gap-2">
              <Input
                id="attachments"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => document.getElementById("attachments")?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                {message.attachments?.length
                  ? `${message.attachments.length} files selected`
                  : "Upload Files"}
              </Button>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
