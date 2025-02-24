
import { MapPin, AlertCircle, SwapHorizontal } from "lucide-react";
import { useMarketUpdates } from "@/hooks/useMarketUpdates";

export function EmergencyShiftIndex() {
  const {
    updates,
    lastUpdateTime,
    newUpdatesCount,
    selectedCurrency,
    setSelectedCurrency,
    exchangeRates,
    isLoading
  } = useMarketUpdates();

  // Filter only emergency and swap updates
  const emergencyUpdates = updates.filter(update => 
    update.type === 'URGENT' || update.type === 'SWAP'
  );

  if (isLoading) {
    return <div className="bg-slate-800 text-white rounded-xl shadow-xl overflow-hidden flex-1 min-h-0 p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-700 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => <div key={i} className="p-4 bg-gray-700 rounded-lg">
                <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-600 rounded w-1/2"></div>
              </div>)}
          </div>
        </div>
      </div>;
  }

  return <div className="text-white shadow-xl overflow-hidden flex-1 min-h-0 bg-slate-800 rounded-md">
      <div className="h-full flex flex-col p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-semibold text-gray-400">EMERGENCY & SHIFT SWAP INDEX</h3>
            <span className="flex items-center gap-1 text-xs bg-red-900/50 text-red-400 px-2 py-0.5 rounded">
              <AlertCircle className="w-3 h-3" />
              {emergencyUpdates.length} Active
            </span>
          </div>
          <div className="flex items-center gap-4">
            <select 
              value={selectedCurrency} 
              onChange={e => setSelectedCurrency(e.target.value)} 
              className="bg-gray-700 text-white text-xs rounded-md border border-gray-600 px-2 py-1"
            >
              {Object.keys(exchangeRates).map(currency => 
                <option key={currency} value={currency}>{currency}</option>
              )}
            </select>
            <span className="text-xs text-gray-400">
              {lastUpdateTime.toLocaleTimeString()} UTC
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 overflow-y-auto flex-1">
          {emergencyUpdates.map(update => (
            <div 
              key={update.id} 
              className={`p-3 rounded-lg border transition-all ${
                update.type === 'URGENT' 
                  ? 'bg-red-900/50 border-red-700' 
                  : 'bg-orange-900/50 border-orange-700'
              } ${update.isNew ? 'animate-in fade-in slide-in-from-bottom-5' : ''}`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold flex items-center gap-1 ${
                    update.type === 'URGENT' ? 'text-red-400' : 'text-orange-400'
                  }`}>
                    {update.type === 'URGENT' ? <AlertCircle className="w-3 h-3" /> : <SwapHorizontal className="w-3 h-3" />}
                    {update.type}
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
        
        <div className="flex items-center justify-between text-[10px] text-gray-400 border-t border-gray-700 pt-2 mt-2">
          <span>Emergency updates in real-time</span>
          <span>{emergencyUpdates.length} active emergencies</span>
        </div>
      </div>
    </div>;
}
