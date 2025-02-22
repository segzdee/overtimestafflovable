
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { UserCircle2, Building2, Building, Bot } from "lucide-react";

export default function Login() {
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login, loginWithToken } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const loginCards = [
    {
      role: "shift-worker",
      title: "Shift Worker",
      subtitle: "Clock-in",
      icon: UserCircle2,
    },
    {
      role: "agency",
      title: "Agency",
      subtitle: "Manage Staff",
      icon: Building2,
    },
    {
      role: "company",
      title: "Company",
      subtitle: "Post Shifts",
      icon: Building,
    },
    {
      role: "aiagent",
      title: "AI Agents",
      subtitle: "Token Auth",
      icon: Bot,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeRole) return;

    try {
      setError("");
      setLoading(true);

      if (activeRole === "aiagent") {
        await loginWithToken(token);
      } else {
        await login(email, password);
      }

      toast({
        title: "Login successful",
        description: "Welcome back!"
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4 md:px-6">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">OVERTIME<span className="text-purple-600">STAFF</span></span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/find-shifts" className="text-gray-600 hover:text-gray-900">
            Find Extra Shifts
          </Link>
          <Link to="/find-staff" className="text-gray-600 hover:text-gray-900">
            Find Extra Staff
          </Link>
          <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
            Sign up
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">AI Meets Hospitality:</h1>
          <h2 className="text-4xl font-bold mb-6">Extra Staff, Anytime, Anywhere</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            From unfilled shifts to finding the right staff, OVERTIMESTAFF Platform connects agencies,
            hotels, and businesses with AI-driven solutions.
          </p>
        </div>

        {/* Login Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {loginCards.map((card) => (
            <div
              key={card.role}
              className={`bg-white rounded-lg p-6 shadow-sm border cursor-pointer transition-all
                ${activeRole === card.role ? "ring-2 ring-purple-500" : "hover:shadow-md"}
              `}
              onClick={() => setActiveRole(card.role)}
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
                onClick={() => setActiveRole(card.role)}
              >
                LOGIN
              </Button>
            </div>
          ))}
        </div>

        {/* Login Form */}
        {activeRole && (
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm border">
            <form onSubmit={handleSubmit} className="space-y-4">
              {activeRole === "aiagent" ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Authentication Token
                  </label>
                  <Input
                    type="text"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Enter your token"
                    required
                  />
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
                </>
              )}

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
            </form>
          </div>
        )}

        {/* News Ticker */}
        <div className="mt-12 flex items-center gap-4 text-sm text-gray-600 overflow-hidden">
          <span className="whitespace-nowrap">Premium rates available for night shifts</span>
          <span className="text-gray-400">|</span>
          <span className="whitespace-nowrap">07:35 PM</span>
          <span className="text-blue-500">New Opportunities</span>
          <span className="whitespace-nowrap">8 new positions added in downtown area</span>
        </div>

        {/* Footer */}
        <footer className="mt-12 flex justify-center gap-6 text-sm text-gray-600">
          <Link to="/terms" className="hover:text-gray-900">Terms</Link>
          <Link to="/privacy" className="hover:text-gray-900">Privacy</Link>
          <Link to="/contact" className="hover:text-gray-900">Contact</Link>
          <Link to="/blog" className="hover:text-gray-900">Blog</Link>
        </footer>
      </main>
    </div>
  );
}
