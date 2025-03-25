
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MarketHeader from './market/MarketHeader';
import MarketGrid from './market/MarketGrid';
import MarketFooter from './market/MarketFooter';
import LoginDialog from './market/LoginDialog';

const MarketUpdates: React.FC = () => {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
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

  // Sample market data for the homepage
  const marketCards = [
    {
      type: 'SWAP',
      urgency: 'MEDIUM',
      rate: '€30/hr',
      title: 'Bartender Evening Shift Available',
      location: 'Sky Bar Lounge',
      area: 'Södermalm, Global',
      highlight: false
    },
    {
      type: 'PREMIUM',
      urgency: 'MEDIUM',
      rate: '€38/hr',
      title: 'F&B Manager - 5-Star Resort',
      location: 'Azure Beach Resort',
      area: 'St. Julian\'s, Malta',
      highlight: true
    },
    {
      type: 'PREMIUM',
      urgency: 'MEDIUM',
      rate: '€38/hr',
      title: 'F&B Manager - 5-Star Resort',
      location: 'Azure Beach Resort',
      area: 'St. Julian\'s, Malta',
      highlight: true
    },
    {
      type: 'URGENT',
      urgency: 'HIGH',
      rate: '€40/hr',
      title: 'Sous Chef - Michelin Restaurant',
      location: 'Casa del Mar',
      area: 'Barcelona, Spain',
      highlight: false
    }
  ];

  return (
    <section className="py-4 md:py-6">
      <div className="container mx-auto px-4">
        <MarketHeader 
          title="Live Hospitality Market" 
          onViewFullMarket={viewFullMarket} 
        />
        
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
          
          <MarketGrid 
            cards={marketCards} 
            onCardClick={handleCardClick} 
          />
          
          <MarketFooter 
            lastUpdated="Updated 5 minutes ago" 
            newPositionsCount={69}
            onViewAll={viewFullMarket} 
          />
        </div>
      </div>

      <LoginDialog 
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        onLogin={handleLogin}
        onSignUp={handleSignUp}
      />
    </section>
  );
};

export default MarketUpdates;
