
import React from 'react';
import { 
  Users, 
  Bell, 
  BadgeCheck, 
  Calendar,
  ChevronRight
} from 'lucide-react';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  chartType
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
  chartType: 'area' | 'bar' | 'line' | 'pie';
}) => {
  // Sample data for charts
  const areaData = [
    { name: 'Mon', value: 40 },
    { name: 'Tue', value: 30 },
    { name: 'Wed', value: 45 },
    { name: 'Thu', value: 35 },
    { name: 'Fri', value: 55 },
    { name: 'Sat', value: 50 },
    { name: 'Sun', value: 45 },
  ];

  const barData = [
    { name: 'Normal', value: 35 },
    { name: 'Urgent', value: 75 },
    { name: 'Emergency', value: 95 },
  ];

  const lineData = [
    { name: 'Week 1', value: 70 },
    { name: 'Week 2', value: 80 },
    { name: 'Week 3', value: 75 },
    { name: 'Week 4', value: 90 },
    { name: 'Week 5', value: 85 },
  ];

  const pieData = [
    { name: 'Verified', value: 85 },
    { name: 'In Review', value: 15 },
  ];

  const COLORS = ['#8B5CF6', '#F97316', '#0EA5E9', '#10B981'];

  const renderChart = () => {
    switch (chartType) {
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={120}>
            <AreaChart data={areaData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="value" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={barData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <Bar dataKey="value" fill="#F97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={lineData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <Line type="monotone" dataKey="value" stroke="#0EA5E9" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={120}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={25}
                outerRadius={45}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="border border-gray-200 hover:shadow-md transition-shadow overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-md bg-purple-100 text-purple-600 mr-4">
            <Icon size={24} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        {renderChart()}
      </CardContent>
    </Card>
  );
};

const HowItWorks: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How OVERTIMESTAFF Works</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform streamlines hospitality staffing, matching the right talent with the right opportunities in real-time.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={Users} 
            title="Instant Staff Matching" 
            description="Our AI algorithms match qualified staff with open positions based on skills, experience, location, and availability—all in real-time."
            chartType="area"
          />
          
          <FeatureCard 
            icon={Bell} 
            title="Emergency Coverage" 
            description="Handle last-minute staff shortages or emergencies with our priority matching system that fills critical positions within minutes."
            chartType="bar"
          />
          
          <FeatureCard 
            icon={BadgeCheck} 
            title="Verified Professionals" 
            description="All staff members are pre-screened, verified, and rated, ensuring that you always get qualified professionals for your establishment."
            chartType="pie"
          />
          
          <FeatureCard 
            icon={Calendar} 
            title="Flexible Scheduling" 
            description="Workers can set their availability and preferences, making it easy to pick up extra shifts that fit their schedule."
            chartType="line"
          />
        </div>
        
        <div className="text-center mt-10">
          <button className="inline-flex items-center px-6 py-3 rounded-md bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors">
            Learn more about our platform
            <ChevronRight size={16} className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
