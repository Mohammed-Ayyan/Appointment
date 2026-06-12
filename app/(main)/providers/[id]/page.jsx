"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Star, MapPin, Phone, Mail, Clock, Award, MessageCircle } from "lucide-react";
import LoadingSkeleton from "@/components/loading-skeleton";

export default function ProviderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const providerId = params.id;

  const [provider, setProvider] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviderDetails = async () => {
      try {
        const [providerRes, reviewsRes] = await Promise.all([
          fetch(`/api/providers/${providerId}`),
          fetch(`/api/reviews?providerId=${providerId}`),
        ]);

        const providerData = await providerRes.json();
        const reviewsData = await reviewsRes.json();

        if (providerData.success) {
          setProvider(providerData.data);
        }
        if (reviewsData.success) {
          setReviews(reviewsData.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch provider details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (providerId) {
      fetchProviderDetails();
    }
  }, [providerId]);

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <LoadingSkeleton type="card" />
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground mb-4">Provider not found</p>
            <Button onClick={() => router.back()} variant="outline">
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Provider Header Card */}
      <Card>
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Avatar */}
            <Avatar className="h-24 w-24 flex-shrink-0">
              <AvatarImage src={provider.avatar} alt={provider.name} />
              <AvatarFallback className="text-2xl">{provider.name.charAt(0)}</AvatarFallback>
            </Avatar>

            {/* Info */}
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold">{provider.name}</h1>
                  {provider.verified && (
                    <Badge variant="secondary">Verified</Badge>
                  )}
                </div>
                {provider.specialty && (
                  <p className="text-lg text-muted-foreground">{provider.specialty}</p>
                )}
              </div>

              {/* Rating */}
              {provider.rating > 0 && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.round(provider.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {provider.rating.toFixed(1)} • {provider.reviewsCount} reviews
                  </span>
                </div>
              )}

              {/* Contact Info */}
              <div className="space-y-2 text-sm">
                {provider.location && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {provider.location}
                  </div>
                )}
                {provider.phone && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {provider.phone}
                  </div>
                )}
                {provider.email && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {provider.email}
                  </div>
                )}
              </div>

              {/* Price and CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
                {provider.price && (
                  <div className="text-2xl font-bold text-primary">{provider.price}</div>
                )}
                <Link href={`/appointments/book?providerId=${provider.id}`}>
                  <Button className="w-full sm:w-auto">Book Appointment</Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About */}
      {provider.about && (
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-wrap">{provider.about}</p>
          </CardContent>
        </Card>
      )}

      {/* Experience */}
      {provider.experience && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{provider.experience}</p>
          </CardContent>
        </Card>
      )}

      {/* Availability */}
      {provider.availability && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Availability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-wrap">{provider.availability}</p>
          </CardContent>
        </Card>
      )}

      {/* Reviews */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Reviews
          </CardTitle>
          <CardDescription>What customers say about {provider.name}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {reviews.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No reviews yet</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold">{review.name}</h4>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>
                <p className="text-muted-foreground text-sm">{review.comment}</p>
                <Separator className="mt-4" />
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
