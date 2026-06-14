"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, MapPin, Search, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LoadingSkeleton from "@/components/loading-skeleton";
import EmptyState from "@/components/empty-state";

export default function Home() {
  const router = useRouter();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");

  async function fetchProviders() {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (searchQuery) params.set("search", searchQuery);
      if (category !== "all") params.set("category", category);
      if (sortBy) params.set("sort", sortBy);

      const res = await fetch(`/api/providers?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch providers");
      const data = await res.json();
      setProviders(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      console.error("[v0] Error fetching providers:", err);
      setError(err.message);
      setProviders([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProviders();
  }, [category, sortBy]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProviders();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="mb-8 animate-fade-in-up">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
          Find Your <span className="gradient-text">Perfect Provider</span>
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
          Browse top-rated service providers and book your appointment in
          minutes.
        </p>
      </div>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-3 mb-6 animate-fade-in-up"
        style={{ animationDelay: "0.05s" }}
      >
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name, specialty, or location..."
            className="pl-10 h-11 bg-card border-border/60 focus:border-primary/40 transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button type="submit" className="h-11 px-6 gap-2">
          <Search className="h-4 w-4" />
          Search
        </Button>
      </form>

      {/* Filters */}
      <div
        className="flex flex-wrap gap-3 mb-8 animate-fade-in-up"
        style={{ animationDelay: "0.1s" }}
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <SlidersHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline">Filters:</span>
        </div>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[150px] h-9 text-sm bg-card">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Medical">Medical</SelectItem>
            <SelectItem value="Dental">Dental</SelectItem>
            <SelectItem value="Therapy">Therapy</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[170px] h-9 text-sm bg-card">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recommended">Recommended</SelectItem>
            <SelectItem value="rating">Highest Rating</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Section Header */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-lg font-semibold">Available Providers</h2>
          {!loading && (
            <p className="text-sm text-muted-foreground mt-0.5">
              {providers.length} provider{providers.length !== 1 ? "s" : ""}{" "}
              found
            </p>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <LoadingSkeleton key={i} type="card" />
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <EmptyState
          icon="alert"
          title="Something went wrong"
          description={error}
          action={{ label: "Try Again", onClick: fetchProviders }}
        />
      )}

      {/* Empty State */}
      {!loading && !error && providers.length === 0 && (
        <EmptyState
          icon="search"
          title="No providers found"
          description="Try adjusting your search or filters to find what you're looking for."
          action={{
            label: "Clear Filters",
            onClick: () => {
              setSearchQuery("");
              setCategory("all");
              setSortBy("recommended");
            },
          }}
        />
      )}

      {/* Provider Cards */}
      {!loading && !error && providers.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {providers.map((provider, index) => (
            <Card
              key={provider.id}
              className="overflow-hidden card-hover border-border/60 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="p-5">
                {/* Provider Info */}
                <div className="flex gap-4 mb-4">
                  <Avatar className="h-14 w-14 rounded-xl border-2 border-border/30">
                    <Image
                      src={provider.image || "/placeholder.svg?height=56&width=56"}
                      alt={provider.name}
                      width={56}
                      height={56}
                      className="rounded-xl object-cover"
                    />
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate">
                      {provider.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {provider.specialty}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-semibold">
                        {provider.rating}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({provider.reviewsCount || provider.reviews || 0})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Location */}
                {provider.location && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{provider.location}</span>
                  </div>
                )}

                {/* Tags */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  {provider.availability && (
                    <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium status-active">
                      {provider.availability}
                    </span>
                  )}
                  {provider.price && (
                    <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium bg-primary/5 text-primary border border-primary/10">
                      {provider.price}
                    </span>
                  )}
                </div>

                {/* CTA */}
                <Button
                  className="w-full h-10 text-sm font-medium"
                  onClick={() => router.push(`/booking/${provider.id}`)}
                >
                  Book Appointment
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
