
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AccountRecovery = () => {
  const [email, setEmail] = useState('');
  const [recoveryMethod, setRecoveryMethod] = useState<'email' | 'phone'>('email');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleMethodSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Simulate API call to send verification code
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep(2);
    } catch (err) {
      setError('Failed to send verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Simulate verification of the code
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, allow any 6-digit code
      if (verificationCode.length === 6) {
        navigate('/reset-password', { 
          state: { 
            recoveryMethod: recoveryMethod === 'email' ? email : phoneNumber 
          } 
        });
      } else {
        setError('Invalid verification code. Please try again.');
      }
    } catch (err) {
      setError('Failed to verify code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Account Recovery</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {step === 1 
              ? "Verify your identity to recover your account" 
              : "Enter the verification code sent to you"}
          </p>
        </div>

        {step === 1 ? (
          <form className="mt-8 space-y-6" onSubmit={handleMethodSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recovery Method
                </label>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setRecoveryMethod('email')}
                    className={`px-4 py-2 text-sm rounded-md ${
                      recoveryMethod === 'email'
                        ? 'bg-purple-100 text-purple-700 border border-purple-300'
                        : 'bg-gray-100 text-gray-700 border border-gray-300'
                    }`}
                  >
                    Email
                  </button>
                  <button
                    type="button"
                    onClick={() => setRecoveryMethod('phone')}
                    className={`px-4 py-2 text-sm rounded-md ${
                      recoveryMethod === 'phone'
                        ? 'bg-purple-100 text-purple-700 border border-purple-300'
                        : 'bg-gray-100 text-gray-700 border border-gray-300'
                    }`}
                  >
                    Phone
                  </button>
                </div>
              </div>

              {recoveryMethod === 'email' ? (
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    placeholder="your.email@example.com"
                  />
                </div>
              ) : (
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              )}
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Processing..." : "Continue"}
              </button>
            </div>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleCodeSubmit}>
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                Verification Code
              </label>
              <input
                id="code"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                required
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, ''))}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Enter 6-digit code"
              />
              <p className="mt-2 text-xs text-gray-500">
                Enter the 6-digit code sent to {recoveryMethod === 'email' ? email : phoneNumber}
              </p>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div className="flex flex-col space-y-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Verifying..." : "Verify"}
              </button>
              
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm text-purple-600 hover:text-purple-500"
              >
                Back to recovery options
              </button>
            </div>
          </form>
        )}
        
        <div className="mt-4 text-center">
          <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">
            Return to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountRecovery;
