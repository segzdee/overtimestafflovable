
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CATEGORIES } from "@/lib/constants/categories";

interface UserTypeFieldsProps {
  role: string;
  category: string;
  onCategoryChange: (value: string) => void;
}

export const UserTypeFields: React.FC<UserTypeFieldsProps> = ({
  role,
  category,
  onCategoryChange
}) => {
  if (role && role !== "shift-worker" && CATEGORIES[role as keyof typeof CATEGORIES]) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <Select 
          value={category} 
          onValueChange={onCategoryChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES[role as keyof typeof CATEGORIES]?.map(group => (
              <SelectGroup key={group.group}>
                <SelectLabel>{group.group}</SelectLabel>
                {group.items.map(item => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }
  
  return null;
};
