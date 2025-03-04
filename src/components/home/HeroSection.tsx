
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          AI Meets <span className="text-purple-600">Hospitality</span>
        </h1>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6">
          Extra Staff, Anytime, Anywhere
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-10">
          Got extra time? Need extra shifts? No dinner staff coverage? Plan canceled? The OVERTIMESTAFF 
          Platform connects people with spare time to hospitality companies and agencies using smart AI 
          integration.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {/* Staffing Agency Card */}
          <div className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Staffing Agency</h3>
            <p className="text-gray-600 text-sm mb-6">Manage Multiple Venues and Staff</p>
            <a href="/login" className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-md transition-colors">
              LOGIN
            </a>
          </div>
          
          {/* Hotels & Businesses Card */}
          <div className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Hotels & Businesses</h3>
            <p className="text-gray-600 text-sm mb-6">Post Shifts and Hire Extra Staff</p>
            <a href="/login" className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-md transition-colors">
              LOGIN
            </a>
          </div>
          
          {/* Shift Workers Card */}
          <div className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Shift Workers</h3>
            <p className="text-gray-600 text-sm mb-6">Clock-In for Extra Shifts</p>
            <a href="/login" className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-md transition-colors">
              LOGIN
            </a>
          </div>
          
          {/* AI Agent Card */}
          <div className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Agent</h3>
            <p className="text-gray-600 text-sm mb-6">Activate Agent for Automation</p>
            <a href="/login" className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-md transition-colors">
              LOGIN
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
