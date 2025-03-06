
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "@/components/layout/Footer";
import { blogPosts } from "@/data/blog";
import { Helmet } from "react-helmet";

// Import extracted components
import BlogHeader from "@/components/blog/BlogHeader";
import CategoryFilter from "@/components/blog/CategoryFilter";
import ActiveFilters from "@/components/blog/ActiveFilters";
import FeaturedPost from "@/components/blog/FeaturedPost";
import BlogGrid from "@/components/blog/BlogGrid";
import NewsletterSignup from "@/components/blog/NewsletterSignup";

// Extract unique categories for filtering
const categories = Array.from(new Set(blogPosts.map(post => post.category)));

// Extract all tags for filtering
const allTags = Array.from(
  new Set(blogPosts.flatMap(post => post.tags))
).sort();

export default function Blog() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("");
  
  // Parse URL search params
  useEffect(() => {
    const tagParam = searchParams.get('tag');
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    
    if (tagParam) setSelectedTag(tagParam);
    if (categoryParam) setSelectedCategory(categoryParam);
    if (searchParam) setSearchQuery(searchParam);
  }, [searchParams]);
  
  // Filter posts based on search query, selected category, and tag
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = !searchQuery || 
                         post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesCategory && matchesTag;
  });
  
  // Get featured post
  const featuredPost = blogPosts.find(post => post.featured);
  
  const handleReadMore = (postSlug: string) => {
    navigate(`/blog/${postSlug}`);
  };
  
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedTag("");
    // Clear URL params
    navigate('/blog');
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedTag) params.set('tag', selectedTag);
    
    setSearchParams(params);
  };
  
  const handleCategorySelect = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(category);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Helmet>
        <title>Blog | OVERTIMESTAFF</title>
        <meta name="description" content="Insights, tips, and industry news for hospitality staffing professionals." />
      </Helmet>
      
      {/* Blog Header with search */}
      <BlogHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />

      <div className="container mx-auto px-4 md:px-6 py-5 md:py-6 flex-1">
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="text-xs md:text-sm"
          >
            <ArrowLeft className="mr-2 h-3 w-3 md:h-4 md:w-4" />
            Back
          </Button>
          
          {(selectedCategory || selectedTag || searchQuery) && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="text-xs md:text-sm"
            >
              Clear filters
            </Button>
          )}
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-3 mb-5">
            <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">Latest Articles</h1>
          </div>
          
          {/* Active filters display */}
          <ActiveFilters
            selectedCategory={selectedCategory}
            selectedTag={selectedTag}
            setSelectedCategory={setSelectedCategory}
            setSelectedTag={setSelectedTag}
          />
          
          {/* Category filtering */}
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategorySelect={handleCategorySelect}
          />
          
          {/* Featured post - only show when no filters are active */}
          {featuredPost && !searchQuery && !selectedCategory && !selectedTag && (
            <FeaturedPost post={featuredPost} handleReadMore={handleReadMore} />
          )}
          
          {/* Blog posts grid */}
          <BlogGrid
            posts={filteredPosts}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
            handleReadMore={handleReadMore}
          />
          
          {/* Newsletter signup */}
          <NewsletterSignup />
        </div>
      </div>
      <Footer />
    </div>
  );
}
