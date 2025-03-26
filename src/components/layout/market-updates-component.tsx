
import React from "react";
import { MapPin } from "lucide-react";
import { useMarketUpdates } from "@/hooks/useMarketUpdates";
import { toast } from "@/components/ui/use-toast";

export function MarketUpdates() {
  const {
    updates,
    lastUpdateTime,
    newUpdatesCount,
    selectedCurrency,
    setSelectedCurrency,
    selectedRegion,
    setSelectedRegion,
    regions,
    exchangeRates,
    isLoading
  } = useMarketUpdates();

  // Limit to 8 updates for display
  const displayUpdates = updates.slice(0, 8);
  
  const handleItemClick = () => {
    toast({
      title: "Authentication Required",
      description: "Sign in or sign up to view details",
      variant: "default"
    });
  };

  if (isLoading) {
    return (
      <div className="bg-gray-900 text-white overflow-hidden flex-1 min-h-0 p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-800 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-4 bg-gray-800 rounded-lg">
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="text-white overflow-hidden flex-1 h-full">
      <div className="h-full flex flex-col p-4 px-[10px] py-[10px]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-green-400">LIVE HOSPITALITY INDEX</h3>
          <div className="flex items-center gap-4">
            <select 
              value={selectedRegion} 
              onChange={e => setSelectedRegion(e.target.value)} 
              className="text-white text-xs rounded-md border border-gray-700 px-2 py-1 bg-zinc-800"
            >
              {regions.map(region => <option key={region} value={region}>{region}</option>)}
            </select>
            <select 
              value={selectedCurrency} 
              onChange={e => setSelectedCurrency(e.target.value)} 
              className="text-white text-xs rounded-md border border-gray-700 px-2 py-1 bg-zinc-800"
            >
              {Object.keys(exchangeRates).map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
            <span className="text-xs text-gray-300">{lastUpdateTime.toLocaleTimeString()} UTC</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto flex-1">
          {displayUpdates.length > 0 ? (
            displayUpdates.map(update => (
              <div 
                key={update.id} 
                onClick={handleItemClick} 
                className={`p-3 rounded-lg border transition-all cursor-pointer hover:opacity-90 ${update.highlight ? 'bg-purple-900/80 border-purple-700' : 'bg-zinc-800/50 border-zinc-700/50'} ${update.isNew ? 'animate-in fade-in slide-in-from-bottom-5' : ''} ${update.isUpdating ? 'animate-pulse' : ''} hover:border-zinc-600/80`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${update.type === 'URGENT' ? 'text-red-400' : update.type === 'PREMIUM' ? 'text-purple-400' : update.type === 'SWAP' ? 'text-orange-400' : 'text-green-400'}`}>
                      {update.type}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${update.urgency_level === 'high' ? 'bg-red-900/70 text-red-200' : update.urgency_level === 'medium' ? 'bg-yellow-900/70 text-yellow-200' : 'bg-green-900/70 text-green-200'}`}>
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
            ))
          ) : (
            <div className="col-span-2 text-center py-4 text-gray-400">
              No positions available in this region currently
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between text-[10px] text-gray-400 border-t border-zinc-700/50 pt-2 mt-2 py-[6px] my-[6px]">
          <span className="text-gray-400">Updated every 5 minutes</span>
          <span className="text-gray-400">{newUpdatesCount} new positions added today</span>
        </div>
      </div>
    </div>
  );
}
