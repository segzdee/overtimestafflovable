
import { useState } from "react";
import { CalendarIcon, Upload } from "lucide-react";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ContractFormData } from "../../../types/form-types";
import { cn } from "@/lib/utils";

export function ContractForm() {
  const [contract, setContract] = useState<ContractFormData>({
    contractType: "",
    startDate: new Date(),
    terms: "",
    attachments: [],
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setContract((prev) => ({ ...prev, attachments: files }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(contract);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Contract</CardTitle>
        <CardDescription>Create a new contract or agreement</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Contract Type</Label>
              <Select
                value={contract.contractType}
                onValueChange={(value) =>
                  setContract((prev) => ({ ...prev, contractType: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select contract type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employment">Employment Contract</SelectItem>
                  <SelectItem value="service">Service Agreement</SelectItem>
                  <SelectItem value="nda">Non-Disclosure Agreement</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !contract.startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {contract.startDate ? (
                      format(contract.startDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={contract.startDate}
                    onSelect={(date) =>
                      setContract((prev) => ({
                        ...prev,
                        startDate: date || new Date(),
                      }))
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>End Date (Optional)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !contract.endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {contract.endDate ? (
                      format(contract.endDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={contract.endDate}
                    onSelect={(date) =>
                      setContract((prev) => ({ ...prev, endDate: date }))
                    }
                  />
                </PopoverContent>
              </Popover>
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
                  {contract.attachments?.length
                    ? `${contract.attachments.length} files selected`
                    : "Upload Files"}
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="terms">Terms and Conditions</Label>
            <Textarea
              id="terms"
              value={contract.terms}
              onChange={(e) =>
                setContract((prev) => ({ ...prev, terms: e.target.value }))
              }
              className="min-h-[200px]"
              required
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">Submit Contract</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
