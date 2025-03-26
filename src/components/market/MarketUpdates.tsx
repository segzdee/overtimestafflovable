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
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!updates || updates.length === 0) {
    return <div className="text-center text-gray-500">No updates available</div>;
  }

  return (
    <div>
      {displayUpdates.map(update => (
        <div key={update.id} className="update-item" onClick={handleItemClick}>
          {/* Render update details */}
          <p>{update.title}</p>
        </div>
      ))}
    </div>
  );
}
