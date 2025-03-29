import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  children,
  action
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        {action && (
          <Button variant="link" size="sm" onClick={action.onClick}>
            {action.label}
          </Button>
        )}
      </CardHeader>
      <CardContent className="px-4">
        {children}
      </CardContent>
    </Card>
  );
};
