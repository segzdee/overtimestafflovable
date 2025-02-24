
import { useState } from "react";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { InvoiceFormData } from "../../../types/form-types";
import { cn } from "@/lib/utils";

export function InvoiceForm() {
  const [invoice, setInvoice] = useState<InvoiceFormData>({
    invoiceNumber: "",
    clientId: "",
    items: [{ description: "", quantity: 1, rate: 0 }],
    dueDate: new Date(),
    notes: "",
  });

  const addItem = () => {
    setInvoice((prev) => ({
      ...prev,
      items: [...prev.items, { description: "", quantity: 1, rate: 0 }],
    }));
  };

  const removeItem = (index: number) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(invoice);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Invoice</CardTitle>
        <CardDescription>Create a new invoice for your client</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input
                id="invoiceNumber"
                value={invoice.invoiceNumber}
                onChange={(e) =>
                  setInvoice((prev) => ({
                    ...prev,
                    invoiceNumber: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientId">Client</Label>
              <Input
                id="clientId"
                value={invoice.clientId}
                onChange={(e) =>
                  setInvoice((prev) => ({ ...prev, clientId: e.target.value }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !invoice.dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {invoice.dueDate ? (
                      format(invoice.dueDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={invoice.dueDate}
                    onSelect={(date) =>
                      setInvoice((prev) => ({ ...prev, dueDate: date || new Date() }))
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Items</Label>
              <Button type="button" variant="outline" size="sm" onClick={addItem}>
                <Plus className="h-4 w-4 mr-2" /> Add Item
              </Button>
            </div>

            {invoice.items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 items-end">
                <div className="col-span-6">
                  <Label>Description</Label>
                  <Input
                    value={item.description}
                    onChange={(e) =>
                      updateItem(index, "description", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="col-span-2">
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(index, "quantity", parseInt(e.target.value))
                    }
                    required
                  />
                </div>
                <div className="col-span-3">
                  <Label>Rate</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.rate}
                    onChange={(e) =>
                      updateItem(index, "rate", parseFloat(e.target.value))
                    }
                    required
                  />
                </div>
                <div className="col-span-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-destructive"
                    onClick={() => removeItem(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={invoice.notes}
              onChange={(e) =>
                setInvoice((prev) => ({ ...prev, notes: e.target.value }))
              }
              className="min-h-[100px]"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">Generate Invoice</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
