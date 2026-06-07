import { Card, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export const metadata = {
  title: "Analytics | BookPro Admin",
  description: "Platform analytics and insights",
};

export default function AnalyticsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-6 animate-fade-in-up">
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Platform performance metrics and insights
        </p>
      </div>

      <Card className="border-border/60 animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
        <CardContent className="p-5 sm:p-6">
          <div className="text-center py-12">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-muted/80 mx-auto mb-4">
              <BarChart3 className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-1">Analytics Dashboard</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Detailed charts, conversion tracking, revenue analytics, and user engagement metrics.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
