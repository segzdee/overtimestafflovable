
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link 
      to="/" 
      className={cn("flex items-center justify-center gap-2", className)}
    >
      <span className="text-2xl font-bold">
        OVERTIME<span className="text-primary">STAFF</span>
      </span>
    </Link>
  );
};
