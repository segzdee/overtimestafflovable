
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const MarketUpdates: React.FC = () => {
  const [showLoginDialog, setShowLoginDialog] = React.useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    setShowLoginDialog(true);
  };

  const handleLogin = () => {
    navigate('/auth/login');
    setShowLoginDialog(false);
  };

  const handleSignUp = () => {
    navigate('/auth/register');
    setShowLoginDialog(false);
  };

  const viewFullMarket = () => {
    navigate('/market');
  };

  return (
    <section className="py-4 md:py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
            Live Hospitality Market
          </h2>
          <Button 
            variant="outline" 
            onClick={viewFullMarket} 
            className="text-sm"
          >
            View Full Market
          </Button>
        </div>
        
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-xl p-4 md:p-6 max-w-6xl mx-auto text-white overflow-hidden border border-gray-700">
          <div className="flex justify-between items-center mb-4 px-2">
            <div className="flex space-x-3 items-center">
              <h3 className="text-sm font-bold text-green-400 tracking-wider">LIVE HOSPITALITY INDEX</h3>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 text-xs bg-gray-700 rounded-md text-white">FIL</span>
                <span className="px-2 py-1 text-xs bg-gray-700 rounded-md text-white">LON</span>
              </div>
            </div>
            <span className="text-xs text-white">9:49:30 PM UTC</span>
          </div>
          
          {/* Market updates grid - Responsive and symmetrical */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div className="space-y-3 md:space-y-4">
              {/* Regular shifts - Column 1 */}
              <div 
                className="bg-gray-800/80 p-3 md:p-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 border border-gray-700/50 cursor-pointer transform hover:scale-[1.01] transition-transform"
                onClick={handleCardClick}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs bg-amber-500 px-2 py-1 rounded-md text-gray-900 font-medium">SWAP</span>
                  <span className="text-xs bg-amber-500/20 px-2 py-1 rounded-md text-amber-300 font-medium">MEDIUM</span>
                  <span className="text-sm font-bold text-green-400">€30/hr</span>
                </div>
                <h3 className="font-semibold text-sm md:text-base text-white mb-1">Bartender Evening Shift Available</h3>
                <p className="text-xs text-gray-300">Sky Bar Lounge</p>
                <p className="text-xs text-white">Södermalm, Global</p>
              </div>
              
              <div 
                className="bg-purple-900/80 p-3 md:p-4 rounded-lg hover:bg-purple-900 transition-colors duration-200 border border-purple-800/50 cursor-pointer transform hover:scale-[1.01] transition-transform"
                onClick={handleCardClick}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs bg-purple-500 px-2 py-1 rounded-md text-white font-medium">PREMIUM</span>
                  <span className="text-xs bg-amber-500/20 px-2 py-1 rounded-md text-amber-300 font-medium">MEDIUM</span>
                  <span className="text-sm font-bold text-green-400">€38/hr</span>
                </div>
                <h3 className="font-semibold text-sm md:text-base text-white mb-1">F&B Manager - 5-Star Resort</h3>
                <p className="text-xs text-gray-300">Azure Beach Resort</p>
                <p className="text-xs text-white">St. Julian's, Malta</p>
              </div>
            </div>
            
            {/* Premium shifts - Column 2 */}
            <div className="space-y-3 md:space-y-4">
              <div 
                className="bg-purple-900/80 p-3 md:p-4 rounded-lg hover:bg-purple-900 transition-colors duration-200 border border-purple-800/50 cursor-pointer transform hover:scale-[1.01] transition-transform"
                onClick={handleCardClick}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs bg-purple-500 px-2 py-1 rounded-md text-white font-medium">PREMIUM</span>
                  <span className="text-xs bg-amber-500/20 px-2 py-1 rounded-md text-amber-300 font-medium">MEDIUM</span>
                  <span className="text-sm font-bold text-green-400">€38/hr</span>
                </div>
                <h3 className="font-semibold text-sm md:text-base text-white mb-1">F&B Manager - 5-Star Resort</h3>
                <p className="text-xs text-gray-300">Azure Beach Resort</p>
                <p className="text-xs text-white">St. Julian's, Malta</p>
              </div>
              
              <div 
                className="bg-gray-800/80 p-3 md:p-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 border border-gray-700/50 cursor-pointer transform hover:scale-[1.01] transition-transform"
                onClick={handleCardClick}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs bg-red-500 px-2 py-1 rounded-md text-white font-medium">URGENT</span>
                  <span className="text-xs bg-red-500/20 px-2 py-1 rounded-md text-red-300 font-medium">HIGH</span>
                  <span className="text-sm font-bold text-green-400">€40/hr</span>
                </div>
                <h3 className="font-semibold text-sm md:text-base text-white mb-1">Sous Chef - Michelin Restaurant</h3>
                <p className="text-xs text-gray-300">Casa del Mar</p>
                <p className="text-xs text-white">Barcelona, Spain</p>
              </div>
            </div>
          </div>
          
          {/* Footer stats */}
          <div className="flex flex-wrap justify-between items-center mt-4 px-2 text-xs text-gray-400">
            <p className="text-white">Updated 5 minutes ago</p>
            <p className="text-white">69 new positions added today</p>
            <Button
              variant="link"
              size="sm"
              onClick={viewFullMarket}
              className="text-green-400 hover:text-green-300 p-0"
            >
              View all positions →
            </Button>
          </div>
        </div>
      </div>

      {/* Login/Signup Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Access Required</DialogTitle>
            <DialogDescription>
              Please sign in or create an account to view full details and apply for this position.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p className="text-sm text-gray-600">
              Join thousands of hospitality professionals accessing premium job opportunities and shifts.
            </p>
          </div>
          <DialogFooter className="sm:justify-center gap-2 sm:gap-3">
            <Button variant="outline" onClick={handleLogin}>
              Login
            </Button>
            <Button onClick={handleSignUp} className="bg-purple-600 hover:bg-purple-700 text-white">
              Create Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default MarketUpdates;
