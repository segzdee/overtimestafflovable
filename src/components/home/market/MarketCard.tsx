
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface MarketCardProps {
  type: string;
  urgency: string;
  rate: string;
  title: string;
  location: string;
  area: string;
  onClick: () => void;
  highlight?: boolean;
}

const MarketCard: React.FC<MarketCardProps> = ({
  type,
  urgency,
  rate,
  title,
  location,
  area,
  onClick,
  highlight = false
}) => {
  // Determine styling based on card type
  const cardClass = highlight 
    ? 'bg-purple-900/80 p-3 md:p-4 rounded-lg hover:bg-purple-900 transition-colors duration-200 border border-purple-800/50 cursor-pointer transform hover:scale-[1.01] transition-transform' 
    : 'bg-gray-800/80 p-3 md:p-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 border border-gray-700/50 cursor-pointer transform hover:scale-[1.01] transition-transform';

  // Determine styling for type badge
  const typeBadgeClass = type === 'URGENT' 
    ? 'text-xs bg-red-500 px-2 py-1 rounded-md text-white font-medium'
    : type === 'PREMIUM' 
      ? 'text-xs bg-purple-500 px-2 py-1 rounded-md text-white font-medium'
      : 'text-xs bg-amber-500 px-2 py-1 rounded-md text-gray-900 font-medium';

  // Determine styling for urgency badge
  const urgencyBadgeClass = urgency === 'HIGH'
    ? 'text-xs bg-red-500/20 px-2 py-1 rounded-md text-red-300 font-medium'
    : urgency === 'MEDIUM'
      ? 'text-xs bg-amber-500/20 px-2 py-1 rounded-md text-amber-300 font-medium'
      : 'text-xs bg-green-500/20 px-2 py-1 rounded-md text-green-300 font-medium';

  return (
    <div 
      className={cardClass}
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-2">
        <span className={typeBadgeClass}>{type}</span>
        <span className={urgencyBadgeClass}>{urgency}</span>
        <span className="text-sm font-bold text-green-400">{rate}</span>
      </div>
      <h3 className="font-semibold text-sm md:text-base text-white mb-1">{title}</h3>
      <p className="text-xs text-gray-300">{location}</p>
      <p className="text-xs text-white">{area}</p>
    </div>
  );
};

export default MarketCard;
