import React, { memo, useCallback } from 'react';
import { Button } from "@/components/ui/button";

// Rest of the component implementation...

// Export memoized component to prevent unnecessary re-renders
export const ShiftCard = memo(({ shift, onApply, isAuthenticated }) => {
  const handleApply = useCallback(() => {
    onApply(shift.id);
  }, [onApply, shift.id]);
  
  // Component rendering logic...
});
