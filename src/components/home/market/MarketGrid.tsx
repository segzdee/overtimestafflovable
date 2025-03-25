
import React from 'react';
import MarketCard from './MarketCard';

interface MarketGridProps {
  cards: Array<{
    type: string;
    urgency: string;
    rate: string;
    title: string;
    location: string;
    area: string;
    highlight: boolean;
  }>;
  onCardClick: () => void;
}

const MarketGrid: React.FC<MarketGridProps> = ({
  cards,
  onCardClick
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
      <div className="space-y-3 md:space-y-4">
        {cards.slice(0, 2).map((card, index) => (
          <MarketCard
            key={`col1-${index}`}
            type={card.type}
            urgency={card.urgency}
            rate={card.rate}
            title={card.title}
            location={card.location}
            area={card.area}
            highlight={card.highlight}
            onClick={onCardClick}
          />
        ))}
      </div>
      
      <div className="space-y-3 md:space-y-4">
        {cards.slice(2, 4).map((card, index) => (
          <MarketCard
            key={`col2-${index}`}
            type={card.type}
            urgency={card.urgency}
            rate={card.rate}
            title={card.title}
            location={card.location}
            area={card.area}
            highlight={card.highlight}
            onClick={onCardClick}
          />
        ))}
      </div>
    </div>
  );
};

export default MarketGrid;
