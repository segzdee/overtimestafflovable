
import * as React from "react";
import { Card } from "./card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    positive?: boolean;
  };
  className?: string;
}

export function StatsCard({ title, value, description, icon, trend, className }: StatsCardProps) {
  return (
    <Card className={cn("p-4 sm:p-6 hover:shadow-md transition-shadow duration-300", className)}>
      <div className="flex items-center gap-4">
        {icon && (
          <div className="rounded-full p-2 bg-primary/10">
            {icon}
          </div>
        )}
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-400">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              {value}
            </h2>
            {trend && (
              <span className={cn(
                "text-xs sm:text-sm",
                trend.positive ? "text-green-500" : "text-red-500"
              )}>
                {trend.value}
              </span>
            )}
          </div>
          {description && (
            <p className="text-xs sm:text-sm text-gray-500">
              {description}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
