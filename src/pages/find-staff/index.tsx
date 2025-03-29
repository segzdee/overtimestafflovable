import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DevModeBanner } from '@/components/dev/DevModeBanner';
import { useAuth } from '@/contexts/auth/AuthContext';
import { StaffCard } from '@/components/staff/StaffCard';
import { Search, MapPin, Filter, Loader2 } from 'lucide-react';

// Define TypeScript interfaces for better type safety
interface StaffMember {
  id: string;
  name: string;
  location: string;
  distance: string;
  positions: string[];
  rating: number;
  verified: boolean;
  availability: string;
  hourlyRate: number;
  image: string;
}

// Mock staff data for development until actual staff registration is implemented
const mockStaffData: StaffMember[] = [
  {
    id: '1',
    name: 'Jane Smith',
    location: 'London',
    distance: '2.3 km away',
    positions: ['Bartender', 'Waiter/Waitress'],
    rating: 4.8,
    verified: true,
    availability: 'Available Now',
    hourlyRate: 15.50,
    image: '/placeholder/staff-1.jpg'
  },
  {
    id: '2',
    name: 'John Doe',
    location: 'Birmingham',
    distance: '5.1 km away',
    positions: ['Chef', 'Kitchen Staff'],
    rating: 4.6,
    verified: true,
    availability: 'Available Today',
    hourlyRate: 22.00,
    image: '/placeholder/staff-2.jpg'
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    location: 'Manchester',
    distance: '3.8 km away',
    positions: ['Bartender', 'Barista'],
    rating: 4.9,
    verified: true,
    availability: 'Available Now',
    hourlyRate: 14.75,
    image: '/placeholder/staff-3.jpg'
  },
  {
    id: '4',
    name: 'Mike Wilson',
    location: 'Liverpool',
    distance: '4.2 km away',
    positions: ['Server', 'Host/Hostess'],
    rating: 4.5,
    verified: false,
    availability: 'Available Tomorrow',
    hourlyRate: 13.25,
    image: '/placeholder/staff-4.jpg'
  },
  {
    id: '5',
    name: 'Emily Davis',
    location: 'London',
    distance: '1.7 km away',
    positions: ['Event Staff', 'Server'],
    rating: 4.7,
    verified: true,
    availability: 'Available Now',
    hourlyRate: 16.50,
    image: '/placeholder/staff-5.jpg'
  },
  {
    id: '6',
    name: 'Robert Brown',
    location: 'Leeds',
    distance: '3.5 km away',
    positions: ['Chef', 'Kitchen Manager'],
    rating: 4.9,
    verified: true,
    availability: 'Available Today',
    hourlyRate: 25.00,
    image: '/placeholder/staff-6.jpg'
  }
];

export default function FindStaff() {
  const [staff] = useState<StaffMember[]>(mockStaffData);
  const [filteredStaff, setFilteredStaff] = useState<StaffMember[]>(mockStaffData);
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('All');
  const [availabilityFilter, setAvailabilityFilter] = useState('All');
  const [radiusFilter, setRadiusFilter] = useState('5');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Get unique positions from all staff for filter options - memoized for performance
  const allPositions = useMemo(() => {
    return Array.from(
      new Set(staff.flatMap(staffMember => staffMember.positions))
    );
  }, [staff]);

  // Get unique availability options for filter - memoized for performance
  const allAvailabilities = useMemo(() => {
    return Array.from(
      new Set(staff.map(staffMember => staffMember.availability))
    );
  }, [staff]);

  // Filter staff based on search term and filters
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    // Simulate API delay
    const timeoutId = setTimeout(() => {
      try {
        let filtered = [...staff];
        
        // Apply search filter
        if (searchTerm) {
          filtered = filtered.filter(
            staffMember => 
              staffMember.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              staffMember.positions.some(pos => pos.toLowerCase().includes(searchTerm.toLowerCase()))
          );
        }
        
        // Apply position filter
        if (positionFilter !== 'All') {
          filtered = filtered.filter(
            staffMember => staffMember.positions.includes(positionFilter)
          );
        }
        
        // Apply availability filter
        if (availabilityFilter !== 'All') {
          filtered = filtered.filter(
            staffMember => staffMember.availability === availabilityFilter
          );
        }
        
        // Apply radius filter (this would be more complex with real geolocation)
        if (radiusFilter) {
          const maxDistance = parseInt(radiusFilter);
          filtered = filtered.filter(
            staffMember => {
              const distance = parseFloat(staffMember.distance.split(' ')[0]);
              return distance <= maxDistance;
            }
          );
        }
        
        setFilteredStaff(filtered);
      } catch (err) {
        setError('An error occurred while filtering staff. Please try again.');
        console.error('Filter error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [staff, searchTerm, positionFilter, availabilityFilter, radiusFilter]);

  // Authentication-gated contact functionality
  const handleContactStaff = (staffId: string) => {
    if (!isAuthenticated) {
      // Redirect to login with return URL if not authenticated
      navigate('/login', { 
        state: { 
          redirectAfterLogin: `/staff/${staffId}/contact`,
          message: 'Please log in to contact staff members' 
        } 
      });
      return;
    }
    
    // Navigate to staff contact page if authenticated
    navigate(`/staff/${staffId}/contact`);
  };

  const handleViewProfile = (staffId: string) => {
    navigate(`/staff/${staffId}`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Find Available Staff</h1>
      
      <DevModeBanner className="mb-6" />
      
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name or position"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search staff"
            />
          </div>
          
          {/* Radius Filter */}
          <div className="relative"></div>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={radiusFilter}
              onChange={(e) => setRadiusFilter(e.target.value)}
              aria-label="Distance filter"
            >
              <option value="5">Within 5 km</option>
              <option value="10">Within 10 km</option>
              <option value="20">Within 20 km</option>
              <option value="100">Any distance</option>
            </select>
          </div>
          
          {/* Filters Button */}
          <Button
            variant="outline"
            className="flex items-center gap-2"
            aria-label="Show filters"
          ></Button>
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
        
        {/* Filter Options */}
        <div className="flex flex-wrap gap-4 mt-4"></div>
          {/* Position Filter */}
          <div></div>
            <label htmlFor="position-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Position
            </label>
            <select
              id="position-filter"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
              aria-label="Filter by position"
            >
              <option value="All">All Positions</option>
              {allPositions.map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </select>
          </div>
          
          {/* Availability Filter */}
          <div>
            <label htmlFor="availability-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Availability
            </label>
            <select
              id="availability-filter"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              aria-label="Filter by availability"
            ></select>
              <option value="All">All Availability</option>
              {allAvailabilities.map((availability) => (
                <option key={availability} value={availability}>
                  {availability}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 text-purple-600 animate-spin mr-2" />
          <p className="text-gray-500">Looking for available staff...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64 text-red-500">
          <p>{error}</p>
        </div>
      ) : (
        <>
          {/* Results Count */}
          <p className="text-gray-600 mb-4"></p>
            Showing {filteredStaff.length} staff members
          </p>
          
          {/* Staff Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStaff.length > 0 ? (
              filteredStaff.map((staffMember) => (
                <StaffCard
                  key={staffMember.id}
                  staff={staffMember}
                  onContact={() => handleContactStaff(staffMember.id)}
                  onViewProfile={() => handleViewProfile(staffMember.id)}
                  isAuthenticated={isAuthenticated}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12"></div>
                <p className="text-gray-500 text-lg">No staff members found matching your criteria.</p>
                <p className="text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
                <Button 
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm('');
                    setPositionFilter('All');
                    setAvailabilityFilter('All');
                    setRadiusFilter('5');
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}