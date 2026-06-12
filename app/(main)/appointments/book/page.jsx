"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar, Clock, AlertCircle } from "lucide-react";
import LoadingSkeleton from "@/components/loading-skeleton";

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const providerId = searchParams.get("providerId");

  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(!!providerId);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    date: "",
    time: "",
    service: "",
    duration: "30 minutes",
    notes: "",
  });

  useEffect(() => {
    if (providerId) {
      const fetchProvider = async () => {
        try {
          const response = await fetch(`/api/providers/${providerId}`);
          const result = await response.json();
          if (result.success) {
            setProvider(result.data);
          } else {
            setError("Provider not found");
          }
        } catch (err) {
          setError("Failed to load provider information");
        } finally {
          setLoading(false);
        }
      };

      fetchProvider();
    }
  }, [providerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          providerId: parseInt(providerId || "0"),
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/appointments");
        }, 2000);
      } else {
        setError(result.error || "Failed to book appointment");
      }
    } catch (err) {
      setError("An error occurred while booking the appointment");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSkeleton type="card" />;
  }

  if (success) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center space-y-4">
          <div className="text-green-600 text-5xl">✓</div>
          <h2 className="text-2xl font-bold">Appointment Booked!</h2>
          <p className="text-muted-foreground">
            Your appointment has been confirmed. You will be redirected to your appointments list.
          </p>
          <Button onClick={() => router.push("/appointments")}>View Appointments</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Provider Card */}
      {provider && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={provider.avatar} alt={provider.name} />
                <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{provider.name}</h2>
                {provider.specialty && <p className="text-muted-foreground">{provider.specialty}</p>}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Booking Form */}
      <Card>
        <CardHeader>
          <CardTitle>Book an Appointment</CardTitle>
          <CardDescription>Fill in the details to schedule your appointment</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="font-semibold">Your Information</h3>

              <div>
                <Label htmlFor="patientName">Full Name *</Label>
                <Input
                  id="patientName"
                  name="patientName"
                  placeholder="John Doe"
                  value={formData.patientName}
                  onChange={handleChange}
                  required
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="patientEmail">Email</Label>
                  <Input
                    id="patientEmail"
                    name="patientEmail"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.patientEmail}
                    onChange={handleChange}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="patientPhone">Phone Number</Label>
                  <Input
                    id="patientPhone"
                    name="patientPhone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.patientPhone}
                    onChange={handleChange}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="font-semibold">Appointment Details</h3>

              <div>
                <Label htmlFor="service">Service *</Label>
                <Input
                  id="service"
                  name="service"
                  placeholder="e.g., General Checkup"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Date *
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="time" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Time *
                  </Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="duration">Duration</Label>
                <select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="mt-2 w-full px-3 py-2 border border-input rounded-md bg-background"
                >
                  <option>15 minutes</option>
                  <option>30 minutes</option>
                  <option>1 hour</option>
                  <option>1.5 hours</option>
                  <option>2 hours</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-4 border-t pt-6">
              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Any additional information about your appointment..."
                  value={formData.notes}
                  onChange={handleChange}
                  className="mt-2 min-h-24"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-4 border-t pt-6">
              <Button type="submit" disabled={submitting} className="flex-1">
                {submitting ? "Booking..." : "Confirm Booking"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={submitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function BookAppointmentPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Suspense fallback={<LoadingSkeleton type="card" />}>
        <BookingContent />
      </Suspense>
    </div>
  );
}
