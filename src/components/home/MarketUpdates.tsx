
import React from 'react';

const MarketUpdates: React.FC = () => {
  return (
    <section className="py-6 md:py-8 lg:py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-4 md:mb-6 text-center">
          Live Hospitality Market
        </h2>
        
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
              <div className="bg-gray-800/80 p-3 md:p-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 border border-gray-700/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs bg-amber-500 px-2 py-1 rounded-md text-gray-900 font-medium">SWAP</span>
                  <span className="text-xs bg-amber-500/20 px-2 py-1 rounded-md text-amber-300 font-medium">MEDIUM</span>
                  <span className="text-sm font-bold text-green-400">€30/hr</span>
                </div>
                <h3 className="font-semibold text-sm md:text-base text-white mb-1">Bartender Evening Shift Available</h3>
                <p className="text-xs text-gray-300">Sky Bar Lounge</p>
                <p className="text-xs text-white">Södermalm, Global</p>
              </div>
              
              <div className="bg-purple-900/80 p-3 md:p-4 rounded-lg hover:bg-purple-900 transition-colors duration-200 border border-purple-800/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs bg-purple-500 px-2 py-1 rounded-md text-white font-medium">PREMIUM</span>
                  <span className="text-xs bg-amber-500/20 px-2 py-1 rounded-md text-amber-300 font-medium">MEDIUM</span>
                  <span className="text-sm font-bold text-green-400">€38/hr</span>
                </div>
                <h3 className="font-semibold text-sm md:text-base text-white mb-1">F&B Manager - 5-Star Resort</h3>
                <p className="text-xs text-gray-300">Azure Beach Resort</p>
                <p className="text-xs text-white">St. Julian's, Malta</p>
              </div>
              
              <div className="bg-gray-800/80 p-3 md:p-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 border border-gray-700/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs bg-amber-500 px-2 py-1 rounded-md text-gray-900 font-medium">SWAP</span>
                  <span className="text-xs bg-amber-500/20 px-2 py-1 rounded-md text-amber-300 font-medium">MEDIUM</span>
                  <span className="text-sm font-bold text-green-400">€32/hr</span>
                </div>
                <h3 className="font-semibold text-sm md:text-base text-white mb-1">Head Bartender - Cocktail Bar</h3>
                <p className="text-xs text-gray-300">The Mixology Lab</p>
                <p className="text-xs text-white">Sliema, Malta</p>
              </div>
            </div>
            
            {/* Premium shifts - Column 2 */}
            <div className="space-y-3 md:space-y-4">
              <div className="bg-purple-900/80 p-3 md:p-4 rounded-lg hover:bg-purple-900 transition-colors duration-200 border border-purple-800/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs bg-purple-500 px-2 py-1 rounded-md text-white font-medium">PREMIUM</span>
                  <span className="text-xs bg-amber-500/20 px-2 py-1 rounded-md text-amber-300 font-medium">MEDIUM</span>
                  <span className="text-sm font-bold text-green-400">€38/hr</span>
                </div>
                <h3 className="font-semibold text-sm md:text-base text-white mb-1">F&B Manager - 5-Star Resort</h3>
                <p className="text-xs text-gray-300">Azure Beach Resort</p>
                <p className="text-xs text-white">St. Julian's, Malta</p>
              </div>
              
              <div className="bg-purple-900/80 p-3 md:p-4 rounded-lg hover:bg-purple-900 transition-colors duration-200 border border-purple-800/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs bg-purple-500 px-2 py-1 rounded-md text-white font-medium">PREMIUM</span>
                  <span className="text-xs bg-green-500/20 px-2 py-1 rounded-md text-green-300 font-medium">LOW</span>
                  <span className="text-sm font-bold text-green-400">€39/hr</span>
                </div>
                <h3 className="font-semibold text-sm md:text-base text-white mb-1">Pastry Chef - 5-Star Hotel</h3>
                <p className="text-xs text-gray-300">Le Grand Patisserie</p>
                <p className="text-xs text-white">Port Louis, Italy</p>
              </div>
              
              <div className="bg-purple-900/80 p-3 md:p-4 rounded-lg hover:bg-purple-900 transition-colors duration-200 border border-purple-800/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs bg-purple-500 px-2 py-1 rounded-md text-white font-medium">PREMIUM</span>
                  <span className="text-xs bg-red-500/20 px-2 py-1 rounded-md text-red-300 font-medium">HIGH</span>
                  <span className="text-sm font-bold text-green-400">€50/hr</span>
                </div>
                <h3 className="font-semibold text-sm md:text-base text-white mb-1">Executive Pastry Chef</h3>
                <p className="text-xs text-gray-300">Royal Dining Group</p>
                <p className="text-xs text-white">Milan, Italy</p>
              </div>
            </div>
          </div>
          
          {/* Emergency & Shift Swap Index */}
          <div className="mt-4 md:mt-5">
            <div className="flex justify-between items-center px-2 mb-3">
              <div className="flex items-center gap-3">
                <h3 className="text-xs font-bold text-red-400 tracking-wider">EMERGENCY SHIFT INDEX</h3>
                <div className="px-2 py-1 bg-red-500/20 rounded-md text-red-300 text-xs font-medium">
                  2 Active
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 text-xs bg-gray-700 rounded-md text-white">LON</span>
                <span className="text-xs text-gray-300">9:49:30 PM UTC</span>
              </div>
            </div>
            
            <div className="bg-gray-800/80 border border-gray-700 rounded-lg p-4">
              <div className="space-y-4">
                {/* Emergency Shift 1 */}
                <div className="border-b border-gray-700 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs bg-red-500 px-2 py-1 rounded-md text-white font-medium">URGENT</span>
                    <span className="text-sm font-bold text-green-400">€40/hr</span>
                  </div>
                  <h3 className="font-semibold text-sm md:text-base text-white mb-1">Sous Chef - Michelin Restaurant</h3>
                  <p className="text-xs text-gray-300">Casa del Mar</p>
                  <p className="text-xs text-white">Barcelona, Spain</p>
                </div>
                
                {/* Emergency Shift 2 */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs bg-amber-500 px-2 py-1 rounded-md text-gray-900 font-medium">SWAP</span>
                    <span className="text-sm font-bold text-green-400">€35/hr</span>
                  </div>
                  <h3 className="font-semibold text-sm md:text-base text-white mb-1">Restaurant Manager - Urgent Cover</h3>
                  <p className="text-xs text-gray-300">El Paradiso Beach Club</p>
                  <p className="text-xs text-white">Ibiza, Spain</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer stats */}
          <div className="flex flex-wrap justify-between items-center mt-4 px-2 text-xs text-gray-400">
            <p className="text-white">Updated 5 minutes ago</p>
            <p className="text-white">69 new positions added today</p>
            <p className="text-white">Emergency tracking in real-time</p>
            <p className="text-white">7 active emergencies</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketUpdates;
