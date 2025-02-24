
import { DollarSign, Clock, CalendarDays, Award } from "lucide-react";
import { StatsCard } from "@/components/ui/stats-card";

export function StatsOverview() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Earnings"
        value="$1,234"
        icon={<DollarSign className="h-4 w-4 text-brand-600" />}
        trend={{ value: "+12% vs last month", positive: true }}
      />
      <StatsCard
        title="Hours Worked"
        value="48"
        icon={<Clock className="h-4 w-4 text-brand-600" />}
        description="This month"
      />
      <StatsCard
        title="Upcoming Shifts"
        value="3"
        icon={<CalendarDays className="h-4 w-4 text-brand-600" />}
      />
      <StatsCard
        title="Rating"
        value="4.8"
        icon={<Award className="h-4 w-4 text-brand-600" />}
        description="Based on 24 reviews"
      />
    </div>
  );
}
