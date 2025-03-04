
import { Clock, DollarSign, Calendar } from 'lucide-react';
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="py-3">
          <CardTitle className="text-sm font-medium text-gray-500">This Week's Hours</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center mb-2">
            <Clock size={20} className="text-indigo-600 mr-2" />
            <span className="text-2xl font-bold">{weeklyProgress.current}</span>
            <span className="ml-1 text-sm text-gray-500">/ {weeklyProgress.target} hrs</span>
          </div>
          <Progress value={weeklyProgress.percentage} className="h-2" indicatorClassName="bg-indigo-600" />
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="py-3">
          <CardTitle className="text-sm font-medium text-gray-500">Weekly Earnings</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center">
            <DollarSign size={20} className="text-green-600 mr-2" />
            <span className="text-2xl font-bold">$405.00</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
        <CardHeader className="py-3">
          <CardTitle className="text-sm font-medium text-gray-500">Available Shifts</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center">
            <Calendar size={20} className="text-blue-600 mr-2" />
            <span className="text-2xl font-bold">{availableShiftsCount}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
