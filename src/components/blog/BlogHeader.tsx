
import { Search } from "lucide-react";
import { useState } from "react";

interface BlogHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

const BlogHeader = ({ searchQuery, setSearchQuery, handleSearch }: BlogHeaderProps) => {
  return (
    <div className="bg-violet-900 text-white py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3">OVERTIMESTAFF Blog</h1>
        <p className="text-base md:text-lg max-w-2xl">
          Insights, tips, and industry news for shift workers, hospitality businesses, and staffing agencies.
        </p>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mt-4 md:mt-6 max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search blog posts..."
              className="w-full py-2 px-4 pr-10 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-violet-600"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogHeader;
