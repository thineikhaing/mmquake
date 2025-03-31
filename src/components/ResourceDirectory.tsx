// components/ResourceDirectory.tsx
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

interface Resource {
  name: string;
  description: string;
  contact: string;
  latitude: string;
  longitude: string;
  resource_type: string;
}

const ResourceDirectory: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    Papa.parse<Resource>('/resources.csv', {
      download: true,
      header: true,
      complete: (result) => setResources(result.data),
      error: (err) => console.error(err),
    });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Rescue Resources Directory</h2>
      <ul>
        {resources.map((res, idx) => (
          <li key={idx} className="mb-4 border-b pb-2">
            <strong>{res.name}</strong> ({res.resource_type})<br />
            📞 {res.contact}<br />
            📍 Lat: {res.latitude}, Lng: {res.longitude}<br />
            {res.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourceDirectory;
