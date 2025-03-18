
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Filter } from "lucide-react";

export function AdminReports() {
  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
        <h1 className="text-xl font-bold">Admin Reports</h1>
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
              <FileText className="h-5 w-5 text-primary" />
              System Reports
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-sm text-gray-600">Admin reporting and analytics dashboard for system-wide metrics.</p>
            <Button size="sm" className="mt-3 w-full">View Reports</Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="py-2 px-4">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-500" />
              User Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-sm text-gray-600">Detailed reports on user engagement and platform activity.</p>
            <Button size="sm" className="mt-3 w-full">View Activity</Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="py-2 px-4">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              Financial Reports
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-sm text-gray-600">Revenue and financial performance metrics for the platform.</p>
            <Button size="sm" className="mt-3 w-full">View Financials</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
