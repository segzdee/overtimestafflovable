
import React from 'react';

const MarketUpdates: React.FC = () => {
  return (
    <section className="py-8 flex-grow">
      <div className="container mx-auto px-4">
        <div className="bg-gray-900 rounded-lg shadow-md p-4 max-w-5xl mx-auto text-white">
          {/* Header section */}
          <div className="flex justify-between items-center mb-4 px-2 pb-2 border-b border-gray-800">
            <h2 className="text-sm font-semibold">LIVE HOSPITALITY INDEX</h2>
            <span className="text-xs text-zinc-50">9:49:30 PM UTC</span>
          </div>
          
          {/* Market updates grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Column 1 */}
            <div className="space-y-3">
              <div className="bg-gray-800/50 p-3 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs bg-amber-500 px-2 py-0.5 rounded text-black font-medium">SWAP</span>
                  <span className="text-xs bg-amber-500/20 px-2 py-0.5 rounded text-amber-400 font-medium">MEDIUM</span>
                  <span className="text-sm font-semibold text-green-400">€30/hr</span>
                </div>
                <h3 className="font-semibold text-sm">Bartender Evening Shift Available</h3>
                <p className="text-xs text-gray-300">Sky Bar Lounge</p>
                <p className="text-xs">Södermalm, Global</p>
              </div>
              
              <div className="bg-gray-800/50 p-3 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs bg-amber-500 px-2 py-0.5 rounded text-black font-medium">SWAP</span>
                  <span className="text-xs bg-amber-500/20 px-2 py-0.5 rounded text-amber-400 font-medium">MEDIUM</span>
                  <span className="text-sm font-semibold text-green-400">€32/hr</span>
                </div>
                <h3 className="font-semibold text-sm">Head Bartender - Cocktail Bar</h3>
                <p className="text-xs text-gray-300">Venusto Mixologia</p>
                <p className="text-xs">Sienna, Italy</p>
              </div>
              
              <div className="bg-gray-800/50 p-3 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs bg-amber-500 px-2 py-0.5 rounded text-black font-medium">SWAP</span>
                  <span className="text-xs bg-green-500/20 px-2 py-0.5 rounded text-green-400 font-medium">LOW</span>
                  <span className="text-sm font-semibold text-green-400">€28/hr</span>
                </div>
                <h3 className="font-semibold text-sm">Head Waiter - Luxury Restaurant</h3>
                <p className="text-xs text-gray-300">Signature Sauce</p>
                <p className="text-xs">Sienna, Italy</p>
              </div>
            </div>
            
            {/* Column 2 */}
            <div className="space-y-3">
              <div className="bg-purple-900/30 p-3 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs bg-purple-500 px-2 py-0.5 rounded text-white font-medium">PREMIUM</span>
                  <span className="text-xs bg-amber-500/20 px-2 py-0.5 rounded text-amber-400 font-medium">MEDIUM</span>
                  <span className="text-sm font-semibold text-green-400">€38/hr</span>
                </div>
                <h3 className="font-semibold text-sm">F&B Manager - 5-Star Resort</h3>
                <p className="text-xs text-gray-300">Azure Beach Resort</p>
                <p className="text-xs">St. Julian's, Malta</p>
              </div>
              
              <div className="bg-purple-900/30 p-3 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs bg-purple-500 px-2 py-0.5 rounded text-white font-medium">PREMIUM</span>
                  <span className="text-xs bg-amber-500/20 px-2 py-0.5 rounded text-amber-400 font-medium">MEDIUM</span>
                  <span className="text-sm font-semibold text-green-400">€39/hr</span>
                </div>
                <h3 className="font-semibold text-sm">Pastry Chef - 5-Star Hotel</h3>
                <p className="text-xs text-gray-300">Grand Epicurean</p>
                <p className="text-xs">Port Louis, Italy</p>
              </div>
              
              <div className="bg-purple-900/30 p-3 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs bg-purple-500 px-2 py-0.5 rounded text-white font-medium">PREMIUM</span>
                  <span className="text-xs bg-amber-500/20 px-2 py-0.5 rounded text-amber-400 font-medium">MEDIUM</span>
                  <span className="text-sm font-semibold text-green-400">€50/hr</span>
                </div>
                <h3 className="font-semibold text-sm">Executive Pastry Chef</h3>
                <p className="text-xs text-gray-300">Royal Dining Group</p>
                <p className="text-xs">Milan, Italy</p>
              </div>
            </div>
          </div>
          
          {/* Emergency & Shift Swap Index */}
          <div className="mt-4">
            <div className="flex justify-between items-center px-2 mb-2 pb-1 border-b border-red-900/30">
              <h2 className="text-xs font-semibold text-red-400">EMERGENCY & SHIFT SWAP INDEX</h2>
              <div className="px-2 py-0.5 bg-red-500/20 rounded text-red-400 text-xs font-medium">
                2 Active
              </div>
            </div>
            
            <div className="bg-red-900/10 border border-red-900/30 rounded-lg p-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Emergency Shift 1 */}
                <div className="bg-gray-800/50 p-3 rounded-md">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs bg-red-500 px-2 py-0.5 rounded text-white font-medium">URGENT</span>
                    <span className="text-sm font-semibold text-green-400">€40/hr</span>
                  </div>
                  <h3 className="font-semibold text-sm">Sous Chef - Michelin Restaurant</h3>
                  <p className="text-xs text-gray-300">Casa del Mar</p>
                  <p className="text-xs">Barcelona, Spain</p>
                </div>
                
                {/* Emergency Shift 2 */}
                <div className="bg-gray-800/50 p-3 rounded-md">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs bg-amber-500 px-2 py-0.5 rounded text-black font-medium">SWAP</span>
                    <span className="text-sm font-semibold text-green-400">€35/hr</span>
                  </div>
                  <h3 className="font-semibold text-sm">Restaurant Manager - Urgent Cover</h3>
                  <p className="text-xs text-gray-300">El Paradiso Beach Club</p>
                  <p className="text-xs">Ibiza, Spain</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer stats */}
          <div className="flex justify-between items-center mt-4 px-2 text-xs text-gray-400">
            <div>Updated: 5 minutes</div>
            <div>69 new positions added</div>
            <div>Emergency in real-time</div>
            <div>7 active emergencies</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketUpdates;
