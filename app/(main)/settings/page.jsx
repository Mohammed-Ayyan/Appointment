"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { LogOut, User, Mail, Phone, MapPin } from "lucide-react";
import LoadingSkeleton from "@/components/loading-skeleton";
import { useUser } from "@/hooks/useUser";

export default function SettingsPage() {
  const router = useRouter();
  const { user, loading, error } = useUser();
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveMessage("");

    try {
      const response = await fetch("/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSaveMessage("Profile updated successfully!");
        setTimeout(() => setSaveMessage(""), 3000);
      } else {
        const data = await response.json();
        setSaveMessage(data.message || "Failed to update profile");
      }
    } catch (err) {
      setSaveMessage("Error updating profile");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/signin");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        <LoadingSkeleton type="card" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">Please sign in to access settings</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="grid gap-6">
        {/* Profile Section */}
        <Card className="border-border/60">
          <div className="p-6 border-b border-border/60">
            <div className="flex items-center gap-3 mb-2">
              <User className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Profile Information</h2>
            </div>
            <p className="text-sm text-muted-foreground">Update your personal details</p>
          </div>

          <div className="p-6">
            <form onSubmit={handleSave} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  disabled
                />
                <p className="text-xs text-muted-foreground">
                  Email cannot be changed
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              {saveMessage && (
                <div className={`p-3 rounded-lg text-sm ${
                  saveMessage.includes("successfully")
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-destructive/10 text-destructive"
                }`}>
                  {saveMessage}
                </div>
              )}

              <Button
                type="submit"
                disabled={saving}
                className="w-full sm:w-auto"
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/20 bg-destructive/5">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-destructive mb-3">
              Danger Zone
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Log out from your account. You&apos;ll need to sign in again to access your account.
            </p>
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Log Out
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
