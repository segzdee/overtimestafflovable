
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Tag, Share2, MessageCircle, Clock } from "lucide-react";
import { useNavigate, useLocation, useParams, Link } from "react-router-dom";
import Footer from "@/components/layout/Footer";
import { blogPosts } from "@/data/blogPosts";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import ReactMarkdown from "react-markdown";
import { Helmet } from "react-helmet";

export default function BlogPost() {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams();
  const [post, setPost] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    // Find post by ID (legacy) or slug (new)
    const findPost = () => {
      // First try to find by slug
      if (slug) {
        const foundPost = blogPosts.find(post => post.slug === slug);
        if (foundPost) return foundPost;
      }
      
      // Then try to find by ID from query params
      const id = new URLSearchParams(location.search).get('id');
      if (id) {
        const foundPost = blogPosts.find(post => post.id === parseInt(id));
        if (foundPost) return foundPost;
      }
      
      return null;
    };
    
    const currentPost = findPost();
    
    if (currentPost) {
      setPost(currentPost);
      
      // Find related posts (same category, excluding current)
      const related = blogPosts
        .filter(p => p.category === currentPost.category && p.id !== currentPost.id)
        .slice(0, 3);
      
      setRelatedPosts(related);
      
      // Scroll to top when post loads
      window.scrollTo(0, 0);
    } else {
      navigate('/blog');
    }
    
    setIsLoading(false);
  }, [location, navigate, slug]);

  const handleShareArticle = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "The article link has been copied to your clipboard",
      duration: 3000,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-700"></div>
      </div>
    );
  }

  if (!post) {
    return null; // Will redirect due to navigate in useEffect
  }

  const coverImage = post.coverImage || post.imageUrl;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* SEO metadata */}
      <Helmet>
        <title>{post.title} | OVERTIMESTAFF Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={coverImage} />
      </Helmet>
      
      {/* Hero Section */}
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

      <div className="container mx-auto px-4 md:px-8 py-6 md:py-10 flex-1">
        {/* Breadcrumbs */}
        <div className="max-w-3xl mx-auto text-xs md:text-sm text-gray-500 mb-6 md:mb-8">
          <Link to="/" className="hover:text-violet-700 transition-colors">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/blog" className="hover:text-violet-700 transition-colors">Blog</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-700">{post.title}</span>
        </div>

        <article className="max-w-3xl mx-auto">
          {/* Content */}
          <div className="prose prose-lg max-w-none bg-white p-5 md:p-8 lg:p-10 rounded-xl shadow-sm border border-gray-100">
            <div className="prose prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-violet-700 prose-blockquote:border-violet-300 prose-blockquote:bg-violet-50/50 prose-blockquote:p-4 prose-blockquote:rounded-md prose-li:marker:text-violet-500">
              <ReactMarkdown>
                {post.content}
              </ReactMarkdown>
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
          
          {/* Share Section */}
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
              onClick={() => navigate('/blog')}
              className="text-xs md:text-sm"
            >
              <ArrowLeft className="mr-2 h-3 w-3 md:h-4 md:w-4" />
              Back to all articles
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                toast({
                  title: "Feature coming soon",
                  description: "Comments will be available in a future update",
                  duration: 3000,
                });
              }}
              className="text-xs md:text-sm"
            >
              <MessageCircle className="mr-2 h-3 w-3 md:h-4 md:w-4" />
              Comments
            </Button>
          </div>
        </article>
        
        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="max-w-5xl mx-auto mt-16">
            <h2 className="text-xl md:text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {relatedPosts.map((relatedPost) => (
                <div 
                  key={relatedPost.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
                >
                  <Link to={`/blog/${relatedPost.slug}`} className="block aspect-video overflow-hidden">
                    <img 
                      src={relatedPost.coverImage || relatedPost.imageUrl} 
                      alt={relatedPost.title} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </Link>
                  <div className="p-4 md:p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-semibold text-violet-700 bg-violet-100 px-2 py-1 rounded-full">
                        {relatedPost.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {relatedPost.readTime}
                      </span>
                    </div>
                    <Link to={`/blog/${relatedPost.slug}`}>
                      <h3 className="text-base md:text-lg font-bold mb-2 text-gray-800 hover:text-violet-700 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 mb-4 text-xs md:text-sm line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <Link 
                      to={`/blog/${relatedPost.slug}`}
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
        )}
        
        {/* Call to Action */}
        <div className="max-w-3xl mx-auto mt-16 p-6 md:p-8 bg-violet-50 rounded-lg text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Ready to optimize your staffing?</h2>
          <p className="text-gray-600 mb-6 text-sm md:text-base">
            Join thousands of businesses and workers who are already using OVERTIMESTAFF to streamline hospitality staffing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-6 py-3 bg-violet-700 text-white rounded-lg font-medium hover:bg-violet-800 transition-colors text-sm md:text-base"
            >
              Sign Up Free
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 bg-white text-violet-700 border border-violet-700 rounded-lg font-medium hover:bg-violet-50 transition-colors text-sm md:text-base"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
