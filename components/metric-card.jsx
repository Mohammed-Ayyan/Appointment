import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, User, BarChart, TrendingUp, TrendingDown } from "lucide-react";

const iconMap = {
  calendar: { Icon: Calendar, bg: "bg-blue-500/10", color: "text-blue-500" },
  users: { Icon: Users, bg: "bg-violet-500/10", color: "text-violet-500" },
  user: { Icon: User, bg: "bg-amber-500/10", color: "text-amber-500" },
  "bar-chart": { Icon: BarChart, bg: "bg-emerald-500/10", color: "text-emerald-500" },
};

export default function MetricCard({ title, value, change, icon }) {
  const { Icon, bg, color } = iconMap[icon] || iconMap.calendar;
  const isPositive = change > 0;

  return (
    <Card className="border-border/60 card-hover">
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {title}
            </p>
            <h3 className="text-2xl font-bold mt-2 tracking-tight">{value}</h3>
            <div className="flex items-center gap-1.5 mt-2">
              {isPositive ? (
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 text-red-500" />
              )}
              <span
                className={`text-xs font-semibold ${
                  isPositive ? "text-emerald-500" : "text-red-500"
                }`}
              >
                {isPositive ? "+" : ""}
                {change}%
              </span>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          </div>
          <div className={`p-2.5 rounded-xl ${bg}`}>
            <Icon className={`h-5 w-5 ${color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
