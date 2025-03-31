// SubmitAndDisplayNeeds.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Need {
  id: string;
  fields: {
    Needs: string;
    Contact: string;
    Location: string;
    Latitude?: number;
    Longitude?: number;
    SubmittedBy?: string;
    Moderated: boolean;
  };
}

const SubmitAndDisplayNeeds: React.FC = () => {
  const [formData, setFormData] = useState({
    Needs: "",
    Contact: "",
    Location: "",
    Latitude: "",
    Longitude: "",
    SubmittedBy: "",
  });

  const [needs, setNeeds] = useState<Need[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNeeds = async () => {
    try {
      const res = await axios.get(
        `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${
          import.meta.env.VITE_AIRTABLE_TABLE
        }`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_TOKEN}`,
          },
          // params: {
          //   filterByFormula: 'moderated',
          // },
        }
      );
      setNeeds(res.data.records);
    } catch (err) {
      console.error("Error fetching needs:", err);
    }
  };

  useEffect(() => {
    fetchNeeds();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${
          import.meta.env.VITE_AIRTABLE_TABLE
        }`,
        {
          records: [
            {
              fields: {
                ...formData,
                Latitude: formData.Latitude
                  ? parseFloat(formData.Latitude)
                  : undefined,
                Longitude: formData.Longitude
                  ? parseFloat(formData.Longitude)
                  : undefined,
                moderated: false,
              },
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Your request has been submitted.");
      setFormData({
        Needs: "",
        Contact: "",
        Location: "",
        Latitude: "",
        Longitude: "",
        SubmittedBy: "",
      });
    } catch (err) {
      console.error("Error submitting need:", err);
      alert("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Requested Community Needs
        </h2>
        {needs.length === 0 ? (
          <p className="text-sm text-gray-600">No verified needs yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3">Location</th>
                  <th className="p-3">Needs</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Moderated</th>
                </tr>
              </thead>
              <tbody>
                {needs.map((n) => (
                  <tr key={n.id} className="border-t hover:bg-gray-50">
                    <td className="p-3 font-medium">{n.fields.Location}</td>
                    <td className="p-3">{n.fields.Needs}</td>
                    <td className="p-3 text-blue-600">
                      {n.fields.Contact || "-"}
                    </td>
                    <td className="p-3">
                      {n.fields.Moderated ? (
                        <span className="text-green-600 font-semibold">
                          ✔ Yes
                        </span>
                      ) : (
                        <span className="text-red-500 font-medium"> Not yet</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          📥 Submit a Community Need
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="Location"
            placeholder="Location"
            required
            value={formData.Location}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="Needs"
            placeholder="What is needed?"
            required
            value={formData.Needs}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="Contact"
            placeholder="Contact Info (optional)"
            value={formData.Contact}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="SubmittedBy"
            placeholder="Submitted By (optional)"
            value={formData.SubmittedBy}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="Latitude"
            placeholder="Latitude (optional)"
            value={formData.Latitude}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="Longitude"
            placeholder="Longitude (optional)"
            value={formData.Longitude}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitAndDisplayNeeds;
