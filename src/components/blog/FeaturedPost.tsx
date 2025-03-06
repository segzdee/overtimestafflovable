
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/types/blog";
import { Calendar, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";

interface FeaturedPostProps {
  post: BlogPost;
  handleReadMore: (slug: string) => void;
}

const FeaturedPost = ({ post, handleReadMore }: FeaturedPostProps) => {
  return (
    <div className="mb-6 md:mb-8 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-all hover:shadow-md">
      <div className="md:flex">
        <div className="md:w-1/2 h-48 md:h-auto">
          <img 
            src={post.coverImage || post.imageUrl}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-4 md:p-5 md:w-1/2 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded-full">
                Featured
              </span>
              <span className="text-xs font-medium text-purple-600">
                {post.category}
              </span>
              <span className="flex items-center text-xs text-gray-500">
                <Clock className="h-3 w-3 mr-1" />
                {post.readTime}
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-bold mb-2 line-clamp-2">{post.title}</h2>
            <p className="text-gray-600 mb-3 text-sm line-clamp-3">{post.excerpt}</p>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <User className="h-3 w-3 text-gray-400 mr-1" />
              <span className="text-xs text-gray-500">{post.author}</span>
              <span className="mx-2 text-gray-300">|</span>
              <Calendar className="h-3 w-3 text-gray-400 mr-1" />
              <span className="text-xs text-gray-500">{post.date}</span>
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
      </div>
    </div>
  );
};

export default FeaturedPost;
