import React, { useEffect, useState } from "react";
import { format } from "date-fns";

interface Earthquake {
  id: string;
  magnitude: number;
  place: string;
  time: number;
  depth: number;
  url: string;
}

const API_URLS = {
  "24h":
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson",
  week: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson",
  month:
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
};

const EarthquakeMonitor: React.FC = () => {
  const [filter, setFilter] = useState<"24h" | "week" | "month">("24h");
  const [quakes, setQuakes] = useState<Earthquake[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const perPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(API_URLS[filter]);
      const data = await res.json();

      const parsed: Earthquake[] = data.features
        .filter((item: any) => item.properties.place.includes("Myanmar"))
        .map((item: any) => ({
          id: item.id,
          magnitude: item.properties.mag,
          place: item.properties.place,
          time: item.properties.time,
          depth: item.geometry.coordinates[2],
          url: item.properties.url,
        }));

      setQuakes(parsed);
      setCurrentPage(1); // reset to first page when filter changes
      setLoading(false);
    };

    fetchData();
  }, [filter]);

  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentQuakes = quakes.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(quakes.length / perPage);

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Earthquake Monitor (Myanmar)</h2>
        <div className="space-x-2">
          {(["24h", "week", "month"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                filter === t ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              Past {t === "24h" ? "24 hrs" : t}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : currentQuakes.length === 0 ? (
        <p>No earthquakes reported in Myanmar for this period.</p>
      ) : (
        <>
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 font-medium">
                <tr>
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3">Magnitude</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Depth (km)</th>
                  <th className="px-4 py-3">Details</th>
                </tr>
              </thead>
              <tbody>
                {currentQuakes.map((eq) => (
                  <tr key={eq.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">
                      {format(new Date(eq.time), "MMM dd, yyyy, hh:mm a")}
                    </td>
                    <td
                      className={`px-4 py-2 font-semibold ${
                        eq.magnitude < 2.5
                          ? "text-gray-500"
                          : eq.magnitude < 5
                          ? "text-yellow-500"
                          : eq.magnitude < 6
                          ? "text-orange-500"
                          : eq.magnitude < 7
                          ? "text-red-600"
                          : eq.magnitude < 8
                          ? "text-pink-600"
                          : "text-purple-600"
                      }`}
                    >
                      {eq.magnitude.toFixed(1)}
                    </td>
                    <td className="px-4 py-2">{eq.place}</td>
                    <td className="px-4 py-2">{eq.depth.toFixed(1)}</td>
                    <td className="px-4 py-2">
                      <a
                        href={eq.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`w-8 h-8 text-sm rounded ${
                    currentPage === idx + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-600">
        <span className="text-gray-500">⬤ Micro (&lt;2.5)</span>
        <span className="text-yellow-500">⬤ Minor (2.5–4.9)</span>
        <span className="text-orange-500">⬤ Moderate (5.0–5.9)</span>
        <span className="text-red-600">⬤ Strong (6.0–6.9)</span>
        <span className="text-pink-600">⬤ Major (7.0–7.9)</span>
        <span className="text-purple-600">⬤ Great (≥8.0)</span>
      </div>

      <div className="mt-6 text-center text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
        Earthquake information provided by the{" "}
        <a
          href="https://earthquake.usgs.gov"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-500"
        >
          U.S. Geological Survey (USGS)
        </a>
      </div>
    </div>
  );
};

export default EarthquakeMonitor;
