
import React, { useState } from 'react';
import { 
  Cpu, 
  Zap, 
  Clock, 
  Calendar,
  MessageSquare,
  Settings,
  ChevronDown,
  ChevronUp,
  Users,
  CheckCircle,
  PlusCircle,
  ExternalLink,
  Lock,
  ToggleLeft,
  ToggleRight,
  Info,
  AlertCircle,
  Copy,
  Key,
  BarChart,
  ChevronRight,
  X
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface AIAgentWidgetProps {
  isSubscribed?: boolean;
  userType?: "agency" | "company" | "aiagent" | "admin";
}

const AIAgentWidget: React.FC<AIAgentWidgetProps> = ({ 
  isSubscribed = false, 
  userType = "agency" 
}) => {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('actions');
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  
  // Mock token for demonstration
  const apiToken = "ovt_ai_28fb6e7a9c1d4b5f8e2a3d7c6b5a9e8d";
  
  // Mock automation settings
  const [automationSettings, setAutomationSettings] = useState({
    autoStaffing: userType === "company",
    notifyLowStaff: true,
    weeklyReports: true,
    smartPricing: userType === "agency",
    autoApprove: false,
    predictiveDemand: true
  });

  // Toggle a setting
  const toggleSetting = (setting: string) => {
    if (!isSubscribed) {
      setShowSubscribeModal(true);
      return;
    }
    setAutomationSettings({
      ...automationSettings,
      [setting]: !automationSettings[setting as keyof typeof automationSettings]
    });
  };

  // Mock automation activity log
  const activityLog = [
    { id: 1, action: "Ordered 3 servers for Saturday event", timestamp: "Today, 10:23 AM", status: "Completed" },
    { id: 2, action: "Sent low staff notifications for upcoming shifts", timestamp: "Today, 09:15 AM", status: "Completed" },
    { id: 3, action: "Generated weekly staffing forecast", timestamp: "Yesterday, 11:30 PM", status: "Completed" },
    { id: 4, action: "Adjusted pricing for high-demand weekend shifts", timestamp: "Yesterday, 06:45 PM", status: "Completed" },
    { id: 5, action: "Posted 5 new shifts based on historical patterns", timestamp: "Mar 2, 2025, 08:12 AM", status: "Completed" }
  ];

  // Filter log based on user type
  const filteredLog = userType === "company" 
    ? activityLog.filter(item => !item.action.includes("pricing")) 
    : activityLog;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Main Widget Button */}
      <div 
        className={`flex items-center rounded-lg shadow-lg cursor-pointer transition-all ${
          expanded ? "w-80 bg-white" : "w-auto bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {!expanded && (
          <div 
            className="flex items-center text-white px-4 py-3"
            onClick={() => setExpanded(true)}
          >
            <Cpu size={20} className="mr-2" />
            <span className="font-medium">AI Assistant</span>
            {!isSubscribed && <Lock size={16} className="ml-2" />}
          </div>
        )}
        
        {expanded && (
          <div className="w-full">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="flex items-center">
                <Cpu size={20} className="text-blue-600 mr-2" />
                <span className="font-medium">OvertimeAI Assistant</span>
                {!isSubscribed && <Lock size={16} className="ml-2 text-gray-400" />}
              </div>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setExpanded(false)}
              >
                <ChevronDown size={20} />
              </button>
            </div>
            
            {/* Widget Content */}
            <div className="p-4">
              {!isSubscribed ? (
                // Subscription CTA
                <div className="text-center py-4">
                  <Zap size={40} className="mx-auto mb-2 text-blue-500" />
                  <h3 className="text-lg font-medium mb-1">Unlock AI Automation</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Save time and optimize operations with intelligent automation for just $10/month.
                  </p>
                  <button 
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                    onClick={() => setShowSubscribeModal(true)}
                  >
                    Activate OvertimeAI
                  </button>
                </div>
              ) : (
                // Subscribed Content
                <div>
                  <div className="bg-blue-50 rounded-md p-3 mb-4 flex items-start">
                    <Zap size={18} className="text-blue-600 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">OvertimeAI</span> is active and working for you.
                      </p>
                      <div className="flex mt-2">
                        <button 
                          className="text-xs bg-white border border-gray-300 rounded px-2 py-1 mr-2 flex items-center"
                          onClick={() => setShowTokenModal(true)}
                        >
                          <Key size={12} className="mr-1" />
                          View API Token
                        </button>
                        <button 
                          className="text-xs text-blue-700 rounded px-2 py-1 hover:bg-blue-50 flex items-center"
                          onClick={() => setActiveTab('settings')}
                        >
                          <Settings size={12} className="mr-1" />
                          Configure
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Tab Navigation */}
                  <div className="flex border-b mb-3">
                    <button 
                      className={`px-3 py-2 text-sm ${
                        activeTab === 'actions' 
                          ? 'border-b-2 border-blue-600 text-blue-600' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setActiveTab('actions')}
                    >
                      Actions
                    </button>
                    <button 
                      className={`px-3 py-2 text-sm ${
                        activeTab === 'activity' 
                          ? 'border-b-2 border-blue-600 text-blue-600' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setActiveTab('activity')}
                    >
                      Activity Log
                    </button>
                    <button 
                      className={`px-3 py-2 text-sm ${
                        activeTab === 'settings' 
                          ? 'border-b-2 border-blue-600 text-blue-600' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setActiveTab('settings')}
                    >
                      Settings
                    </button>
                  </div>

                  {/* Tab Content */}
                  {activeTab === 'actions' && (
                    <div>
                      <p className="text-xs text-gray-500 mb-2">Available AI Actions</p>
                      <div className="space-y-2">
                        {userType === "company" && (
                          <button className="w-full flex items-center justify-between bg-white border border-gray-300 p-2 rounded-md hover:bg-gray-50">
                            <div className="flex items-center">
                              <Users size={16} className="text-blue-600 mr-2" />
                              <span className="text-sm">Auto-Request Staff</span>
                            </div>
                            <ChevronRight size={16} className="text-gray-400" />
                          </button>
                        )}

                        {userType === "agency" && (
                          <button className="w-full flex items-center justify-between bg-white border border-gray-300 p-2 rounded-md hover:bg-gray-50">
                            <div className="flex items-center">
                              <Users size={16} className="text-blue-600 mr-2" />
                              <span className="text-sm">Auto-Assign Staff</span>
                            </div>
                            <ChevronRight size={16} className="text-gray-400" />
                          </button>
                        )}

                        <button className="w-full flex items-center justify-between bg-white border border-gray-300 p-2 rounded-md hover:bg-gray-50">
                          <div className="flex items-center">
                            <Calendar size={16} className="text-blue-600 mr-2" />
                            <span className="text-sm">Schedule Smart Posting</span>
                          </div>
                          <ChevronRight size={16} className="text-gray-400" />
                        </button>

                        <button className="w-full flex items-center justify-between bg-white border border-gray-300 p-2 rounded-md hover:bg-gray-50">
                          <div className="flex items-center">
                            <BarChart size={16} className="text-blue-600 mr-2" />
                            <span className="text-sm">Generate Demand Forecast</span>
                          </div>
                          <ChevronRight size={16} className="text-gray-400" />
                        </button>

                        <button className="w-full bg-blue-100 text-blue-800 py-2 rounded-md text-sm mt-2 hover:bg-blue-200 transition-colors">
                          Run Custom Automation
                        </button>
                      </div>
                    </div>
                  )}

                  {activeTab === 'activity' && (
                    <div>
                      <p className="text-xs text-gray-500 mb-2">Recent AI Activity</p>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {filteredLog.map(item => (
                          <div key={item.id} className="border-b border-gray-100 pb-2 last:border-0">
                            <div className="flex justify-between">
                              <p className="text-sm">{item.action}</p>
                              <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">
                                {item.status}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{item.timestamp}</p>
                          </div>
                        ))}
                      </div>
                      <button className="w-full text-center text-xs text-blue-600 mt-3 hover:underline">
                        View Complete Activity History
                      </button>
                    </div>
                  )}

                  {activeTab === 'settings' && (
                    <div>
                      <p className="text-xs text-gray-500 mb-2">AI Automation Settings</p>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {userType === "company" && (
                          <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <div>
                              <p className="text-sm font-medium">Auto-Request Staffing</p>
                              <p className="text-xs text-gray-500">Request staff based on historical needs</p>
                            </div>
                            <Switch 
                              checked={automationSettings.autoStaffing}
                              onCheckedChange={() => toggleSetting('autoStaffing')}
                            />
                          </div>
                        )}

                        {userType === "agency" && (
                          <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <div>
                              <p className="text-sm font-medium">Smart Pricing</p>
                              <p className="text-xs text-gray-500">Adjust rates based on demand</p>
                            </div>
                            <Switch 
                              checked={automationSettings.smartPricing}
                              onCheckedChange={() => toggleSetting('smartPricing')}
                            />
                          </div>
                        )}

                        <div className="flex items-center justify-between py-2 border-b border-gray-100">
                          <div>
                            <p className="text-sm font-medium">Low Staff Notifications</p>
                            <p className="text-xs text-gray-500">Get alerts when staffing is below needs</p>
                          </div>
                          <Switch 
                            checked={automationSettings.notifyLowStaff}
                            onCheckedChange={() => toggleSetting('notifyLowStaff')}
                          />
                        </div>

                        <div className="flex items-center justify-between py-2 border-b border-gray-100">
                          <div>
                            <p className="text-sm font-medium">Weekly Reports</p>
                            <p className="text-xs text-gray-500">Receive automated performance insights</p>
                          </div>
                          <Switch 
                            checked={automationSettings.weeklyReports}
                            onCheckedChange={() => toggleSetting('weeklyReports')}
                          />
                        </div>

                        <div className="flex items-center justify-between py-2 border-b border-gray-100">
                          <div>
                            <p className="text-sm font-medium">Auto-Approve Requests</p>
                            <p className="text-xs text-gray-500">Automatically approve qualified applicants</p>
                          </div>
                          <Switch 
                            checked={automationSettings.autoApprove}
                            onCheckedChange={() => toggleSetting('autoApprove')}
                          />
                        </div>

                        <div className="flex items-center justify-between py-2 border-b border-gray-100">
                          <div>
                            <p className="text-sm font-medium">Predictive Demand</p>
                            <p className="text-xs text-gray-500">Forecast upcoming staffing needs</p>
                          </div>
                          <Switch 
                            checked={automationSettings.predictiveDemand}
                            onCheckedChange={() => toggleSetting('predictiveDemand')}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* API Token Modal */}
      <Dialog open={showTokenModal} onOpenChange={setShowTokenModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Your OvertimeAI API Token</DialogTitle>
          </DialogHeader>
          <div className="bg-gray-50 p-3 rounded-md mb-4">
            <div className="flex justify-between items-center">
              <code className="text-sm text-gray-700 font-mono break-all">{apiToken}</code>
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-2 p-1 text-gray-500 hover:text-gray-700"
                onClick={() => navigator.clipboard.writeText(apiToken)}
              >
                <Copy size={16} />
              </Button>
            </div>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
            <div className="flex">
              <AlertCircle size={18} className="text-yellow-600 mr-2 mt-0.5" />
              <p className="text-sm text-yellow-700">
                Keep this token secure. It provides access to perform autonomous actions on your behalf.
              </p>
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700" onClick={() => setShowTokenModal(false)}>
              <Info size={14} className="mr-1" />
              How to use
            </Button>
            <Button onClick={() => setShowTokenModal(false)}>
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Subscribe Modal */}
      <Dialog open={showSubscribeModal} onOpenChange={setShowSubscribeModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Activate OvertimeAI</DialogTitle>
          </DialogHeader>
          <div className="mb-6">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Cpu size={32} className="text-blue-600" />
              </div>
            </div>
            <h4 className="text-center text-lg font-medium mb-2">Supercharge Your Operations</h4>
            <p className="text-center text-gray-500 mb-4">
              Subscribe to OvertimeAI for just $10/month to unlock powerful automation features.
            </p>
            <div className="bg-gray-50 rounded-md p-4 mb-4">
              <h5 className="font-medium mb-2">Key Features:</h5>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm">{userType === "company" ? "Auto-request staff based on historical needs" : "Auto-assign qualified staff to open shifts"}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm">Smart notifications for staffing issues</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm">{userType === "agency" ? "Dynamic pricing based on demand" : "Predictive staffing forecasts"}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm">API access for custom integrations</span>
                </li>
              </ul>
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setShowSubscribeModal(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={() => setShowSubscribeModal(false)}
            >
              Subscribe • $10/month
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIAgentWidget;
