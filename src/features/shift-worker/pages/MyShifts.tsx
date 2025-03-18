
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function MyShifts() {
  const [upcomingShifts] = useState([
    { 
      id: 1, 
      company: 'Grand Hotel', 
      date: 'Mar 4, 2025', 
      time: '8:00 AM - 4:00 PM', 
      role: 'Server', 
      pay: '$140',
      location: '123 Main St, City'
    },
    { 
      id: 2, 
      company: 'City Bistro', 
      date: 'Mar 5, 2025', 
      time: '5:00 PM - 11:00 PM', 
      role: 'Bartender', 
      pay: '$130',
      location: '456 Oak St, City'
    },
    { 
      id: 3, 
      company: 'Event Center', 
      date: 'Mar 7, 2025', 
      time: '2:00 PM - 10:00 PM', 
      role: 'Host', 
      pay: '$125',
      location: '789 Event Dr, City'
    }
  ]);

  const [pastShifts] = useState([
    { 
      id: 1, 
      company: 'Beach Resort', 
      date: 'Mar 1, 2025', 
      time: '9:00 AM - 5:00 PM', 
      role: 'Front Desk', 
      pay: '$144',
      location: '101 Beach Rd, City',
      rating: 4.8
    },
    { 
      id: 2, 
      company: 'Italian Restaurant', 
      date: 'Feb 28, 2025', 
      time: '4:00 PM - 10:00 PM', 
      role: 'Waiter', 
      pay: '$108',
      location: '222 Pizza Ave, City',
      rating: 4.5
    },
    { 
      id: 3, 
      company: 'Downtown Hotel', 
      date: 'Feb 25, 2025', 
      time: '7:00 AM - 3:00 PM', 
      role: 'Bellhop', 
      pay: '$144',
      location: '333 Center St, City',
      rating: 5.0
    }
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Shifts</h1>
      
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">Upcoming Shifts</TabsTrigger>
          <TabsTrigger value="past">Past Shifts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4">
          {upcomingShifts.map(shift => (
            <Card key={shift.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{shift.company}</h3>
                      <Badge variant="outline">{shift.role}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="h-4 w-4" />
                        <span>{shift.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{shift.time}</span>
                      </div>
                    </div>
                    <p className="text-sm">{shift.location}</p>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                    <div className="flex items-center gap-1 text-green-600">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-medium">{shift.pay}</span>
                    </div>
                    <Button variant="outline" size="sm">Details</Button>
                    <Button variant="destructive" size="sm">Cancel</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="past" className="space-y-4">
          {pastShifts.map(shift => (
            <Card key={shift.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{shift.company}</h3>
                      <Badge variant="outline">{shift.role}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="h-4 w-4" />
                        <span>{shift.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{shift.time}</span>
                      </div>
                    </div>
                    <p className="text-sm">{shift.location}</p>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                    <div className="flex items-center gap-1 text-green-600">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-medium">{shift.pay}</span>
                    </div>
                    <div className="text-sm">
                      Rating: <span className="font-medium">{shift.rating}/5.0</span>
                    </div>
                    <Button variant="outline" size="sm">Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
