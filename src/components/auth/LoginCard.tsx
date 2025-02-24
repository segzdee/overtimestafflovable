
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface LoginCardProps {
  role: string;
  title: string;
  subtitle: string;
  icon: LucideIcon | string; // Modified to accept either LucideIcon or string
  isActive: boolean;
  onClick: (role: string) => void;
}

export const LoginCard = ({
  role,
  title,
  subtitle,
  icon: Icon,
  isActive,
  onClick
}: LoginCardProps) => {
  // Check if Icon is a string (custom image path) or a LucideIcon component
  const isCustomIcon = typeof Icon === 'string';

  return (
    <div className={`group bg-white rounded-lg p-4 shadow-sm border transition-all hover:shadow-md ${isActive ? "ring-2 ring-purple-500" : ""}`}>
      <div className="flex flex-col items-center text-center space-y-2">
        <div className="p-2 rounded-full bg-gradient-to-r from-purple-50 to-green-50">
          {isCustomIcon ? (
            <img src={Icon as string} alt={title} className="w-6 h-6" />
          ) : (
            <Icon className="w-5 h-5 text-purple-600" />
          )}
        </div>
        <div className="space-y-0.5">
          <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
          <p className="text-xs text-gray-600">{subtitle}</p>
        </div>
        <Button 
          className="w-full mt-2 bg-gradient-to-r from-purple-600 to-green-500 hover:opacity-90 transition-opacity text-sm py-1" 
          onClick={() => onClick(role)}
        >
          LOGIN
        </Button>
      </div>
    </div>
  );
};
