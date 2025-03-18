
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Transaction {
  id: number;
  company: string;
  date: string;
  hours: number;
  amount: string;
  status: string;
}

interface RecentTransactionsCardProps {
  transactions: Transaction[];
}

export function RecentTransactionsCard({ transactions }: RecentTransactionsCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between py-4 px-6">
        <CardTitle className="text-lg font-medium">Recent Transactions</CardTitle>
        <Button variant="link" size="sm" className="text-blue-600">View All</Button>
      </CardHeader>
      <CardContent className="px-6">
        <div className="space-y-4">
          {transactions.map(transaction => (
            <div key={transaction.id} className="flex justify-between items-center border-b pb-3 last:border-0">
              <div>
                <h3 className="font-medium">{transaction.company}</h3>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{transaction.amount}</p>
                <p className={`text-xs ${
                  transaction.status === 'Paid' ? 'text-green-600' : 
                  transaction.status === 'Processing' ? 'text-yellow-600' : 
                  'text-red-600'
                }`}>
                  {transaction.status}
                </p>
              </div>
            </div>
          ))}
          <Button variant="link" size="sm" className="w-full text-center text-blue-600">
            View All Transactions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
