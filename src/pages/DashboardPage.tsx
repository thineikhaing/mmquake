// src/pages/DashboardPage.tsx
import React from "react";
import StatsOverview from "../components/Dashboard/StatsOverview";
import EarthquakeMonitor from "../components/Dashboard/EarthquakeMonitor";
import VerifiedFundraisers from "../components/Dashboard/VerifiedFundraisers";
import InfoGrid from "../components/Dashboard/InfoGrid";
import CommunityCampaigns from "../components/Dashboard/CommunityCampaigns";

const DashboardPage: React.FC = () => {
  return (
    <>
        <StatsOverview />
        <EarthquakeMonitor />
        <VerifiedFundraisers />
        <CommunityCampaigns />
        <InfoGrid />
  
    </>
  );
};

export default DashboardPage;
