
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function RevenueChart() {
  // Mock data for the chart
  const data = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 5000 },
    { name: 'Mar', revenue: 6000 },
    { name: 'Apr', revenue: 8500 },
    { name: 'May', revenue: 7000 },
    { name: 'Jun', revenue: 9000 },
    { name: 'Jul', revenue: 10000 },
    { name: 'Aug', revenue: 12000 },
    { name: 'Sep', revenue: 14000 },
    { name: 'Oct', revenue: 15000 },
    { name: 'Nov', revenue: 16000 },
    { name: 'Dec', revenue: 18000 },
  ];

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis 
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip 
            formatter={(value) => [`$${value}`, 'Revenue']}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Bar dataKey="revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
