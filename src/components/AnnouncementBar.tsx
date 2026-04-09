import { announcements } from '@/data/mockData';

export default function AnnouncementBar() {
  return (
    <div className="glass-strong overflow-hidden rounded-lg py-2 px-4">
      <div className="animate-marquee whitespace-nowrap">
        {announcements.map((a, i) => (
          <span key={i} className="mx-8 text-sm text-foreground/80">{a}</span>
        ))}
      </div>
    </div>
  );
}
