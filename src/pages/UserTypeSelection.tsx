
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserTypeSelection() {
  const navigate = useNavigate();
  
  const handleTypeSelection = (type: 'shift-worker' | 'agency' | 'company') => {
    // Navigate to registration with the selected user type
    navigate('/register', { state: { userType: type } });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join OvertimeStaff</h1>
          <p className="text-gray-600">Select how you want to use our platform</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="space-y-4">
            <button 
              onClick={() => handleTypeSelection('shift-worker')} 
              className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-purple-500 transition-colors flex items-center"
            >
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-medium">Shift Worker</h3>
                <p className="text-sm text-gray-500">Find shifts and earn money on your schedule</p>
              </div>
            </button>
            
            <button 
              onClick={() => handleTypeSelection('agency')} 
              className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-purple-500 transition-colors flex items-center"
            >
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-medium">Staffing Agency</h3>
                <p className="text-sm text-gray-500">Manage your workers and find opportunities</p>
              </div>
            </button>
            
            <button 
              onClick={() => handleTypeSelection('company')} 
              className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-purple-500 transition-colors flex items-center"
            >
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-medium">Company</h3>
                <p className="text-sm text-gray-500">Post shifts and find qualified staff</p>
              </div>
            </button>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-gray-600">
            Already have an account? <a href="/login" className="text-purple-600 hover:underline font-medium">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
}
