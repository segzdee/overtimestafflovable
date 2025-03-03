
import { useState } from "react";
import { useDevMode } from "@/contexts/dev/DevModeContext";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

export const DevModeToggle = () => {
  const { devMode, toggleDevMode, selectedRole, setSelectedRole } = useDevMode();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  // Only show in development environment
  if (import.meta.env.PROD) {
    return null;
  }
  
  const handleRoleChange = (role: string) => {
    setSelectedRole(role as any);
    
    // Navigate to the appropriate dashboard
    if (role) {
      navigate(`/dashboard/${role.toLowerCase()}`);
    }
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-background border rounded-lg shadow-lg p-4 w-64">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Developer Mode</h3>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              ✕
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Enable Dev Mode</span>
              <Switch checked={devMode} onCheckedChange={toggleDevMode} />
            </div>
            
            {devMode && (
              <div className="space-y-2">
                <label className="text-sm block">Role</label>
                <Select value={selectedRole || ''} onValueChange={handleRoleChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="shift-worker">Shift Worker</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                    <SelectItem value="agency">Agency</SelectItem>
                    <SelectItem value="aiagent">AI Agent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Button 
          onClick={() => setIsOpen(true)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white"
        >
          Dev Mode {devMode ? 'ON' : 'OFF'}
        </Button>
      )}
    </div>
  );
};
