import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMarketUpdates } from "@/hooks/useMarketUpdates";
import { Logo } from "@/components/ui/logo";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { TrendingUp, TrendingDown, Clock } from "lucide-react";

export default function Index() {
  const { updates } = useMarketUpdates();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "OvertimeStaff - Connect with Hospitality Jobs and Staff";
    
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

  // Transform market updates with more data types
  const marketData = updates.map(update => {
    const isIncreased = Math.random() > 0.5;
    const changePercent = (Math.random() * 5 + 1).toFixed(2);
    const baseRate = parseInt(update.rate.replace(/[^0-9]/g, ''));
    const swapRate = Math.floor(Math.random() * 20) + 5;
    const urgencyLevel = Math.floor(Math.random() * 100);
    const isNew = Math.random() > 0.7;
    return {
      ...update,
      change: isIncreased ? `+${changePercent}%` : `-${changePercent}%`,
      isPositive: isIncreased,
      volume: Math.floor(Math.random() * 100) + 20,
      baseRate,
      swapRate,
      urgencyLevel,
      isNew,
      rateHistory: [
        baseRate * 0.95,
        baseRate * 0.98,
        baseRate,
        baseRate * 1.02,
        baseRate * 1.05
      ].map(rate => Math.round(rate))
    };
  });

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-brand-50 via-white to-brand-50 flex flex-col">
      <section className="relative px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 text-center bg-gradient-to-r from-purple-50 via-white to-blue-50 flex-none">
        <Logo />
        <h1 className="mt-4 text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent">
          The Future of Hospitality Staffing
        </h1>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg leading-7 text-gray-600 max-w-2xl mx-auto">
          Connect with the perfect staff or shifts in real-time. Powered by AI for smarter matches.
        </p>
        <div className="mt-6 sm:mt-8 flex items-center justify-center gap-x-4">
          <Button onClick={() => navigate("/register")} size="lg" 
            className="bg-gradient-to-r from-brand-500 to-purple-500 hover:from-brand-600 hover:to-purple-600">
            Get Started
          </Button>
          <Button variant="outline" onClick={() => navigate("/find-shifts")} size="lg">
            Browse Shifts
          </Button>
        </div>
      </section>

      <section className="py-6 sm:py-8 bg-gradient-to-br from-white via-gray-50 to-white flex-none">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent">
            Choose Your Path
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {userTypes.map((type) => (
              <Card key={type.title} 
                className="relative overflow-hidden hover:shadow-xl transition-shadow">
                <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-10`} />
                <div className="relative p-4">
                  <h3 className="text-lg font-semibold mb-2">{type.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{type.description}</p>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate(type.path)}
                    className="w-full bg-gradient-to-r from-brand-50 to-purple-50 hover:from-brand-100 hover:to-purple-100"
                  >
                    Join as {type.title}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Stock Market Style Section */}
      <section className="flex-1 bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
              Live Hospitality Market
            </h2>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-400">Live Updates</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {marketData.map((item) => (
              <Card key={item.id} 
                className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:bg-gray-800/70 transition-all">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-200">{item.title}</h3>
                        {item.isNew && (
                          <span className="px-1.5 py-0.5 text-xs font-medium bg-purple-500/20 text-purple-300 rounded">
                            NEW
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">{item.location}</p>
                    </div>
                    <span className={`flex items-center gap-1 text-sm ${
                      item.isPositive ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {item.isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      {item.change}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-2xl font-bold text-gray-100">${item.baseRate}</span>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-gray-400">Volume</span>
                      <span className="text-sm font-medium text-gray-300">{item.volume} shifts</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                    <div className="bg-gray-700/30 rounded p-2">
                      <span className="text-gray-400">Swap Rate</span>
                      <div className="text-blue-300 font-medium mt-1">
                        {item.swapRate} swaps/hr
                      </div>
                    </div>
                    <div className="bg-gray-700/30 rounded p-2">
                      <span className="text-gray-400">Urgency</span>
                      <div className={`font-medium mt-1 ${
                        item.urgencyLevel > 70 ? 'text-red-300' :
                        item.urgencyLevel > 30 ? 'text-yellow-300' :
                        'text-green-300'
                      }`}>
                        {item.urgencyLevel}%
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>Rate History (24h)</span>
                      <span className="text-gray-300">${item.rateHistory[item.rateHistory.length - 1]}</span>
                    </div>
                    <div className="flex items-end justify-between h-8 mt-2 gap-1">
                      {item.rateHistory.map((rate, idx) => (
                        <div
                          key={idx}
                          className={`w-full rounded-sm ${
                            rate > item.baseRate ? 'bg-green-500/30' : 'bg-red-500/30'
                          }`}
                          style={{
                            height: `${(rate / Math.max(...item.rateHistory)) * 100}%`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Original Footer */}
      <footer className="py-3 bg-gradient-to-r from-gray-50 via-white to-gray-50 border-t border-gray-100 flex-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <p>© 2024 OvertimeStaff</p>
            <div className="flex gap-4">
              <button onClick={() => navigate("/privacy")} className="hover:text-brand-600 transition-colors">Privacy</button>
              <button onClick={() => navigate("/terms")} className="hover:text-brand-600 transition-colors">Terms</button>
              <button onClick={() => navigate("/contact")} className="hover:text-brand-600 transition-colors">Contact</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
