import AdminProviderForm from "@/components/admin/provider-form";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

export const metadata = {
  title: "Service Providers | BookPro Admin",
  description: "Manage service providers",
};

export default function ServiceProvidersPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8 animate-fade-in-up">
        <h1 className="text-3xl font-bold tracking-tight">Service Providers</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Create and manage all service providers. Service providers can ONLY be created by administrators.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Provider Creation Form */}
        <div className="animate-fade-in-up">
          <AdminProviderForm />
        </div>

        {/* Provider Information Card */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
          <Card className="border-border/60 h-full">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">About Service Providers</h3>
                    <p className="text-xs text-muted-foreground">How the provider system works</p>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <div>
                    <p className="font-medium text-sm mb-1">What are Service Providers?</p>
                    <p className="text-sm text-muted-foreground">
                      Service providers are professionals who offer services through BookPro. They can be doctors, plumbers, electricians, tutors, consultants, or any other service professional.
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-sm mb-1">Admin-Only Creation</p>
                    <p className="text-sm text-muted-foreground">
                      Providers cannot sign up publicly. Only administrators can create provider accounts to maintain quality control and verification.
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-sm mb-1">Provider Features</p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Manage appointments and schedules</li>
                      <li>View client information and history</li>
                      <li>Track ratings and reviews</li>
                      <li>Manage availability and time slots</li>
                      <li>Access earnings and analytics</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-medium text-sm mb-1">Service Categories</p>
                    <p className="text-sm text-muted-foreground">
                      Providers can be categorized by their service type (Medical, Home Services, Education, Professional Services, Beauty & Wellness, etc.)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
