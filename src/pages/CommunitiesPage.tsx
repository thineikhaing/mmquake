// src/pages/RescueTeamsPage.tsx
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';

interface Communities {
  Name: string;
  Type: string;
  address: string;
  City: string;
  Region: string;
  Contact: string;
}

const CommunitiesPage: React.FC = () => {
  const [data, setData] = useState<Communities[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/communities.csv')
      .then((res) => res.text())
      .then((text) => {
        Papa.parse<Communities>(text, {
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
    <div className="p-6 space-y-6">
      {/* Back to Dashboard */}
      <button
        onClick={() => navigate('/')}
        className="text-blue-600 underline text-sm"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-2xl font-bold">Rescue Teams Directory</h1>

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
              <th className="px-3 py-2">Contact</th>
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
                <td className="px-3 py-2">{team.Contact}</td>
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
  );
};

export default CommunitiesPage;
