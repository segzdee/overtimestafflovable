
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-8">Welcome to OVERTIMESTAFF</h1>
      <div className="space-y-4">
        <Button 
          onClick={() => navigate('/login')} 
          className="w-64"
        >
          Login
        </Button>
      </div>
    </div>
  );
}
