
import { MapPin } from "lucide-react";
import { useMarketUpdates } from "@/hooks/useMarketUpdates";

export const MarketUpdates = () => {
  const { 
    updates, 
    lastUpdateTime, 
    newUpdatesCount, 
    selectedCurrency, 
    setSelectedCurrency, 
    exchangeRates 
  } = useMarketUpdates();

  return (
    <div className="bg-gray-900 text-white rounded-xl shadow-xl overflow-hidden flex-1 min-h-0">
      <div className="h-full flex flex-col p-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-gray-400">LIVE HOSPITALITY INDEX</h3>
          <div className="flex items-center gap-4">
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="bg-gray-800 text-white text-xs rounded-md border border-gray-700 px-2 py-1"
            >
              {Object.keys(exchangeRates).map((currency) => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
            <span className="text-xs text-gray-400">{lastUpdateTime.toLocaleTimeString()} UTC</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 overflow-y-auto flex-1">
          {updates.map((update) => (
            <div
              key={update.id}
              className={`p-3 rounded-lg border transition-all ${
                update.highlight ? 'bg-purple-900 border-purple-700' : 'bg-gray-800 border-gray-700'
              } ${update.isNew ? 'animate-in fade-in slide-in-from-bottom-5' : ''} ${
                update.isUpdating ? 'animate-pulse' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold ${
                    update.type === 'URGENT' ? 'text-red-400' :
                    update.type === 'PREMIUM' ? 'text-purple-400' :
                    update.type === 'SWAP' ? 'text-orange-400' :
                    'text-green-400'
                  }`}>
                    {update.type}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    update.urgency_level === 'high' ? 'bg-red-900 text-red-200' :
                    update.urgency_level === 'medium' ? 'bg-yellow-900 text-yellow-200' :
                    'bg-green-900 text-green-200'
                  }`}>
                    {update.urgency_level.toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-bold text-green-400">{update.rate}</span>
              </div>
              <div className="text-xs font-medium">{update.title}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">{update.location}</div>
              <div className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5" />
                {update.region}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-[10px] text-gray-400 border-t border-gray-800 pt-2 mt-2">
          <span>Updated every 5 minutes</span>
          <span>{newUpdatesCount} new positions added today</span>
        </div>
      </div>
    </div>
  );
};
