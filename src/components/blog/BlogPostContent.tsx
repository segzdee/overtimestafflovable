
import ReactMarkdown from "react-markdown";
import { Tag, MessageCircle, Share2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface BlogPostContentProps {
  post: {
    title: string;
    content: string;
    tags?: string[];
  };
  onCommentClick: () => void;
}

const BlogPostContent = ({ post, onCommentClick }: BlogPostContentProps) => {
  const { toast } = useToast();

  const handleShareArticle = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "The article link has been copied to your clipboard",
      duration: 3000,
    });
  };

  return (
    <article className="max-w-3xl mx-auto">
      <div className="bg-white p-5 md:p-8 lg:p-10 rounded-xl shadow-sm border border-gray-100">
        <div className="article-container">
          <div className="article-content">
            <ReactMarkdown>
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
        
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <Link
                  key={tag}
                  to={`/blog?tag=${tag}`}
                  className="bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded-full hover:bg-gray-200 transition-colors flex items-center"
                >
                  <Tag className="inline-block h-3 w-3 mr-1" />
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-8 py-6 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
          Share this article
        </h3>
        <div className="flex space-x-4">
          <a 
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-400 transition-colors"
            aria-label="Share on Twitter"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>
          <a 
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-700 transition-colors"
            aria-label="Share on LinkedIn"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a 
            href={`mailto:?subject=${encodeURIComponent(post.title)}&body=Check out this article: ${encodeURIComponent(window.location.href)}`}
            className="text-gray-500 hover:text-gray-800 transition-colors"
            aria-label="Share by Email"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </a>
          <button
            onClick={handleShareArticle}
            className="text-gray-500 hover:text-violet-700 transition-colors"
            aria-label="Copy Link"
          >
            <Share2 className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      <div className="mt-8 flex justify-between items-center">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => window.history.back()}
          className="text-xs md:text-sm"
        >
          <ArrowLeft className="mr-2 h-3 w-3 md:h-4 md:w-4" />
          Back to all articles
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={onCommentClick}
          className="text-xs md:text-sm"
        >
          <MessageCircle className="mr-2 h-3 w-3 md:h-4 md:w-4" />
          Comments
        </Button>
      </div>
    </article>
  );
};

export default BlogPostContent;
