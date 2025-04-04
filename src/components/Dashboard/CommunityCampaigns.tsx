// CommunityCampaigns.tsx
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

interface CommunityCampaign {
  region: string;
  name: string;
  description: string;
  link: string;
  detail: string;
}

const getRegionColor = (region: string): string => {
  switch (region.toLowerCase()) {
    case 'sagaing':
    case 'sagaing & mandalay':
      return 'text-red-600 font-semibold';
    case 'mandalay':
      return 'text-orange-500 font-semibold';
    case 'yangon':
      return 'text-green-600 font-semibold';
    case 'multiple':
      return 'text-purple-600 font-semibold';
    case 'nationwide':
      return 'text-blue-600 font-semibold';
    case 'yangon-based':
      return 'text-emerald-500 font-semibold';
    default:
      return 'text-gray-600 font-semibold';
  }
};

const CommunityCampaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<CommunityCampaign[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<CommunityCampaign[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [regionFilter, setRegionFilter] = useState<string>('All');
  const itemsPerPage = 6;

  useEffect(() => {
    fetch('/data/community_campaigns.csv')
      .then((res) => res.text())
      .then((text) => {
        Papa.parse<CommunityCampaign>(text, {
          header: true,
          complete: (results) => {
            setCampaigns(results.data);
            setFilteredCampaigns(results.data);
          },
        });
      });
  }, []);

  useEffect(() => {
    if (regionFilter === 'All') {
      setFilteredCampaigns(campaigns);
    } else {
      const filtered = campaigns.filter((c) =>
        c.region.toLowerCase().includes(regionFilter.toLowerCase())
      );
      setFilteredCampaigns(filtered);
    }
    setCurrentPage(1);
  }, [regionFilter, campaigns]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCampaigns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);

  useEffect(() => {
    // window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const regions = Array.from(new Set(campaigns.map((c) => c.region))).sort();

  return (
    <div className="mb-12">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <label htmlFor="regionFilter" className="text-sm font-medium">
          Filter by Region:
        </label>
        <select
          id="regionFilter"
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="text-sm border border-gray-300 rounded-md px-3 py-1.5"
        >
          <option value="All">All</option>
          {regions.map((region, idx) => (
            <option key={idx} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentItems.map((c, idx) => (
          <div
            key={idx}
            className="p-5 bg-white rounded-xl shadow-md space-y-2 border-l-4 border-yellow-400"
          >
            <div className={`text-sm ${getRegionColor(c.region)}`}>{c.region}</div>
            <h3 className="text-lg font-bold">{c.name}</h3>
            <p className="text-sm text-gray-700">{c.description}</p>
            <p className="text-sm text-gray-700">{c.detail}</p>
            {c.link && (
              <a
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm"
              >
                View Campaign →
              </a>
            )}
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx + 1}
              onClick={() => setCurrentPage(idx + 1)}
              className={`w-8 h-8 text-sm rounded ${
                currentPage === idx + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityCampaigns;