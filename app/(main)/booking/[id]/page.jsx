"use client";

import { use, useState, useEffect } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Star,
  MapPin,
  Clock,
  Phone,
  Mail,
  Building2,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LoadingSkeleton from "@/components/loading-skeleton";
import EmptyState from "@/components/empty-state";

export default function ProviderProfile({ params }) {
  const resolvedParams = use(params);
  const providerId = resolvedParams.id;

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    async function fetchProvider() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/providers/${providerId}`);
        if (!res.ok) throw new Error("Provider not found");
        const data = await res.json();
        setProvider(data.provider);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (providerId) {
      fetchProvider();
    }
  }, [providerId]);

  const handleBooking = async () => {
    if (!selectedTime) return;
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 3000);
  };

  // Loading state
  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
        <LoadingSkeleton type="profile" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <LoadingSkeleton type="card" />
            <LoadingSkeleton type="card" />
          </div>
          <LoadingSkeleton type="card" />
        </div>
      </div>
    );
  }

  // Error state
  if (error || !provider) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
        <EmptyState
          icon="alert"
          title="Provider not found"
          description="The provider you're looking for doesn't exist or has been removed."
          action={{ label: "Back to Browse", onClick: () => window.history.back() }}
        />
      </div>
    );
  }

  const specializations = provider.specializations?.map((s) => s.specialization) || [];
  const languages = provider.languages?.map((l) => l.language) || [];
  const reviews = provider.reviewsList || [];
  const timeSlots = provider.timeSlots || [];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Providers
      </Link>

      {/* Profile Header */}
      <Card className="mb-6 overflow-hidden animate-fade-in-up border-border/60">
        {/* Gradient Banner */}
        <div className="h-24 sm:h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20" />

        <div className="p-5 sm:p-6 -mt-12 sm:-mt-14">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex gap-4 sm:gap-6">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl border-4 border-card shadow-lg">
                <Image
                  src={provider.avatar || "/placeholder.svg?height=96&width=96"}
                  alt={provider.name}
                  width={96}
                  height={96}
                  className="rounded-2xl object-cover"
                />
              </Avatar>
              <div className="pt-6 sm:pt-8">
                <h1 className="text-xl sm:text-2xl font-bold mb-1">
                  {provider.name}
                </h1>
                <p className="text-muted-foreground text-sm mb-3">
                  {provider.specialization || provider.specialty}
                </p>

                <div className="flex flex-wrap gap-3 sm:gap-4 items-center text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-semibold">{provider.rating}</span>
                    <span className="text-muted-foreground">
                      ({provider.reviewsCount} reviews)
                    </span>
                  </div>

                  {provider.location && (
                    <div className="flex items-center text-muted-foreground gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{provider.location}</span>
                    </div>
                  )}

                  {provider.experience && (
                    <div className="flex items-center text-muted-foreground gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{provider.experience}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="sm:pt-8">
              <Button
                size="lg"
                className="w-full sm:w-auto gap-2"
                onClick={() =>
                  document
                    .getElementById("schedule-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* About Section */}
          <Card className="p-5 sm:p-6 animate-fade-in-up border-border/60" style={{ animationDelay: "0.05s" }}>
            <h2 className="text-lg font-semibold mb-3">About</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {provider.about ||
                `${provider.name} is a highly experienced professional dedicated to providing exceptional care and service.`}
            </p>

            {specializations.length > 0 && (
              <>
                <h3 className="font-semibold mt-6 mb-3 text-sm">
                  Specializations
                </h3>
                <div className="flex flex-wrap gap-2">
                  {specializations.map((item) => (
                    <Badge
                      key={item}
                      variant="secondary"
                      className="rounded-full px-3 py-1 text-xs"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </>
            )}

            {languages.length > 0 && (
              <>
                <h3 className="font-semibold mt-6 mb-3 text-sm">
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {languages.map((item) => (
                    <Badge
                      key={item}
                      variant="outline"
                      className="rounded-full px-3 py-1 text-xs"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </>
            )}
          </Card>

          {/* Reviews Section */}
          <Card className="p-5 sm:p-6 animate-fade-in-up border-border/60" style={{ animationDelay: "0.1s" }}>
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold">
                Patient Reviews ({reviews.length})
              </h2>
            </div>

            {reviews.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">
                No reviews yet.
              </p>
            ) : (
              <div className="space-y-5">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-border/40 pb-5 last:border-0 last:pb-0"
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-9 w-9 rounded-full">
                        <Image
                          src={review.avatar || "/placeholder.svg?height=36&width=36"}
                          alt={review.name}
                          width={36}
                          height={36}
                          className="rounded-full"
                        />
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-sm">{review.name}</h4>
                          <span className="text-xs text-muted-foreground">
                            {review.date}
                          </span>
                        </div>
                        <div className="flex gap-0.5 my-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3.5 w-3.5 ${
                                i < review.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-muted-foreground/30"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mt-1.5">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          {/* Schedule Appointment */}
          <Card
            id="schedule-section"
            className="p-5 sm:p-6 animate-fade-in-up border-border/60"
            style={{ animationDelay: "0.15s" }}
          >
            <h2 className="text-lg font-semibold mb-4">Schedule Appointment</h2>

            {/* Time Slots */}
            <h3 className="text-sm font-medium mb-3">Available Time Slots</h3>
            {timeSlots.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No time slots available.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-2 mb-5">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    className={`border rounded-lg py-2.5 px-3 text-sm transition-all duration-200 ${
                      selectedTime === slot.time
                        ? "bg-primary/10 border-primary text-primary font-medium shadow-sm"
                        : "border-border/60 hover:bg-muted hover:border-border"
                    }`}
                    onClick={() => setSelectedTime(slot.time)}
                  >
                    <div className="font-medium">{slot.time}</div>
                    {slot.day && (
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        {slot.day}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Booking Success */}
            {bookingSuccess && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm mb-4 animate-fade-in-up">
                <CheckCircle className="h-4 w-4" />
                Booking confirmed successfully!
              </div>
            )}

            <Button
              className="w-full h-10"
              disabled={!selectedTime}
              onClick={handleBooking}
            >
              {selectedTime ? `Book at ${selectedTime}` : "Select a time slot"}
            </Button>
          </Card>

          {/* Contact Info */}
          <Card className="p-5 sm:p-6 animate-fade-in-up border-border/60" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-lg font-semibold mb-4">Contact</h2>
            <div className="space-y-4">
              {provider.phone && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/5">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium">{provider.phone}</p>
                  </div>
                </div>
              )}

              {provider.email && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/5">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium">{provider.email}</p>
                  </div>
                </div>
              )}

              {provider.address && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/5">
                    <Building2 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Address</p>
                    <p className="text-sm font-medium">{provider.address}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
