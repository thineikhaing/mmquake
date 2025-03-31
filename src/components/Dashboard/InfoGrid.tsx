// src/components/Dashboard/InfoGrid.tsx
import React, { JSX } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, HandHelping, BatteryCharging } from "lucide-react";

interface InfoCard {
  title: string;
  type: string;
  icon: JSX.Element;
  description: string;
  route: string;
}

const cards: InfoCard[] = [
  // {
  //   type: 'missing',
  //   title: 'Missing Persons',
  //   icon: <Users size={28} />,
  //   description: 'Reported missing individuals in affected areas.',
  //   route: '/missing-persons',
  // },
  {
    type: "rescue",
    title: "Rescue Teams",
    icon: <Shield size={28} />,
    description: "Teams deployed for search and rescue operations.",
    route: "/rescue-teams",
  },
  {
    type: "community",
    title: "Community Services",
    icon: <HandHelping size={28} />,
    description: "Local aid services offering food & shelter.",
    route: "/community-services",
  },
  {
    type: "charging",
    title: "Free Charging Stations",
    icon: <BatteryCharging size={28} />,
    description: "Mobile charging stations for public use.",
    route: "/charging-stations",
  },
];

const InfoGrid: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Helpful Directories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {cards.map((card) => (
          <div
            key={card.type}
            className="bg-white rounded-lg shadow-sm hover:shadow-md cursor-pointer p-4 sm:p-5 flex flex-col space-y-2 border border-gray-100 hover:border-blue-400 transition-all"
            onClick={() => navigate(card.route)}
          >
            <div className="text-blue-600">{card.icon}</div>
            <h3 className="text-base font-semibold">{card.title}</h3>
            <p className="text-sm text-gray-600">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoGrid;
