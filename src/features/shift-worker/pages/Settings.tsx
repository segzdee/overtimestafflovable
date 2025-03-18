
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Calendar, 
  Languages, 
  DollarSign, 
  Map, 
  FileText, 
  Key, 
  Mail, 
  Smartphone 
} from "lucide-react";

export function Settings() {
  const [accountTab, setAccountTab] = useState("profile");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [profileCompletion] = useState(75);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">Profile Completion: {profileCompletion}%</Badge>
          <Progress value={profileCompletion} className="w-24 h-2" />
        </div>
      </div>

      <Separator />

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid grid-cols-2 sm:grid-cols-5 w-full h-auto mb-6">
          <TabsTrigger value="account" className="p-3">
            <User className="h-4 w-4 mr-2 hidden sm:inline-block" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="p-3">
            <Bell className="h-4 w-4 mr-2 hidden sm:inline-block" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="p-3">
            <Shield className="h-4 w-4 mr-2 hidden sm:inline-block" />
            Security
          </TabsTrigger>
          <TabsTrigger value="payment" className="p-3">
            <CreditCard className="h-4 w-4 mr-2 hidden sm:inline-block" />
            Payment
          </TabsTrigger>
          <TabsTrigger value="billing" className="p-3">
            <FileText className="h-4 w-4 mr-2 hidden sm:inline-block" />
            Documents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Account Preferences</CardTitle>
                  <CardDescription>Manage your account settings</CardDescription>
                </div>
                <Tabs value={accountTab} onValueChange={setAccountTab} className="hidden sm:block">
                  <TabsList className="grid grid-cols-3 w-[400px]">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                    <TabsTrigger value="availability">Availability</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="sm:hidden mb-4">
                <Label>Section</Label>
                <Select value={accountTab} onValueChange={setAccountTab}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="profile">Profile</SelectItem>
                    <SelectItem value="preferences">Preferences</SelectItem>
                    <SelectItem value="availability">Availability</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {accountTab === "profile" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue="Jane Smith" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" defaultValue="jane.smith@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue="+1 (555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="job-title">Job Title</Label>
                      <Input id="job-title" defaultValue="Registered Nurse" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" rows={3} placeholder="Write a short bio about yourself..." />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="us-east">
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us-east">Eastern Time (ET)</SelectItem>
                          <SelectItem value="us-central">Central Time (CT)</SelectItem>
                          <SelectItem value="us-mountain">Mountain Time (MT)</SelectItem>
                          <SelectItem value="us-pacific">Pacific Time (PT)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {accountTab === "preferences" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium flex items-center">
                      <Languages className="h-4 w-4 mr-2" />
                      Language and Region
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="display-language">Display Language</Label>
                        <Select defaultValue="en">
                          <SelectTrigger id="display-language">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="date-format">Date Format</Label>
                        <Select defaultValue="mdy">
                          <SelectTrigger id="date-format">
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                            <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                            <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium flex items-center">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Payment Preferences
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="currency">Currency</Label>
                        <Select defaultValue="usd">
                          <SelectTrigger id="currency">
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="usd">USD ($)</SelectItem>
                            <SelectItem value="eur">EUR (€)</SelectItem>
                            <SelectItem value="gbp">GBP (£)</SelectItem>
                            <SelectItem value="cad">CAD ($)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="payment-method">Default Payment Method</Label>
                        <Select defaultValue="direct">
                          <SelectTrigger id="payment-method">
                            <SelectValue placeholder="Select method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="direct">Direct Deposit</SelectItem>
                            <SelectItem value="paypal">PayPal</SelectItem>
                            <SelectItem value="check">Check</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium flex items-center">
                      <Map className="h-4 w-4 mr-2" />
                      Location Settings
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="radius">Work Radius (miles)</Label>
                        <Input id="radius" type="number" defaultValue="25" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Primary Location</Label>
                        <Input id="location" defaultValue="San Francisco, CA" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {accountTab === "availability" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Shift Preferences
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="max-hours">Max Hours Per Week</Label>
                        <Input id="max-hours" type="number" defaultValue="40" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="min-rate">Minimum Hourly Rate</Label>
                        <Input id="min-rate" type="number" defaultValue="25" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Preferred Shift Types</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="day-shift" defaultChecked />
                          <Label htmlFor="day-shift">Day Shift</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="night-shift" />
                          <Label htmlFor="night-shift">Night Shift</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="evening-shift" defaultChecked />
                          <Label htmlFor="evening-shift">Evening</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="weekend-shift" defaultChecked />
                          <Label htmlFor="weekend-shift">Weekend</Label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Available Days</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="monday" defaultChecked />
                        <Label htmlFor="monday">Monday</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="tuesday" defaultChecked />
                        <Label htmlFor="tuesday">Tuesday</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="wednesday" defaultChecked />
                        <Label htmlFor="wednesday">Wednesday</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="thursday" defaultChecked />
                        <Label htmlFor="thursday">Thursday</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="friday" defaultChecked />
                        <Label htmlFor="friday">Friday</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="saturday" />
                        <Label htmlFor="saturday">Saturday</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="sunday" />
                        <Label htmlFor="sunday">Sunday</Label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Control how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Notifications</Label>
                  <p className="text-sm text-muted-foreground">Enable or disable all notifications</p>
                </div>
                <Switch 
                  id="notifications" 
                  checked={notificationsEnabled} 
                  onCheckedChange={setNotificationsEnabled} 
                />
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Notifications
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications">All email notifications</Label>
                    <Switch 
                      id="email-notifications" 
                      checked={emailNotifications && notificationsEnabled} 
                      onCheckedChange={setEmailNotifications} 
                      disabled={!notificationsEnabled} 
                    />
                  </div>
                  <div className="space-y-2 ml-6">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="shift-alerts">New shift alerts</Label>
                      <Switch id="shift-alerts" defaultChecked disabled={!emailNotifications || !notificationsEnabled} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="application-updates">Application updates</Label>
                      <Switch id="application-updates" defaultChecked disabled={!emailNotifications || !notificationsEnabled} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="payment-confirmation">Payment confirmations</Label>
                      <Switch id="payment-confirmation" defaultChecked disabled={!emailNotifications || !notificationsEnabled} />
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium flex items-center">
                  <Smartphone className="h-4 w-4 mr-2" />
                  SMS Notifications
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-notifications">All SMS notifications</Label>
                    <Switch 
                      id="sms-notifications" 
                      checked={smsNotifications && notificationsEnabled} 
                      onCheckedChange={setSmsNotifications}
                      disabled={!notificationsEnabled} 
                    />
                  </div>
                  <div className="space-y-2 ml-6">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="urgent-alerts">Urgent shift alerts</Label>
                      <Switch id="urgent-alerts" defaultChecked disabled={!smsNotifications || !notificationsEnabled} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="shift-reminders">Shift reminders</Label>
                      <Switch id="shift-reminders" defaultChecked disabled={!smsNotifications || !notificationsEnabled} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and authentication methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium flex items-center">
                  <Key className="h-4 w-4 mr-2" />
                  Password
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div></div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Two-Factor Authentication
                </h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">Enable 2FA</Label>
                    <p className="text-sm text-muted-foreground">Protect your account with two-factor authentication</p>
                  </div>
                  <Switch id="two-factor" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Session Management</h3>
                <Button variant="outline" className="w-full sm:w-auto">Sign Out All Other Devices</Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Direct Deposit</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="account-name">Account Holder Name</Label>
                    <Input id="account-name" defaultValue="Jane Smith" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="account-number">Account Number</Label>
                    <Input id="account-number" defaultValue="••••••••1234" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="routing-number">Routing Number</Label>
                    <Input id="routing-number" defaultValue="••••••••5678" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bank-name">Bank Name</Label>
                    <Input id="bank-name" defaultValue="National Bank" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Tax Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="tax-id">Tax ID (SSN/EIN)</Label>
                    <Input id="tax-id" defaultValue="XXX-XX-1234" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tax-status">Tax Status</Label>
                    <Select defaultValue="w2">
                      <SelectTrigger id="tax-status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="w2">W-2 Employee</SelectItem>
                        <SelectItem value="1099">1099 Contractor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Document Management</CardTitle>
              <CardDescription>Manage your documents and certifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Uploaded Documents</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-gray-500" />
                      <span>Nursing_License.pdf</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700">Active</Badge>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-gray-500" />
                      <span>CPR_Certification.pdf</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-yellow-50 border-yellow-200 text-yellow-700">Expiring Soon</Badge>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-gray-500" />
                      <span>Immunization_Records.pdf</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700">Active</Badge>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Upload New Document</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="document-type">Document Type</Label>
                    <Select>
                      <SelectTrigger id="document-type">
                        <SelectValue placeholder="Select document type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="license">Professional License</SelectItem>
                        <SelectItem value="certification">Certification</SelectItem>
                        <SelectItem value="id">ID Verification</SelectItem>
                        <SelectItem value="insurance">Insurance</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiry-date">Expiry Date (if applicable)</Label>
                    <Input id="expiry-date" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="document-upload">Upload File</Label>
                  <Input id="document-upload" type="file" />
                </div>
                <Button className="mt-4">Upload Document</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
