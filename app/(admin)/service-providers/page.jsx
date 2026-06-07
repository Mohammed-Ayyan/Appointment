import { Card, CardContent } from "@/components/ui/card";
import { User, MapPin, Star } from "lucide-react";

export const metadata = {
  title: "Service Providers | BookPro Admin",
  description: "Manage service providers",
};

export default function ServiceProvidersPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-6 animate-fade-in-up">
        <h1 className="text-2xl font-bold tracking-tight">Service Providers</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage and monitor all registered service providers
        </p>
      </div>

      <Card className="border-border/60 animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
        <CardContent className="p-5 sm:p-6">
          <div className="text-center py-12">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-muted/80 mx-auto mb-4">
              <User className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-1">Provider Management</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Full provider management with CRUD operations, verification, and analytics.
              Provider data is served via the <code className="text-xs bg-muted px-1.5 py-0.5 rounded">/api/providers</code> endpoint.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
