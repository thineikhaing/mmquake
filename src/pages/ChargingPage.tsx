// src/pages/RescueTeamsPage.tsx
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
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    fetch('/data/charging.csv')
      .then((res) => res.text())
      .then((text) => {
        Papa.parse<Charging>(text, {
          header: true,
          complete: (results) => setData(results.data),
        });
      });
  }, []);

  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentData = data.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(data.length / perPage);

  return (
    <>
            <nav className="flex items-center text-sm text-gray-600 space-x-2">
        <Link
          to="/"
          className="flex items-center text-gray-500 hover:text-gray-700"
        >
          <Home size={16} className="mr-1" />
          <span>Home</span>
        </Link>
        <ChevronRight size={14} className="text-gray-400" />
        <span className="font-semibold text-gray-900">
         Emergency Charging
        </span>
      </nav>

      <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Charging</h1>
        </div>
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
            {currentData.map((team, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-3 py-2">{indexOfFirst + index + 1}</td>
                <td className="px-3 py-2">{team.Name}</td>
                <td className="px-3 py-2">{team.Type}</td>
                <td className="px-3 py-2">{team.Address}</td>
                <td className="px-3 py-2">{team.City}</td>
                <td className="px-3 py-2">{team.Region}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 text-sm rounded ${
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
    </>

  );
};

export default ChargingPage;
