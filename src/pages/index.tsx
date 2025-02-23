
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMarketUpdates } from "@/hooks/useMarketUpdates";
import { Logo } from "@/components/ui/logo";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Building2, Users, UserCog, Building } from "lucide-react";

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
      title: "Staffing Agency",
      description: "Manage your workforce and client relationships",
      icon: <Building2 className="w-8 h-8 text-purple-500" />,
      path: "/login",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      title: "Hotels & Businesses",
      description: "Find reliable staff for your shifts",
      icon: <Building className="w-8 h-8 text-purple-500" />,
      path: "/login",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      title: "Shift Workers",
      description: "Find flexible work opportunities",
      icon: <Users className="w-8 h-8 text-purple-500" />,
      path: "/login",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      title: "Platform Admin",
      description: "Manage the platform and users",
      icon: <UserCog className="w-8 h-8 text-purple-500" />,
      path: "/login",
      gradient: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b">
        <Logo />
        <div className="flex gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/find-shifts")}
          >
            Find Extra Shifts
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => navigate("/find-staff")}
          >
            Find Extra Staff
          </Button>
          <Button 
            variant="default"
            onClick={() => navigate("/register")}
            className="bg-green-600 hover:bg-green-700"
          >
            Sign up
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-12 flex flex-col items-center">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            AI Meets Hospitality:
            <br />
            Extra Staff, Anytime, Anywhere
          </h1>
          <p className="text-gray-600 text-lg">
            From unfilled shifts to finding the right staff, OVERTIMESTAFF Platform connects agencies, hotels, and businesses with AI-driven solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
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
        <div className="w-full max-w-7xl mt-12 bg-gray-900 rounded-lg overflow-hidden">
          <div className="p-4 flex justify-between items-center">
            <span className="text-white font-medium">LIVE MARKET UPDATES</span>
            <span className="text-gray-400 text-sm">7:52:26 AM</span>
          </div>
          <div className="flex gap-4 p-4 overflow-x-auto">
            {updates.slice(0, 4).map((update) => (
              <div 
                key={update.id}
                className={`flex-none w-64 p-4 rounded ${
                  update.type === 'URGENT' ? 'bg-purple-600' :
                  update.type === 'NEW' ? 'bg-gray-800' :
                  update.type === 'SWAP' ? 'bg-gray-800' :
                  'bg-purple-600'
                }`}
              >
                <div className="text-xs text-gray-300 mb-1">
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
            Updated every 5 minutes • {updates.length} new positions added today
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-6 border-t">
        <div className="flex justify-center gap-8 text-sm text-gray-600">
          <button onClick={() => navigate("/terms")}>Terms</button>
          <button onClick={() => navigate("/privacy")}>Privacy</button>
          <button onClick={() => navigate("/contact")}>Contact</button>
          <button onClick={() => navigate("/blog")}>Blog</button>
        </div>
      </footer>
    </div>
  );
}
