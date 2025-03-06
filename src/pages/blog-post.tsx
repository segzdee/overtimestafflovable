
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Tag, Share2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "@/components/layout/Footer";
import { blogPosts } from "@/data/blogPosts";
import { useEffect, useState } from "react";

export default function BlogPost() {
  const navigate = useNavigate();
  const location = useLocation();
  const [post, setPost] = useState<any | null>(null);
  
  useEffect(() => {
    const id = new URLSearchParams(location.search).get('id');
    if (id) {
      const foundPost = blogPosts.find(post => post.id === parseInt(id));
      if (foundPost) {
        setPost(foundPost);
        // Scroll to top when post loads
        window.scrollTo(0, 0);
      } else {
        navigate('/blog');
      }
    } else {
      navigate('/blog');
    }
  }, [location, navigate]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading post...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/blog')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all articles
        </Button>

        <article className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {post.category}
              </span>
              {post.featured && (
                <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Featured
                </span>
              )}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4 mb-6">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{post.date}</span>
              </div>
              <div>
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
          
          {post.imageUrl && (
            <div className="mb-8">
              <img 
                src={post.imageUrl} 
                alt={post.title}
                className="w-full rounded-xl h-64 md:h-96 object-cover"
              />
            </div>
          )}
          
          <div className="prose prose-lg max-w-none bg-white p-6 md:p-10 rounded-xl shadow-sm border border-gray-100">
            {post.content.split('\n\n').map((paragraph: string, idx: number) => {
              // Check if this is a heading (starts with ##)
              if (paragraph.startsWith('## ')) {
                return <h2 key={idx} className="text-2xl font-bold mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
              }
              
              // Check if this is a blockquote
              if (paragraph.startsWith('> ')) {
                return (
                  <blockquote key={idx} className="border-l-4 border-purple-500 pl-4 italic my-6 py-2 text-gray-700">
                    {paragraph.replace('> ', '')}
                  </blockquote>
                );
              }
              
              // Check if this is a list item with "-"
              if (paragraph.includes('\n- ')) {
                const [listIntro, ...items] = paragraph.split('\n- ');
                return (
                  <div key={idx}>
                    <p>{listIntro}</p>
                    <ul className="list-disc list-inside my-4 space-y-2">
                      {items.map((item, itemIdx) => (
                        <li key={itemIdx} className="text-gray-700">{item}</li>
                      ))}
                    </ul>
                  </div>
                );
              }
              
              // Regular paragraph
              return <p key={idx} className="my-4 text-gray-700">{paragraph}</p>;
            })}
            
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded-full">
                      <Tag className="inline-block h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-8 flex justify-between items-center">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/blog')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all articles
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share article
            </Button>
          </div>
        </article>
      </div>
      <Footer />
    </div>
  );
}
