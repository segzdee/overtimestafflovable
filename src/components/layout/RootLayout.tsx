
import React from 'react';
import { Outlet } from 'react-router-dom';
import { DevModeToggle } from '../dev/DevModeToggle';

export const RootLayout = () => {
  return (
    <>
      <Outlet />
      <DevModeToggle />
    </>
  );
};
