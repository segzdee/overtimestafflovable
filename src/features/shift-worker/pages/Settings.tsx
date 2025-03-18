
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Lock, 
  Globe, 
  Smartphone, 
  PanelLeft, 
  DollarSign,
  LogOut,
  HelpCircle,
  Language,
  Plus
} from "lucide-react";

export function Settings() {
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    newShifts: true,
    shiftUpdates: true,
    payments: true,
    teamMessages: true,
    marketing: false
  });
  
  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    shareAvailability: true,
    shareWorkHistory: true,
    allowLocationTracking: false
  });
  
  const [preferences, setPreferences] = useState({
    theme: "light",
    language: "english",
    distanceUnit: "miles",
    hourFormat: "12h",
    currency: "usd",
    autoApply: false,
    maxTravelDistance: 25
  });
  
  const handleSaveSettings = (section: string) => {
    toast({
      title: "Settings Saved",
      description: `Your ${section} settings have been updated.`
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-2">
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center">
            <PanelLeft className="h-4 w-4 mr-2" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center">
            <Lock className="h-4 w-4 mr-2" />
            Privacy & Security
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center">
            <DollarSign className="h-4 w-4 mr-2" />
            Account & Payments
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Channels</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch 
                  checked={notifications.email}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, email: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications on your device
                  </p>
                </div>
                <Switch 
                  checked={notifications.push}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, push: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive text messages for urgent updates
                  </p>
                </div>
                <Switch 
                  checked={notifications.sms}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, sms: checked})
                  }
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Notification Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <Label className="text-base">New Available Shifts</Label>
                <Switch 
                  checked={notifications.newShifts}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, newShifts: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label className="text-base">Shift Updates & Reminders</Label>
                <Switch 
                  checked={notifications.shiftUpdates}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, shiftUpdates: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label className="text-base">Payment Notifications</Label>
                <Switch 
                  checked={notifications.payments}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, payments: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label className="text-base">Team Messages</Label>
                <Switch 
                  checked={notifications.teamMessages}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, teamMessages: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label className="text-base">Marketing & Promotions</Label>
                <Switch 
                  checked={notifications.marketing}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, marketing: checked})
                  }
                />
              </div>
              
              <Button onClick={() => handleSaveSettings('notification')}>
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>App Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select 
                  value={preferences.theme} 
                  onValueChange={(value) => setPreferences({...preferences, theme: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select 
                  value={preferences.language} 
                  onValueChange={(value) => setPreferences({...preferences, language: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hourFormat">Time Format</Label>
                <Select 
                  value={preferences.hourFormat} 
                  onValueChange={(value) => setPreferences({...preferences, hourFormat: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                    <SelectItem value="24h">24-hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select 
                  value={preferences.currency} 
                  onValueChange={(value) => setPreferences({...preferences, currency: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                    <SelectItem value="gbp">GBP (£)</SelectItem>
                    <SelectItem value="cad">CAD ($)</SelectItem>
                    <SelectItem value="aud">AUD ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Work Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Automatically Apply for Matching Shifts</Label>
                  <Switch 
                    checked={preferences.autoApply}
                    onCheckedChange={(checked) => 
                      setPreferences({...preferences, autoApply: checked})
                    }
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  When enabled, we'll automatically apply for shifts that match your skills and availability.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Maximum Travel Distance: {preferences.maxTravelDistance} miles</Label>
                </div>
                <Slider 
                  value={[preferences.maxTravelDistance]} 
                  min={1} 
                  max={50} 
                  step={1}
                  onValueChange={(value) => setPreferences({...preferences, maxTravelDistance: value[0]})}
                />
                <p className="text-sm text-muted-foreground">
                  We'll only show you shifts within this distance from your location.
                </p>
              </div>
              
              <Button onClick={() => handleSaveSettings('preference')}>
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="profileVisibility">Profile Visibility</Label>
                <Select 
                  value={privacy.profileVisibility} 
                  onValueChange={(value) => setPrivacy({...privacy, profileVisibility: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Who can see your profile" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public (All Companies)</SelectItem>
                    <SelectItem value="approved">Approved Companies Only</SelectItem>
                    <SelectItem value="private">Private (Only When Applied)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Share Availability</Label>
                  <p className="text-sm text-muted-foreground">
                    Let companies see when you're available to work
                  </p>
                </div>
                <Switch 
                  checked={privacy.shareAvailability}
                  onCheckedChange={(checked) => 
                    setPrivacy({...privacy, shareAvailability: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Share Work History</Label>
                  <p className="text-sm text-muted-foreground">
                    Let companies see your past work experience
                  </p>
                </div>
                <Switch 
                  checked={privacy.shareWorkHistory}
                  onCheckedChange={(checked) => 
                    setPrivacy({...privacy, shareWorkHistory: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Location Tracking</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow location tracking during shifts
                  </p>
                </div>
                <Switch 
                  checked={privacy.allowLocationTracking}
                  onCheckedChange={(checked) => 
                    setPrivacy({...privacy, allowLocationTracking: checked})
                  }
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Lock className="mr-2 h-4 w-4" />
                Change Password
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Smartphone className="mr-2 h-4 w-4" />
                Two-Factor Authentication
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Globe className="mr-2 h-4 w-4" />
                Connected Accounts
              </Button>
              
              <Button variant="outline" className="w-full justify-start" onClick={() => handleSaveSettings('security')}>
                <Language className="mr-2 h-4 w-4" />
                View Login Activity
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="bg-gray-100 rounded-md w-10 h-6 flex items-center justify-center mr-3">
                      <DollarSign className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Direct Deposit</p>
                      <p className="text-sm text-muted-foreground">****6789</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Default</Badge>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm">Remove</Button>
                </div>
              </div>
              
              <Button className="w-full" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Payment Method
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tax Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                Manage your tax documents and information for accurate reporting.
              </p>
              
              <div className="space-y-2">
                <Label htmlFor="taxId">Tax ID (SSN/EIN)</Label>
                <Input
                  id="taxId"
                  type="password"
                  placeholder="XXX-XX-XXXX"
                  value="***-**-1234"
                  readOnly
                />
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline">View Tax Documents</Button>
                <Button onClick={() => handleSaveSettings('tax')}>Update Information</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <HelpCircle className="mr-2 h-4 w-4" />
                Help & Support
              </Button>
              
              <Button variant="outline" className="w-full justify-start text-amber-600 hover:text-amber-700 hover:bg-amber-50">
                Pause Account
              </Button>
              
              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                Delete Account
              </Button>
              
              <Button variant="destructive" className="w-full justify-start">
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
