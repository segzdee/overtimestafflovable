
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Star, MapPin, Building, BriefcaseBusiness } from "lucide-react";

export function Companies() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  
  const industries = ["Hospitality", "Restaurant", "Retail", "Event", "Office"];
  
  const [companies] = useState([
    {
      id: 1,
      name: "Grand Hotel Group",
      logo: "/logo-placeholder.svg",
      industry: "Hospitality",
      rating: 4.8,
      locations: ["Downtown", "Uptown", "Waterfront"],
      shifts: 12,
      description: "Luxury hotel chain with multiple properties across the city.",
    },
    {
      id: 2,
      name: "Fine Dining Restaurants",
      logo: "/logo-placeholder.svg",
      industry: "Restaurant",
      rating: 4.6,
      locations: ["Downtown", "Financial District"],
      shifts: 8,
      description: "Upscale dining experiences with a focus on local ingredients.",
    },
    {
      id: 3,
      name: "City Conference Center",
      logo: "/logo-placeholder.svg",
      industry: "Event",
      rating: 4.7,
      locations: ["Convention Center"],
      shifts: 15,
      description: "Large event venue hosting conferences, expos, and special events.",
    },
    {
      id: 4,
      name: "Urban Retail Group",
      logo: "/logo-placeholder.svg",
      industry: "Retail",
      rating: 4.3,
      locations: ["Mall", "Shopping District"],
      shifts: 6,
      description: "Fashion and lifestyle retail chain with multiple locations.",
    },
    {
      id: 5,
      name: "Corporate Tower Offices",
      logo: "/logo-placeholder.svg",
      industry: "Office",
      rating: 4.5,
      locations: ["Business Park", "Downtown"],
      shifts: 4,
      description: "Professional office spaces requiring administrative support.",
    },
  ]);
  
  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = !selectedIndustry || company.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Companies</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search companies..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2 overflow-auto pb-2">
          <Button
            variant={!selectedIndustry ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedIndustry(null)}
          >
            All
          </Button>
          {industries.map(industry => (
            <Button
              key={industry}
              variant={selectedIndustry === industry ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedIndustry(industry)}
            >
              {industry}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {filteredCompanies.map(company => (
          <Card key={company.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 flex items-center justify-center p-6 bg-muted">
                  <div className="w-24 h-24 flex items-center justify-center bg-white rounded-full">
                    <Building className="h-12 w-12 text-primary" />
                  </div>
                </div>
                
                <div className="md:w-3/4 p-6">
                  <div className="flex flex-col md:flex-row justify-between mb-2">
                    <h2 className="text-xl font-bold">{company.name}</h2>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{company.industry}</Badge>
                      <div className="flex items-center">
                        <Star className="fill-yellow-400 stroke-yellow-400 h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">{company.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">{company.description}</p>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div className="flex items-center mb-2 sm:mb-0">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{company.locations.join(", ")}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="text-sm">
                        <BriefcaseBusiness className="inline h-4 w-4 mr-1" /> 
                        <span>{company.shifts} active shifts</span>
                      </div>
                      <Button size="sm">View Shifts</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
