import React, { useState, useEffect } from 'react';
import { fetchStaffData, calculateReliabilityScore } from '../utils/staffUtils';

export default function FindStaff() {
  const [staff, setStaff] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [sortBy, setSortBy] = useState("clientRating");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  useEffect(() => {
    const data = fetchStaffData();
    setStaff(data);
    setFilteredStaff(data);
  }, []);

  useEffect(() => {
    let filtered = [...staff];
    if (selectedRegion !== "All") {
      filtered = filtered.filter(member => member.region === selectedRegion);
    }
    if (verifiedOnly) {
      filtered = filtered.filter(member => member.verified);
    }
    setFilteredStaff(filtered);
  }, [staff, selectedRegion, verifiedOnly]);

  const staffWithScores = filteredStaff.map(member => ({
    ...member,
    reliabilityScore: calculateReliabilityScore(member)
  }));

  const handleRegionChange = (e) => setSelectedRegion(e.target.value);

  const handleSortChange = (e) => {
    const sortCriteria = e.target.value;
    setSortBy(sortCriteria);
    const sortedStaff = [...filteredStaff].sort((a, b) => {
      if (sortCriteria === "reliabilityScore") {
        return calculateReliabilityScore(b) - calculateReliabilityScore(a);
      } else if (sortCriteria === "avgHourlyRate") {
        return a.ratings.avgHourlyRate - b.ratings.avgHourlyRate;
      } else {
        return b.ratings[sortCriteria] - a.ratings[sortCriteria];
      }
    });
    setFilteredStaff(sortedStaff);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center py-4">
        <a href="/" className="text-blue-700 font-bold text-xl">Home</a>
        <a href="/about" className="text-gray-700 hover:text-blue-700">About</a>
        <a href="/contact" className="text-gray-700 hover:text-blue-700">Contact</a>
      </nav>

      <h1 className="text-3xl font-bold mb-6 text-blue-700">Staff Marketplace</h1>
      
      <div className="mb-6 flex flex-wrap items-center gap-4">
        {/* Filters */}
        <div>
          <label htmlFor="region-select" className="block text-sm font-medium text-gray-700">Filter by Region:</label>
          <select
            id="region-select"
            value={selectedRegion}
            onChange={handleRegionChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="All">All Regions</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="East">East</option>
            <option value="West">West</option>
          </select>
        </div>
        
        <div className="flex items-center">
          <input
            id="verified-only"
            name="verified-only"
            type="checkbox"
            checked={verifiedOnly}
            onChange={() => setVerifiedOnly(!verifiedOnly)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="verified-only" className="ml-2 block text-sm text-gray-700">
            Verified Staff Only
          </label>
        </div>
        
        <div>
          <label htmlFor="sort-select" className="block text-sm font-medium text-gray-700">Sort by:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={handleSortChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="clientRating">Client Rating</option>
            <option value="reliability">Reliability</option>
            <option value="reliabilityScore">Overall Score</option>
            <option value="avgHourlyRate">Hourly Rate (Low to High)</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {staffWithScores.length > 0 ? (
          staffWithScores.map((staffMember) => (
            <div key={staffMember.id} className="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800">{staffMember.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${staffMember.verified ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {staffMember.verified ? 'Verified' : 'Not Verified'}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">{staffMember.location}, {staffMember.country}</p>
              <p className="text-sm text-gray-500">Region: {staffMember.region}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {staffMember.positions.map((position, idx) => (
                  <span key={idx} className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    {position}
                  </span>
                ))}
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700">Hourly Rate:</h4>
                <p className="text-lg font-bold text-blue-600">£{staffMember.ratings.avgHourlyRate.toFixed(2)}/hr</p>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700">Reliability Score:</h4>
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${(staffMember.reliabilityScore / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">{staffMember.reliabilityScore}/5</span>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                  Contact
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200">
                  View Profile
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No staff members found matching your criteria.
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 border-t pt-6 text-center text-gray-500">
        <a href="/privacy-policy" className="hover:text-blue-700">Privacy Policy</a> | 
        <a href="/terms-of-service" className="hover:text-blue-700"> Terms of Service</a>
      </footer>
    </div>
  );
}
