import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Save, 
  Bell, 
  Shield, 
  Globe, 
  Database, 
  Mail, 
  CreditCard, 
  Smartphone,
  RefreshCw,
  AlertTriangle
} from "lucide-react";

export function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">System Settings</h1>
        <Button className="flex items-center gap-1">
          <Save className="h-4 w-4" />
          <span>Save Changes</span>
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Settings</CardTitle>
              <CardDescription>Configure basic system settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input id="platform-name" defaultValue="StaffSync Platform" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input id="support-email" type="email" defaultValue="support@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Contact Phone</Label>
                  <Input id="contact-phone" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time-zone">Default Time Zone</Label>
                  <select id="time-zone" className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="UTC-8">Pacific Time (PT)</option>
                    <option value="UTC-7">Mountain Time (MT)</option>
                    <option value="UTC-6">Central Time (CT)</option>
                    <option value="UTC-5" selected>Eastern Time (ET)</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="platform-description">Platform Description</Label>
                <Textarea 
                  id="platform-description" 
                  rows={3}
                  defaultValue="The all-in-one platform connecting staff, agencies and businesses"
                />
              </div>
              
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Maintenance Mode</h3>
                    <p className="text-sm text-gray-500">Temporarily disable user access for maintenance</p>
                  </div>
                  <Switch id="maintenance-mode" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">New User Registration</h3>
                    <p className="text-sm text-gray-500">Allow new users to register on the platform</p>
                  </div>
                  <Switch id="registration" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Public API Access</h3>
                    <p className="text-sm text-gray-500">Enable access to public API endpoints</p>
                  </div>
                  <Switch id="api-access" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the platform look and feel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 rounded-md text-center hover:border-primary transition-all cursor-pointer">
                  <div className="h-20 bg-white border border-gray-200 rounded mb-2"></div>
                  <p className="text-sm font-medium">Light Theme</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-md text-center hover:border-primary transition-all cursor-pointer">
                  <div className="h-20 bg-gray-800 border border-gray-700 rounded mb-2"></div>
                  <p className="text-sm font-medium">Dark Theme</p>
                </div>
                <div className="p-4 border border-primary rounded-md text-center bg-primary/5">
                  <div className="h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded mb-2"></div>
                  <p className="text-sm font-medium text-primary">Branded Theme</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Authentication</CardTitle>
              <CardDescription>Configure user authentication policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500">Require 2FA for all users</p>
                  </div>
                  <Switch id="require-2fa" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Auto Logout</h3>
                    <p className="text-sm text-gray-500">Automatically log out inactive users</p>
                  </div>
                  <Switch id="auto-logout" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Password Expiration</h3>
                    <p className="text-sm text-gray-500">Force password reset every 90 days</p>
                  </div>
                  <Switch id="password-expiration" defaultChecked />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="min-password-length">Minimum Password Length</Label>
                  <Input id="min-password-length" type="number" defaultValue="10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-login-attempts">Maximum Login Attempts</Label>
                  <Input id="max-login-attempts" type="number" defaultValue="5" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Data Protection</CardTitle>
              <CardDescription>Configure data protection settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Data Encryption</h3>
                    <p className="text-sm text-gray-500">Enable encryption for stored data</p>
                  </div>
                  <Switch id="encryption" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Data Retention</h3>
                    <p className="text-sm text-gray-500">Automatically purge data older than 5 years</p>
                  </div>
                  <Switch id="data-retention" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">GDPR Compliance</h3>
                    <p className="text-sm text-gray-500">Enable GDPR compliance features</p>
                  </div>
                  <Switch id="gdpr" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure system-wide notification settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <Bell className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">System Alerts</h3>
                      <p className="text-sm text-gray-500">Critical system notifications</p>
                    </div>
                  </div>
                  <Switch id="system-alerts" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Security Alerts</h3>
                      <p className="text-sm text-gray-500">Login attempts and security issues</p>
                    </div>
                  </div>
                  <Switch id="security-alerts" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-gray-500">Enable email notifications</p>
                    </div>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <Smartphone className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Push Notifications</h3>
                      <p className="text-sm text-gray-500">Enable push notifications</p>
                    </div>
                  </div>
                  <Switch id="push-notifications" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>System Integrations</CardTitle>
              <CardDescription>Manage external service integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded bg-blue-100 flex items-center justify-center">
                      <Globe className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Google Calendar</h3>
                      <p className="text-sm text-gray-500">Sync shift schedules with Google Calendar</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded bg-green-100 flex items-center justify-center">
                      <Database className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Salesforce</h3>
                      <p className="text-sm text-gray-500">Connect with Salesforce CRM</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
                
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded bg-purple-100 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Mailchimp</h3>
                      <p className="text-sm text-gray-500">Email marketing automation</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded bg-blue-100 flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Stripe</h3>
                      <p className="text-sm text-gray-500">Payment processing</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="bg-green-50 text-green-600 border-green-200">Connected</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Settings</CardTitle>
              <CardDescription>Configure payment and billing options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Automated Billing</h3>
                    <p className="text-sm text-gray-500">Automatically bill customers on schedule</p>
                  </div>
                  <Switch id="auto-billing" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Invoice Generation</h3>
                    <p className="text-sm text-gray-500">Automatically generate invoices</p>
                  </div>
                  <Switch id="auto-invoices" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Payment Reminders</h3>
                    <p className="text-sm text-gray-500">Send payment reminders for overdue invoices</p>
                  </div>
                  <Switch id="payment-reminders" defaultChecked />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="payment-gateway">Default Payment Gateway</Label>
                  <select id="payment-gateway" className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="stripe" selected>Stripe</option>
                    <option value="paypal">PayPal</option>
                    <option value="square">Square</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <select id="currency" className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="usd" selected>USD ($)</option>
                    <option value="eur">EUR (€)</option>
                    <option value="gbp">GBP (£)</option>
                    <option value="cad">CAD ($)</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle>System Maintenance</CardTitle>
              <CardDescription>Manage system maintenance operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 border border-amber-200 bg-amber-50 rounded-md">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-amber-700">Caution Required</h3>
                    <p className="text-sm text-amber-600">These actions can impact system performance and availability.</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="shadow-none border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Database Optimization</CardTitle>
                    <CardDescription>Optimize database performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">Last optimized: 7 days ago</p>
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <RefreshCw className="h-4 w-4" />
                      <span>Run Optimization</span>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="shadow-none border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Cache Management</CardTitle>
                    <CardDescription>Clear system caches</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">Last cleared: 2 days ago</p>
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <RefreshCw className="h-4 w-4" />
                      <span>Clear Cache</span>
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="shadow-none border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">System Backup</CardTitle>
                    <CardDescription>Create a backup of all system data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">Last backup: Yesterday at 3:00 AM</p>
                    <Button variant="outline" className="w-full">Create Backup</Button>
                  </CardContent>
                </Card>
                
                <Card className="shadow-none border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Storage Management</CardTitle>
                    <CardDescription>Manage system storage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Storage used</span>
                        <span className="font-medium">68%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-blue-600 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500">246 GB of 360 GB used</p>
                    </div>
                    <Button variant="outline" className="w-full">Manage Storage</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
