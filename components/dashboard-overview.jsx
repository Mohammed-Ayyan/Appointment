"use client";

import { useState } from "react";
import { Search, Download, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MetricCard from "@/components/metric-card";
import ProviderTable from "@/components/provider-table";
import BookingTrendsChart from "@/components/booking-trends-chart";
import CategoryDistributionChart from "@/components/category-distribution-chart";

const metrics = [
  { id: 1, title: "Total Bookings", value: "1,248", change: 12.5, icon: "calendar" },
  { id: 2, title: "Active Users", value: "846", change: 8.2, icon: "users" },
  { id: 3, title: "Service Providers", value: "124", change: 4.6, icon: "user" },
  { id: 4, title: "Satisfaction Rate", value: "92%", change: 2.4, icon: "bar-chart" },
];

const providers = [
  {
    id: 1,
    name: "Dr. Michael Brown",
    role: "Dental Specialist",
    category: "Medical",
    status: "Active",
    rating: 4.8,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Dr. Sarah Wilson",
    role: "Cardiologist",
    category: "Medical",
    status: "Active",
    rating: 4.9,
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const bookingTrends = [
  { day: "Mon", bookings: 45 },
  { day: "Tue", bookings: 65 },
  { day: "Wed", bookings: 55 },
  { day: "Thu", bookings: 70 },
  { day: "Fri", bookings: 60 },
  { day: "Sat", bookings: 80 },
];

const categoryDistribution = [
  { category: "Medical", percentage: 45 },
  { category: "Dental", percentage: 30 },
  { category: "Therapy", percentage: 25 },
];

export default function DashboardOverview() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-fade-in-up">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Overview of your platform performance
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 h-9 text-sm">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2 h-9 text-sm">
            <Plus className="h-4 w-4" />
            Add Provider
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={metric.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <MetricCard
              title={metric.title}
              value={metric.value}
              change={metric.change}
              icon={metric.icon}
            />
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Provider Table */}
        <Card className="col-span-1 lg:col-span-2 border-border/60 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <CardContent className="p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
              <h2 className="text-lg font-semibold">Service Providers</h2>
              <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="pl-8 w-full sm:w-[200px] h-9 text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-[140px] h-9 text-sm">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Categories">All</SelectItem>
                    <SelectItem value="Medical">Medical</SelectItem>
                    <SelectItem value="Dental">Dental</SelectItem>
                    <SelectItem value="Therapy">Therapy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <ProviderTable
              providers={providers.filter(
                (p) =>
                  (selectedCategory === "All Categories" ||
                    p.category === selectedCategory) &&
                  (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.role.toLowerCase().includes(searchQuery.toLowerCase()))
              )}
            />
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="space-y-6">
          <Card className="border-border/60 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            <CardContent className="p-5 sm:p-6">
              <h2 className="text-lg font-semibold mb-1">Booking Trends</h2>
              <p className="text-xs text-muted-foreground mb-2">This week</p>
              <BookingTrendsChart data={bookingTrends} />
            </CardContent>
          </Card>

          <Card className="border-border/60 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-5 sm:p-6">
              <h2 className="text-lg font-semibold mb-1">Categories</h2>
              <p className="text-xs text-muted-foreground mb-2">
                Distribution by type
              </p>
              <CategoryDistributionChart data={categoryDistribution} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
