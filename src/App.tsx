import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import RescueTeamsPage from "./pages/RescueTeamsPage";
import CommunitiesPage from "./pages/CommunitiesPage";
import ChargingPage from "./pages/ChargingPage";
import SubmitAndDisplayNeeds from "./pages/SubmitAndDisplayNeeds";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <>
      <Header/>
      <div className="space-y-12 p-6 bg-gray-50 min-h-screen">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/rescue-teams" element={<RescueTeamsPage />} />
          <Route path="/community-services" element={<CommunitiesPage />} />
          <Route path="/charging-stations" element={<ChargingPage />} />
          <Route path="/community-needs" element={<SubmitAndDisplayNeeds />} />
        </Routes>
      </div>
      <Footer/>
    </>
  );
}

export default App;
