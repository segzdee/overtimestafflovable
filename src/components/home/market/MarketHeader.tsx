
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/auth";

interface MarketHeaderProps {
  title: string;
  onViewFullMarket: () => void;
}

const MarketHeader: React.FC<MarketHeaderProps> = ({
  title,
  onViewFullMarket
}) => {
  const { user } = useAuth();

  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
        {title}
      </h2>
      <div className="flex space-x-2">
        {user && (
          <Link to="/ai-assistant">
            <Button variant="outline" className="text-sm mr-2">
              AI Assistant
            </Button>
          </Link>
        )}
        <Button 
          variant="outline" 
          onClick={onViewFullMarket} 
          className="text-sm"
        >
          View Full Market
        </Button>
      </div>
    </div>
  );
};

export default MarketHeader;
