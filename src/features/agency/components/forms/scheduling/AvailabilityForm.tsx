
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { AvailabilityFormData } from "../../../types/form-types";
import { cn } from "@/lib/utils";

export function AvailabilityForm() {
  const [availability, setAvailability] = useState<AvailabilityFormData>({
    weeklySchedule: {
      monday: { available: true },
      tuesday: { available: true },
      wednesday: { available: true },
      thursday: { available: true },
      friday: { available: true },
      saturday: { available: false },
      sunday: { available: false },
    },
    exceptions: [],
  });

  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const addException = () => {
    setAvailability((prev) => ({
      ...prev,
      exceptions: [
        ...prev.exceptions,
        { date: new Date(), available: false, note: "" },
      ],
    }));
  };

  const removeException = (index: number) => {
    setAvailability((prev) => ({
      ...prev,
      exceptions: prev.exceptions.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(availability);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability Schedule</CardTitle>
        <CardDescription>Set your weekly availability and exceptions</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Weekly Schedule</h3>
            <div className="space-y-4">
              {daysOfWeek.map((day) => (
                <div key={day} className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-3">
                    <Label className="capitalize">{day}</Label>
                  </div>
                  <div className="col-span-3 flex items-center gap-2">
                    <Switch
                      checked={availability.weeklySchedule[day].available}
                      onCheckedChange={(checked) =>
                        setAvailability((prev) => ({
                          ...prev,
                          weeklySchedule: {
                            ...prev.weeklySchedule,
                            [day]: { ...prev.weeklySchedule[day], available: checked },
                          },
                        }))
                      }
                    />
                    <span className="text-sm text-gray-600">
                      {availability.weeklySchedule[day].available ? "Available" : "Unavailable"}
                    </span>
                  </div>
                  {availability.weeklySchedule[day].available && (
                    <>
                      <div className="col-span-3">
                        <Input
                          type="time"
                          value={availability.weeklySchedule[day].startTime || ""}
                          onChange={(e) =>
                            setAvailability((prev) => ({
                              ...prev,
                              weeklySchedule: {
                                ...prev.weeklySchedule,
                                [day]: {
                                  ...prev.weeklySchedule[day],
                                  startTime: e.target.value,
                                },
                              },
                            }))
                          }
                        />
                      </div>
                      <div className="col-span-3">
                        <Input
                          type="time"
                          value={availability.weeklySchedule[day].endTime || ""}
                          onChange={(e) =>
                            setAvailability((prev) => ({
                              ...prev,
                              weeklySchedule: {
                                ...prev.weeklySchedule,
                                [day]: {
                                  ...prev.weeklySchedule[day],
                                  endTime: e.target.value,
                                },
                              },
                            }))
                          }
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Exceptions</h3>
              <Button type="button" variant="outline" size="sm" onClick={addException}>
                <Plus className="h-4 w-4 mr-2" /> Add Exception
              </Button>
            </div>
            <div className="space-y-4">
              {availability.exceptions.map((exception, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 items-start border p-4 rounded-lg">
                  <div className="col-span-4">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-1",
                            !exception.date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {exception.date ? format(exception.date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={exception.date}
                          onSelect={(date) =>
                            setAvailability((prev) => ({
                              ...prev,
                              exceptions: prev.exceptions.map((e, i) =>
                                i === index ? { ...e, date: date || new Date() } : e
                              ),
                            }))
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="col-span-3">
                    <Label>Availability</Label>
                    <div className="flex items-center gap-2 mt-3">
                      <Switch
                        checked={exception.available}
                        onCheckedChange={(checked) =>
                          setAvailability((prev) => ({
                            ...prev,
                            exceptions: prev.exceptions.map((e, i) =>
                              i === index ? { ...e, available: checked } : e
                            ),
                          }))
                        }
                      />
                      <span className="text-sm text-gray-600">
                        {exception.available ? "Available" : "Unavailable"}
                      </span>
                    </div>
                  </div>
                  <div className="col-span-4">
                    <Label>Note</Label>
                    <Textarea
                      value={exception.note}
                      onChange={(e) =>
                        setAvailability((prev) => ({
                          ...prev,
                          exceptions: prev.exceptions.map((exc, i) =>
                            i === index ? { ...exc, note: e.target.value } : exc
                          ),
                        }))
                      }
                      className="mt-1"
                      placeholder="Add a note..."
                    />
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => removeException(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">Save Availability</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
