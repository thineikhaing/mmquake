// Enhanced StatsOverview with Burmese translation
import React, { JSX } from 'react';
import CountUp from 'react-countup';
import { AlertTriangle, HeartPulse, Search, Shield } from 'lucide-react';

interface Stat {
  title: string;
  mmTitle: string;
  value: number;
  color: string;
  icon: JSX.Element;
}

const stats: Stat[] = [
  {
    title: 'Deaths',
    mmTitle: 'သေဆုံး',
    value: 3901,
    color: 'bg-red-600',
    icon: <AlertTriangle size={24} />,
  },
  {
    title: 'Injuries',
    mmTitle: 'ဒဏ်ရာရ',
    value: 5978,
    color: 'bg-yellow-500',
    icon: <HeartPulse size={24} />,
  },
  {
    title: 'Missing',
    mmTitle: 'ပျောက်ဆုံး',
    value: 719,
    color: 'bg-blue-500',
    icon: <Search size={24} />,
  },
  {
    title: 'Rescue',
    mmTitle: 'ကယ်ဆယ်',
    value: 493,
    color: 'bg-green-500',
    icon: <Shield size={24} />,
  },
];

const StatsOverview: React.FC = () => (
  <>
    <div className="flex justify-between items-center mb-2">
      <h1 className="text-sm text-gray-500">Last updated: 3/1/2025</h1>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className={`rounded-2xl p-5 text-white flex flex-col justify-between shadow-md ${stat.color}`}
        >
          <div className="flex items-center gap-2 mb-2">
            {stat.icon}
            <div>
              <h4 className="text-sm font-medium leading-tight">{stat.title}</h4>
              <p className="text-xs text-white/80">{stat.mmTitle}</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-white">
            <CountUp end={stat.value} duration={2} separator="," />
          </p>
        </div>
      ))}
    </div>

    <p className="bg-yellow-50 border border-yellow-200 p-4 rounded mt-6 text-sm text-gray-700 leading-relaxed">
      ဒီအရေအတွက်ဟာ လက်လှမ်းမီသလောက် ရရှိထားတဲ့ ကိန်းဂဏန်းတွေသာဖြစ်ပြီး၊ မြေပြင်မှာ ကယ်ဆယ်ရေးလုပ်ငန်းတွေ လုပ်ဆောင်နေဆဲ အခြေအနေ ဖြစ်တာကြောင့်
      သေဆုံးသူဦးရေ <span className="text-red-600 font-semibold">ထပ်တိုးနိုင်ပါတယ်။</span><br />
      <span className="block mt-2">
        These numbers are based on currently accessible data from
        <a
          href="https://burmese.dvb.no/live"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline font-medium ml-1"
        >
          DVB
        </a>. As rescue operations are still ongoing on the ground, the number of casualties may
        <span className="text-red-600 font-semibold"> continue to rise</span>.
      </span>
    </p>
  </>
);

export default StatsOverview;
