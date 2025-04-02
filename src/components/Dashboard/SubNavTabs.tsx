// SubNavTabs.tsx
import React, { useState } from "react";
import { Landmark, Users } from "lucide-react";

interface Props {
  onSelect: (section: string) => void;
}

const SubNavTabs: React.FC<Props> = ({ onSelect }) => {
  const [active, setActive] = useState<string | null>("fundraisers");

  const handleClick = (key: string) => {
    const next = key === active ? null : key;
    setActive(next);
    onSelect(next ?? "");
  };

  return (
    <div className="flex gap-4 mb-6 flex-wrap justify-center">
      <button
        onClick={() => handleClick("fundraisers")}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition text-sm font-medium shadow ${
          active === "fundraisers"
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
        }`}
      >
        <Landmark size={16} /> Verified Fundraising Organizations
      </button>
      <button
        onClick={() => handleClick("campaigns")}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition text-sm font-medium shadow ${
          active === "campaigns"
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
        }`}
      >
        <Users size={16} /> Community Campaigns
      </button>
    </div>
  );
};

export default SubNavTabs;
