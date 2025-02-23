import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMarketUpdates } from "@/hooks/useMarketUpdates";
import { Logo } from "@/components/ui/logo";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CircleUser, Building2, Building, Bot } from "lucide-react";

export default function Index() {
  const { updates } = useMarketUpdates();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "OvertimeStaff - AI Meets Hospitality";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 
      'Got extra time? Need extra shifts? Connect with hospitality opportunities worldwide through our AI-powered platform.'
    );
  }, []);

  const userTypes = [
    {
      title: "Shift Worker",
      description: "Clock-in",
      icon: <CircleUser className="w-10 h-10 text-purple-500" />,
      path: "/login"
    },
    {
      title: "Agency",
      description: "Manage Staff",
      icon: <Building2 className="w-10 h-10 text-purple-500" />,
      path: "/login"
    },
    {
      title: "Company",
      description: "Post Shifts",
      icon: <Building className="w-10 h-10 text-purple-500" />,
      path: "/login"
    },
    {
      title: "AI Agents",
      description: "Token Auth",
      icon: <Bot className="w-10 h-10 text-purple-500" />,
      path: "/token-login"
    }
  ];

  const marketUpdates = [
    { type: 'URGENT', title: 'Executive Chef - Fine Dining', location: 'Dubai, UAE', rate: 35 },
    { type: 'NEW', title: 'Sommelier', location: 'Valletta, Malta', rate: 30 },
    { type: 'SWAP', title: 'Head Bartender', location: 'Barcelona, Spain', rate: 28 },
    { type: 'PREMIUM', title: 'Restaurant Manager', location: 'Cape Town, South Africa', rate: 32 },
    { type: 'URGENT', title: 'Pastry Chef', location: 'Milan, Italy', rate: 33 },
    { type: 'NEW', title: 'Events Coordinator', location: 'Toronto, Canada', rate: 35 },
    { type: 'PREMIUM', title: 'Sushi Master Chef', location: 'New York, USA', rate: 45 },
    { type: 'SWAP', title: 'Hospitality Manager', location: 'London, UK', rate: 30 }
  ].slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200">
        <Logo />
        <div className="flex gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/find-shifts")}
            className="text-gray-600 hover:text-gray-900"
          >
            Find Extra Shifts
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => navigate("/find-staff")}
            className="text-gray-600 hover:text-gray-900"
          >
            Find Extra Staff
          </Button>
          <Button 
            variant="default"
            onClick={() => navigate("/register")}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Sign up
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-12 flex flex-col items-center">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Got extra time? Need extra shifts?
            <br />
            No dinner staff cover? John cancelled?
          </h1>
          <p className="text-gray-600 text-lg">
            We connect people with extra time to hospitality companies and agencies with extra shifts —using smart AI to make it all happen easily and effortlessly. Sign up. Sign in ——— Post shifts. Pick up shifts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl mb-16">
          {userTypes.map((type) => (
            <Card key={type.title} className="relative overflow-hidden hover:shadow-lg transition-all">
              <div className="p-6 flex flex-col items-center text-center">
                {type.icon}
                <h3 className="text-lg font-semibold mt-4 mb-2">{type.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{type.description}</p>
                <Button 
                  onClick={() => navigate(type.path)}
                  className="w-full bg-gradient-to-r from-purple-500 to-green-500 hover:from-purple-600 hover:to-green-600 text-white"
                >
                  LOGIN
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Market Updates */}
        <div className="w-full max-w-7xl bg-gray-900 rounded-lg overflow-hidden">
          <div className="p-4 flex justify-between items-center">
            <span className="text-gray-400 font-medium">GLOBAL HOSPITALITY PULSE</span>
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">
                1 USD = 0.85 EUR | 0.79 GBP | 1.35 CAD
              </span>
              <span className="text-gray-400 text-sm">7:52:26 AM UTC</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {marketUpdates.map((update) => (
              <div 
                key={update.title}
                className={`p-4 rounded ${
                  update.type === 'URGENT' ? 'bg-purple-600' :
                  update.type === 'NEW' ? 'bg-gray-800' :
                  update.type === 'SWAP' ? 'bg-gray-800' :
                  'bg-purple-600'
                }`}
              >
                <div className="text-xs text-gray-300 uppercase mb-2">
                  {update.type}
                </div>
                <div className="text-white font-medium mb-1">
                  {update.title}
                </div>
                <div className="text-sm text-gray-300">
                  {update.location}
                </div>
                <div className="text-xl text-green-400 font-bold mt-2">
                  ${update.rate}/hr
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 py-2 bg-gray-800 text-gray-400 text-sm">
            Updated every 5 minutes • Global hospitality opportunities • All rates in USD
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-gray-200">
        <div className="container mx-auto flex justify-center gap-8 text-sm text-gray-600">
          <button onClick={() => navigate("/terms")}>Terms</button>
          <button onClick={() => navigate("/privacy")}>Privacy</button>
          <button onClick={() => navigate("/contact")}>Contact</button>
          <button onClick={() => navigate("/blog")}>Blog</button>
        </div>
      </footer>
    </div>
  );
}
