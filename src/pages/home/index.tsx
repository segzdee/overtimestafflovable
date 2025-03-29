import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from 'lucide-react';
import { AccountTypeCard } from '@/components/home/AccountTypeCard';
import { FeatureCard } from '@/components/home/FeatureCard';
import { ShiftCard } from '@/components/market/ShiftCard';
import { useAuth } from '@/contexts/auth/AuthContext';

// Define TypeScript interfaces
interface Shift {
  id: string;
  title: string;
  location: string;
  city: string;
  country: string;
  hourlyRate: number;
  rateLabel: string;
  priority: 'SWAP' | 'PREMIUM' | 'URGENT';
  experience: 'LOW' | 'MEDIUM' | 'HIGH';
}

// Mock shift data for the live market preview
const marketShifts: Shift[] = [
  {
    id: '1',
    title: 'Bartender Evening Shift Available',
    location: 'Sky Bar Lounge',
    city: 'Sodermalm',
    country: 'Global',
    hourlyRate: 30,
    rateLabel: '€30/hr',
    priority: 'SWAP',
    experience: 'MEDIUM',
  },
  {
    id: '2',
    title: 'F&B Manager - 5-Star Resort',
    location: 'Azure Beach Resort',
    city: 'St. Julian\'s',
    country: 'Malta',
    hourlyRate: 38,
    rateLabel: '€38/hr',
    priority: 'PREMIUM',
    experience: 'MEDIUM',
  },
  {
    id: '3',
    title: 'Guest Services Specialist',
    location: 'Grand Hotel Plaza',
    city: 'Rome',
    country: 'Italy',
    hourlyRate: 28,
    rateLabel: '€28/hr',
    priority: 'PREMIUM',
    experience: 'MEDIUM',
  },
  {
    id: '4',
    title: 'Sous Chef - Michelin Restaurant',
    location: 'Casa del Mar',
    city: 'Barcelona',
    country: 'Spain',
    hourlyRate: 40,
    rateLabel: '€40/hr',
    priority: 'URGENT',
    experience: 'HIGH',
  },
];

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [visibleShifts, setVisibleShifts] = useState<Shift[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Format the time for display
  const formattedTime = useMemo(() => {
    return currentTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'UTC'
    }) + ' UTC';
  }, [currentTime]);
  
  // Update current time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Simulate live market data loading
  useEffect(() => {
    // For demo purposes, just show all shifts, but in a real app
    // this would fetch from an API with proper pagination
    setVisibleShifts(marketShifts);
  }, []);

  // Handle shift application with authentication check
  const handleApplyForShift = (shiftId: string) => {
    if (!isAuthenticated) {
      // Redirect to login with return URL if not authenticated
      navigate('/login', { 
        state: { 
          redirectAfterLogin: `/shifts/${shiftId}/apply`,
          message: 'Please log in to apply for shifts'
        } 
      });
      return;
    }
    
    // Navigate to shift application page if authenticated
    navigate(`/shifts/${shiftId}/apply`);
  };

  // Section navigation handlers
  const handleSignUpClick = () => {
    navigate("/register");
  };

  const handleExploreShiftsClick = () => {
    navigate("/live-market");
  };

  const handleFindShiftsClick = () => {
    navigate("/live-market");
  };

  const handleFindStaffClick = () => {
    navigate("/find-staff");
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-12 md:py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">
            AI Meets Hospitality
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            Extra Staff, Anytime, Anywhere
          </h2>
          <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            Got extra time? Need extra shifts? No dinner staff coverage? Plan canceled? The OVERTIMESTAFF Platform connects 
            people with spare time to hospitality companies and agencies using smart AI integration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              onClick={handleSignUpClick}
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-8"
            >
              Sign Up Free
            </Button>
            <Button 
              onClick={handleExploreShiftsClick}
              variant="outline" 
              size="lg"
              className="border-purple-600 text-purple-700 hover:text-purple-800 font-medium"
            >
              Explore Available Shifts
            </Button>
          </div>
        </div>
      </section>

      {/* Account Types Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">Choose Your Account Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <AccountTypeCard 
              title="Staffing Agency"
              description="Manage Multiple Venues and Staff"
              icon="agency"
              buttonText="LOGIN"
              buttonColor="green"
              onClick={() => navigate("/login?type=agency")}
            />
            <AccountTypeCard 
              title="Hotels & Businesses"
              description="Post shifts and hire Extra Staff"
              icon="business"
              buttonText="LOGIN"
              buttonColor="blue"
              onClick={() => navigate("/login?type=business")}
            />
            <AccountTypeCard 
              title="Shift Workers"
              description="Clock-In for Extra Shifts"
              icon="worker"
              buttonText="LOGIN"
              buttonColor="purple"
              onClick={() => navigate("/login?type=worker")}
            />
            <AccountTypeCard 
              title="AI Agent"
              description="Automate Your Operations"
              subtitle={<>
                <div className="text-sm mt-1">✓ Automated Scheduling</div>
                <div className="text-sm">✓ Smart Recommendations</div>
              </>}
              icon="ai"
              badge="$10/mo"
              buttonText="SUBSCRIBE"
              buttonColor="purple"
              highlight={true}
              onClick={() => navigate("/subscribe/ai-agent")}
            />
          </div>
        </div>
      </section>

      {/* Live Market Preview Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Live Hospitality Market</h2>
            <Button 
              variant="outline" 
              onClick={() => navigate('/live-market')}
            >
              View Full Market
            </Button>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 shadow-lg mb-16">
            <div className="flex justify-between items-center mb-4">
              <div className="text-green-400 font-semibold uppercase text-sm tracking-wider">
                LIVE HOSPITALITY INDEX
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
                >
                  FIL
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
                >
                  LON
                </Button>
                <div className="text-white text-sm ml-4">
                  {formattedTime}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visibleShifts.map((shift) => (
                <ShiftCard 
                  key={shift.id}
                  shift={shift}
                  onApply={() => handleApplyForShift(shift.id)}
                  isAuthenticated={isAuthenticated}
                />
              ))}
            </div>

            <div className="flex justify-between items-center mt-6 text-sm">
              <div className="text-gray-400">Updated 5 minutes ago</div>
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">69 new positions added today</span>
                <Button 
                  variant="link" 
                  className="text-green-400 p-0 hover:text-green-300"
                  onClick={() => navigate('/live-market')}
                >
                  View all positions →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">How OVERTIMESTAFF Works</h2>
          <p className="text-center text-gray-700 max-w-3xl mx-auto mb-12">
            Our AI-powered platform streamlines hospitality staffing, matching the right talent with the 
            right opportunities in real-time.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <FeatureCard 
              title="Instant Staff Matching"
              description="Our AI algorithms match qualified staff with open positions based on skills, experience, location, and availability—all in real-time."
              icon="matching"
              color="purple"
            />
            <FeatureCard 
              title="Emergency Coverage"
              description="Handle last-minute staff shortages or emergencies with our priority matching system that fills critical positions within minutes."
              icon="emergency"
              color="orange"
            />
            <FeatureCard 
              title="Verified Professionals"
              description="All staff members are pre-screened, verified, and rated, ensuring that you always get qualified professionals for your establishment."
              icon="verified"
              color="purple"
            />
            <FeatureCard 
              title="Flexible Scheduling"
              description="Workers can set their availability and preferences, making it easy to pick up extra shifts that fit their schedule."
              icon="schedule"
              color="blue"
            />
          </div>

          <div className="text-center">
            <Button 
              onClick={() => navigate("/about-platform")}
              className="bg-purple-600 hover:bg-purple-700 text-white"
              size="lg"
            ></Button>
              Learn more about our platform <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}