
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Calendar, User, Clock, Tag, Search } from "lucide-react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { blogPosts } from "@/data/blogPosts";
import { Helmet } from "react-helmet";

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
      
      {/* Blog Header */}
      <div className="bg-violet-900 text-white py-10 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">OVERTIMESTAFF Blog</h1>
          <p className="text-lg md:text-xl max-w-2xl">
            Insights, tips, and industry news for shift workers, hospitality businesses, and staffing agencies.
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mt-6 md:mt-8 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search blog posts..."
                className="w-full py-2 md:py-3 px-4 pr-10 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-violet-600"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-6 md:py-8 flex-1">
        <div className="flex justify-between items-center mb-6">
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
          <div className="flex items-center space-x-3 mb-6">
            <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Latest Articles</h1>
          </div>
          
          {/* Active filters */}
          {(selectedTag || selectedCategory) && (
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-500">Active filters:</span>
                
                {selectedCategory && (
                  <div className="flex items-center bg-violet-100 text-violet-800 text-xs px-3 py-1 rounded-full">
                    Category: {selectedCategory}
                    <button 
                      onClick={() => setSelectedCategory("")}
                      className="ml-2 text-violet-800 hover:text-violet-900"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
                
                {selectedTag && (
                  <div className="flex items-center bg-violet-100 text-violet-800 text-xs px-3 py-1 rounded-full">
                    Tag: {selectedTag}
                    <button 
                      onClick={() => setSelectedTag("")}
                      className="ml-2 text-violet-800 hover:text-violet-900"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-2">
            <Button 
              variant={!selectedCategory ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("")}
              className="text-xs md:text-sm whitespace-nowrap"
            >
              All Categories
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategorySelect(category)}
                className="text-xs md:text-sm whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
          
          {/* Featured post */}
          {featuredPost && !searchQuery && !selectedCategory && !selectedTag && (
            <div className="mb-8 md:mb-12 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-all hover:shadow-md">
              <div className="md:flex">
                <div className="md:w-1/2 h-64 md:h-auto">
                  <img 
                    src={featuredPost.coverImage || featuredPost.imageUrl}
                    alt={featuredPost.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4 md:p-6 md:w-1/2 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Featured
                      </span>
                      <span className="text-xs font-medium text-purple-600">
                        {featuredPost.category}
                      </span>
                      <span className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold mb-3 line-clamp-2">{featuredPost.title}</h2>
                    <p className="text-gray-600 mb-4 text-sm md:text-base line-clamp-3">{featuredPost.excerpt}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                      <User className="h-3 w-3 md:h-4 md:w-4 text-gray-400 mr-1" />
                      <span className="text-xs md:text-sm text-gray-500">{featuredPost.author}</span>
                      <span className="mx-2 text-gray-300">|</span>
                      <Calendar className="h-3 w-3 md:h-4 md:w-4 text-gray-400 mr-1" />
                      <span className="text-xs md:text-sm text-gray-500">{featuredPost.date}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleReadMore(featuredPost.slug)}
                      className="text-xs md:text-sm"
                    >
                      Read More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredPosts.map((post) => (
              <article 
                key={post.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
              >
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
                <div className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-purple-600">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {post.date}
                    </span>
                  </div>
                  
                  <Link to={`/blog/${post.slug}`}>
                    <h2 className="text-lg md:text-xl font-semibold mb-2 line-clamp-2 hover:text-violet-700 transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  
                  <p className="text-gray-600 mb-4 text-xs md:text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
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
                      <User className="h-3 w-3 md:h-4 md:w-4 text-gray-400 mr-1" />
                      <span className="text-xs md:text-sm text-gray-500">
                        {post.author}
                      </span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleReadMore(post.slug)}
                      className="text-xs md:text-sm"
                    >
                      Read More
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          {/* No results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100 my-8">
              <h3 className="text-xl font-medium mb-2">No articles found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
              <Button 
                variant="outline"
                onClick={clearFilters}
              >
                Clear filters
              </Button>
            </div>
          )}
          
          {/* Newsletter Signup */}
          <div className="bg-gradient-to-br from-violet-50 to-indigo-50 py-10 md:py-12 px-6 md:px-8 rounded-lg mt-16 shadow-sm border border-violet-100">
            <div className="text-center">
              <h2 className="text-xl md:text-2xl font-bold mb-4">Stay Updated with OVERTIMESTAFF</h2>
              <p className="text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base">
                Subscribe to our newsletter for the latest industry insights, platform updates, and staffing tips.
              </p>
              <div className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 py-2 md:py-3 px-4 rounded-lg sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                  <button className="bg-violet-700 text-white px-6 py-2 md:py-3 rounded-lg sm:rounded-l-none font-medium hover:bg-violet-800 transition-colors text-sm md:text-base">
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
