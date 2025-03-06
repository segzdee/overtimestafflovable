
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Calendar, User, Tag, Search } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { blogPosts } from "@/data/blogPosts";
import { Helmet } from "react-helmet";

// Extract unique categories for filtering
const categories = Array.from(new Set(blogPosts.map(post => post.category)));

export default function Blog() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("");
  
  // Parse URL search params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tagParam = params.get('tag');
    if (tagParam) {
      setSelectedTag(tagParam);
    }
  }, []);
  
  // Filter posts based on search query, selected category, and tag
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    
    return matchesSearch && matchesCategory && matchesTag;
  });
  
  // Get featured post - prioritize the new AI post
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
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Helmet>
        <title>Blog | OVERTIMESTAFF</title>
        <meta name="description" content="Insights, tips, and industry news for hospitality staffing professionals." />
      </Helmet>
      
      {/* Blog Header */}
      <div className="bg-violet-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">OVERTIMESTAFF Blog</h1>
          <p className="text-xl max-w-2xl">
            Insights, tips, and industry news for shift workers, hospitality businesses, and staffing agencies.
          </p>
          
          {/* Search Bar */}
          <div className="mt-8 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search blog posts..."
                className="w-full py-3 px-4 pr-10 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="absolute right-3 top-3">
                <Search className="h-5 w-5 text-gray-400" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-3 mb-6">
            <BookOpen className="h-6 w-6 text-purple-600" />
            <h1 className="text-3xl font-bold tracking-tight">Our Blog</h1>
          </div>
          
          {/* Filter tags */}
          {selectedTag && (
            <div className="mb-6">
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">Filtered by tag:</span>
                <div className="flex items-center bg-violet-100 text-violet-800 text-sm px-3 py-1 rounded-full">
                  {selectedTag}
                  <button 
                    onClick={clearFilters}
                    className="ml-2 text-violet-800 hover:text-violet-900"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Button 
              variant={!selectedCategory ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("")}
            >
              All
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          
          {/* Featured post */}
          {featuredPost && !searchQuery && !selectedCategory && !selectedTag && (
            <div className="mb-12 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src={featuredPost.coverImage || featuredPost.imageUrl}
                    alt={featuredPost.title}
                    className="h-64 w-full object-cover md:h-full"
                  />
                </div>
                <div className="p-6 md:w-1/2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-3">
                      <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Featured
                      </span>
                      <span className="ml-2 text-sm font-medium text-purple-600">
                        {featuredPost.category}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold mb-3">{featuredPost.title}</h2>
                    <p className="text-gray-600 mb-4">{featuredPost.excerpt}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500">{featuredPost.author}</span>
                      <span className="mx-2 text-gray-300">|</span>
                      <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500">{featuredPost.date}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleReadMore(featuredPost.slug)}
                    >
                      Read More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article 
                key={post.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 transition-transform hover:shadow-md hover:translate-y-[-2px]"
              >
                <div className="relative">
                  <Link to={`/blog/${post.slug}`}>
                    <img
                      src={post.coverImage || post.imageUrl}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  </Link>
                  <div className="absolute top-0 right-0 m-2">
                    <span className="bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-800 px-2.5 py-0.5 rounded">
                      {post.readTime}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-purple-600">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {post.date}
                    </span>
                  </div>
                  
                  <Link to={`/blog/${post.slug}`}>
                    <h2 className="text-xl font-semibold mb-2 line-clamp-2 hover:text-violet-700 transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map(tag => (
                      <Link
                        key={tag}
                        to={`/blog?tag=${tag}`}
                        className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500">
                        {post.author}
                      </span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleReadMore(post.slug)}
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
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No articles found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              <Button 
                variant="outline"
                onClick={clearFilters}
                className="mt-4"
              >
                Clear filters
              </Button>
            </div>
          )}
          
          {/* Newsletter Signup */}
          <div className="bg-gray-100 py-12 px-8 rounded-lg mt-16">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Stay Updated with OVERTIMESTAFF</h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter for the latest industry insights, platform updates, and staffing tips.
              </p>
              <div className="max-w-md mx-auto">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 py-3 px-4 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                  <button className="bg-violet-700 text-white px-6 py-3 rounded-r-lg font-medium hover:bg-violet-800 transition-colors">
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
