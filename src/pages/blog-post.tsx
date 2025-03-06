
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Footer from "@/components/layout/Footer";
import { blogPosts } from "@/data/blogPosts";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet";
import "../styles/blog-article.css";

// Imported Components
import BlogPostHero from "@/components/blog/BlogPostHero";
import BlogBreadcrumbs from "@/components/blog/BlogBreadcrumbs";
import BlogPostContent from "@/components/blog/BlogPostContent";
import RelatedPosts from "@/components/blog/RelatedPosts";
import BlogCTA from "@/components/blog/BlogCTA";

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

  const handleCommentClick = () => {
    toast({
      title: "Feature coming soon",
      description: "Comments will be available in a future update",
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* SEO metadata */}
      <Helmet>
        <title>{post.title} | OVERTIMESTAFF Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.coverImage || post.imageUrl} />
      </Helmet>
      
      {/* Hero Section */}
      <BlogPostHero post={post} />

      <div className="container mx-auto px-4 md:px-8 py-6 md:py-10 flex-1">
        {/* Breadcrumbs */}
        <BlogBreadcrumbs title={post.title} />

        {/* Article Content */}
        <BlogPostContent post={post} onCommentClick={handleCommentClick} />
        
        {/* Related Posts */}
        <RelatedPosts posts={relatedPosts} />
        
        {/* Call to Action */}
        <BlogCTA />
      </div>
      <Footer />
    </div>
  );
}
