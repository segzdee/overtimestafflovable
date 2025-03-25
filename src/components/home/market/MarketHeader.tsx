
import React from 'react';
import { Button } from "@/components/ui/button";

interface MarketHeaderProps {
  title: string;
  onViewFullMarket: () => void;
}

const MarketHeader: React.FC<MarketHeaderProps> = ({
  title,
  onViewFullMarket
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
        {title}
      </h2>
      <Button 
        variant="outline" 
        onClick={onViewFullMarket} 
        className="text-sm"
      >
        View Full Market
      </Button>
    </div>
  );
};

export default MarketHeader;
