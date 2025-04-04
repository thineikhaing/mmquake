import React, { JSX } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  HandHelping,
  BatteryCharging,
  Truck,
} from "lucide-react";

interface InfoCard {
  title: string;
  type: string;
  icon: JSX.Element;
  description: string;
  mmDescription: string;
  route: string;
}

const iconColors: Record<string, string> = {
  rescue: "text-red-500 bg-red-100",
  crane: "text-yellow-500 bg-yellow-100",
  community: "text-green-600 bg-green-100",
  charging: "text-blue-600 bg-blue-100",
};

const cards: InfoCard[] = [
  {
    type: "rescue",
    title: "Rescue Teams",
    icon: <Shield size={28} />,
    description: "Teams deployed for search and rescue operations.",
    mmDescription:
      "ကယ်ဆယ်ရေးအဖွဲ့များနှင့် အရေးပေါ်တုံ့ပြန်သူများကို ရှာဖွေပါ",
    route: "/rescue-teams",
  },
  {
    type: "crane",
    title: "Crane Services",
    icon: <Truck size={28} />,
    description: "Find free crane services for rescue operations",
    mmDescription:
      "ကယ်ဆယ်ရေးလုပ်ငန်းများအတွက် အခမဲ့ကရိန်းဝန်ဆောင်မှုများကို ရှာဖွေပါ",
    route: "/crane",
  },
  {
    type: "community",
    title: "Community Services",
    icon: <HandHelping size={28} />,
    description: "Local aid services offering food & shelter.",
    mmDescription:
      "အခမဲ့ဝန်ဆောင်မှုများကို ပြုလုပ်ပေးနေသော အသိုင်းအဝိုင်းအဖွဲ့များကို ရှာဖွေပါ",
    route: "/community-services",
  },
  {
    type: "charging",
    title: "Free Charging Stations",
    icon: <BatteryCharging size={28} />,
    description: "Mobile charging stations for public use.",
    mmDescription:
      "အခမဲ့ဖုန်းအားသွင်းရန်နေရာများကို ရှာဖွေပါ",
    route: "/charging-stations",
  },
];

const InfoGrid: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-12 p-3 shadow-md rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.type}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg cursor-pointer p-5 border border-gray-100 hover:border-blue-400 transition-all duration-200"
            onClick={() => navigate(card.route)}
          >
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full mb-2 ${iconColors[card.type]} transition-all`}
            >
              {React.cloneElement(card.icon, { size: 24 })}
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
            <p className="text-sm text-gray-600 leading-snug">
              {card.description}
              <span className="block mt-1 text-gray-500">
                {card.mmDescription}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoGrid;