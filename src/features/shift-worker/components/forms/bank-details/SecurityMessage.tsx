
import React from "react";
import { Shield } from "lucide-react";

export function SecurityMessage() {
  return (
    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
      <Shield className="h-4 w-4" />
      <span>Your banking information is encrypted and secure</span>
    </div>
  );
}
