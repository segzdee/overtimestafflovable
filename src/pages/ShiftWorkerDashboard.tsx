
import { useState, useEffect } from "react";
import { MobileHeader } from "@/features/shift-worker/components/MobileHeader";
import { ShiftWorkerSidebar } from "@/features/shift-worker/components/ShiftWorkerSidebar";
import { ShiftWorkerContent } from "@/features/shift-worker/components/ShiftWorkerContent";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { SkeletonLoader } from "@/components/ui/skeleton-loader";
import { useToast } from "@/components/ui/use-toast";

export default function ShiftWorkerDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  const [weeklyProgress] = useState({
    current: 24,
    target: 40,
    percentage: 60
  });

  const [upcomingShifts] = useState([
    { id: 1, company: 'Grand Hotel', date: 'Mar 4, 2025', time: '8:00 AM - 4:00 PM', role: 'Server', pay: '$140' },
    { id: 2, company: 'City Bistro', date: 'Mar 5, 2025', time: '5:00 PM - 11:00 PM', role: 'Bartender', pay: '$130' },
    { id: 3, company: 'Event Center', date: 'Mar 7, 2025', time: '2:00 PM - 10:00 PM', role: 'Host', pay: '$125' }
  ]);

  const [availableShifts] = useState([
    { id: 1, company: 'Seafood Palace', date: 'Mar 8, 2025', time: '11:00 AM - 7:00 PM', role: 'Server', pay: '$135' },
    { id: 2, company: 'Downtown Bar', date: 'Mar 9, 2025', time: '8:00 PM - 2:00 AM', role: 'Bartender', pay: '$160' },
    { id: 3, company: 'Luxury Hotel', date: 'Mar 10, 2025', time: '7:00 AM - 3:00 PM', role: 'Housekeeper', pay: '$120' },
    { id: 4, company: 'Conference Center', date: 'Mar 12, 2025', time: '9:00 AM - 5:00 PM', role: 'Event Staff', pay: '$140' }
  ]);

  const [recentEarnings] = useState([
    { id: 1, company: 'Beach Resort', date: 'Mar 1, 2025', hours: 8, amount: '$144.00', status: 'Paid' },
    { id: 2, company: 'Italian Restaurant', date: 'Feb 28, 2025', hours: 6, amount: '$108.00', status: 'Paid' },
    { id: 3, company: 'Downtown Hotel', date: 'Feb 25, 2025', hours: 8, amount: '$144.00', status: 'Paid' }
  ]);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Dashboard Loaded",
        description: "Your dashboard has been successfully loaded.",
      });
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [toast]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleApplyShift = async (shiftId: string) => {
    alert(`Applied to shift ${shiftId}`);
  };

  return (
    <ErrorBoundary>
      <div className="flex flex-col md:flex-row h-screen bg-gray-100 overflow-hidden">
        <MobileHeader toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

        <ShiftWorkerSidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
        />

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" 
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {isLoading ? (
          <div className="flex-1 p-6 overflow-auto">
            <SkeletonLoader variant="dashboard" />
          </div>
        ) : (
          <ShiftWorkerContent 
            weeklyProgress={weeklyProgress}
            upcomingShifts={upcomingShifts}
            recentEarnings={recentEarnings}
            availableShifts={availableShifts}
            handleApplyShift={handleApplyShift}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}
