// src/pages/RescueTeamsPage.tsx
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
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    fetch('/data/crane_service.csv')
      .then((res) => res.text())
      .then((text) => {
        Papa.parse<Crane>(text, {
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
         Crane Services
        </span>
      </nav>

      <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Crane Services</h1>
        </div>
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

export default CranePage;
