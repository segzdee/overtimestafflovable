
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Download, Filter, PieChart, TrendingUp } from "lucide-react";

export function Finance() {
  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
        <h1 className="text-xl font-bold">Agency Finance</h1>
        <div className="flex gap-2 mt-2 sm:mt-0">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button size="sm" className="bg-primary text-white flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="py-2 px-4">
            <CardTitle className="text-base flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Financial Management
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-sm text-gray-600">Agency financial management dashboard for revenue tracking and invoicing.</p>
            <Button size="sm" className="mt-3 w-full">View Finances</Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="py-2 px-4">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Revenue Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-sm text-gray-600">Track and analyze revenue streams across different clients and shifts.</p>
            <Button size="sm" className="mt-3 w-full">View Analysis</Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="py-2 px-4">
            <CardTitle className="text-base flex items-center gap-2">
              <PieChart className="h-5 w-5 text-blue-500" />
              Expense Tracking
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-sm text-gray-600">Monitor and manage operational expenses and staffing costs.</p>
            <Button size="sm" className="mt-3 w-full">View Expenses</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
