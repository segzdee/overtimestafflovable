
import React from 'react';
import { useParams } from 'react-router-dom';

export default function DashboardRouter() {
  const { role } = useParams<{ role: string }>();
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard: {role}</h1>
      <p>Dashboard content for {role} role will be displayed here.</p>
    </div>
  );
}
