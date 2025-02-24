import React, { Suspense, lazy } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/components/ui/use-toast";
import { Building2, Building, UserCircle2, Bot } from "lucide-react";
import { HeaderNav } from "@/components/layout/HeaderNav";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { LoginCard } from "@/components/auth/LoginCard";

// Lazy load components that are not immediately visible
const LoginDialog = lazy(() => import("@/components/auth/LoginDialog").then(module => ({
  default: module.LoginDialog
})));
const MarketUpdates = lazy(() => import("@/components/market/MarketUpdates").then(module => ({
  default: module.MarketUpdates
})));

// Loading fallback for market updates
const MarketUpdatesSkeleton = () => <div className="bg-gray-900 text-white rounded-xl shadow-xl overflow-hidden flex-1 min-h-0 p-4">
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-gray-800 rounded w-1/4"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {[...Array(8)].map((_, i) => <div key={i} className="p-4 bg-gray-800 rounded-lg">
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          </div>)}
      </div>
    </div>
  </div>;
export default function Index() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [token, setToken] = React.useState("");
  const [activeRole, setActiveRole] = React.useState<string | null>(null);
  const [loginDialogOpen, setLoginDialogOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const {
    login,
    loginWithToken
  } = useAuth();
  const loginCards = [{
    role: "agency",
    title: "Staffing Agency",
    subtitle: "Manage Multiple Venues and Staff",
    icon: "/lovable-uploads/efbbf3f0-a91a-47d2-85de-00d7b948e927.png"
  }, {
    role: "company",
    title: "Hotels & Businesses",
    subtitle: "Post shifts and Hire Extra Staff",
    icon: "/lovable-uploads/ede1a429-c69f-4808-8096-319b93115738.png"
  }, {
    role: "shift-worker",
    title: "Shift Workers",
    subtitle: "Clock-in for Extra Shifts",
    icon: "/lovable-uploads/39c96467-d4a3-4237-b66c-d378be71b320.png"
  }, {
    role: "aiagent",
    title: "AI Agent",
    subtitle: "Activate Agent for Automation",
    icon: "/lovable-uploads/b606326d-d87b-4432-8872-3b0a6ea483c7.png"
  }];

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
        console.log("Standard login attempt", {
          email
        });
        await login(email, password);
      }
      toast({
        title: "Success",
        description: "Logged in successfully"
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
        description: message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white">
      <HeaderNav mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <main className="flex-1 container mx-auto px-4 py-4 max-w-7xl flex flex-col h-[calc(100vh-3.5rem-3rem)]">
        <div className="text-center space-y-2 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-purple-700">
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
          {loginCards.map(card => <LoginCard key={card.role} role={card.role} title={card.title} subtitle={card.subtitle} icon={card.icon} isActive={activeRole === card.role} onClick={handleLoginClick} />)}
        </div>

        <Suspense fallback={<MarketUpdatesSkeleton />}>
          <MarketUpdates />
        </Suspense>
      </main>

      <footer className="h-12 flex items-center justify-center border-t">
        <div className="flex justify-center gap-6 text-xs text-gray-600">
          <Link to="/terms" className="hover:text-gray-900 transition-colors">Terms</Link>
          <Link to="/privacy" className="hover:text-gray-900 transition-colors">Privacy</Link>
          <Link to="/contact" className="hover:text-gray-900 transition-colors">Contact</Link>
          <Link to="/blog" className="hover:text-gray-900 transition-colors">Blog</Link>
        </div>
      </footer>

      <Suspense fallback={<div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg animate-pulse">Loading...</div>
      </div>}>
        {loginDialogOpen && <LoginDialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen} activeRole={activeRole} token={token} setToken={setToken} email={email} setEmail={setEmail} password={password} setPassword={setPassword} isLoading={isLoading} errorMessage={errorMessage} onSubmit={handleSubmit} loginCards={loginCards} />}
      </Suspense>
    </div>;
}
