import { useState, useEffect } from 'react';
import { testDeadline } from '@/data/mockData';
import GlassCard from './GlassCard';
import { Clock } from 'lucide-react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(testDeadline).getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      };
    };
    setTimeLeft(calc());
    const t = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(t);
  }, []);

  const blocks = [
    { label: '天', value: timeLeft.days },
    { label: '时', value: timeLeft.hours },
    { label: '分', value: timeLeft.minutes },
    { label: '秒', value: timeLeft.seconds },
  ];

  return (
    <GlassCard strong className="text-center">
      <div className="flex items-center justify-center gap-2 mb-3">
        <Clock className="h-5 w-5 text-primary" />
        <span className="font-semibold text-foreground">体测倒计时</span>
      </div>
      <div className="flex justify-center gap-3">
        {blocks.map((b) => (
          <div key={b.label} className="glass rounded-lg px-4 py-2 min-w-[60px]">
            <div className="text-2xl font-bold text-primary">{String(b.value).padStart(2, '0')}</div>
            <div className="text-xs text-muted-foreground">{b.label}</div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
