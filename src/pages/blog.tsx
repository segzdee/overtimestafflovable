
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  imageUrl: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Hospitality Staffing",
    excerpt: "How AI and automation are transforming the way hotels and restaurants manage their workforce needs.",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    category: "Industry Trends"
  },
  {
    id: 2,
    title: "Maximizing Flexibility in Shift Work",
    excerpt: "Best practices for managing a flexible workforce while maintaining service quality and staff satisfaction.",
    author: "Michael Chen",
    date: "March 10, 2024",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    category: "Management"
  },
  {
    id: 3,
    title: "Building a Successful Hospitality Career",
    excerpt: "Tips and strategies for professionals looking to advance their careers in the hospitality industry.",
    author: "Emma Davis",
    date: "March 5, 2024",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    category: "Career Development"
  },
  {
    id: 4,
    title: "The Rise of Gig Economy in Hospitality",
    excerpt: "How the gig economy is reshaping traditional employment models in hotels and restaurants.",
    author: "James Wilson",
    date: "March 1, 2024",
    imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    category: "Industry Trends"
  }
];

export default function Blog() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight mb-8">Latest Updates</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <article 
                key={post.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform hover:scale-[1.02]"
              >
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-purple-600">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {post.date}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      By {post.author}
                    </span>
                    <Button variant="ghost" size="sm">
                      Read More
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
