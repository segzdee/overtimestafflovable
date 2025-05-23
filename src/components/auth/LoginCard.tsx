import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
interface LoginCardProps {
  role: string;
  title: string;
  subtitle: string;
  icon: LucideIcon | string;
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
  const isCustomIcon = typeof Icon === 'string';
  return <div className={`group bg-white rounded-lg p-4 shadow-sm border transition-all hover:shadow-md ${isActive ? "ring-2 ring-purple-500" : ""}`}>
      <div className="flex flex-col items-center text-center space-y-2">
        <div className="p-2 rounded-full bg-gradient-to-r from-purple-50 to-green-50 flex items-center justify-center bg-green-200">
          {isCustomIcon ? <img src={Icon} alt={title} className="w-8 h-8 object-contain" onError={e => {
          console.error(`Error loading image: ${Icon}`);
          e.currentTarget.src = '/placeholder.svg';
        }} /> : <Icon className="w-6 h-6 text-purple-600" />}
        </div>
        <div className="space-y-0.5">
          <h3 className="font-semibold text-sm text-slate-950">{title}</h3>
          <p className="text-xs text-slate-950">{subtitle}</p>
        </div>
        <Button onClick={() => onClick(role)} className="w-full mt-2 bg-gradient-to-r from-purple-600 to-green-500 hover:opacity-90 transition-opacity text-sm py-1 text-zinc-50">
          LOGIN
        </Button>
      </div>
    </div>;
};