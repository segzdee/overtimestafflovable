import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { UserCircle2, Building2, Building, Bot, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { useMarketUpdates } from "@/hooks/useMarketUpdates";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { updates, lastUpdateTime, newUpdatesCount } = useMarketUpdates();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn } = useAuth();

  const loginCards = [
    {
      role: "agency",
      title: "Staffing Agency",
      subtitle: "Manage your workforce and client relationships",
      icon: Building2,
    },
    {
      role: "company",
      title: "Hotels & Businesses",
      subtitle: "Find reliable staff for your shifts",
      icon: Building,
    },
    {
      role: "shift-worker",
      title: "Shift Workers",
      subtitle: "Find flexible work opportunities",
      icon: UserCircle2,
    },
    {
      role: "admin",
      title: "Platform Admin",
      subtitle: "Manage the platform and users",
      icon: Bot,
    },
  ];

  const handleSignUpClick = () => {
    navigate("/register");
  };

  const handleLoginClick = (role: string) => {
    setActiveRole(role);
    setLoginDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      toast({
        title: "Success",
        description: "Logged in successfully",
      });
      navigate(`/dashboard/${activeRole}`);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid credentials",
      });
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white overflow-hidden">
      <header className="relative flex justify-between items-center p-4 md:px-6 border-b">
        <Logo />
        
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>

        <div className="hidden lg:flex items-center gap-4">
          <Link to="/find-shifts" className="text-gray-600 hover:text-gray-900">
            Find Extra Shifts
          </Link>
          <Link to="/find-staff" className="text-gray-600 hover:text-gray-900">
            Find Extra Staff
          </Link>
          <Button 
            onClick={handleSignUpClick}
            className="bg-green-600 hover:bg-green-700"
          >
            Sign up
          </Button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[73px] left-0 right-0 bg-white border-b shadow-lg z-50">
          <div className="flex flex-col p-4 space-y-4">
            <Link 
              to="/find-shifts" 
              className="text-gray-600 hover:text-gray-900 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Extra Shifts
            </Link>
            <Link 
              to="/find-staff" 
              className="text-gray-600 hover:text-gray-900 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Extra Staff
            </Link>
            <Button 
              onClick={() => {
                handleSignUpClick();
                setMobileMenuOpen(false);
              }}
              className="bg-green-600 hover:bg-green-700 w-full"
            >
              Sign up
            </Button>
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="max-w-6xl mx-auto w-full px-4 py-8 flex flex-col h-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">AI Meets Hospitality:</h1>
            <h2 className="text-4xl font-bold mb-6">Extra Staff, Anytime, Anywhere</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              From unfilled shifts to finding the right staff, OVERTIMESTAFF Platform connects agencies,
              hotels, and businesses with AI-driven solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-auto px-4">
            {loginCards.map((card) => (
              <div
                key={card.role}
                className={`bg-white rounded-lg p-4 lg:p-6 shadow-sm border transition-all
                  ${activeRole === card.role ? "ring-2 ring-purple-500" : "hover:shadow-md"}
                `}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-purple-50 rounded-full mb-4">
                    <card.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-1">{card.title}</h3>
                  <p className="text-sm text-gray-600">{card.subtitle}</p>
                </div>
                <Button 
                  className="w-full mt-4 bg-gradient-to-r from-purple-600 to-green-500 hover:opacity-90"
                  onClick={() => handleLoginClick(card.role)}
                >
                  LOGIN
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gray-900 text-white p-4 rounded-lg shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-400">LIVE MARKET UPDATES</h3>
              <span className="text-sm text-gray-400">
                {lastUpdateTime.toLocaleTimeString()}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {updates.map((update) => (
                <div
                  key={update.id}
                  className={`p-3 rounded border ${
                    update.highlight
                      ? 'bg-purple-900 border-purple-700'
                      : 'bg-gray-800 border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold ${
                      update.type === 'URGENT' ? 'text-red-400' :
                      update.type === 'PREMIUM' ? 'text-purple-400' :
                      update.type === 'SWAP' ? 'text-orange-400' :
                      'text-green-400'
                    }`}>
                      {update.type}
                    </span>
                    <span className="text-lg font-bold text-green-400">{update.rate}</span>
                  </div>
                  <div className="text-sm font-medium">{update.title}</div>
                  <div className="text-xs text-gray-400">{update.location}</div>
                </div>
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
              <span>Updated every 5 minutes</span>
              <span>{newUpdatesCount} new positions added today</span>
            </div>
          </div>

          <footer className="mt-8 flex justify-center gap-6 text-sm text-gray-600 py-4 border-t">
            <Link to="/terms" className="hover:text-gray-900">Terms</Link>
            <Link to="/privacy" className="hover:text-gray-900">Privacy</Link>
            <Link to="/contact" className="hover:text-gray-900">Contact</Link>
            <Link to="/blog" className="hover:text-gray-900">Blog</Link>
          </footer>
        </div>
      </main>

      <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Login as {loginCards.find(card => card.role === activeRole)?.title}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-green-500 hover:opacity-90"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto font-semibold text-purple-600 hover:text-purple-700"
                  onClick={handleSignUpClick}
                >
                  Sign up now
                </Button>
              </p>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
