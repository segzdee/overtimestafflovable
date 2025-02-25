
import { MapPin, AlertCircle, ArrowLeftRight } from "lucide-react";
import { useMarketUpdates } from "@/hooks/useMarketUpdates";
import { toast } from "@/components/ui/use-toast";

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

  const handleItemClick = () => {
    toast({
      title: "Authentication Required",
      description: "Sign in or sign up to view details",
      variant: "default"
    });
  };

  // Filter URGENT and SWAP updates separately
  const urgentUpdates = updates.filter(update => update.type === 'URGENT').slice(0, 1);
  const swapUpdates = updates.filter(update => update.type === 'SWAP').slice(0, 1);

  // Combine them to ensure we always have room for both types
  const emergencyUpdates = [...urgentUpdates, ...swapUpdates];

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-purple-900/20 via-zinc-900/40 to-zinc-900/60 backdrop-blur-xl text-white rounded-xl shadow-xl overflow-hidden flex-1 min-h-0 p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-purple-800/30 rounded w-1/4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="p-4 bg-purple-800/20 rounded-lg border border-purple-700/20">
                <div className="h-4 bg-purple-700/30 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-purple-700/20 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-900/10 via-zinc-900/30 to-zinc-900/50 backdrop-blur-xl text-white shadow-xl overflow-hidden flex-1 min-h-0 rounded-lg border border-purple-700/20">
      <div className="h-full flex flex-col p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-semibold bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
              EMERGENCY & SHIFT SWAP INDEX
            </h3>
            <span className="flex items-center gap-1 bg-red-500/10 text-red-400 py-0.5 rounded-full text-center text-xs font-medium px-2 border border-red-500/20">
              <AlertCircle className="w-3 h-3" />
              {emergencyUpdates.length} Active
            </span>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <select 
              value={selectedCurrency} 
              onChange={e => setSelectedCurrency(e.target.value)}
              className="text-white text-xs bg-purple-900/20 border border-purple-700/30 px-2 rounded-md py-1.5 
                         focus:ring-2 ring-purple-500/50 outline-none hover:bg-purple-900/30 transition-colors
                         w-full sm:w-auto"
            >
              {Object.keys(exchangeRates).map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
            <span className="text-xs text-zinc-400 hidden sm:inline">
              {lastUpdateTime.toLocaleTimeString()} UTC
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 overflow-y-auto flex-1">
          {emergencyUpdates.map(update => (
            <div 
              key={update.id} 
              onClick={handleItemClick}
              className="relative group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-emerald-500/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-purple-900/20 via-zinc-900/30 to-zinc-900/40 backdrop-blur-sm 
                            rounded-lg p-4 border border-purple-700/20 hover:border-purple-600/30 transition-all duration-300
                            hover:shadow-lg hover:shadow-purple-900/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold flex items-center gap-1 
                      ${update.type === 'URGENT' ? 'text-red-400' : 'text-amber-400'}`}>
                      {update.type === 'URGENT' ? (
                        <AlertCircle className="w-3 h-3" />
                      ) : (
                        <ArrowLeftRight className="w-3 h-3" />
                      )}
                      {update.type}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-emerald-400 group-hover:scale-105 transition-transform">
                    {update.rate}
                  </span>
                </div>
                <div className="text-sm font-medium text-zinc-100">{update.title}</div>
                <div className="text-xs text-zinc-400 mt-1">{update.location}</div>
                <div className="text-xs text-zinc-500 mt-2 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {update.region}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-zinc-500 border-t border-purple-700/20 pt-3 mt-3 gap-2 sm:gap-0">
          <span>Emergency updates in real-time</span>
          <span className="text-xs text-zinc-400 sm:hidden">
            {lastUpdateTime.toLocaleTimeString()} UTC
          </span>
          <span>{emergencyUpdates.length} active emergencies</span>
        </div>
      </div>
    </div>
  );
}
