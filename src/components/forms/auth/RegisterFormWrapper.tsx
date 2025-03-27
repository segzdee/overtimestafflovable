
import React from 'react';
import RegisterForm from './RegisterForm';
import { RegisterFormProps } from './types';

export const RegisterFormWrapper: React.FC<RegisterFormProps> = ({ initialRole }) => {
  // Convert initialRole to appropriate userType
  const userType = initialRole || 'shift-worker';
  
  return <RegisterForm userType={userType} />;
};
