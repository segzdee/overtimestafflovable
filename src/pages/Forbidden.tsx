
import React from 'react';
import { Link } from 'react-router-dom';

export default function Forbidden() {
  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">403</h1>
      <h2 className="text-2xl mb-6">Forbidden</h2>
      <p className="mb-6">You don't have permission to access this resource.</p>
      <Link to="/" className="text-blue-500 hover:underline">
        Return to Home
      </Link>
    </div>
  );
}
