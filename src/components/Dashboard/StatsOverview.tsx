import React, { JSX } from 'react';
import CountUp from 'react-countup';
import { AlertTriangle, HeartPulse, Search } from 'lucide-react'; // Icons

interface Stat {
  title: string;
  value: number;
  color: string;
  icon: JSX.Element;
}

const stats: Stat[] = [
  {
    title: 'Deaths',
    value: 3756,
    color: 'bg-red-600',
    icon: <AlertTriangle size={28} />,
  },
  {
    title: 'Injuries',
    value: 4575,
    color: 'bg-yellow-500',
    icon: <HeartPulse size={28} />,
  },
  {
    title: 'Missing',
    value: 705,
    color: 'bg-blue-500',
    icon: <Search size={28} />,
  },
];

const StatsOverview: React.FC = () => (
  <>

      <div className="flex justify-between items-center">
        <h1 className="text-sm text-gray-500">Last updated: 4/1/2025</h1>
        </div>
      <div className="text-center mt-2">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className={`rounded-2xl p-3 text-white flex flex-col items-center justify-center shadow-lg ${stat.color}`}
        >
          <div className="flex items-center gap-2">
            <span className={`${stat.color}`}>{stat.icon}</span>
            <h4 className="text-base font-semibold">{stat.title}</h4>
          </div>

          <p className="text-3xl font-bold">
            <CountUp end={stat.value} duration={2} separator="," />
          </p>
        </div>
      ))}
    </div>
    
  </div>
<p className="bg-yellow-50 border border-yellow-200 p-4 rounded mt-4 text-sm text-gray-500">
ဒီအရေအတွက်ဟာ က လက်လှမ်းမီသလောက် ရရှိထားတဲ့ ကိန်းဂဏန်းတွေသာဖြစ်ပြီး၊ ကယ်ဆယ်ရေးလုပ်ငန်းတွေ လုပ်ဆောင်နေဆဲ အခြေအနေ ဖြစ်တာကြောင့် သေဆုံးသူဦးရေ 
  <span className="text-red-600 font-semibold">ထပ်တိုးနိုင်ပါတယ်။</span><br />
  
  <span className="block mt-1">
    These numbers are based on currently accessible data from 
    <a
      href="https://burmese.dvb.no/live"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline font-medium"
    >
      &nbsp;DVB
    </a>. As rescue operations are still ongoing on the ground, the number of casualties may 
    <span className="text-red-600 font-semibold"> continue to rise</span>.
  </span>
</p>

  </>
  
);

export default StatsOverview;
