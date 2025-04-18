
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MFASetupForm } from '@/components/forms/auth/MFASetupForm';

const MFASetup = () => {
  const navigate = useNavigate();
  
  const handleSuccess = () => {
    navigate('/dashboard');
  };
  
  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <MFASetupForm onSuccess={handleSuccess} onCancel={handleCancel} />
      </div>
    </div>
  );
};

export default MFASetup;
