import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import RescueTeamsPage from './pages/RescueTeamsPage';
import CommunitiesPage from './pages/CommunitiesPage';
import ChargingPage from './pages/ChargingPage';
import './App.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/rescue-teams" element={<RescueTeamsPage />} />
        <Route path="/community-services" element={<CommunitiesPage />} />
        <Route path="/charging-stations" element={<ChargingPage />} />
      </Routes>
    </>
  )
}

export default App
