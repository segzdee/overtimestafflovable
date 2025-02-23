import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMarketUpdates } from "@/hooks/useMarketUpdates";
import { Logo } from "@/components/ui/logo";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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

      <section className="py-6 bg-gradient-to-br from-gray-50 via-white to-gray-50 flex-1 flex flex-col">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent">
            Live Market Updates
          </h2>
          <div className="flex-1 flex flex-col justify-center gap-4">
            <div className="relative h-[90px] overflow-hidden rounded-lg bg-gradient-to-r from-red-100 via-rose-50 to-red-100 border border-red-200 shadow-inner">
              <div className="absolute inset-y-0 flex space-x-4 animate-marquee items-center px-4">
                {updates.filter(update => update.type === 'URGENT').map((update) => (
                  <Card key={update.id} 
                    className="w-[250px] p-4 bg-gradient-to-br from-white to-red-50 border-l-4 border-red-500 
                             hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                          URGENT
                        </span>
                        <h3 className="mt-2 font-semibold text-gray-900 text-sm">{update.title}</h3>
                        <p className="mt-1 text-gray-500 text-xs">{update.location}</p>
                      </div>
                      <span className="text-base font-semibold text-red-600">{update.rate}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="relative h-[90px] overflow-hidden rounded-lg bg-gradient-to-r from-blue-100 via-sky-50 to-blue-100 border border-blue-200 shadow-inner">
              <div className="absolute inset-y-0 flex space-x-4 animate-marquee-reverse items-center px-4">
                {updates.filter(update => update.type === 'SWAP').map((update) => (
                  <Card key={update.id} 
                    className="w-[250px] p-4 bg-gradient-to-br from-white to-blue-50 border-l-4 border-blue-500 
                             hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                          SWAP
                        </span>
                        <h3 className="mt-2 font-semibold text-gray-900 text-sm">{update.title}</h3>
                        <p className="mt-1 text-gray-500 text-xs">{update.location}</p>
                      </div>
                      <span className="text-base font-semibold text-blue-600">{update.rate}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="relative h-[90px] overflow-hidden rounded-lg bg-gradient-to-r from-emerald-100 via-green-50 to-emerald-100 border border-green-200 shadow-inner">
              <div className="absolute inset-y-0 flex space-x-4 animate-marquee items-center px-4">
                {updates.filter(update => update.type === 'PREMIUM').map((update) => (
                  <Card key={update.id} 
                    className="w-[250px] p-4 bg-gradient-to-br from-white to-green-50 border-l-4 border-green-500 
                             hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                          PREMIUM
                        </span>
                        <h3 className="mt-2 font-semibold text-gray-900 text-sm">{update.title}</h3>
                        <p className="mt-1 text-gray-500 text-xs">{update.location}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-semibold text-green-600">{update.rate}</span>
                        <div className="text-xs text-green-600 font-medium animate-bounce">
                          Rate Increased!
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-3 bg-gradient-to-r from-gray-50 via-white to-gray-50 border-t border-gray-100 flex-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <p>© 2024 OvertimeStaff</p>
            <div className="flex gap-4">
              <button onClick={() => navigate("/privacy")} className="hover:text-brand-600">Privacy</button>
              <button onClick={() => navigate("/terms")} className="hover:text-brand-600">Terms</button>
              <button onClick={() => navigate("/contact")} className="hover:text-brand-600">Contact</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
