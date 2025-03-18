
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  BriefcaseBusiness, 
  CalendarClock, 
  MessageSquare,
  ChevronRight
} from "lucide-react";

export function Teams() {
  const [myTeams] = useState([
    {
      id: 1,
      name: "Grand Hotel Server Team",
      company: "Grand Hotel Group",
      members: 8,
      nextShift: "Mar 10, 2025",
      recentMessage: "Meeting in the staff room at 7:45 AM before shift.",
      memberAvatars: ["J", "A", "S", "M", "R"]
    },
    {
      id: 2,
      name: "Downtown Bar Crew",
      company: "City Nightlife Inc.",
      members: 12,
      nextShift: "Mar 15, 2025",
      recentMessage: "New drink menu training this weekend.",
      memberAvatars: ["T", "P", "K", "L", "C"]
    },
    {
      id: 3,
      name: "Event Staff A-Team",
      company: "City Conference Center",
      members: 15,
      nextShift: "Mar 18, 2025",
      recentMessage: "Large conference next week, all hands needed.",
      memberAvatars: ["D", "B", "E", "F", "G"]
    }
  ]);
  
  const [availableTeams] = useState([
    {
      id: 4,
      name: "Restaurant Wait Staff",
      company: "Fine Dining Restaurants",
      members: 10,
      requirements: ["1+ year experience", "Wine knowledge"],
      positions: ["Server", "Host/Hostess"]
    },
    {
      id: 5,
      name: "Retail Holiday Team",
      company: "Urban Retail Group",
      members: 8,
      requirements: ["Flexible hours", "Customer service"],
      positions: ["Cashier", "Floor Staff", "Stock"]
    },
    {
      id: 6,
      name: "Office Support Team",
      company: "Corporate Tower Offices",
      members: 6,
      requirements: ["Admin experience", "MS Office skills"],
      positions: ["Reception", "Admin Assistant"]
    }
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Teams</h1>
      
      <Tabs defaultValue="my-teams" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="my-teams">My Teams</TabsTrigger>
          <TabsTrigger value="available">Available Teams</TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-teams" className="space-y-4">
          {myTeams.map(team => (
            <Card key={team.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl font-semibold">{team.name}</h2>
                      <p className="text-sm text-muted-foreground">{team.company}</p>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{team.members} members</span>
                      </div>
                      <div className="flex items-center">
                        <CalendarClock className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>Next shift: {team.nextShift}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground mt-1" />
                      <p className="text-sm italic">"{team.recentMessage}"</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex flex-col items-end justify-between">
                    <div className="flex -space-x-2">
                      {team.memberAvatars.map((initial, index) => (
                        <Avatar key={index} className="border-2 border-background h-8 w-8">
                          <AvatarFallback className="text-xs">{initial}</AvatarFallback>
                        </Avatar>
                      ))}
                      {team.members > 5 && (
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-xs font-medium">
                          +{team.members - 5}
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 space-x-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                      <Button size="sm">
                        View Team
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="available" className="space-y-4">
          {availableTeams.map(team => (
            <Card key={team.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl font-semibold">{team.name}</h2>
                      <p className="text-sm text-muted-foreground">{team.company}</p>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <BriefcaseBusiness className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>Open Positions:</span>
                      <div className="flex flex-wrap ml-2 gap-1">
                        {team.positions.map((position, index) => (
                          <Badge key={index} variant="outline">{position}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium">Requirements:</p>
                      <ul className="text-sm list-disc list-inside ml-2">
                        {team.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex flex-col items-end justify-end">
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">Learn More</Button>
                      <Button size="sm">Apply to Join</Button>
                    </div>
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
