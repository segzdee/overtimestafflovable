import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { UserCircle2, Building2, Building, Bot, Menu, X, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { useMarketUpdates } from "@/hooks/useMarketUpdates";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const DEV_PASSWORD = 'king8844';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const { updates, lastUpdateTime, newUpdatesCount } = useMarketUpdates();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, loginWithToken } = useAuth();

  const loginCards = [
    {
      role: "agency",
      title: "Staffing Agency",
      subtitle: "Manage Multiple Venues and Staff",
      icon: Building2,
    },
    {
      role: "company",
      title: "Hotels & Businesses",
      subtitle: "Post shifts and Hire Extra Staff",
      icon: Building,
    },
    {
      role: "shift-worker",
      title: "Shift Workers",
      subtitle: "Clock-in for Extra Shifts",
      icon: UserCircle2,
    },
    {
      role: "aiagent",
      title: "AI Agent",
      subtitle: "Activate Agent for Automation",
      icon: Bot,
    },
  ];

  const handleSignUpClick = () => {
    navigate("/register");
  };

  const handleLoginClick = (role: string) => {
    setActiveRole(role);
    setLoginDialogOpen(true);
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);
    
    try {
      if (activeRole === 'aiagent') {
        await loginWithToken(token);
      } else {
        await login(email, password);
      }
      
      toast({
        title: "Success",
        description: "Logged in successfully",
      });
      navigate(`/dashboard/${activeRole}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Invalid credentials";
      setErrorMessage(message);
      toast({
        variant: "destructive",
        title: "Error",
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyDevPassword = (password: string) => {
    return password === DEV_PASSWORD;
  };

  const modifyComponent = (password: string, modificationFn: () => void) => {
    if (!verifyDevPassword(password)) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "Developer password required to modify this component.",
      });
      return;
    }
    modificationFn();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white">
      <header className="sticky top-0 z-50 flex justify-between items-center px-4 py-3 md:px-6 bg-white/80 backdrop-blur-sm border-b">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="md:hidden"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Logo />
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>

        <nav className="hidden lg:flex items-center gap-6">
          <Link 
            to="/find-shifts" 
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Find Extra Shifts
          </Link>
          <Link 
            to="/find-staff" 
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Find Extra Staff
          </Link>
          <Button 
            onClick={handleSignUpClick}
            className="bg-green-600 hover:bg-green-700 transition-colors"
          >
            Sign up
          </Button>
        </nav>
      </header>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[57px] bg-white/95 backdrop-blur-sm border-b shadow-lg z-40 animate-in">
          <nav className="flex flex-col p-4 space-y-3">
            <Link 
              to="/find-shifts" 
              className="text-gray-600 hover:text-gray-900 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Extra Shifts
            </Link>
            <Link 
              to="/find-staff" 
              className="text-gray-600 hover:text-gray-900 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Extra Staff
            </Link>
            <Button 
              onClick={() => {
                handleSignUpClick();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-green-600 hover:bg-green-700 transition-colors"
            >
              Sign up
            </Button>
          </nav>
        </div>
      )}

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent">
            AI Meets Hospitality
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Extra Staff, Anytime, Anywhere
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Got extra time? Need extra shifts? No dinner staff coverage? John canceled? The Overtimestaff Platform connects people with spare time to hospitality companies and agencies using smart AI Integration. Sign up. Sign in. Post shifts ————— Pick up a shift. Clock in/out. Get paid.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
          {loginCards.map((card) => (
            <div
              key={card.role}
              className={`group bg-white rounded-xl p-6 shadow-sm border transition-all hover:shadow-md
                ${activeRole === card.role ? "ring-2 ring-purple-500" : ""}
              `}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-purple-50 rounded-full group-hover:bg-purple-100 transition-colors">
                  <card.icon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-gray-900">{card.title}</h3>
                  <p className="text-sm text-gray-600">{card.subtitle}</p>
                </div>
              </div>
              <Button 
                className="w-full mt-6 bg-gradient-to-r from-purple-600 to-green-500 hover:opacity-90 transition-opacity"
                onClick={() => handleLoginClick(card.role)}
              >
                LOGIN
              </Button>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 text-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-4 md:p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-400">LIVE MARKET UPDATES</h3>
              <span className="text-sm text-gray-400">
                {lastUpdateTime.toLocaleTimeString()}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {updates.map((update) => (
                <div
                  key={update.id}
                  className={`p-4 rounded-lg border transition-colors ${
                    update.highlight
                      ? 'bg-purple-900 border-purple-700'
                      : 'bg-gray-800 border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
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
                  <div className="text-xs text-gray-400 mt-1">{update.location}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-800 pt-4">
              <span>Updated every 5 minutes</span>
              <span>{newUpdatesCount} new positions added today</span>
            </div>
          </div>
        </div>

        <footer className="mt-12 flex justify-center gap-6 text-sm text-gray-600 py-4 border-t">
          <Link to="/terms" className="hover:text-gray-900 transition-colors">Terms</Link>
          <Link to="/privacy" className="hover:text-gray-900 transition-colors">Privacy</Link>
          <Link to="/contact" className="hover:text-gray-900 transition-colors">Contact</Link>
          <Link to="/blog" className="hover:text-gray-900 transition-colors">Blog</Link>
        </footer>
      </main>

      <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {activeRole === 'aiagent' ? 'Login with Token' : `Login as ${loginCards.find(card => card.role === activeRole)?.title}`}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            {activeRole === 'aiagent' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Access Token
                </label>
                <Input
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Enter your AI agent access token"
                  required
                  className="w-full"
                />
                <p className="mt-2 text-sm text-gray-500">
                  AI Agent tokens can be generated from the Agency or Company dashboard
                </p>
              </div>
            ) : (
              <>
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
                    className="w-full"
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
                    className="w-full"
                  />
                </div>
              </>
            )}

            {errorMessage && (
              <div className="text-red-500 text-sm p-2 bg-red-50 rounded-md">
                {errorMessage}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-green-500 hover:opacity-90 transition-opacity"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>

            {activeRole !== 'aiagent' && (
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto font-semibold text-purple-600 hover:text-purple-700"
                    onClick={() => navigate("/register")}
                  >
                    Sign up now
                  </Button>
                </p>
              </div>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
