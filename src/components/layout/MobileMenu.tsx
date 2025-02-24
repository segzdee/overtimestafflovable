
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/register");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="lg:hidden fixed inset-x-0 top-14 bg-white/95 backdrop-blur-sm border-b shadow-lg z-40 animate-in">
      <nav className="flex flex-col p-4 space-y-2">
        <Link 
          to="/find-shifts" 
          className="text-gray-600 hover:text-gray-900 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors" 
          onClick={onClose}
        >
          Find Extra Shifts
        </Link>
        <Link 
          to="/find-staff" 
          className="text-gray-600 hover:text-gray-900 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors" 
          onClick={onClose}
        >
          Find Extra Staff
        </Link>
        <Button 
          onClick={handleSignUpClick} 
          className="w-full bg-green-600 hover:bg-green-700 transition-colors"
        >
          Sign up
        </Button>
      </nav>
    </div>
  );
};
