// src/pages/DashboardPage.tsx
import React from 'react';
import StatsOverview from '../components/Dashboard/StatsOverview';
import EarthquakeMonitor from '../components/Dashboard/EarthquakeMonitor';
import VerifiedFundraisers from '../components/Dashboard/VerifiedFundraisers';
import InfoGrid from '../components/Dashboard/InfoGrid';
import CommunityCampaigns from '../components/Dashboard/CommunityCampaigns';
import Footer from '../components/Footer';

const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
      Myanmar Earthquake | March 28 2025 
       </h1>
      <StatsOverview />
      <EarthquakeMonitor />
      <VerifiedFundraisers />
      <CommunityCampaigns />
      <InfoGrid />
      <Footer />
    </div>
  );
};

export default DashboardPage;
