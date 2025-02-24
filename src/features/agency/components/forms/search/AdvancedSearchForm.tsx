
import { useState } from "react";
import { CalendarIcon, Search } from "lucide-react";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { SearchFilterFormData } from "../../../types/form-types";
import { cn } from "@/lib/utils";

export function AdvancedSearchForm() {
  const [searchFilters, setSearchFilters] = useState<SearchFilterFormData>({
    keywords: "",
    location: "",
    dateRange: {
      from: new Date(),
      to: new Date(),
    },
    shiftType: [],
    payRate: {
      min: 0,
      max: 100,
    },
  });

  const shiftTypes = [
    "Morning",
    "Afternoon",
    "Evening",
    "Night",
    "Weekday",
    "Weekend",
  ];

  const handleShiftTypeChange = (type: string, checked: boolean) => {
    setSearchFilters((prev) => ({
      ...prev,
      shiftType: checked
        ? [...(prev.shiftType || []), type]
        : (prev.shiftType || []).filter((t) => t !== type),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(searchFilters);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Search</CardTitle>
        <CardDescription>Search and filter available shifts</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords</Label>
              <Input
                id="keywords"
                value={searchFilters.keywords}
                onChange={(e) =>
                  setSearchFilters((prev) => ({
                    ...prev,
                    keywords: e.target.value,
                  }))
                }
                placeholder="Search shifts..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={searchFilters.location}
                onChange={(e) =>
                  setSearchFilters((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
                placeholder="Enter location"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label>Date Range</Label>
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !searchFilters.dateRange?.from && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {searchFilters.dateRange?.from ? (
                        format(searchFilters.dateRange.from, "PPP")
                      ) : (
                        <span>Start date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={searchFilters.dateRange?.from}
                      onSelect={(date) =>
                        setSearchFilters((prev) => ({
                          ...prev,
                          dateRange: {
                            ...prev.dateRange!,
                            from: date || new Date(),
                          },
                        }))
                      }
                    />
                  </PopoverContent>
                </Popover>
                <span>to</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !searchFilters.dateRange?.to && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {searchFilters.dateRange?.to ? (
                        format(searchFilters.dateRange.to, "PPP")
                      ) : (
                        <span>End date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={searchFilters.dateRange?.to}
                      onSelect={(date) =>
                        setSearchFilters((prev) => ({
                          ...prev,
                          dateRange: {
                            ...prev.dateRange!,
                            to: date || new Date(),
                          },
                        }))
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label>Shift Types</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {shiftTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={searchFilters.shiftType?.includes(type)}
                      onCheckedChange={(checked) =>
                        handleShiftTypeChange(type, checked as boolean)
                      }
                    />
                    <Label htmlFor={type}>{type}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="minPay">Minimum Pay Rate</Label>
              <Input
                id="minPay"
                type="number"
                min="0"
                value={searchFilters.payRate?.min}
                onChange={(e) =>
                  setSearchFilters((prev) => ({
                    ...prev,
                    payRate: {
                      ...prev.payRate!,
                      min: parseInt(e.target.value),
                    },
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxPay">Maximum Pay Rate</Label>
              <Input
                id="maxPay"
                type="number"
                min="0"
                value={searchFilters.payRate?.max}
                onChange={(e) =>
                  setSearchFilters((prev) => ({
                    ...prev,
                    payRate: {
                      ...prev.payRate!,
                      max: parseInt(e.target.value),
                    },
                  }))
                }
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              Search Shifts
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
