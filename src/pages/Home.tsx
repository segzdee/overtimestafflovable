
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Home = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to Our App</h1>
      <p className="mb-8 text-gray-600">Your secure application platform</p>
      
      <div className="flex flex-wrap gap-4">
        <Button asChild>
          <Link to="/login">Login</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/register">Register</Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;
