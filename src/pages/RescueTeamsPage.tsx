import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { Home, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface RescueTeam {
  Region: string;
  Organization: string;
  Contact: string;
  Position: string;
  Location: string;
}

const RescueTeamsPage: React.FC = () => {
  const [data, setData] = useState<RescueTeam[]>([]);
  const [filteredData, setFilteredData] = useState<RescueTeam[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState("All");

  const perPage = 10;

  useEffect(() => {
    fetch("/data/rescue_teams.csv")
      .then((res) => res.text())
      .then((text) => {
        Papa.parse<RescueTeam>(text, {
          header: true,
          complete: (results) => {
            const cleaned = results.data.filter(d => d.Region && d.Organization);
            setData(cleaned);
            setFilteredData(cleaned);
          },
        });
      });
  }, []);

  useEffect(() => {
    const filtered = selectedRegion === "All"
      ? data
      : data.filter(team => team.Region === selectedRegion);
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [selectedRegion, data]);

  const uniqueRegions = Array.from(new Set(data.map(d => d.Region))).sort();

  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentData = filteredData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredData.length / perPage);

  return (
    <>
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-600 space-x-2 mb-4">
        <Link
          to="/"
          className="flex items-center text-gray-500 hover:text-gray-700"
        >
          <Home size={16} className="mr-1" />
          <span>Home</span>
        </Link>
        <ChevronRight size={14} className="text-gray-400" />
        <span className="font-semibold text-gray-900">Rescue Teams</span>
      </nav>

      {/* Header & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <h1 className="text-2xl font-bold">Rescue Teams</h1>
        <div>
          <label className="mr-2 text-sm font-medium">Filter by Region:</label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="border rounded px-3 py-1 text-sm bg-white shadow-sm"
          >
            <option value="All">All</option>
            {uniqueRegions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-3 py-2">#</th>
              <th className="px-3 py-2">Region</th>
              <th className="px-3 py-2">Organization</th>
              <th className="px-3 py-2">Contact</th>
              <th className="px-3 py-2">Position</th>
              <th className="px-3 py-2">Location</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((team, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-3 py-2">{indexOfFirst + index + 1}</td>
                <td className="px-3 py-2">{team.Region}</td>
                <td className="px-3 py-2">{team.Organization}</td>
                <td className="px-3 py-2">{team.Contact}</td>
                <td className="px-3 py-2">{team.Position}</td>
                <td className="px-3 py-2">{team.Location}</td>
              </tr>
            ))}
            {currentData.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-4">
                  No rescue teams found in this region.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 text-sm rounded-full transition ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default RescueTeamsPage;