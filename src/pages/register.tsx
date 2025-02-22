
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";

const CATEGORIES = {
  company: [
    { group: 'Hotels', items: [
      'Full-Service Hotel', 'Limited-Service Hotel', 'Boutique Hotel', 'Luxury Hotel',
      'Extended Stay Hotel', 'Budget Hotel', 'Capsule Hotel', 'Motel', 'Heritage Hotel',
      'Eco-Hotel', 'Business Hotel', 'Airport Hotel', 'Design Hotel', 'Theme Hotel'
    ]},
    { group: 'Resorts', items: [
      'Beach Resort', 'Ski Resort', 'Golf Resort', 'Spa Resort', 'All-Inclusive Resort',
      'Eco-Resort', 'Adventure Resort', 'Family Resort', 'Casino Resort', 'Luxury Resort',
      'Boutique Resort', 'Island Resort', 'Mountain Resort', 'Urban Resort'
    ]},
    { group: 'Alternative Accommodations', items: [
      'Bed and Breakfast (B&B)', 'Hostel', 'Vacation Rental', 'Serviced Apartment',
      'Inn', 'Lodge', 'Glamping Site', 'Treehouse', 'Farm Stay', 'Wellness Retreat'
    ]}
  ],
  agency: [
    { group: 'Staffing Services', items: [
      'Staffing Agency', 'Temping Agency', 'Recruitment Agency', 'Executive Search Firm'
    ]},
    { group: 'Specialized Services', items: [
      'Event Planning Agency', 'Food and Beverage Consulting Agency',
      'Training and Development Agency', 'Vendor and Supplier Agency'
    ]},
    { group: 'Support Services', items: [
      'Management Consulting Agency', 'Marketing and PR Agency',
      'Technology and Software Agency', 'Design and Branding Agency'
    ]}
  ],
  'shift-worker': [
    { group: 'Employment Type', items: [
      'Full-Time Staff', 'Part-Time Staff', 'Casual Staff', 'Seasonal Staff',
      'Temporary Staff', 'Contract Employees', 'On-Call Staff', 'Per Diem Staff'
    ]},
    { group: 'Specialized Roles', items: [
      'Extra-Hands', 'Freelancers', 'Independent Contractors', 'Shift Workers'
    ]}
  ]
};

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    category: "",
    name: ""
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      setError("Please agree to the Terms and Privacy Policy");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.role) {
      setError("Please select an account type");
      return;
    }

    if (!formData.category) {
      setError("Please select a category");
      return;
    }

    try {
      setError("");
      setLoading(true);
      
      await register(
        formData.email,
        formData.password,
        formData.role as "company" | "agency" | "shift-worker" | "admin" | "aiagent",
        formData.name,
        formData.category
      );

      toast({
        title: "Account created",
        description: "Please check your email to verify your account."
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">OVERTIMESTAFF</h1>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border">
          <h2 className="text-2xl font-semibold text-center mb-2">Create Account</h2>
          <p className="text-center text-gray-600 mb-6">Join OVERTIMESTAFF</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">I am a</label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value, category: "" })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="company">Business (Hiring Staff)</SelectItem>
                  <SelectItem value="agency">Staffing Agency</SelectItem>
                  <SelectItem value="shift-worker">Shift Worker</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.role && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES[formData.role as keyof typeof CATEGORIES]?.map((group) => (
                      <SelectGroup key={group.group}>
                        <SelectLabel>{group.group}</SelectLabel>
                        {group.items.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <Input
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <Input
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                className="w-full"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-600"
              >
                I agree to the{" "}
                <a href="/terms" className="text-primary hover:underline">Terms</a>
                {" "}and{" "}
                <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
              </label>
            </div>

            {error && (
              <div className="text-sm text-red-500">{error}</div>
            )}

            <Button
              type="submit"
              className="w-full bg-[#0B4A3F] hover:bg-[#0B4A3F]/90"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Button
                variant="link"
                className="p-0 h-auto font-normal text-primary hover:text-primary/90"
                onClick={() => navigate("/login")}
              >
                Sign in
              </Button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
