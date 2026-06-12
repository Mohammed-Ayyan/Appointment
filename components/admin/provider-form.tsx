"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface ProviderFormProps {
  onSuccess?: () => void;
}

export default function AdminProviderForm({ onSuccess }: ProviderFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialty: "",
    phone: "",
    location: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/providers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to create service provider");
        return;
      }

      setSuccess(`Service Provider "${formData.name}" created successfully!`);
      setFormData({ name: "", email: "", specialty: "", phone: "", location: "" });
      
      if (onSuccess) {
        setTimeout(onSuccess, 1500);
      }
    } catch (err: any) {
      setError(err.message || "Failed to create service provider");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-border/60">
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold">Add Service Provider</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Create a new service provider account
          </p>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive rounded-md p-3 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 text-green-700 rounded-md p-3 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Provider Name *</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="e.g., John's Plumbing Service"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="provider@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialty">Service Category *</Label>
            <Input
              id="specialty"
              name="specialty"
              type="text"
              placeholder="e.g., Plumbing, Electrical, Tutoring"
              value={formData.specialty}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1-555-0000"
              value={formData.phone}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              type="text"
              placeholder="City, State"
              value={formData.location}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Creating Provider..." : "Create Service Provider"}
          </Button>
        </form>

        <div className="bg-muted/50 rounded-md p-4 text-sm space-y-2">
          <p className="font-medium">Important Notes:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Service providers can ONLY be created by admins</li>
            <li>A temporary password will be generated automatically</li>
            <li>Providers must log in and change their password on first login</li>
            <li>Providers can manage their availability and appointments from their dashboard</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
