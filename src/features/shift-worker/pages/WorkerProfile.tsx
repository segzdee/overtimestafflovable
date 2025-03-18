
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/components/ui/use-toast";

export function WorkerProfile() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    bio: "",
    hourlyRate: "",
    availability: {
      monday: { morning: false, afternoon: false, evening: false },
      tuesday: { morning: false, afternoon: false, evening: false },
      wednesday: { morning: false, afternoon: false, evening: false },
      thursday: { morning: false, afternoon: false, evening: false },
      friday: { morning: false, afternoon: false, evening: false },
      saturday: { morning: false, afternoon: false, evening: false },
      sunday: { morning: false, afternoon: false, evening: false },
    },
  });
  
  const [skills] = useState([
    "Server", "Bartender", "Host/Hostess", "Line Cook", "Dishwasher", "Barista"
  ]);
  
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill) 
        : [...prev, skill]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <Button size="sm">Preview Public Profile</Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage alt={user?.name || "Profile"} />
                  <AvatarFallback className="text-2xl">
                    {user?.name?.charAt(0) || "S"}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">{user?.name || "Shift Worker"}</h2>
                <p className="text-sm text-muted-foreground mb-4">{user?.email || "email@example.com"}</p>
                
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {selectedSkills.map(skill => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
                
                <div className="w-full px-4 py-2 bg-muted rounded-md mb-2">
                  <p className="text-sm font-medium">Overall Rating</p>
                  <div className="flex items-center justify-center text-lg font-bold">
                    4.8/5.0
                  </div>
                </div>
                
                <div className="w-full px-4 py-2 bg-muted rounded-md mb-2">
                  <p className="text-sm font-medium">Shifts Completed</p>
                  <div className="flex items-center justify-center text-lg font-bold">
                    32
                  </div>
                </div>
                
                <Button className="w-full" variant="outline">
                  Upload New Photo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:w-2/3">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="mb-4 grid grid-cols-3 gap-2">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="work">Work Preferences</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(123) 456-7890"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address" 
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="123 Main St, City, State, ZIP"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio / About Me</Label>
                      <Textarea 
                        id="bio" 
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Tell potential employers about yourself..."
                        rows={4}
                      />
                    </div>
                    
                    <Button type="submit">Save Changes</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="work">
              <Card>
                <CardHeader>
                  <CardTitle>Work Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="hourlyRate" className="mb-2 block">Hourly Rate (USD)</Label>
                      <Input 
                        id="hourlyRate" 
                        name="hourlyRate"
                        value={formData.hourlyRate}
                        onChange={handleChange}
                        placeholder="18.00"
                        className="max-w-xs"
                      />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {skills.map(skill => (
                          <Button
                            key={skill}
                            type="button"
                            variant={selectedSkills.includes(skill) ? "default" : "outline"}
                            onClick={() => handleSkillToggle(skill)}
                            className="rounded-full"
                          >
                            {skill}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Availability</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {Object.entries(formData.availability).map(([day, slots]) => (
                          <div key={day} className="border rounded-lg p-3">
                            <h4 className="font-medium capitalize mb-2">{day}</h4>
                            <div className="space-y-1">
                              {Object.entries(slots).map(([timeSlot, isAvailable]) => (
                                <div key={`${day}-${timeSlot}`} className="flex items-center">
                                  <input
                                    type="checkbox"
                                    id={`${day}-${timeSlot}`}
                                    checked={isAvailable}
                                    onChange={() => {
                                      const newAvailability = {...formData.availability};
                                      newAvailability[day as keyof typeof formData.availability][timeSlot as keyof typeof slots] = !isAvailable;
                                      setFormData(prev => ({
                                        ...prev,
                                        availability: newAvailability
                                      }));
                                    }}
                                    className="mr-2"
                                  />
                                  <label htmlFor={`${day}-${timeSlot}`} className="text-sm capitalize">
                                    {timeSlot}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button type="submit">Save Preferences</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Documents & Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Upload your certifications, work permits, and other documents to verify your qualifications.
                    </p>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">ID Verification</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Upload a government-issued ID to verify your identity.
                      </p>
                      <Button variant="outline" size="sm">Upload ID</Button>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Certifications</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Upload any relevant certifications (e.g., Food Handler's Card, Bartender License).
                      </p>
                      <Button variant="outline" size="sm">Add Certification</Button>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Background Check</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Status: <span className="text-yellow-600 font-medium">Pending</span>
                      </p>
                      <Button variant="outline" size="sm">Request Check</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
