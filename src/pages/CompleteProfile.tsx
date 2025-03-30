
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "./src/contexts/auth/useAuth";

export default function CompleteProfile() {
  const { userType } = useParams();
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    bio: "",
    // Shift worker specific fields
    skills: [] as string[],
    availability: [] as string[],
    // Agency specific fields
    agencyName: "",
    staffCount: "",
    // Company specific fields
    companyName: "",
    industry: "",
    location: ""
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    
    if (checked) {
      setFormData(prev => ({ 
        ...prev, 
        [name]: [...(prev[name as keyof typeof formData] as string[]), value] 
      }));
    } else {
      setFormData(prev => ({ 
        ...prev, 
        [name]: (prev[name as keyof typeof formData] as string[]).filter(item => item !== value) 
      }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Build profile data based on user type
      const profileData: Record<string, any> = {
        name: `${formData.firstName} ${formData.lastName}`,
        phone: formData.phone,
        bio: formData.bio
      };
      
      // Add user type specific fields
      if (userType === 'shift-worker') {
        profileData.skills = formData.skills;
        profileData.availability = formData.availability;
      } else if (userType === 'agency') {
        profileData.agencyName = formData.agencyName;
        profileData.staffCount = formData.staffCount;
      } else if (userType === 'company') {
        profileData.companyName = formData.companyName;
        profileData.industry = formData.industry;
        profileData.location = formData.location;
      }
      
      // Update profile and navigate to dashboard
      await updateProfile(profileData);
      navigate(`/dashboard/${userType}`);
    } catch (error) {
      console.error("Failed to save profile:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Render different form fields based on user type
  const renderUserTypeFields = () => {
    switch (userType) {
      case 'shift-worker':
        return (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Select Your Skills
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Bartending', 'Waiting Tables', 'Hosting', 'Cooking', 'Cleaning', 'Management'].map(skill => (
                  <label key={skill} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="skills"
                      value={skill}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">{skill}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Availability
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Weekday Mornings', 'Weekday Afternoons', 'Weekday Evenings', 'Weekend Mornings', 'Weekend Afternoons', 'Weekend Evenings'].map(time => (
                  <label key={time} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="availability"
                      value={time}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">{time}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        );
      case 'agency':
        return (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="agencyName">
                Agency Name
              </label>
              <input
                type="text"
                id="agencyName"
                name="agencyName"
                value={formData.agencyName}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Your agency name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="staffCount">
                Number of Staff
              </label>
              <select
                id="staffCount"
                name="staffCount"
                value={formData.staffCount}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select staff count</option>
                <option value="1-10">1-10 Staff</option>
                <option value="11-50">11-50 Staff</option>
                <option value="51-100">51-100 Staff</option>
                <option value="100+">100+ Staff</option>
              </select>
            </div>
          </>
        );
      case 'company':
        return (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyName">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Your company name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="industry">
                Industry
              </label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select industry</option>
                <option value="Hotel">Hotel</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Bar">Bar</option>
                <option value="Event Venue">Event Venue</option>
                <option value="Catering">Catering</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="City, Country"
                required
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">Complete Your Profile</h1>
          <p className="text-gray-600 mb-6 text-center">
            Tell us a bit more about yourself so we can tailor your experience.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="First name"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Last name"
                  required
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Phone number"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Tell us a bit about yourself"
                rows={3}
              />
            </div>
            
            {/* Render user type specific fields */}
            {renderUserTypeFields()}
            
            <div className="flex items-center justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isLoading ? "Saving..." : "Complete Profile"}
              </button>
            </div>
          </form>
        </div>
        <p className="text-center text-gray-500 text-xs">
          You can always update your profile later from your account settings.
        </p>
      </div>
    </div>
  );
}
