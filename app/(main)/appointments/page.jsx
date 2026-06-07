"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock, User } from "lucide-react";
import StatusBadge from "@/components/status-badge";
import LoadingSkeleton from "@/components/loading-skeleton";
import EmptyState from "@/components/empty-state";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    async function fetchAppointments() {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (statusFilter !== "all") params.set("status", statusFilter);
        const res = await fetch(`/api/appointments?${params.toString()}`);
        const data = await res.json();
        setAppointments(data.appointments || []);
      } catch {
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    }
    fetchAppointments();
  }, [statusFilter]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Appointments</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your upcoming and past appointments
          </p>
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px] h-9 text-sm">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Confirmed">Confirmed</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <LoadingSkeleton key={i} type="table-row" />
          ))}
        </div>
      )}

      {!loading && appointments.length === 0 && (
        <EmptyState
          icon="empty"
          title="No appointments yet"
          description="Book your first appointment with a service provider to get started."
          action={{
            label: "Browse Providers",
            onClick: () => (window.location.href = "/"),
          }}
        />
      )}

      {!loading && appointments.length > 0 && (
        <div className="space-y-3">
          {appointments.map((apt, index) => (
            <Card
              key={apt.id}
              className="border-border/60 animate-fade-in-up card-hover"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardContent className="p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                  <div className="flex gap-4 items-start">
                    <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary flex-shrink-0">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{apt.service}</h3>
                      <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {apt.provider?.name || "Provider"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(apt.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {apt.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                    <StatusBadge status={apt.status} />
                    <span className="text-sm font-semibold">
                      ${apt.paymentAmount}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
