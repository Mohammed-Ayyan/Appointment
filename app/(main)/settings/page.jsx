import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Bell, Shield, Palette } from "lucide-react";

export const metadata = {
  title: "Settings | BookPro",
  description: "Manage your account settings",
};

export default function SettingsPage() {
  const sections = [
    {
      icon: User,
      title: "Profile",
      description: "Update your personal information",
      fields: [
        { label: "Full Name", value: "Sarah Anderson", type: "text" },
        { label: "Email", value: "sarah@example.com", type: "email" },
        { label: "Phone", value: "+1 (555) 123-4567", type: "tel" },
      ],
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Configure how you receive updates",
      fields: [],
    },
    {
      icon: Shield,
      title: "Security",
      description: "Manage your password and security settings",
      fields: [],
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account preferences
        </p>
      </div>

      <div className="space-y-6">
        {sections.map((section, index) => (
          <Card
            key={section.title}
            className="border-border/60 animate-fade-in-up"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-start gap-3 mb-5">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                  <section.icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-semibold">{section.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {section.description}
                  </p>
                </div>
              </div>

              {section.fields.length > 0 && (
                <div className="space-y-4 ml-[52px]">
                  {section.fields.map((field) => (
                    <div key={field.label} className="space-y-1.5">
                      <Label className="text-sm">{field.label}</Label>
                      <Input
                        type={field.type}
                        defaultValue={field.value}
                        className="h-10 bg-muted/30"
                      />
                    </div>
                  ))}
                  <Button size="sm" className="mt-2">
                    Save Changes
                  </Button>
                </div>
              )}

              {section.fields.length === 0 && (
                <p className="text-sm text-muted-foreground ml-[52px]">
                  Coming soon — this section is under development.
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
