
import { Bell } from 'lucide-react';

interface DesktopHeaderProps {
  title?: string;
  subtitle?: string;
  userInitial?: string;
}

export const DesktopHeader = ({ 
  title = "Dashboard", 
  subtitle = "Welcome back", 
  userInitial = "A" 
}: DesktopHeaderProps) => {
  return (
    <header className="bg-white shadow-sm hidden md:flex items-center justify-between p-4">
      <div>
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Bell size={20} className="text-gray-500" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
            3
          </span>
        </div>
        <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
          {userInitial}
        </div>
      </div>
    </header>
  );
};
