
import { Bell, Menu, X } from 'lucide-react';

interface MobileHeaderProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
  title?: string;
}

export const MobileHeader = ({ toggleSidebar, sidebarOpen, title = "OvertimeStaff" }: MobileHeaderProps) => {
  return (
    <div className="md:hidden bg-white shadow-sm p-4 flex items-center justify-between">
      <button onClick={toggleSidebar} className="p-2 rounded-md text-gray-500 hover:bg-gray-200">
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="relative">
        <Bell size={20} className="text-gray-500" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
          3
        </span>
      </div>
    </div>
  );
};
