
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
import { ExpenseFormData } from "../../../types/form-types";
import { cn } from "@/lib/utils";

export function ExpenseForm() {
  const [expense, setExpense] = useState<ExpenseFormData>({
    category: "",
    amount: 0,
    date: new Date(),
    description: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setExpense((prev) => ({ ...prev, receipt: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(expense);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Record Expense</CardTitle>
        <CardDescription>Track your business expenses</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={expense.category}
                onValueChange={(value) =>
                  setExpense((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="office">Office Supplies</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="services">Services</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                value={expense.amount}
                onChange={(e) =>
                  setExpense((prev) => ({
                    ...prev,
                    amount: parseFloat(e.target.value),
                  }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !expense.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {expense.date ? (
                      format(expense.date, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={expense.date}
                    onSelect={(date) =>
                      setExpense((prev) => ({ ...prev, date: date || new Date() }))
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="receipt">Receipt</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="receipt"
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => document.getElementById("receipt")?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {expense.receipt ? expense.receipt.name : "Upload Receipt"}
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={expense.description}
              onChange={(e) =>
                setExpense((prev) => ({ ...prev, description: e.target.value }))
              }
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">Record Expense</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
