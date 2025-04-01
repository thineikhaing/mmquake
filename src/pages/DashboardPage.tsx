// src/pages/DashboardPage.tsx
import React from 'react';
import StatsOverview from "../components/Dashboard/StatsOverview";
import EarthquakeMonitor from "../components/Dashboard/EarthquakeMonitor";
import InfoGrid from "../components/Dashboard/InfoGrid";
import FundraisingSection from "../components/Dashboard/FundraisingSection";
const DashboardPage: React.FC = () => {
  return (
    <>
      <StatsOverview />
      <EarthquakeMonitor />
      <FundraisingSection />
      <InfoGrid />
    </>
  );
};

export default DashboardPage;
