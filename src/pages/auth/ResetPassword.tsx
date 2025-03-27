
import React from 'react';
import { NewPasswordForm } from '@/components/forms/auth/NewPasswordForm';

const ResetPassword = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
      <NewPasswordForm />
    </div>
  );
};

export default ResetPassword;
