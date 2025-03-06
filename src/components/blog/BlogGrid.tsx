
import { BlogPost } from "@/types/blog";
import BlogCard from "./BlogCard";

interface BlogGridProps {
  posts: BlogPost[];
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  handleReadMore: (slug: string) => void;
}

const BlogGrid = ({ posts, selectedTag, setSelectedTag, handleReadMore }: BlogGridProps) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-100 my-6">
        <h3 className="text-xl font-medium mb-2">No articles found</h3>
        <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
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

export default BlogGrid;
