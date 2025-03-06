
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Calendar, User, Tag, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
  category: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Hospitality Staffing",
    excerpt: "How AI and automation are transforming the way hotels and restaurants manage their workforce needs.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: "Sarah Johnson",
    date: "May 15, 2024",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    category: "Industry Trends",
    readTime: "8 min read",
    tags: ["AI", "Automation", "Hospitality", "Workforce"],
    featured: true
  },
  {
    id: 2,
    title: "Maximizing Flexibility in Shift Work",
    excerpt: "Best practices for managing a flexible workforce while maintaining service quality and staff satisfaction.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: "Michael Chen",
    date: "May 10, 2024",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    category: "Management",
    readTime: "6 min read",
    tags: ["Flexibility", "Management", "Best Practices", "Employee Satisfaction"]
  },
  {
    id: 3,
    title: "Building a Successful Hospitality Career",
    excerpt: "Tips and strategies for professionals looking to advance their careers in the hospitality industry.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: "Emma Davis",
    date: "May 5, 2024",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    category: "Career Development",
    readTime: "10 min read",
    tags: ["Career", "Professional Development", "Hospitality Industry"]
  },
  {
    id: 4,
    title: "The Rise of Gig Economy in Hospitality",
    excerpt: "How the gig economy is reshaping traditional employment models in hotels and restaurants.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: "James Wilson",
    date: "May 1, 2024",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    category: "Industry Trends",
    readTime: "7 min read",
    tags: ["Gig Economy", "Employment Models", "Hospitality"]
  },
  {
    id: 5,
    title: "Managing Staff Shortages During Peak Seasons",
    excerpt: "Strategies for hospitality businesses to handle staff shortages during their busiest periods.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: "Alexandra Brown",
    date: "April 25, 2024",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    category: "Operations",
    readTime: "9 min read",
    tags: ["Staffing", "Peak Season", "Management", "Hospitality"]
  },
  {
    id: 6,
    title: "Technology Solutions for Staffing Challenges",
    excerpt: "How technology is helping hospitality businesses overcome staffing challenges in a competitive market.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: "Daniel Kim",
    date: "April 20, 2024",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    category: "Technology",
    readTime: "8 min read",
    tags: ["Technology", "Staffing Solutions", "Innovation"]
  }
];

// Extract unique categories for filtering
const categories = Array.from(new Set(blogPosts.map(post => post.category)));

export default function Blog() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  
  // Filter posts based on search query and selected category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get featured post
  const featuredPost = blogPosts.find(post => post.featured);
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
          
          {/* Search and filter */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="relative w-full md:w-auto flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
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
          </div>
          
          {/* Featured post */}
          {featuredPost && !searchQuery && !selectedCategory && (
            <div className="mb-12 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src={featuredPost.imageUrl}
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
                    <Button variant="ghost" size="sm">
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
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
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
                  
                  <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                        {tag}
                      </span>
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
                    <Button variant="ghost" size="sm">
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
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("");
                }}
                className="mt-4"
              >
                Clear filters
              </Button>
            </div>
          )}
          
          {/* Show more button */}
          {filteredPosts.length > 0 && filteredPosts.length < blogPosts.length && (
            <div className="text-center mt-12">
              <Button variant="outline">Load More Articles</Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
