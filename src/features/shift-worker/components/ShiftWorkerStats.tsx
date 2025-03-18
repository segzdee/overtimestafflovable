
import { Clock, DollarSign, Calendar, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface WeeklyProgress {
  current: number;
  target: number;
  percentage: number;
}

interface StatsProps {
  weeklyProgress: WeeklyProgress;
  availableShiftsCount: number;
}

export const ShiftWorkerStats = ({ weeklyProgress, availableShiftsCount }: StatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="py-3 pb-0">
          <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-1">
            <Clock size={14} className="text-primary" />
            Weekly Hours
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3">
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-2xl font-bold">{weeklyProgress.current}</span>
            <span className="text-sm text-gray-500">/ {weeklyProgress.target} hrs</span>
          </div>
          <Progress value={weeklyProgress.percentage} className="h-2" indicatorClassName="bg-primary" />
          <p className="mt-2 text-xs text-gray-500">{weeklyProgress.percentage}% of weekly target</p>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="py-3 pb-0">
          <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-1">
            <DollarSign size={14} className="text-green-600" />
            Weekly Earnings
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold">$405.00</span>
          </div>
          <div className="mt-2 flex items-center gap-1">
            <Target size={14} className="text-primary" />
            <span className="text-xs text-gray-500">89% of weekly goal</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="py-3 pb-0">
          <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-1">
            <Calendar size={14} className="text-blue-600" />
            Available Shifts
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold">{availableShiftsCount}</span>
            <span className="text-sm text-gray-500">opportunities</span>
          </div>
          <div className="mt-2 flex items-center gap-1">
            <Clock size={14} className="text-primary" />
            <span className="text-xs text-gray-500">Updated 10 minutes ago</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
