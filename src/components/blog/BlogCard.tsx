
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/types/blog";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogCardProps {
  post: BlogPost;
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  handleReadMore: (slug: string) => void;
}

const BlogCard = ({ post, selectedTag, setSelectedTag, handleReadMore }: BlogCardProps) => {
  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
      <div className="relative">
        <Link to={`/blog/${post.slug}`} className="block aspect-video overflow-hidden">
          <img
            src={post.coverImage || post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </Link>
        <div className="absolute top-0 right-0 m-2">
          <span className="bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-800 px-2 py-0.5 rounded">
            {post.readTime}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-purple-600">
            {post.category}
          </span>
          <span className="text-xs text-gray-500">
            {post.date}
          </span>
        </div>
        
        <Link to={`/blog/${post.slug}`}>
          <h2 className="text-base md:text-lg font-semibold mb-2 line-clamp-2 hover:text-violet-700 transition-colors">
            {post.title}
          </h2>
        </Link>
        
        <p className="text-gray-600 mb-3 text-xs md:text-sm line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {post.tags.slice(0, 3).map(tag => (
            <Button
              key={tag}
              variant="outline"
              size="sm"
              className={`h-6 text-xs px-2 rounded-full ${selectedTag === tag ? 'bg-violet-100 text-violet-800 border-violet-200' : ''}`}
              onClick={() => setSelectedTag(tag === selectedTag ? '' : tag)}
            >
              {tag}
            </Button>
          ))}
          {post.tags.length > 3 && (
            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
              +{post.tags.length - 3}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <User className="h-3 w-3 text-gray-400 mr-1" />
            <span className="text-xs text-gray-500">
              {post.author}
            </span>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => handleReadMore(post.slug)}
            className="text-xs"
          >
            Read More
          </Button>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
