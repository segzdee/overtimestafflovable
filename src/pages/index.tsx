
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
      'From unfilled shifts to finding the right staff, OVERTIMESTAFF Platform connects agencies, hotels, and businesses with AI-driven solutions.'
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
      path: "/login"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4">
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
            AI Meets Hospitality:
            <br />
            Extra Staff, Anytime, Anywhere
          </h1>
          <p className="text-gray-600 text-lg">
            From unfilled shifts to finding the right staff, OVERTIMESTAFF Platform connects agencies, hotels, and businesses with AI-driven solutions.
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

        {/* Live Market Updates */}
        <div className="w-full max-w-7xl bg-gray-900 rounded-lg overflow-hidden">
          <div className="p-4 flex justify-between items-center">
            <span className="text-gray-400 font-medium">LIVE MARKET UPDATES</span>
            <span className="text-gray-400 text-sm">7:52:26 AM</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {[
              { type: 'URGENT', title: 'Kitchen Staff Needed', location: 'Downtown', rate: '$35/hr' },
              { type: 'NEW', title: 'Server Position', location: 'Midtown', rate: '$25/hr' },
              { type: 'SWAP', title: 'Bartender Shift', location: 'Upper East', rate: '$30/hr' },
              { type: 'PREMIUM', title: 'Night Manager', location: 'Financial District', rate: '$40/hr' }
            ].map((update) => (
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
                  {update.rate}
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 py-2 bg-gray-800 text-gray-400 text-sm">
            Updated every 5 minutes • 0 new positions added today
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 flex justify-center gap-8 text-sm text-gray-600">
        <button onClick={() => navigate("/terms")}>Terms</button>
        <button onClick={() => navigate("/privacy")}>Privacy</button>
        <button onClick={() => navigate("/contact")}>Contact</button>
        <button onClick={() => navigate("/blog")}>Blog</button>
      </footer>
    </div>
  );
}
