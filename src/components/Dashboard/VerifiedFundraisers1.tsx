// components/Dashboard/VerifiedFundraisers.tsx
import React from "react";

interface Fundraiser {
  team: string;
  country: string;
  currency: string;
  link: string;
  name: string; // Campaign name or title
  description: string;
  image: string; // URL to image
  taxDeductible?: boolean;
}

const fundraisers: Fundraiser[] = [
  {
    team: "International Team",
    country: "Global",
    currency: "USD",
    name: "ACT for Myanmar Earthquake Relief",
    link: "https://chuffed.org/project/act-for-myanmar-earthquake-emergency",
    description: "Supporting field rescue teams and survivors in Sagaing & Mandalay.",
    image: "/images/fundraisers/lions.png",
    // taxDeductible: true,
  },
  {
    team: "Japan Team",
    country: "Japan",
    currency: "JPY",
    name: "ISM Earthquake Response",
    link: "https://congrant.com/project/ismspmm/16855",
    description: "Emergency relief support via ISM Myanmar-Japan.",
    image: "/images/fund/japan.png",
  },
  {
    team: "US Team",
    country: "United States",
    currency: "USD",
    name: "ISM Earthquake Response",
    link: "https://gofund.me/faff63b1",
    description: "Emergency relief support via ISM Myanmar-Japan.",
    image: "/images/fund/japan.png",
  },
  {
    team: "UK Team",
    country: "United Kingdom",
    currency: "GBP",
    name: "ISM Earthquake Response",
    link: "https://gofund.me/6a6bb683",
    description: "Emergency relief support via ISM Myanmar-Japan.",
    image: "/images/fund/japan.png",
  },
  {
    team: "Euro Team",
    country: "EU",
    currency: "EUR",
    name: "ISM Earthquake Response",
    link: "https://www.helloasso.com/.../urgence-birmanie-aidons-les...",
    description: "Emergency relief support via ISM Myanmar-Japan.",
    image: "/images/fund/japan.png",
    taxDeductible: true,
  },
  {
    team: "AU Team",
    country: "Australia",
    currency: "AUD",
    name: "ISM Earthquake Response",
    link: "https://khfau.org/myanmar-earthquake-support",
    description: "Emergency relief support via ISM Myanmar-Japan.",
    image: "/images/fund/japan.png",
  },
  {
    team: "WA Myanmar Community",
    country: "Western Australia",
    currency: "AUD",
    name: "ISM Earthquake Response",
    link: "https://shorturl.at/xQNzv",
    description: "Emergency relief support via ISM Myanmar-Japan.",
    image: "/images/fund/japan.png",
  },
];

const VerifiedFundraisers: React.FC = () => (
  <div className="mb-12">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
  {fundraisers.map((f, idx) => (
    <div
      key={idx}
      className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col border-l-4 border-yellow-400"
    >
      <img src={f.image} alt={f.team} className="h-40 w-full object-cover" />
      <div className="p-4 flex flex-col justify-between h-full">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">{f.name}</h3>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
            {f.currency}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{f.description}</p>
        <p className="text-xs text-gray-500 mt-1 italic">{f.country} – {f.team}</p>

        {f.taxDeductible && (
          <span className="inline-block mt-2 text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded">
            ✅ Tax-Deductible
          </span>
        )}

        <a
          href={f.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-sm font-semibold text-blue-600 underline hover:text-blue-800"
        >
          Donate →
        </a>
      </div>
    </div>
  ))}
</div>

  </div>
);

export default VerifiedFundraisers;
