import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Home, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Charging {
  Name: string;
  Type: string;
  Address: string;
  City: string;
  Region: string;
}

const ChargingPage: React.FC = () => {
  const [data, setData] = useState<Charging[]>([]);
  const [filteredData, setFilteredData] = useState<Charging[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCity, setSelectedCity] = useState<string>('All');

  const perPage = 10;

  useEffect(() => {
    fetch('/data/charging.csv')
      .then((res) => res.text())
      .then((text) => {
        Papa.parse<Charging>(text, {
          header: true,
          complete: (results) => {
            const cleaned = results.data.filter(d => d.Name && d.City); // Avoid blank rows
            setData(cleaned);
            setFilteredData(cleaned);
          }
        });
      });
  }, []);

  useEffect(() => {
    const filtered = selectedCity === 'All'
      ? data
      : data.filter(item => item.City === selectedCity);
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to page 1 when filter changes
  }, [selectedCity, data]);

  const uniqueCities = Array.from(new Set(data.map(d => d.City))).sort();

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
        <span className="font-semibold text-gray-900">Emergency Charging</span>
      </nav>

      {/* Header and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Charging</h1>
        <div>
          <label className="mr-2 text-sm font-medium">Filter by City:</label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="border rounded px-3 py-1 text-sm bg-white shadow-sm"
          >
            <option value="All">All</option>
            {uniqueCities.map(city => (
              <option key={city} value={city}>{city}</option>
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
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">Address</th>
              <th className="px-3 py-2">City</th>
              <th className="px-3 py-2">Region</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((station, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-3 py-2">{indexOfFirst + index + 1}</td>
                <td className="px-3 py-2">{station.Name}</td>
                <td className="px-3 py-2">{station.Type}</td>
                <td className="px-3 py-2">{station.Address}</td>
                <td className="px-3 py-2">{station.City}</td>
                <td className="px-3 py-2">{station.Region}</td>
              </tr>
            ))}
            {currentData.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-4">
                  No charging stations found in this city.
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

export default ChargingPage;