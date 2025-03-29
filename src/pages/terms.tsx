import React from 'react';
import Footer from '@/components/layout/Footer';

export default function Terms() {
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1">

        <div className="max-w-3xl mx-auto space-y-8">

          <section className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold">2. User Responsibilities</h2>
            <p className="text-gray-600">
              Users must provide accurate information during registration and maintain the security of their account credentials. Any activities that occur under your account are your responsibility.
            </p>
            <p className="text-gray-600">
              Users agree not to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Provide false or misleading information</li>
              <li>Attempt to circumvent any security measures</li>
              <li>Use the service for any unlawful purpose</li>
              <li>Interfere with the proper operation of the platform</li>
              <li>Share account credentials with third parties</li>
            </ul>
          </section>

          <section className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold">3. Service Description</h2>
            <p className="text-gray-600">
              Overtimestaff is a platform connecting hospitality professionals with temporary work opportunities. We facilitate connections but are not party to any employment agreements between users.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
