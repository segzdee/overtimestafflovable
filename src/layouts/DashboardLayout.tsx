import React from "react";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <header>Dashboard Header</header>
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;
