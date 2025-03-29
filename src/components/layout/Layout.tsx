
import React, { ReactNode } from 'react';
import { RootLayout } from './RootLayout';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <RootLayout>
      <main className="py-6">
        {children}
      </main>
    </RootLayout>
  );
};
