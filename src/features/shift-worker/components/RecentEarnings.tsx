
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EarningEntry {
  id: number;
  company: string;
  date: string;
  hours: number;
  amount: string;
  status: string;
}

interface RecentEarningsProps {
  earnings: EarningEntry[];
}

export const RecentEarnings = ({ earnings }: RecentEarningsProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between py-4 px-6">
        <CardTitle className="text-lg font-medium">Recent Earnings</CardTitle>
        <Button variant="link" size="sm" className="text-sm text-indigo-600">View All</Button>
      </CardHeader>
      <CardContent className="px-6">
        <div className="space-y-3">
          {earnings.map(earning => (
            <div key={earning.id} className="border-b pb-3 last:border-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{earning.company}</h3>
                  <p className="text-sm text-gray-500">{earning.date} • {earning.hours} hrs</p>
                </div>
                <div className="text-right">
                  <span className="font-medium text-green-600">{earning.amount}</span>
                  <p className="text-xs text-gray-500">{earning.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
