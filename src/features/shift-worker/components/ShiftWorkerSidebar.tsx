
import { useState } from "react";
import { 
  BarChart, 
  Calendar, 
  DollarSign, 
  User, 
  Users, 
  Briefcase,
  MessageSquare,
  Settings,
  LogOut,
  X,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const ShiftWorkerSidebar = ({ 
  activeTab, 
  setActiveTab, 
  sidebarOpen, 
  setSidebarOpen 
}: SidebarProps) => {
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart size={20} /> },
    { id: 'shifts', label: 'My Shifts', icon: <Calendar size={20} /> },
    { id: 'earnings', label: 'Earnings', icon: <DollarSign size={20} /> },
    { id: 'profile', label: 'Profile', icon: <User size={20} /> },
    { id: 'companies', label: 'Companies', icon: <Briefcase size={20} /> },
    { id: 'teams', label: 'Teams', icon: <Users size={20} /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> }
  ];

  return (
    <div className={`fixed inset-y-0 left-0 z-30 transform md:relative md:translate-x-0 transition duration-300 ease-in-out ${
      sidebarOpen ? "translate-x-0" : "-translate-x-full"
    } md:flex md:flex-col w-64 bg-gray-900 text-white`}>
      <div className="p-4 border-b border-gray-700 hidden md:block">
        <h1 className="text-xl font-bold">OvertimeStaff</h1>
        <p className="text-gray-400 text-sm">Shift Worker Portal</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="mt-2">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              className={`flex items-center w-full px-4 py-3 text-left ${
                activeTab === item.id ? 'bg-gray-800' : 'hover:bg-gray-800'
              }`}
              onClick={() => {
                setActiveTab(item.id);
                if (window.innerWidth < 768) {
                  setSidebarOpen(false);
                }
              }}
            >
              <span className="mr-3 text-gray-400">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-700">
        <button className="flex items-center w-full px-4 py-2 text-left text-gray-400 hover:bg-gray-800 rounded">
          <LogOut size={20} className="mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};
