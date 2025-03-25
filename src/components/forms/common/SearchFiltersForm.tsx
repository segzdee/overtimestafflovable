
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";

// We'll create a base schema that can be extended
const baseSearchSchema = z.object({
  searchTerm: z.string().optional(),
});

interface FilterOption {
  id: string;
  label: string;
  type: "select" | "checkbox" | "radio" | "date";
  options?: Array<{ value: string; label: string }>;
  multiple?: boolean;
}

interface SearchFiltersFormProps<T extends z.ZodType<any, any>> {
  onSubmit: (data: z.infer<T>) => void;
  defaultValues?: Partial<z.infer<T>>;
  schema: T;
  filterOptions?: FilterOption[];
  isLoading?: boolean;
  title?: string;
  inlineSearch?: boolean;
  showCardWrapper?: boolean;
  onReset?: () => void;
}

export function SearchFiltersForm<T extends z.ZodType<any, any>>({
  onSubmit,
  defaultValues,
  schema,
  filterOptions = [],
  isLoading = false,
  title = "Search & Filters",
  inlineSearch = false,
  showCardWrapper = true,
  onReset,
}: SearchFiltersFormProps<T>) {
  const [showFilters, setShowFilters] = React.useState(false);
  const [activeFilters, setActiveFilters] = React.useState<string[]>([]);

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as any || {},
  });

  const handleSubmit = (data: z.infer<T>) => {
    const activeFilterIds = filterOptions
      .filter(option => {
        const value = data[option.id as keyof typeof data];
        if (Array.isArray(value)) {
          return value.length > 0;
        }
        return value !== undefined && value !== "";
      })
      .map(option => option.id);
    
    setActiveFilters(activeFilterIds);
    onSubmit(data);
  };

  const handleReset = () => {
    form.reset(defaultValues as any || {});
    setActiveFilters([]);
    if (onReset) onReset();
  };

  const searchField = (
    <FormField
      control={form.control}
      name="searchTerm"
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormControl>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-8"
                {...field}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const formContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className={`flex ${inlineSearch ? "space-x-2" : "flex-col space-y-2"}`}>
          {searchField}
          {filterOptions.length > 0 && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className={`${inlineSearch ? "w-10" : "w-full mt-2"} flex items-center`}
            >
              <Filter className={`h-4 w-4 ${activeFilters.length > 0 ? "text-primary" : ""}`} />
              {!inlineSearch && (
                <span className="ml-2">Filters {activeFilters.length > 0 ? `(${activeFilters.length})` : ""}</span>
              )}
            </Button>
          )}
        </div>

        {filterOptions.length > 0 && (
          <Collapsible
            open={showFilters}
            onOpenChange={setShowFilters}
            className="w-full space-y-2"
          >
            <CollapsibleContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filterOptions.map((filter) => (
                  <div key={filter.id} className="space-y-2">
                    {filter.type === "select" && (
                      <FormField
                        control={form.control}
                        name={filter.id as any}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{filter.label}</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={`Select ${filter.label}`} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {filter.options?.map(option => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {filter.type === "checkbox" && (
                      <FormField
                        control={form.control}
                        name={filter.id as any}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{filter.label}</FormLabel>
                            <div className="space-y-2">
                              {filter.options?.map(option => (
                                <div className="flex items-center space-x-2" key={option.value}>
                                  <FormControl>
                                    <Checkbox
                                      checked={Array.isArray(field.value) && field.value.includes(option.value)}
                                      onCheckedChange={(checked) => {
                                        const currentValues = Array.isArray(field.value) ? field.value : [];
                                        if (checked) {
                                          field.onChange([...currentValues, option.value]);
                                        } else {
                                          field.onChange(
                                            currentValues.filter(
                                              (value: string) => value !== option.value
                                            )
                                          );
                                        }
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal cursor-pointer">
                                    {option.label}
                                  </FormLabel>
                                </div>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                ))}
              </div>

              {activeFilters.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {activeFilters.map(filterId => {
                    const filter = filterOptions.find(f => f.id === filterId);
                    return filter ? (
                      <Badge variant="outline" key={filterId} className="gap-1">
                        {filter.label}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-3 w-3 p-0 ml-1"
                          onClick={() => {
                            form.setValue(filterId as any, filter.type === "checkbox" ? [] : "");
                            setActiveFilters(prev => prev.filter(id => id !== filterId));
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ) : null;
                  })}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleReset}
                    className="text-xs h-6"
                  >
                    Clear all
                  </Button>
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>
        )}

        <div className="flex justify-end space-x-2">
          {showFilters && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleReset}
              size="sm"
            >
              Reset
            </Button>
          )}
          <Button 
            type="submit" 
            size="sm"
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </div>
      </form>
    </Form>
  );

  if (!showCardWrapper) {
    return formContent;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {formContent}
      </CardContent>
    </Card>
  );
}

// Helper function to create a search schema
export const createSearchSchema = <T extends z.ZodRawShape>(extraSchema: T) => {
  return baseSearchSchema.extend(extraSchema);
};
