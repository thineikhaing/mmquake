import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import RescueTeamsPage from "./pages/RescueTeamsPage";
import CommunitiesPage from "./pages/CommunitiesPage";
import ChargingPage from "./pages/ChargingPage";
import CranePage from "./pages/CranePage";
import SubmitAndDisplayNeeds from "./pages/SubmitAndDisplayNeeds";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {useState } from "react";
import { registerSW } from "virtual:pwa-register";
import UpdatePrompt from "./components/UpdatePrompt";
import ScrollToTop from './components/ScrollToTop';
import 'leaflet/dist/leaflet.css';
import "./App.css";

function App() {
  const [needRefresh, setNeedRefresh] = useState(false);
  const updateSW = registerSW({
    onNeedRefresh() {
      setNeedRefresh(true);
    },
    onOfflineReady() {
      console.log("PWA ready for offline use");
    },
  });
  return (
    <>
      <ScrollToTop />
      <Header/>
      <div className="space-y-2 p-6 py-3 bg-gray-50 min-h-screen">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/rescue-teams" element={<RescueTeamsPage />} />
          <Route path="/community-services" element={<CommunitiesPage />} />
          <Route path="/charging-stations" element={<ChargingPage />} />
          <Route path="/crane" element={<CranePage />} />
          <Route path="/community-needs" element={<SubmitAndDisplayNeeds />} />
        </Routes>
        {needRefresh && <UpdatePrompt onUpdate={() => updateSW(true)} />}
      </div>
      <Footer/>
    </>
  );
}

export default App;
