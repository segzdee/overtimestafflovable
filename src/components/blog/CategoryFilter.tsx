
import { Button } from "@/components/ui/button";
import React from "react";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  handleCategorySelect: (category: string) => void;
}

const CategoryFilter = ({ categories, selectedCategory, handleCategorySelect }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4 overflow-x-auto pb-2">
      <Button 
        variant={!selectedCategory ? "default" : "outline"}
        size="sm"
        onClick={() => handleCategorySelect("")}
        className="text-xs md:text-sm whitespace-nowrap"
      >
        All Categories
      </Button>
      {categories.map(category => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => handleCategorySelect(category)}
          className="text-xs md:text-sm whitespace-nowrap"
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default React.memo(CategoryFilter);
