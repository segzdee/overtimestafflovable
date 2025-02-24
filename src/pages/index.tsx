
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/components/ui/use-toast";
import { UserCircle2, Building2, Building, Bot } from "lucide-react";
import { HeaderNav } from "@/components/layout/HeaderNav";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { LoginCard } from "@/components/auth/LoginCard";
import { MarketUpdates } from "@/components/market/MarketUpdates";
import { LoginDialog } from "@/components/auth/LoginDialog";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
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

  const handleLoginClick = async (role: string) => {
    setActiveRole(role);
    setLoginDialogOpen(true);
    setErrorMessage(null);
    console.log("Login attempt initiated for role:", role);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);
    
    try {
      console.log("Starting login process...");
      
      if (activeRole === 'aiagent') {
        console.log("AI Agent login attempt with token");
        await loginWithToken(token);
      } else {
        console.log("Standard login attempt", { email });
        await login(email, password);
      }
      
      toast({
        title: "Success",
        description: "Logged in successfully",
      });

      console.log("Login successful, navigating to dashboard");
      navigate(`/dashboard/${activeRole}`);
    } catch (error) {
      console.error("Login error:", error);
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white">
      <HeaderNav 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />
      
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />

      <main className="flex-1 container mx-auto px-4 py-4 max-w-7xl flex flex-col h-[calc(100vh-3.5rem-3rem)]">
        <div className="text-center space-y-2 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent">
            AI Meets Hospitality
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Extra Staff, Anytime, Anywhere
          </h2>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Got extra time? Need extra shifts? No dinner staff coverage? John canceled? The Overtimestaff Platform connects people with spare time to hospitality companies and agencies using smart AI Integration.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {loginCards.map((card) => (
            <LoginCard
              key={card.role}
              role={card.role}
              title={card.title}
              subtitle={card.subtitle}
              icon={card.icon}
              isActive={activeRole === card.role}
              onClick={handleLoginClick}
            />
          ))}
        </div>

        <MarketUpdates />
      </main>

      <footer className="h-12 flex items-center justify-center border-t">
        <div className="flex justify-center gap-6 text-xs text-gray-600">
          <Link to="/terms" className="hover:text-gray-900 transition-colors">Terms</Link>
          <Link to="/privacy" className="hover:text-gray-900 transition-colors">Privacy</Link>
          <Link to="/contact" className="hover:text-gray-900 transition-colors">Contact</Link>
          <Link to="/blog" className="hover:text-gray-900 transition-colors">Blog</Link>
        </div>
      </footer>

      <LoginDialog
        open={loginDialogOpen}
        onOpenChange={setLoginDialogOpen}
        activeRole={activeRole}
        token={token}
        setToken={setToken}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        isLoading={isLoading}
        errorMessage={errorMessage}
        onSubmit={handleSubmit}
        loginCards={loginCards}
      />
    </div>
  );
}
