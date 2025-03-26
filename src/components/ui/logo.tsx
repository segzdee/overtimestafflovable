import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  title?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className,
  title = "OvertimeStaff",
}) => {
  return (
    <Link
      to="/"
      className={cn("flex items-center justify-center gap-2", className)}
      aria-label={title}
    >
      <span className="text-2xl font-bold">
        OVERTIME<span className="text-purple-600">STAFF</span>
      </span>
    </Link>
  );
};