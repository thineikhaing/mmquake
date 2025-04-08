import React from "react";

export interface TarotCard {
    id: string;
    name: string;
    image: string;
    upright: string;
    reversed: string;
}

interface Props {
  cards: TarotCard[];
  onSelect: (card: TarotCard) => void;
}

const StackCardsGrid: React.FC<Props> = ({ cards, onSelect }) => {
  return (
    <div className="relative w-full overflow-x-auto py-6">
      <div className="flex items-end justify-center gap-[-60px] px-2">
        {cards.map((card, idx) => (
          <div
            key={card.id}
            className="relative -ml-6 hover:-translate-y-2 hover:z-10 transition-transform duration-200 cursor-pointer"
            style={{ zIndex: idx }}
            onClick={() => onSelect(card)}
          >
            <img
              src="/tarot/card-back.jpg" // or your card back URL
              alt="Card Back"
              className="w-24 h-36 rounded shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StackCardsGrid;
