
import React from 'react';
import { Link } from 'react-router-dom';

export default function ShiftWorkerDashboard() {
  // Mock data for available shifts
  const availableShifts = [
    { id: 1, title: "Bartender Evening Shift", location: "Sky Bar Lounge", date: "2023-07-15", pay: "$25/hr" },
    { id: 2, "title": "Server Lunch Shift", location: "Harbor Restaurant", date: "2023-07-16", pay: "$18/hr" },
    { id: 3, "title": "Hotel Reception Cover", location: "Grand Hotel", date: "2023-07-17", pay: "$22/hr" },
  ];
  
  // Mock data for upcoming shifts
  const upcomingShifts = [
    { id: 101, title: "Kitchen Assistant", location: "Bistro Central", date: "2023-07-14", pay: "$20/hr" },
  ];
  
  return (
    <div className="p-6">
      <div className="mb-10">
        <h1 className="text-2xl font-bold mb-2">Welcome to your Shift Worker Dashboard</h1>
        <p className="text-gray-600">Find and manage your shifts in one place</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Find Available Shifts
          </h2>
          <div className="flex mb-4">
            <Link 
              to="/find-shifts" 
              className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors"
            >
              Browse All Shifts
            </Link>
          </div>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            My Profile
          </h2>
          <p className="text-gray-600 mb-4">Update your skills, availability, and contact information.</p>
          <Link 
            to="/profile" 
            className="text-blue-600 hover:underline"
          >
            View and Edit Profile
          </Link>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Upcoming Shifts</h2>
        {upcomingShifts.length > 0 ? (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {upcomingShifts.map(shift => (
                <li key={shift.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{shift.title}</h3>
                      <p className="text-sm text-gray-600">{shift.location}</p>
                      <p className="text-sm text-gray-500">Date: {shift.date}</p>
                    </div>
                    <div className="text-right">
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {shift.pay}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-500">You don't have any upcoming shifts scheduled.</p>
        )}
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Recommended Shifts</h2>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {availableShifts.map(shift => (
              <li key={shift.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{shift.title}</h3>
                    <p className="text-sm text-gray-600">{shift.location}</p>
                    <p className="text-sm text-gray-500">Date: {shift.date}</p>
                  </div>
                  <div className="text-right">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded mb-2 block">
                      {shift.pay}
                    </span>
                    <button className="text-sm text-purple-600 hover:text-purple-800">
                      Apply
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
