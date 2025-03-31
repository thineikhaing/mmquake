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
    value: 2928,
    color: 'bg-red-600',
    icon: <AlertTriangle size={28} />,
  },
  {
    title: 'Injuries',
    value: 3408,
    color: 'bg-yellow-500',
    icon: <HeartPulse size={28} />,
  },
  {
    title: 'Missing',
    value: 360,
    color: 'bg-blue-500',
    icon: <Search size={28} />,
  },
];

const StatsOverview: React.FC = () => (
  <div className="text-center mb-8">
    
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className={`rounded-2xl p-6 text-white flex flex-col items-center justify-center shadow-lg ${stat.color}`}
        >
          <div className="flex items-center gap-2">
            <span className={`${stat.color}`}>{stat.icon}</span>
            <h3 className="text-base font-semibold">{stat.title}</h3>
          </div>

          <p className="text-4xl font-bold">
            <CountUp end={stat.value} duration={2} separator="," />
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default StatsOverview;
