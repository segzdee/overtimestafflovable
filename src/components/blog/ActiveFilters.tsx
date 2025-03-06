
interface ActiveFiltersProps {
  selectedCategory: string;
  selectedTag: string;
  setSelectedCategory: (category: string) => void;
  setSelectedTag: (tag: string) => void;
}

const ActiveFilters = ({ 
  selectedCategory, 
  selectedTag, 
  setSelectedCategory, 
  setSelectedTag 
}: ActiveFiltersProps) => {
  if (!selectedTag && !selectedCategory) return null;
  
  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-gray-500">Active filters:</span>
        
        {selectedCategory && (
          <div className="flex items-center bg-violet-100 text-violet-800 text-xs px-3 py-1 rounded-full">
            Category: {selectedCategory}
            <button 
              onClick={() => setSelectedCategory("")}
              className="ml-2 text-violet-800 hover:text-violet-900"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        
        {selectedTag && (
          <div className="flex items-center bg-violet-100 text-violet-800 text-xs px-3 py-1 rounded-full">
            Tag: {selectedTag}
            <button 
              onClick={() => setSelectedTag("")}
              className="ml-2 text-violet-800 hover:text-violet-900"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveFilters;
