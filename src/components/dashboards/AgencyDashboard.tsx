
import React from 'react';
import { Link } from 'react-router-dom';

export default function AgencyDashboard() {
  // Mock data for agency staff
  const staff = [
    { id: 1, name: "John Smith", role: "Bartender", rating: 4.8, availability: "Available" },
    { id: 2, name: "Emma Johnson", role: "Server", rating: 4.5, availability: "On Shift" },
    { id: 3, name: "Alex Brown", role: "Chef", rating: 4.9, availability: "Available" },
  ];
  
  // Mock data for current placements
  const placements = [
    { id: 101, staff: "Emma Johnson", venue: "The Grand Hotel", position: "Server", dates: "Jul 15-17" },
    { id: 102, staff: "Michael Lee", venue: "Seaside Restaurant", position: "Chef", dates: "Jul 18-20" },
  ];
  
  // Mock data for job opportunities
  const opportunities = [
    { id: 201, venue: "Skyline Bar", position: "Bartender", pay: "$25/hr", dates: "Jul 22-23" },
    { id: 202, venue: "Harbor View", position: "Waiter", pay: "$22/hr", dates: "Jul 25-27" },
  ];
  
  return (
    <div className="p-6">
      <div className="mb-10">
        <h1 className="text-2xl font-bold mb-2">Agency Dashboard</h1>
        <p className="text-gray-600">Manage your staff and client placements</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Staff Member
          </h2>
          <p className="text-gray-600 mb-4">Add a new staff member to your agency.</p>
          <button 
            className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors"
          >
            Add Staff
          </button>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Browse Opportunities
          </h2>
          <p className="text-gray-600 mb-4">Find placement opportunities for your staff.</p>
          <Link 
            to="/find-shifts" 
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Find Opportunities
          </Link>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg border border-green-100">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            Agency Reports
          </h2>
          <p className="text-gray-600 mb-4">View financial reports and staff performance.</p>
          <button 
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
          >
            View Reports
          </button>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Staff</h2>
        {staff.length > 0 ? (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {staff.map((member) => (
                  <tr key={member.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{member.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{member.role}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{member.rating}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        member.availability === 'Available' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {member.availability}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                      <button className="text-purple-600 hover:text-purple-900">Assign</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">You don't have any staff members yet.</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Current Placements</h2>
          {placements.length > 0 ? (
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {placements.map(placement => (
                  <li key={placement.id} className="p-4 hover:bg-gray-50">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <div>
                        <h3 className="font-medium">{placement.staff}</h3>
                        <p className="text-sm text-gray-600">{placement.position} at {placement.venue}</p>
                        <p className="text-sm text-gray-500">Dates: {placement.dates}</p>
                      </div>
                      <div className="mt-2 sm:mt-0">
                        <button className="text-sm text-blue-600 hover:text-blue-800">
                          Details
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-500">You don't have any current placements.</p>
          )}
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Job Opportunities</h2>
          {opportunities.length > 0 ? (
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {opportunities.map(job => (
                  <li key={job.id} className="p-4 hover:bg-gray-50">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <div>
                        <h3 className="font-medium">{job.position}</h3>
                        <p className="text-sm text-gray-600">{job.venue}</p>
                        <p className="text-sm text-gray-500">Dates: {job.dates}</p>
                      </div>
                      <div className="mt-2 sm:mt-0 text-right">
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded block mb-2">
                          {job.pay}
                        </span>
                        <button className="text-sm text-purple-600 hover:text-purple-800">
                          Assign Staff
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-500">There are no open job opportunities.</p>
          )}
        </div>
      </div>
    </div>
  );
}
