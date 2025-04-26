
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const FindShifts = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Find Shifts</h1>
      <p className="mb-8 text-gray-600">Browse available shifts in your area</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Card key={item}>
            <CardHeader>
              <CardTitle>Shift #{item}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Location: City {item}</p>
              <p>Date: 2025/05/{item < 10 ? '0' + item : item}</p>
              <p>Hours: 8</p>
              <div className="mt-4 flex justify-end">
                <Button>Apply Now</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button variant="outline" onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    </div>
  );
};

export default FindShifts;
