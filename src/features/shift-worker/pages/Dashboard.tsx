
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { StatsOverview } from "../components/StatsOverview";
import { UpcomingShifts } from "../components/UpcomingShifts";
import { RecentEarnings } from "../components/RecentEarnings";
import { AvailableShiftsTable } from "../components/AvailableShiftsTable";
import { ShiftWorkerStats } from "../components/ShiftWorkerStats";
import { CalendarDays, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

  const [performanceData] = useState({
    punctuality: 98,
    customerRating: 4.9,
    completionRate: 100,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>Set Availability</span>
          </Button>
          <Button size="sm" className="bg-primary text-white flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            <span>Find Shifts</span>
          </Button>
        </div>
      </div>
      
      <StatsOverview />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ShiftWorkerStats 
            weeklyProgress={weeklyProgress} 
            availableShiftsCount={availableShifts.length} 
          />
        </div>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Punctuality</span>
                  <span className="font-medium">{performanceData.punctuality}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-green-500 h-1.5 rounded-full" 
                    style={{ width: `${performanceData.punctuality}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Customer Rating</span>
                  <span className="font-medium">{performanceData.customerRating}/5.0</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-primary h-1.5 rounded-full" 
                    style={{ width: `${(performanceData.customerRating/5)*100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Completion Rate</span>
                  <span className="font-medium">{performanceData.completionRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-blue-500 h-1.5 rounded-full" 
                    style={{ width: `${performanceData.completionRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
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
