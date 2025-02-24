
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Shift } from "@/features/shift-worker/types";
import { StatsOverview } from "@/features/shift-worker/components/StatsOverview";
import { AvailableShiftsList } from "@/features/shift-worker/components/AvailableShiftsList";
import { UrgentShiftsList } from "@/features/shift-worker/components/UrgentShiftsList";
import { WorkerProfile } from "@/features/shift-worker/components/WorkerProfile";
import { ShiftEarningsOptimizer } from "@/features/shift-worker/components/ShiftEarningsOptimizer";

export default function ShiftWorkerDashboard() {
  const [badges] = useState(['Top Performer', 'Reliable', 'Experienced']);
  const [preferences] = useState({
    location: 'NY',
    pay_rate: 20
  });
  
  const [recentShifts] = useState<Shift[]>([
    { id: '1', title: 'Evening Server', pay_rate: 25, location: 'Manhattan', status: 'open' },
    { id: '2', title: 'Bartender', pay_rate: 30, location: 'Brooklyn', status: 'open' }
  ]);
  
  const [urgentShifts] = useState<Shift[]>([
    { 
      id: '3', 
      title: 'Kitchen Staff', 
      pay_rate: 28, 
      location: 'Queens', 
      remaining_time: '2 hours', 
      status: 'emergency' 
    }
  ]);

  const handleApplyShift = async (shiftId: string) => {
    // Stub: Will be connected to Supabase
    alert(`Applied to shift ${shiftId}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Shift Worker Dashboard</h2>
          <Button variant="outline">View Schedule</Button>
        </div>

        <StatsOverview />

        <ShiftEarningsOptimizer />

        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          <AvailableShiftsList 
            shifts={recentShifts}
            onApplyShift={handleApplyShift}
          />
          <UrgentShiftsList 
            shifts={urgentShifts}
            onApplyShift={handleApplyShift}
          />
        </div>

        <WorkerProfile 
          badges={badges}
          preferences={preferences}
        />
      </div>
    </DashboardLayout>
  );
}
