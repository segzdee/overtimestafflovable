
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
    <div className="relative h-48 md:h-72 w-full bg-gray-900">
      <img
        src={coverImage}
        alt={post.title}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 to-gray-900/90"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center text-white">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
            <span className="text-xs font-semibold text-violet-300 bg-violet-900/60 px-2 py-0.5 rounded-full">
              {post.category}
            </span>
            <div className="flex items-center text-xs text-gray-200">
              <Calendar className="h-3 w-3 mr-1" />
              {post.date}
              <span className="mx-1.5">•</span>
              <Clock className="h-3 w-3 mr-1" />
              {post.readTime}
            </div>
          </div>
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-4 max-w-3xl mx-auto leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-center">
            <img
              src={post.authorImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'}
              alt={post.author}
              className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover border-2 border-white/20"
              loading="eager"
            />
            <span className="ml-2 text-sm font-medium">
              {post.author}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostHero;
