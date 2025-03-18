
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Calendar, Clock, DollarSign, CheckCircle, AlertCircle } from "lucide-react";

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
  title?: string;
  viewAllLink?: string;
}

export const RecentEarnings = ({ 
  earnings, 
  title = "Recent Earnings",
  viewAllLink = "/dashboard/shift-worker/earnings" 
}: RecentEarningsProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between py-4 px-6 border-b">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <Button variant="link" size="sm" className="text-sm text-primary" asChild>
          <a href={viewAllLink}>View All</a>
        </Button>
      </CardHeader>
      <CardContent className="px-6 py-3">
        {earnings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <DollarSign className="h-10 w-10 text-gray-300 mb-2" />
            <p className="text-gray-500">No recent earnings</p>
          </div>
        ) : (
          <div className="space-y-4">
            {earnings.map(earning => (
              <div key={earning.id} className="border-b pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Building className="h-4 w-4 text-gray-500" />
                      <h3 className="font-medium">{earning.company}</h3>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{earning.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{earning.hours} hrs</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1 font-medium text-green-600">
                      <DollarSign className="h-3.5 w-3.5" />
                      <span>{earning.amount.replace('$', '')}</span>
                    </div>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      {earning.status === 'Paid' ? (
                        <>
                          <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                          <span className="text-xs text-green-600">{earning.status}</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
                          <span className="text-xs text-amber-600">{earning.status}</span>
                        </>
                      )}
                    </div>
                    <div className="mt-2">
                      <Button size="sm" variant="outline" className="text-xs">Details</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
