
import { Link } from "react-router-dom";

interface RelatedPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  slug: string;
  coverImage?: string;
  imageUrl?: string;
}

interface RelatedPostsProps {
  posts: RelatedPost[];
}

const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  if (!posts || posts.length === 0) return null;
  
  return (
    <div className="max-w-5xl mx-auto mt-16">
      <h2 className="text-xl md:text-2xl font-bold mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {posts.map((post) => (
          <div 
            key={post.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
          >
            <Link to={`/blog/${post.slug}`} className="block aspect-video overflow-hidden">
              <img 
                src={post.coverImage || post.imageUrl} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </Link>
            <div className="p-4 md:p-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-violet-700 bg-violet-100 px-2 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="text-xs text-gray-500">
                  {post.readTime}
                </span>
              </div>
              <Link to={`/blog/${post.slug}`}>
                <h3 className="text-base md:text-lg font-bold mb-2 text-gray-800 hover:text-violet-700 transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </Link>
              <p className="text-gray-600 mb-4 text-xs md:text-sm line-clamp-2">
                {post.excerpt}
              </p>
              <Link 
                to={`/blog/${post.slug}`}
                className="text-violet-700 font-medium hover:text-violet-900 transition-colors inline-flex items-center text-xs md:text-sm"
              >
                Read More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
