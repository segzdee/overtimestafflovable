
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Invoice {
  id: number;
  agency: string;
  date: string;
  hours: number;
  amount: string;
  status: string;
}

interface RecentInvoicesCardProps {
  invoices: Invoice[];
}

export function RecentInvoicesCard({ invoices }: RecentInvoicesCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between py-4 px-6">
        <CardTitle className="text-lg font-medium">Recent Invoices</CardTitle>
        <Button variant="link" size="sm" className="text-teal-600">View All</Button>
      </CardHeader>
      <CardContent className="px-6">
        <div className="space-y-3">
          {invoices.map(invoice => (
            <div key={invoice.id} className="border-b pb-3 last:border-0">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{invoice.agency}</p>
                  <p className="text-sm text-gray-500">{invoice.date}</p>
                  <p className="text-xs text-gray-400">{invoice.hours} shifts</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{invoice.amount}</p>
                  <p className={`text-xs ${
                    invoice.status === 'Paid' ? 'text-green-600' : 
                    invoice.status === 'Overdue' ? 'text-red-600' : 
                    'text-yellow-600'
                  }`}>
                    {invoice.status}
                  </p>
                  <Button variant="ghost" size="sm" className="text-xs mt-1 h-6 p-0">
                    Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <Button variant="link" size="sm" className="w-full text-center text-teal-600">
            Download All Invoices
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
