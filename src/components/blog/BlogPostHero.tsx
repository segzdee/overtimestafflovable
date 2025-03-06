
import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogPostHeroProps {
  post: {
    title: string;
    category: string;
    date: string;
    readTime: string;
    author: string;
    authorImage?: string;
    coverImage?: string;
    imageUrl?: string;
  };
}

const BlogPostHero = ({ post }: BlogPostHeroProps) => {
  const coverImage = post.coverImage || post.imageUrl;
  
  return (
    <div className="relative h-64 md:h-96 w-full bg-gray-900">
      <img
        src={coverImage}
        alt={post.title}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 to-gray-900/90"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-8 text-center text-white">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
            <span className="text-xs md:text-sm font-semibold text-violet-300 bg-violet-900/60 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="flex items-center text-xs md:text-sm text-gray-200">
              <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              {post.date}
            </span>
            <span className="flex items-center text-xs md:text-sm text-gray-200">
              <Clock className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              {post.readTime}
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-center">
            <img
              src={post.authorImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'}
              alt={post.author}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-white/20"
            />
            <span className="ml-2 text-sm md:text-base font-medium">
              {post.author}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostHero;
