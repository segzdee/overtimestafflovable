
import { BlogPost } from "@/types/blog";
import BlogCard from "./BlogCard";
import React, { useCallback } from "react";

interface BlogGridProps {
  posts: BlogPost[];
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  handleReadMore: (slug: string) => void;
}

const BlogGrid = ({ posts, selectedTag, setSelectedTag, handleReadMore }: BlogGridProps) => {
  // Memoize the empty state to prevent unnecessary re-renders
  const EmptyState = useCallback(() => (
    <div className="text-center py-8 bg-white rounded-lg shadow-sm border border-gray-100 my-4">
      <h3 className="text-xl font-medium mb-2">No articles found</h3>
      <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
    </div>
  ), []);

  if (posts.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
      {posts.map((post) => (
        <BlogCard
          key={post.id}
          post={post}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          handleReadMore={handleReadMore}
        />
      ))}
    </div>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default React.memo(BlogGrid);
