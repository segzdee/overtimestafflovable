
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  TrendingUp, 
  CalendarDays, 
  Download
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function MyEarnings() {
  const [earningsData] = useState([
    { month: 'Jan', amount: 1200 },
    { month: 'Feb', amount: 1800 },
    { month: 'Mar', amount: 1400 },
    { month: 'Apr', amount: 2200 },
    { month: 'May', amount: 1900 },
    { month: 'Jun', amount: 2400 },
  ]);

  const [transactions] = useState([
    { id: 1, company: 'Beach Resort', date: 'Mar 1, 2025', hours: 8, amount: 144.00, status: 'Paid' },
    { id: 2, company: 'Italian Restaurant', date: 'Feb 28, 2025', hours: 6, amount: 108.00, status: 'Paid' },
    { id: 3, company: 'Downtown Hotel', date: 'Feb 25, 2025', hours: 8, amount: 144.00, status: 'Paid' },
    { id: 4, company: 'Grand Hotel', date: 'Feb 20, 2025', hours: 7, amount: 126.00, status: 'Paid' },
    { id: 5, company: 'City Bistro', date: 'Feb 15, 2025', hours: 5, amount: 90.00, status: 'Paid' },
  ]);

  const [upcomingPayments] = useState([
    { id: 1, company: 'Grand Hotel', date: 'Mar 14, 2025', hours: 8, amount: 140.00, status: 'Pending' },
    { id: 2, company: 'City Bistro', date: 'Mar 15, 2025', hours: 6, amount: 130.00, status: 'Pending' },
  ]);

  const totalEarned = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const totalUpcoming = upcomingPayments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Earnings</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalEarned.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Payments</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalUpcoming.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Expected within 14 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hourly Rate (Avg)</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$18.25</div>
            <p className="text-xs text-muted-foreground">+5% from previous</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="pt-4">
        <CardHeader>
          <CardTitle>Earnings Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={earningsData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="transactions">Payment History</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Payments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="transactions">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Payment History</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium">Company</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Hours</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Amount</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">{transaction.company}</td>
                        <td className="p-4 align-middle">{transaction.date}</td>
                        <td className="p-4 align-middle">{transaction.hours}</td>
                        <td className="p-4 align-middle">${transaction.amount.toFixed(2)}</td>
                        <td className="p-4 align-middle">
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium">Company</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Expected Date</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Hours</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Amount</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {upcomingPayments.map((payment) => (
                      <tr key={payment.id} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">{payment.company}</td>
                        <td className="p-4 align-middle">{payment.date}</td>
                        <td className="p-4 align-middle">{payment.hours}</td>
                        <td className="p-4 align-middle">${payment.amount.toFixed(2)}</td>
                        <td className="p-4 align-middle">
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
                            {payment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
