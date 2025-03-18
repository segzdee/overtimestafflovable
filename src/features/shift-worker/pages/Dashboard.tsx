
import { StatsOverview } from "../components/StatsOverview";
import { UpcomingShifts } from "../components/UpcomingShifts";
import { RecentEarnings } from "../components/RecentEarnings";
import { AvailableShiftsTable } from "../components/AvailableShiftsTable";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export function ShiftWorkerDashboard() {
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

  const handleApplyShift = async (shiftId: string) => {
    toast({
      title: "Application Submitted",
      description: `You've applied for shift #${shiftId}`,
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <StatsOverview />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingShifts shifts={upcomingShifts} />
        <RecentEarnings earnings={recentEarnings} />
      </div>
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Available Shifts</h2>
        <AvailableShiftsTable shifts={availableShifts} onApply={handleApplyShift} />
      </div>
    </div>
  );
}
