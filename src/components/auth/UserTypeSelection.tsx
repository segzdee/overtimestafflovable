
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Building2, Briefcase } from 'lucide-react';
import { Logo } from "@/components/ui/logo";

type UserType = 'shift-worker' | 'agency' | 'company';

const UserTypeSelection = () => {
  const navigate = useNavigate();
  
  const selectUserType = (type: UserType) => {
    navigate(`/register/${type}`);
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Logo />
        </div>
        
        <div className="argon-card">
          <h1 className="text-2xl font-bold text-center mb-2">Join OvertimeStaff</h1>
          <p className="text-gray-600 mb-6 text-center">Select your user type to get started</p>
          
          <div className="space-y-4">
            <button 
              onClick={() => selectUserType('shift-worker')} 
              className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-primary/50 transition-colors flex items-center group"
            >
              <div className="bg-primary-100 p-3 rounded-full mr-4 group-hover:bg-primary-200 transition-colors">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-medium">Shift Worker</h3>
                <p className="text-sm text-gray-500">Find shifts and earn money on your schedule</p>
              </div>
            </button>
            
            <button 
              onClick={() => selectUserType('agency')} 
              className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-primary/50 transition-colors flex items-center group"
            >
              <div className="bg-purple-100 p-3 rounded-full mr-4 group-hover:bg-purple-200 transition-colors">
                <Briefcase className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-left">
                <h3 className="font-medium">Staffing Agency</h3>
                <p className="text-sm text-gray-500">Manage your workers and find opportunities</p>
              </div>
            </button>
            
            <button 
              onClick={() => selectUserType('company')} 
              className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-primary/50 transition-colors flex items-center group"
            >
              <div className="bg-teal-100 p-3 rounded-full mr-4 group-hover:bg-teal-200 transition-colors">
                <Building2 className="w-6 h-6 text-teal-600" />
              </div>
              <div className="text-left">
                <h3 className="font-medium">Company</h3>
                <p className="text-sm text-gray-500">Post shifts and find qualified staff</p>
              </div>
            </button>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account? <a href="/login" className="text-primary hover:underline font-medium">Sign in</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelection;
