
import React from "react";
import { cn } from "@/lib/utils";

interface ContentWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function ContentWrapper({ children, className }: ContentWrapperProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className={cn(
        "bg-white rounded-lg shadow-sm p-4",
        className
      )}>
        {children}
      </div>
    </div>
  );
}
