import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <div>
      {title && <h1>{title}</h1>}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
