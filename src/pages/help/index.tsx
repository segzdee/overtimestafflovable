
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  SearchIcon, 
  FileQuestion, 
  TicketIcon, 
  MessageCircle,
  ArrowRight
} from "lucide-react";

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would search for help articles
    console.log("Searching for:", searchQuery);
  };

  const helpCategories = [
    {
      title: "Frequently Asked Questions",
      description: "Find answers to common questions about our platform",
      icon: FileQuestion,
      path: "/help/faq"
    },
    {
      title: "Submit Support Ticket",
      description: "Create a support ticket for technical assistance",
      icon: TicketIcon,
      path: "/help/ticket"
    },
    {
      title: "Live Chat Support",
      description: "Chat with our support team in real-time",
      icon: MessageCircle,
      path: "/contact"
    }
  ];

  return (
    <div className="container max-w-5xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find answers to your questions and get the support you need to make the most of our platform.
        </p>
      </div>
      
      <div className="max-w-xl mx-auto mb-12">
        <form onSubmit={handleSearch} className="relative">
          <Input
            type="text"
            placeholder="Search for help topics..."
            className="pl-10 pr-4 py-6 text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Button 
            type="submit" 
            className="absolute right-1.5 top-1.5"
          >
            Search
          </Button>
        </form>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {helpCategories.map((category, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <category.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="ghost" 
                className="flex items-center text-primary"
                onClick={() => navigate(category.path)}
              >
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="bg-primary/5 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
        <p className="text-gray-600 mb-6">
          Our support team is available Monday through Friday, 9 AM to 5 PM EST.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline">
            <Link to="/contact">Contact Us</Link>
          </Button>
          <Button asChild>
            <Link to="/help/ticket">Submit a Ticket</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
