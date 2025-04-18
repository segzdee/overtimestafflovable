
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

export const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};
