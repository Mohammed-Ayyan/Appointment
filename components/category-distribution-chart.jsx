"use client";

const colors = [
  "oklch(0.49 0.22 264)",
  "oklch(0.6 0.19 162)",
  "oklch(0.72 0.19 70)",
  "oklch(0.63 0.26 304)",
  "oklch(0.65 0.24 16)",
];

export default function CategoryDistributionChart({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="space-y-4 mt-4">
      {data.map((item, index) => (
        <div key={item.category} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{item.category}</span>
            <span className="text-sm text-muted-foreground font-medium">
              {item.percentage}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
            <div
              className="h-2.5 rounded-full animate-progress-fill"
              style={{
                width: `${item.percentage}%`,
                backgroundColor: colors[index % colors.length],
                animationDelay: `${index * 0.15}s`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
