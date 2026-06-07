"use client";

export default function BookingTrendsChart({ data }) {
  if (!data || data.length === 0) return null;

  const maxBookings = Math.max(...data.map((item) => item.bookings));

  return (
    <div className="flex items-end gap-2 h-48 mt-4">
      {data.map((item, index) => {
        const heightPercent = (item.bookings / maxBookings) * 100;
        return (
          <div key={item.day} className="flex flex-col items-center flex-1 gap-2">
            <span className="text-[11px] text-muted-foreground font-medium">
              {item.bookings}
            </span>
            <div className="w-full flex items-end h-36">
              <div
                className="w-full rounded-t-md animate-bar-grow"
                style={{
                  height: `${heightPercent}%`,
                  background: `linear-gradient(to top, oklch(0.49 0.22 264), oklch(0.62 0.22 264))`,
                  animationDelay: `${index * 0.1}s`,
                }}
              />
            </div>
            <span className="text-xs text-muted-foreground">{item.day}</span>
          </div>
        );
      })}
    </div>
  );
}
