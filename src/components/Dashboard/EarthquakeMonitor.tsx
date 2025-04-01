import React, { useEffect, useState, useRef } from "react";
import { format, subDays } from "date-fns";
import { Earth } from "lucide-react";
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

const filterLabels = {
  "24h": "Past 24 Hours",
  week: "Past Week",
  month: "Past Month",
};

const EarthquakeMonitor: React.FC = () => {
  const [filter, setFilter] = useState<"24h" | "week" | "month">("24h");
  const [quakes, setQuakes] = useState<Earthquake[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const perPage = 10;
  const hasAutoRedirected = useRef(false);

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

      if (
        parsed.length === 0 &&
        filter === "24h" &&
        !hasAutoRedirected.current
      ) {
        hasAutoRedirected.current = true;
        setFilter("week");
        return;
      }

      setQuakes(parsed);
      setCurrentPage(1);
      setLoading(false);
    };

    fetchData();
  }, [filter]);

  const now = new Date();
  const from =
    filter === "24h"
      ? subDays(now, 1)
      : filter === "week"
      ? subDays(now, 7)
      : subDays(now, 30);
  const dateRangeText = `${format(from, "MMM d")} - ${format(now, "MMM d")}`;

  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentQuakes = quakes.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(quakes.length / perPage);

  return (
    <div className="mb-12 p-3 shadow-md rounded-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Earth size={20} className="text-yellow-500" />
          Earthquake Monitor
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor="time-filter" className="text-sm font-medium">
            Time Period:
          </label>
          <select
            id="time-filter"
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as "24h" | "week" | "month")
            }
            className="text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="24h">Past 24 Hours</option>
            <option value="week">Past Week</option>
            <option value="month">Past Month</option>
          </select>
          <span className="text-sm text-gray-500">
            {filterLabels[filter]} ({dateRangeText})
          </span>
        </div>
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : currentQuakes.length === 0 ? (
        <p className="text-sm text-gray-600 mt-2">
          No earthquakes recorded in Myanmar region during the selected time
          period.
        </p>
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

      {/* Magnitude Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-gray-600">
        <span className="text-gray-500">⬤ Micro (&lt;2.5)</span>
        <span className="text-yellow-500">⬤ Minor (2.5–4.9)</span>
        <span className="text-orange-500">⬤ Moderate (5.0–5.9)</span>
        <span className="text-red-600">⬤ Strong (6.0–6.9)</span>
        <span className="text-pink-600">⬤ Major (7.0–7.9)</span>
        <span className="text-purple-600">⬤ Great (≥8.0)</span>
      </div>

      {/* USGS Credit */}
      <div className="mt-2 text-center text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
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
