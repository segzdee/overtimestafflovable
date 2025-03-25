
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

interface MarketFooterProps {
  lastUpdated: string;
  newPositionsCount: number;
  onViewAll: () => void;
}

const MarketFooter: React.FC<MarketFooterProps> = ({
  lastUpdated,
  newPositionsCount,
  onViewAll
}) => {
  return (
    <div className="flex flex-wrap justify-between items-center mt-4 px-2 text-xs text-gray-400">
      <p className="text-white">{lastUpdated}</p>
      <p className="text-white">{newPositionsCount} new positions added today</p>
      <Button
        variant="link"
        size="sm"
        onClick={onViewAll}
        className="text-green-400 hover:text-green-300 p-0"
      >
        View all positions →
      </Button>
    </div>
  );
};

export default MarketFooter;
