import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Home, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Crane {
  Name: string;
  Contact: string;
  Location: string;
}

const CranePage: React.FC = () => {
  const [data, setData] = useState<Crane[]>([]);
  const [filteredData, setFilteredData] = useState<Crane[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  const perPage = 10;

  useEffect(() => {
    fetch('/data/crane_service.csv')
      .then((res) => res.text())
      .then((text) => {
        Papa.parse<Crane>(text, {
          header: true,
          complete: (results) => {
            const cleanedData = results.data.filter(d => d.Name && d.Contact && d.Location);
            setData(cleanedData);
            setFilteredData(cleanedData);
          }
        });
      });
  }, []);

  useEffect(() => {
    const filtered = selectedRegion === 'All'
      ? data
      : data.filter(item => item.Location === selectedRegion);
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [selectedRegion, data]);

  const uniqueRegions = Array.from(new Set(data.map(d => d.Location))).sort();

  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentData = filteredData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredData.length / perPage);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-600 space-x-2">
        <Link to="/" className="flex items-center text-gray-500 hover:text-gray-700">
          <Home size={16} className="mr-1" />
          <span>Home</span>
        </Link>
        <ChevronRight size={14} className="text-gray-400" />
        <span className="font-semibold text-gray-900">Crane Services</span>
      </nav>

      {/* Header and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Crane Services</h1>
        <div>
          <label className="mr-2 text-sm font-medium">Filter by Location:</label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="border rounded px-3 py-1 text-sm bg-white shadow-sm"
          >
            <option value="All">All</option>
            {uniqueRegions.map(region => (
              <option key={region} value={region}>
                {region}
              </option>
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
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Contact</th>
              <th className="px-3 py-2">Location</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((team, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-3 py-2">{indexOfFirst + index + 1}</td>
                <td className="px-3 py-2">{team.Name}</td>
                <td className="px-3 py-2">{team.Contact}</td>
                <td className="px-3 py-2">{team.Location}</td>
              </tr>
            ))}
            {currentData.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center text-gray-500 py-4">
                  No crane services found in this region.
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
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CranePage;
