
import { ShiftWorkerStats } from './ShiftWorkerStats';
import { UpcomingShifts } from './UpcomingShifts';
import { RecentEarnings } from './RecentEarnings';
import { AvailableShiftsTable } from './AvailableShiftsTable';
import { DesktopHeader } from './DesktopHeader';

interface ShiftWorkerContentProps {
  weeklyProgress: {
    current: number;
    target: number;
    percentage: number;
  };
  upcomingShifts: Array<{
    id: number;
    company: string;
    date: string;
    time: string;
    role: string;
    pay: string;
  }>;
  recentEarnings: Array<{
    id: number;
    company: string;
    date: string;
    hours: number;
    amount: string;
    status: string;
  }>;
  availableShifts: Array<{
    id: number;
    company: string;
    date: string;
    time: string;
    role: string;
    pay: string;
  }>;
  handleApplyShift: (shiftId: string) => void;
}

export const ShiftWorkerContent = ({
  weeklyProgress,
  upcomingShifts,
  recentEarnings,
  availableShifts,
  handleApplyShift
}: ShiftWorkerContentProps) => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <DesktopHeader />

      <main className="flex-1 overflow-y-auto p-4">
        <ShiftWorkerStats 
          weeklyProgress={weeklyProgress} 
          availableShiftsCount={availableShifts.length} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <UpcomingShifts shifts={upcomingShifts} />
          <RecentEarnings earnings={recentEarnings} />
        </div>

        <AvailableShiftsTable shifts={availableShifts} onApply={handleApplyShift} />
      </main>
    </div>
  );
};
