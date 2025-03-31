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
        return 'text-red-600 font-semibold';
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

  useEffect(() => {
    fetch('/data/community_campaigns.csv')
      .then((res) => res.text())
      .then((text) => {
        Papa.parse<CommunityCampaign>(text, {
          header: true,
          complete: (results) => setCampaigns(results.data),
        });
      });
  }, []);

  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold mb-4">💛 Community-led Earthquake Campaigns</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {campaigns.map((c, idx) => (
          <div key={idx} className="p-5 bg-white rounded-xl shadow-md space-y-2 border-l-4 border-yellow-400">
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
    </div>
  );
};

export default CommunityCampaigns;
