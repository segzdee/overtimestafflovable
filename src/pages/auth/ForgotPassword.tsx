
import React from 'react';
import { PasswordResetForm } from '@/components/forms/auth/PasswordResetForm';

const ForgotPassword = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
      <PasswordResetForm />
    </div>
  );
};

export default ForgotPassword;
