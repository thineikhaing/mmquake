// components/Dashboard/VerifiedFundraisers.tsx
import React from "react";

interface Fundraiser {
  name: string;
  description: string;
  link: string;
  region?: string;
  flag?: string; // emoji or flag image URL
  goal?: number;
  raised?: number;
  image?: string; // URL to the logo or banner
}

const fundraisers: Fundraiser[] = [

  {
    name: "Lions Hands to Chinthe (Singapore)",
    description:
      "Giving.sg fundraiser supporting earthquake relief from Singapore.",
    link: "https://www.giving.sg/donate/campaign/lions-hands-to-chinthe-myanmar-earthquake-relief-",
    region: "Singapore",
    flag: "🇸🇬",
    goal: 10000,
    raised: 74390,
    image: "/images/fundraisers/lions.png",
  },
  {
    name: "Emergency Solar Power Relief Efforts",
    description:"We are Mee Panyar, a social enterprise that has been working on solar PV infrastructure development and capacity building in Myanmar since 2016.",
    link: "https://www.gofundme.com/f/emergency-solar-power-for-myanmar-earthquake-relief-efforts",
    region: "Myanmar",
    flag: "🇲🇲",
    goal: 10000,
    raised: 5349,
    image: "/images/fundraisers/meepanyar.png",
  },
  {
    name: "UK Earthquake Relief for Myanmar",
    description: "GoFundMe campaign calling for urgent support.",
    link: "https://www.gofundme.com/f/h7fg8y-earthquake-relief-for-myanmar-urgent-support-needed",
    region: "UK",
    flag: "🇬🇧",
    goal: 140000,
    raised: 158866,
    image: "/images/fundraisers/gofundme.png",
  },
  {
    name: "Myanmar Earthquake Relief",
    description:
      "This website is a community effort set up by Myanmar volunteers based abroad to support the relief effort.",
    link: "https://www.myanmarearthquakehelp.com/en/donate",
    region: "Myanmar",
    flag: "🇲🇲",
    goal: 35000,
    raised: 25234,
    image: "/images/fundraisers/mer.png",
  },
  {
    name: "Spring Revolution Fund (Global)",
    description: "Crowdfunded campaign supporting emergency relief in Myanmar.",
    link: "https://springcrowdfund.org/campaign/2a026f8a-6799-4a46-9fb6-b6f4526cfa4a",
    region: "Global",
    flag: "🌐",
    goal: 150000000,
    raised: 1289036989,
    image: "/images/fundraisers/spring-rev.png",
  }

];

const VerifiedFundraisers: React.FC = () => (
  <div className="mb-12">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {fundraisers.map((f, idx) => (
        <div
          key={idx}
          className="p-6 bg-white rounded-xl shadow-md flex flex-col space-y-3 border-l-4 border-green-500"
        >
          <div className="">
            <div>
              {/* <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Verified
              </span> */}
              {f.image && (
                <img
                  src={f.image}
                  alt={f.name}
                  className="w-full h-40 object-cover rounded-t-md"
                />
              )}
              <h3 className="text-lg font-semibold flex items-center gap-2">
                {f.flag && <span className="text-xl">{f.flag}</span>} {f.name}
              </h3>
              {/* <p className="text-sm text-gray-500">{f.region}</p> */}
            </div>
          </div>

          <p className="text-sm text-gray-700">{f.description}</p>

          {f.goal && f.raised !== undefined && (
            <div className="text-xs text-gray-600 mt-1">
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2 overflow-hidden">
                <div
                  className="bg-green-500 h-2 transition-all duration-700"
                  style={{
                    width: `${Math.min(100, (f.raised / f.goal) * 100)}%`,
                  }}
                />
              </div>
              <p>
                Raised ${f.raised.toLocaleString()} of $
                {f.goal.toLocaleString()}
              </p>
            </div>
          )}
          <a
            href={f.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-md transition"
          >
            Donate Now
          </a>
        </div>
      ))}
    </div>
  </div>
);

export default VerifiedFundraisers;
