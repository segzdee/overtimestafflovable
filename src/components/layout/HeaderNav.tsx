import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { ArrowLeft, Menu, X } from "lucide-react";
interface HeaderNavProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}
export const HeaderNav = ({
  mobileMenuOpen,
  setMobileMenuOpen
}: HeaderNavProps) => {
  const navigate = useNavigate();
  const handleSignUpClick = () => {
    navigate("/register");
  };
  return <header className="sticky top-0 z-50 flex justify-between items-center px-4 h-14 bg-white/80 backdrop-blur-sm border-b">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="md:hidden">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Logo />
      </div>
      
      <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden bg-green-600 hover:bg-green-500 text-base text-orange-50 font-thin text-center">
        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <nav className="hidden lg:flex items-center gap-6">
        <Link to="/find-shifts" className="text-gray-600 hover:text-gray-900 transition-colors">Find Extra Shifts</Link>
        <Link to="/find-staff" className="text-gray-600 hover:text-gray-900 transition-colors">Find Extra Staff</Link>
        <Button onClick={handleSignUpClick} className="bg-green-600 hover:bg-green-700 transition-colors">Sign up</Button>
      </nav>
    </header>;
};