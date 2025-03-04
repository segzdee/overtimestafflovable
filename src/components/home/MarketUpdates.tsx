
import React from 'react';

const MarketUpdates: React.FC = () => {
  return (
    <section className="py-2 flex-grow flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="bg-gray-900 rounded-lg shadow-md p-2 md:p-4 max-w-5xl mx-auto text-white">
          <div className="flex justify-between items-center mb-2 md:mb-3 px-2">
            <div className="flex space-x-2 items-center">
              <h2 className="text-xs font-semibold text-green-400">LIVE HOSPITALITY INDEX</h2>
              <div className="flex items-center">
                <span className="px-1 py-0.5 text-[10px] md:text-xs bg-gray-800 rounded text-white mx-1">FIL</span>
                <span className="px-1 py-0.5 text-[10px] md:text-xs bg-gray-800 rounded text-white">LON</span>
              </div>
            </div>
            <span className="text-[10px] md:text-xs text-gray-400">9:49:30 PM UTC</span>
          </div>
          
          {/* Market updates grid - Responsive and symmetrical */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
            <div className="space-y-2 md:space-y-3">
              {/* Regular shifts - Column 1 */}
              <div className="bg-gray-800 p-2 md:p-3 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] md:text-xs bg-amber-500 px-1 py-0.5 rounded text-black font-medium">SWAP</span>
                  <span className="text-[10px] md:text-xs bg-amber-500/20 px-1 py-0.5 rounded text-amber-400 font-medium">MEDIUM</span>
                  <span className="text-xs md:text-sm font-semibold text-green-400">€30/hr</span>
                </div>
                <h3 className="font-semibold text-xs md:text-sm">Bartender Evening Shift Available</h3>
                <p className="text-[10px] md:text-xs text-gray-400">Sky Bar Lounge</p>
                <p className="text-[10px] md:text-xs text-gray-500">Södermalm, Global</p>
              </div>
              
              <div className="bg-purple-900/70 p-2 md:p-3 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] md:text-xs bg-purple-500 px-1 py-0.5 rounded text-white font-medium">PREMIUM</span>
                  <span className="text-[10px] md:text-xs bg-amber-500/20 px-1 py-0.5 rounded text-amber-400 font-medium">MEDIUM</span>
                  <span className="text-xs md:text-sm font-semibold text-green-400">€38/hr</span>
                </div>
                <h3 className="font-semibold text-xs md:text-sm">F&B Manager - 5-Star Resort</h3>
                <p className="text-[10px] md:text-xs text-gray-400">Azure Beach Resort</p>
                <p className="text-[10px] md:text-xs text-gray-500">St. Julian's, Malta</p>
              </div>
              
              <div className="bg-gray-800 p-2 md:p-3 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] md:text-xs bg-amber-500 px-1 py-0.5 rounded text-black font-medium">SWAP</span>
                  <span className="text-[10px] md:text-xs bg-amber-500/20 px-1 py-0.5 rounded text-amber-400 font-medium">MEDIUM</span>
                  <span className="text-xs md:text-sm font-semibold text-green-400">€32/hr</span>
                </div>
                <h3 className="font-semibold text-xs md:text-sm">Head Bartender - Cocktail Bar</h3>
                <p className="text-[10px] md:text-xs text-gray-400">The Mixology Lab</p>
                <p className="text-[10px] md:text-xs text-gray-500">Sliema, Malta</p>
              </div>
              
              <div className="bg-gray-800 p-2 md:p-3 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] md:text-xs bg-amber-500 px-1 py-0.5 rounded text-black font-medium">SWAP</span>
                  <span className="text-[10px] md:text-xs bg-green-500/20 px-1 py-0.5 rounded text-green-400 font-medium">LOW</span>
                  <span className="text-xs md:text-sm font-semibold text-green-400">€28/hr</span>
                </div>
                <h3 className="font-semibold text-xs md:text-sm">Head Waiter - Luxury Restaurant</h3>
                <p className="text-[10px] md:text-xs text-gray-400">Signature Soirée</p>
                <p className="text-[10px] md:text-xs text-gray-500">Sliema, Italy</p>
              </div>
            </div>
            
            {/* Premium shifts - Column 2 */}
            <div className="space-y-2 md:space-y-3">
              <div className="bg-purple-900/70 p-2 md:p-3 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] md:text-xs bg-purple-500 px-1 py-0.5 rounded text-white font-medium">PREMIUM</span>
                  <span className="text-[10px] md:text-xs bg-amber-500/20 px-1 py-0.5 rounded text-amber-400 font-medium">MEDIUM</span>
                  <span className="text-xs md:text-sm font-semibold text-green-400">€38/hr</span>
                </div>
                <h3 className="font-semibold text-xs md:text-sm">F&B Manager - 5-Star Resort</h3>
                <p className="text-[10px] md:text-xs text-gray-400">Azure Beach Resort</p>
                <p className="text-[10px] md:text-xs text-gray-500">St. Julian's, Malta</p>
              </div>
              
              <div className="bg-purple-900/70 p-2 md:p-3 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] md:text-xs bg-purple-500 px-1 py-0.5 rounded text-white font-medium">PREMIUM</span>
                  <span className="text-[10px] md:text-xs bg-amber-500/20 px-1 py-0.5 rounded text-amber-400 font-medium">MEDIUM</span>
                  <span className="text-xs md:text-sm font-semibold text-green-400">€38/hr</span>
                </div>
                <h3 className="font-semibold text-xs md:text-sm">F&B Manager - 5-Star Resort</h3>
                <p className="text-[10px] md:text-xs text-gray-400">Azure Beach Resort</p>
                <p className="text-[10px] md:text-xs text-gray-500">St. Julian's, Malta</p>
              </div>
              
              <div className="bg-purple-900/70 p-2 md:p-3 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] md:text-xs bg-purple-500 px-1 py-0.5 rounded text-white font-medium">PREMIUM</span>
                  <span className="text-[10px] md:text-xs bg-amber-500/20 px-1 py-0.5 rounded text-amber-400 font-medium">MEDIUM</span>
                  <span className="text-xs md:text-sm font-semibold text-green-400">€39/hr</span>
                </div>
                <h3 className="font-semibold text-xs md:text-sm">Pastry Chef - 5-Star Hotel</h3>
                <p className="text-[10px] md:text-xs text-gray-400">Le Grand Patisserie</p>
                <p className="text-[10px] md:text-xs text-gray-500">Port Louis, Italy</p>
              </div>
              
              <div className="bg-purple-900/70 p-2 md:p-3 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] md:text-xs bg-purple-500 px-1 py-0.5 rounded text-white font-medium">PREMIUM</span>
                  <span className="text-[10px] md:text-xs bg-amber-500/20 px-1 py-0.5 rounded text-amber-400 font-medium">MEDIUM</span>
                  <span className="text-xs md:text-sm font-semibold text-green-400">€50/hr</span>
                </div>
                <h3 className="font-semibold text-xs md:text-sm">Executive Pastry Chef</h3>
                <p className="text-[10px] md:text-xs text-gray-400">Royal Dining Group</p>
                <p className="text-[10px] md:text-xs text-gray-500">Milan, Italy</p>
              </div>
            </div>
          </div>
          
          {/* Emergency & Shift Swap Index */}
          <div className="mt-2 md:mt-3">
            <div className="flex justify-between items-center px-2 mb-1 md:mb-2">
              <div className="flex space-x-2 items-center">
                <h2 className="text-[10px] md:text-xs font-semibold text-green-400">EMERGENCY & SHIFT SWAP INDEX</h2>
                <div className="px-1 py-0.5 bg-red-500/20 rounded text-red-400 text-[10px] md:text-xs font-medium">
                  2 Active
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-1 py-0.5 text-[10px] md:text-xs bg-gray-800 rounded text-white">LON</span>
                <span className="text-[10px] md:text-xs text-gray-400">9:49:30 PM UTC</span>
              </div>
            </div>
            
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-2 md:p-3">
              <div className="space-y-2 md:space-y-3">
                {/* Emergency Shift 1 */}
                <div className="border-b border-gray-700 pb-2 md:pb-3">
                  <div className="flex items-center mb-1">
                    <span className="text-[10px] md:text-xs bg-red-500 px-1 py-0.5 rounded text-white font-medium mr-2">URGENT</span>
                    <span className="text-xs md:text-sm font-semibold text-green-400 ml-auto">€40/hr</span>
                  </div>
                  <h3 className="font-semibold text-xs md:text-sm">Sous Chef - Michelin Restaurant</h3>
                  <p className="text-[10px] md:text-xs text-gray-400">Casa del Mar</p>
                  <p className="text-[10px] md:text-xs text-gray-500">Barcelona, Spain</p>
                </div>
                
                {/* Emergency Shift 2 */}
                <div>
                  <div className="flex items-center mb-1">
                    <span className="text-[10px] md:text-xs bg-amber-500 px-1 py-0.5 rounded text-black font-medium mr-2">SWAP</span>
                    <span className="text-xs md:text-sm font-semibold text-green-400 ml-auto">€35/hr</span>
                  </div>
                  <h3 className="font-semibold text-xs md:text-sm">Restaurant Manager - Urgent Cover</h3>
                  <p className="text-[10px] md:text-xs text-gray-400">El Paradiso Beach Club</p>
                  <p className="text-[10px] md:text-xs text-gray-500">Ibiza, Spain</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer stats */}
          <div className="flex justify-between items-center mt-2 md:mt-3 px-2 text-[8px] md:text-xs text-gray-400">
            <p>Updated every 5 minutes</p>
            <p>69 new positions added today</p>
            <p>Emergency updates in real-time</p>
            <p>7 active emergencies</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketUpdates;
