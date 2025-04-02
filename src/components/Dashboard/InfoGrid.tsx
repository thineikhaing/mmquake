// src/components/Dashboard/InfoGrid.tsx
import React, { JSX } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, HandHelping, BatteryCharging, Truck } from "lucide-react";

interface InfoCard {
  title: string;
  type: string;
  icon: JSX.Element;
  description: string;
  mmDescription: string;
  route: string;
}

const cards: InfoCard[] = [
  {
    type: "rescue",
    title: "Rescue Teams",
    icon: <Shield size={28} />,
    description: "Teams deployed for search and rescue operations.",
    mmDescription: "ကယ်ဆယ်ရေးအဖွဲ့များနှင့် အရေးပေါ်တုံ့ပြန်သူများကို ရှာဖွေပါ",
    route: "/rescue-teams",
  },
    {
    type: 'crane',
    title: 'Crane Services',
    icon: <Truck size={28} />,
    description: 'Find free crane services for rescue operations',
    mmDescription: "ကယ်ဆယ်ရေးလုပ်ငန်းများအတွက် အခမဲ့ကရိန်းဝန်ဆောင်မှုများကို ရှာဖွေပါ",
    route: '/crane',
  },
  {
    type: "community",
    title: "Community Services",
    icon: <HandHelping size={28} />,
    description: "Local aid services offering food & shelter.",
    mmDescription: "အခမဲ့ဝန်ဆောင်မှုများကို ပြုလုပ်ပေးနေသော အသိုင်းအဝိုင်းအဖွဲ့များကို ရှာဖွေပါ",
    route: "/community-services",
  },
  {
    type: "charging",
    title: "Free Charging Stations",
    icon: <BatteryCharging size={28} />,
    description: "Mobile charging stations for public use.",
    mmDescription: "အခမဲ့ဖုန်းအားသွင်းရန်နေရာများကို ရှာဖွေပါ",
    route: "/charging-stations",
  },
];

const InfoGrid: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-2">
      {/* <h2 className="text-xl font-semibold mb-4">Helpful Directories</h2> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {cards.map((card) => (
          <div
            key={card.type}
            className="bg-white rounded-lg shadow-sm hover:shadow-md cursor-pointer p-4 sm:p-5 flex flex-col space-y-2 border border-gray-100 hover:border-blue-400 transition-all"
            onClick={() => navigate(card.route)}
          >
            <div className="text-blue-600">{card.icon}</div>
            <h3 className="text-base font-semibold">{card.title}</h3>
            <p className="text-sm text-gray-600">
              {card.description}
              <span className="block mt-1 text-sm">{card.mmDescription}</span>
            </p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoGrid;
