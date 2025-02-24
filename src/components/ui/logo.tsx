
import React from "react";

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <img
      src="/favicon.ico"
      alt="Logo"
      className={className}
    />
  );
};
