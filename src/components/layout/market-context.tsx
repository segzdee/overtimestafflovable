
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { 
  fetchMarketStats, 
  fetchMarketTrends, 
  fetchHotSkills, 
  fetchLocationDemand, 
  fetchShiftDemandByDay,
  fetchShiftRatesBySkill,
  MarketStats, 
  MarketTrend,
  HotSkill,
  LocationDemand,
  ShiftDemandByDay,
  ShiftRateBySkill
} from "@/services/marketData.service";

// Define the market update interface
interface MarketUpdate {
  id: string;
  type: string;
  title: string;
  location: string;
  region: string;
  rate: string;
  urgency_level: string;
  highlight: boolean;
  isNew: boolean;
  isUpdating: boolean;
  timestamp: number;
}

interface MarketContextType {
  marketStats: MarketStats | null;
  marketTrends: MarketTrend[];
  hotSkills: HotSkill[];
  locationDemand: LocationDemand[];
  shiftDemandByDay: ShiftDemandByDay[];
  shiftRatesBySkill: ShiftRateBySkill[];
  updates: MarketUpdate[];
  emergencyUpdates: MarketUpdate[];
  newUpdatesCount: number;
  isLoading: boolean;
  error: string | null;
  refreshMarketData: () => Promise<void>;
  refreshData: () => Promise<void>;
  setTrendPeriod: (period: "week" | "month" | "quarter") => void;
  trendPeriod: "week" | "month" | "quarter";
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export const useMarketData = () => {
  const context = useContext(MarketContext);
  if (context === undefined) {
    throw new Error("useMarketData must be used within a MarketProvider");
  }
  return context;
};

interface MarketProviderProps {
  children: ReactNode;
}

export const MarketProvider: React.FC<MarketProviderProps> = ({ children }) => {
  const [marketStats, setMarketStats] = useState<MarketStats | null>(null);
  const [marketTrends, setMarketTrends] = useState<MarketTrend[]>([]);
  const [hotSkills, setHotSkills] = useState<HotSkill[]>([]);
  const [locationDemand, setLocationDemand] = useState<LocationDemand[]>([]);
  const [shiftDemandByDay, setShiftDemandByDay] = useState<ShiftDemandByDay[]>([]);
  const [shiftRatesBySkill, setShiftRatesBySkill] = useState<ShiftRateBySkill[]>([]);
  const [updates, setUpdates] = useState<MarketUpdate[]>([]);
  const [emergencyUpdates, setEmergencyUpdates] = useState<MarketUpdate[]>([]);
  const [newUpdatesCount, setNewUpdatesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trendPeriod, setTrendPeriod] = useState<"week" | "month" | "quarter">("month");

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const stats = await fetchMarketStats();
      const trends = await fetchMarketTrends(trendPeriod);
      const skills = await fetchHotSkills();
      const locations = await fetchLocationDemand();
      const demandByDay = await fetchShiftDemandByDay();
      const ratesBySkill = await fetchShiftRatesBySkill();
      
      setMarketStats(stats);
      setMarketTrends(trends);
      setHotSkills(skills);
      setLocationDemand(locations);
      setShiftDemandByDay(demandByDay);
      setShiftRatesBySkill(ratesBySkill);
      
      // Mock updates until the real API is available
      setUpdates(getMockUpdates());
      setEmergencyUpdates(getMockEmergencyUpdates());
      setNewUpdatesCount(3); // Mock value
    } catch (err) {
      setError("Failed to fetch market data");
      console.error("Market data error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to get mock updates (temporary)
  const getMockUpdates = (): MarketUpdate[] => {
    return [
      {
        id: '1',
        type: 'shift',
        title: 'Urgent Nurse Needed',
        location: 'San Francisco General Hospital',
        region: 'San Francisco, CA',
        rate: '$45/hr',
        urgency_level: 'high',
        highlight: true,
        isNew: true,
        isUpdating: false,
        timestamp: Date.now() - 1000 * 60 * 30
      },
      {
        id: '2',
        type: 'shift',
        title: 'ICU Specialist',
        location: 'UCSF Medical Center',
        region: 'San Francisco, CA',
        rate: '$52/hr',
        urgency_level: 'medium',
        highlight: false,
        isNew: true,
        isUpdating: false,
        timestamp: Date.now() - 1000 * 60 * 120
      }
    ];
  };

  // Function to get mock emergency updates (temporary)
  const getMockEmergencyUpdates = (): MarketUpdate[] => {
    return [
      {
        id: 'e1',
        type: 'emergency',
        title: 'Emergency Staff Needed',
        location: 'Oakland Medical Center',
        region: 'Oakland, CA',
        rate: '$65/hr',
        urgency_level: 'critical',
        highlight: true,
        isNew: true,
        isUpdating: false,
        timestamp: Date.now() - 1000 * 60 * 15
      }
    ];
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch new trend data when period changes
  useEffect(() => {
    const updateTrends = async () => {
      setIsLoading(true);
      try {
        const trends = await fetchMarketTrends(trendPeriod);
        setMarketTrends(trends);
      } catch (err) {
        setError("Failed to fetch market trends");
        console.error("Market trends error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    updateTrends();
  }, [trendPeriod]);

  const refreshMarketData = async () => {
    await fetchData();
  };

  // Add the missing refreshData function
  const refreshData = async () => {
    await fetchData();
    setNewUpdatesCount(0);
  };

  const value: MarketContextType = {
    marketStats,
    marketTrends,
    hotSkills,
    locationDemand,
    shiftDemandByDay,
    shiftRatesBySkill,
    updates,
    emergencyUpdates,
    newUpdatesCount,
    isLoading,
    error,
    refreshMarketData,
    refreshData,
    setTrendPeriod,
    trendPeriod,
  };

  return (
    <MarketContext.Provider value={value}>
      {children}
    </MarketContext.Provider>
  );
};

// Custom hook to use market updates specifically
export const useMarketUpdates = () => {
  const context = useMarketData();
  return {
    updates: context.updates,
    emergencyUpdates: context.emergencyUpdates,
    newUpdatesCount: context.newUpdatesCount,
    refreshData: context.refreshData,
    isLoading: context.isLoading
  };
};
