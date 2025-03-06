
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  handleCategorySelect: (category: string) => void;
}

const CategoryFilter = ({ categories, selectedCategory, handleCategorySelect }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
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

export default CategoryFilter;
