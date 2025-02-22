
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMarketUpdates } from "@/hooks/useMarketUpdates";
import { Logo } from "@/components/ui/logo";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Index() {
  const { updates } = useMarketUpdates();
  const navigate = useNavigate();

  // Add meta tags for SEO
  useEffect(() => {
    document.title = "OvertimeStaff - Connect with Hospitality Jobs and Staff";
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 
      'Connect with hospitality jobs and staff. Real-time marketplace for shift workers, companies, and agencies. AI-powered matching for perfect fits.'
    );
  }, []);

  const userTypes = [
    {
      title: "Shift Workers",
      description: "Find flexible shifts that match your skills and schedule",
      path: "/register",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      title: "Companies",
      description: "Post shifts and find reliable staff for your business",
      path: "/register",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Agencies",
      description: "Manage your workforce and expand your client base",
      path: "/register",
      gradient: "from-green-500 to-green-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative px-6 lg:px-8 pt-24 pb-12 sm:pt-32 text-center">
        <Logo />
        <h1 className="mt-8 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          The Future of Hospitality Staffing
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
          Connect with the perfect staff or shifts in real-time. Powered by AI for smarter matches and better outcomes.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button onClick={() => navigate("/register")} size="lg">
            Get Started
          </Button>
          <Button variant="outline" onClick={() => navigate("/find-shifts")} size="lg">
            Browse Shifts
          </Button>
        </div>
      </section>

      {/* Live Market Updates */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Live Market Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {updates.slice(0, 6).map((update) => (
              <Card key={update.id} className={`p-6 hover:shadow-lg transition-shadow
                ${update.highlight ? 'border-l-4 border-purple-500' : ''}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700">
                      {update.type}
                    </span>
                    <h3 className="mt-3 font-semibold text-gray-900">{update.title}</h3>
                    <p className="mt-2 text-gray-500">{update.location}</p>
                  </div>
                  <span className="text-lg font-semibold text-gray-900">{update.rate}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* User Types */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Path</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {userTypes.map((type) => (
              <Card key={type.title} 
                className="relative overflow-hidden hover:shadow-xl transition-shadow">
                <div className={`absolute inset-0 bg-gradient-to-r ${type.gradient} opacity-10`} />
                <div className="relative p-6">
                  <h3 className="text-xl font-semibold mb-4">{type.title}</h3>
                  <p className="text-gray-600 mb-6">{type.description}</p>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate(type.path)}
                    className="w-full"
                  >
                    Join as {type.title}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
