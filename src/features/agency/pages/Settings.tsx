import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Save, 
  Edit,
  Upload,
  User,
  Bell,
  CreditCard,
  Shield,
  Users,
  Building2,
  FileText,
  Calendar,
  Clock
} from "lucide-react";

export function AgencySettings() {
  const [activeTab, setActiveTab] = useState("profile");
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Agency Settings</h1>
        <Button className="flex items-center gap-1">
          <Save className="h-4 w-4" />
          <span>Save Changes</span>
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="agency">Agency Details</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        
        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Agency Profile</CardTitle>
              <CardDescription>Manage your agency's public profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex flex-col items-center gap-2">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary text-white text-xl">EP</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm" className="mt-2 flex items-center gap-1">
                    <Upload className="h-4 w-4" />
                    <span>Upload Logo</span>
                  </Button>
                </div>
                
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <div className="space-y-2">
                    <Label htmlFor="agency-name">Agency Name</Label>
                    <Input id="agency-name" defaultValue="Elite Professionals Staffing" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="founded-year">Founded Year</Label>
                    <Input id="founded-year" type="number" defaultValue="2015" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agency-email">Business Email</Label>
                    <Input id="agency-email" type="email" defaultValue="contact@eliteprofessionals.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agency-phone">Business Phone</Label>
                    <Input id="agency-phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" defaultValue="https://eliteprofessionals.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Primary Location</Label>
                    <Input id="location" defaultValue="New York, NY" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Agency Description</Label>
                    <Textarea 
                      id="description" 
                      rows={3}
                      defaultValue="Elite Professionals provides premier staffing solutions for the hospitality industry, connecting top talent with leading businesses for over a decade."
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Specializations</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="spec1" className="rounded" defaultChecked />
                    <Label htmlFor="spec1">Hospitality</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="spec2" className="rounded" defaultChecked />
                    <Label htmlFor="spec2">Events</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="spec3" className="rounded" defaultChecked />
                    <Label htmlFor="spec3">Food Service</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="spec4" className="rounded" />
                    <Label htmlFor="spec4">Hotel</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="spec5" className="rounded" />
                    <Label htmlFor="spec5">Corporate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="spec6" className="rounded" defaultChecked />
                    <Label htmlFor="spec6">Bartending</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="spec7" className="rounded" />
                    <Label htmlFor="spec7">Security</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="spec8" className="rounded" />
                    <Label htmlFor="spec8">Cleaning</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Primary Contact Person</CardTitle>
              <CardDescription>Information about the main contact for this agency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Full Name</Label>
                  <Input id="contact-name" defaultValue="Jennifer Martinez" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-position">Position</Label>
                  <Input id="contact-position" defaultValue="Agency Director" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input id="contact-email" type="email" defaultValue="jennifer@eliteprofessionals.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Direct Phone</Label>
                  <Input id="contact-phone" defaultValue="+1 (555) 987-6543" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Agency Details */}
        <TabsContent value="agency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Legal Information</CardTitle>
              <CardDescription>Your agency's official business information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="legal-name">Legal Business Name</Label>
                  <Input id="legal-name" defaultValue="Elite Professionals Staffing LLC" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-id">Tax ID / EIN</Label>
                  <Input id="tax-id" defaultValue="XX-XXXXXXX" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-type">Business Type</Label>
                  <select id="business-type" className="w-full p-2 border border-gray-300 rounded-md">
                    <option>Sole Proprietorship</option>
                    <option selected>Limited Liability Company (LLC)</option>
                    <option>Corporation</option>
                    <option>Partnership</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registration-number">Registration Number</Label>
                  <Input id="registration-number" defaultValue="B12345678" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="business-address">Business Address</Label>
                <Textarea 
                  id="business-address" 
                  rows={2}
                  defaultValue="123 Business Avenue, Suite 500, New York, NY 10001"
                />
              </div>
              
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Insurance Verified</h3>
                    <p className="text-sm text-gray-500">Business liability insurance verified</p>
                  </div>
                  <Switch id="insurance-verified" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Background Checks</h3>
                    <p className="text-sm text-gray-500">Perform background checks on all staff</p>
                  </div>
                  <Switch id="background-checks" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Certification Verified</h3>
                    <p className="text-sm text-gray-500">Staffing agency certifications verified</p>
                  </div>
                  <Switch id="certification-verified" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Service Offerings</CardTitle>
              <CardDescription>Types of staffing services your agency provides</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-md hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                  <div className="flex items-center mb-2">
                    <Users className="h-5 w-5 text-primary mr-2" />
                    <h3 className="font-medium">Temporary Staffing</h3>
                  </div>
                  <p className="text-sm text-gray-500">Short-term staff for events and projects</p>
                </div>
                
                <div className="p-4 border border-primary rounded-md bg-primary/5 cursor-pointer">
                  <div className="flex items-center mb-2">
                    <Building2 className="h-5 w-5 text-primary mr-2" />
                    <h3 className="font-medium">Hospitality Specialists</h3>
                  </div>
                  <p className="text-sm text-gray-500">Expert staff for hotels and restaurants</p>
                </div>
                
                <div className="p-4 border rounded-md hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                  <div className="flex items-center mb-2">
                    <Calendar className="h-5 w-5 text-primary mr-2" />
                    <h3 className="font-medium">Event Staffing</h3>
                  </div>
                  <p className="text-sm text-gray-500">Specialized staff for events and occasions</p>
                </div>
                
                <div className="p-4 border rounded-md hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                  <div className="flex items-center mb-2">
                    <FileText className="h-5 w-5 text-primary mr-2" />
                    <h3 className="font-medium">Contract-to-Hire</h3>
                  </div>
                  <p className="text-sm text-gray-500">Trial periods with potential for full-time</p>
                </div>
                
                <div className="p-4 border rounded-md hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                  <div className="flex items-center mb-2">
                    <Clock className="h-5 w-5 text-primary mr-2" />
                    <h3 className="font-medium">On-Demand Staffing</h3>
                  </div>
                  <p className="text-sm text-gray-500">Last-minute staff for urgent needs</p>
                </div>
                
                <div className="p-4 border border-dashed rounded-md hover:border-primary transition-all cursor-pointer flex items-center justify-center">
                  <span className="text-primary font-medium">+ Add Service</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Shift Requests</p>
                        <p className="text-sm text-gray-500">When businesses request staff</p>
                      </div>
                      <Switch id="email-shift-requests" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Staff Applications</p>
                        <p className="text-sm text-gray-500">When workers apply to your agency</p>
                      </div>
                      <Switch id="email-staff-apps" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Payment Notifications</p>
                        <p className="text-sm text-gray-500">Payment received or processed</p>
                      </div>
                      <Switch id="email-payments" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-4">In-App Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Staff Check-ins</p>
                        <p className="text-sm text-gray-500">When staff check in to shifts</p>
                      </div>
                      <Switch id="app-checkins" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Shift Completion</p>
                        <p className="text-sm text-gray-500">When shifts are completed</p>
                      </div>
                      <Switch id="app-completion" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Messages</p>
                        <p className="text-sm text-gray-500">New messages from staff or businesses</p>
                      </div>
                      <Switch id="app-messages" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-4">Text/SMS Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Urgent Shift Requests</p>
                        <p className="text-sm text-gray-500">Last-minute or urgent staffing needs</p>
                      </div>
                      <Switch id="sms-urgent" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Shift Cancellations</p>
                        <p className="text-sm text-gray-500">When shifts are cancelled</p>
                      </div>
                      <Switch id="sms-cancellations" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Billing Tab - Just one example, others would follow the same pattern */}
        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>Manage your payment methods and billing details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Payment Methods</h3>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-50 p-2 rounded">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-sm text-gray-500">Expires 12/25</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Default</div>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="mt-2">+ Add Payment Method</Button>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="font-medium mb-4">Billing Address</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="billing-name">Name on Card</Label>
                    <Input id="billing-name" defaultValue="Elite Professionals LLC" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="billing-country">Country</Label>
                    <select id="billing-country" className="w-full p-2 border border-gray-300 rounded-md">
                      <option selected>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                    </select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="billing-address">Street Address</Label>
                    <Textarea 
                      id="billing-address" 
                      rows={2}
                      defaultValue="123 Business Avenue, Suite 500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="billing-city">City</Label>
                    <Input id="billing-city" defaultValue="New York" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="billing-state">State/Province</Label>
                      <Input id="billing-state" defaultValue="NY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="billing-zip">ZIP/Postal Code</Label>
                      <Input id="billing-zip" defaultValue="10001" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="font-medium mb-4">Billing Preferences</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Automatic Payments</p>
                      <p className="text-sm text-gray-500">Automatically charge your default payment method</p>
                    </div>
                    <Switch id="auto-payments" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Receipts</p>
                      <p className="text-sm text-gray-500">Send receipts to your email</p>
                    </div>
                    <Switch id="email-receipts" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Other tabs would be implemented in the same pattern */}
      </Tabs>
    </div>
  );
}
