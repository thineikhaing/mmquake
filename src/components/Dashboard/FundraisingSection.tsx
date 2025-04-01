// src/pages/DashboardPage.tsx
import React, { useState } from 'react';
import VerifiedFundraisers from "./VerifiedFundraisers";
import CommunityCampaigns from "./CommunityCampaigns";
import SubNavTabs from "./SubNavTabs";
const FundraisingSection: React.FC = () => {
    const [visibleSection, setVisibleSection] = useState<string>("fundraisers"); // ⬅️ default tab
    return (
      <div className="mb-12 p-3 shadow-md rounded-lg">
  
        <SubNavTabs onSelect={(key) => setVisibleSection(key)} />
  
        {visibleSection === "fundraisers" && (
          <div className="mt-6">
            <VerifiedFundraisers />
          </div>
        )}
  
        {visibleSection === "campaigns" && (
          <div className="mt-6">
            <CommunityCampaigns />
          </div>
        )}
      </div>
    );
  };
  
export default FundraisingSection;
