
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FileText, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { DateRangePickerForm, DateRange } from "./DateRangePickerForm";

const reportFormSchema = z.object({
  reportType: z.string({
    required_error: "Please select a report type",
  }),
  format: z.enum(["pdf", "excel", "csv"], {
    required_error: "Please select a report format",
  }),
  title: z.string().min(1, "Report title is required"),
  includeCharts: z.boolean().optional(),
  detailLevel: z.enum(["summary", "detailed", "comprehensive"], {
    required_error: "Please select a detail level",
  }),
  dateRange: z.object({
    startDate: z.date({
      required_error: "Start date is required",
    }),
    endDate: z.date({
      required_error: "End date is required",
    }),
  }).refine(data => data.startDate <= data.endDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  }),
});

export type ReportFormData = z.infer<typeof reportFormSchema>;

const reportTypes = [
  { value: "financial", label: "Financial Report" },
  { value: "activity", label: "Activity Report" },
  { value: "performance", label: "Performance Report" },
  { value: "workforce", label: "Workforce Report" },
  { value: "compliance", label: "Compliance Report" },
];

interface ReportGenerationFormProps {
  onSubmit: (data: ReportFormData) => void;
  defaultValues?: Partial<ReportFormData>;
  isLoading?: boolean;
  availableReportTypes?: Array<{ value: string; label: string }>;
}

export function ReportGenerationForm({
  onSubmit,
  defaultValues,
  isLoading = false,
  availableReportTypes = reportTypes,
}: ReportGenerationFormProps) {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: defaultValues?.dateRange?.startDate || new Date(),
    endDate: defaultValues?.dateRange?.endDate || new Date(),
  });

  const form = useForm<ReportFormData>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      reportType: defaultValues?.reportType || "",
      format: defaultValues?.format || "pdf",
      title: defaultValues?.title || "",
      includeCharts: defaultValues?.includeCharts || true,
      detailLevel: defaultValues?.detailLevel || "detailed",
      dateRange: {
        startDate: defaultValues?.dateRange?.startDate || new Date(),
        endDate: defaultValues?.dateRange?.endDate || new Date(),
      },
    },
  });

  const handleDateRangeChange = (data: DateRange) => {
    setDateRange(data);
    form.setValue("dateRange", data);
  };

  const handleSubmit = (data: ReportFormData) => {
    toast({
      title: "Generating report",
      description: `Preparing ${data.reportType} report in ${data.format} format`,
    });
    
    onSubmit(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Generate Report
        </CardTitle>
        <CardDescription>
          Configure and generate reports based on your requirements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="reportType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Report Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableReportTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the type of report you want to generate
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Report Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter report title" {...field} />
                    </FormControl>
                    <FormDescription>
                      This will appear as the title in your report
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <FormLabel className="text-base">Date Range</FormLabel>
              </div>
              
              <DateRangePickerForm 
                onSubmit={handleDateRangeChange}
                defaultValues={dateRange}
                showCard={false}
                submitButtonText="Apply Date Range"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="format"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Report Format</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="pdf" id="pdf" />
                          <Label htmlFor="pdf">PDF Document</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="excel" id="excel" />
                          <Label htmlFor="excel">Excel Spreadsheet</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="csv" id="csv" />
                          <Label htmlFor="csv">CSV File</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="detailLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detail Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select detail level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="summary">Summary (Overview)</SelectItem>
                        <SelectItem value="detailed">Detailed (Standard)</SelectItem>
                        <SelectItem value="comprehensive">Comprehensive (Full Details)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select how detailed you want your report to be
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="includeCharts"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Include Charts and Visualizations</FormLabel>
                    <FormDescription>
                      Add visual representations of data where applicable
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button 
          onClick={form.handleSubmit(handleSubmit)}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          {isLoading ? "Generating..." : "Generate Report"}
        </Button>
      </CardFooter>
    </Card>
  );
}
