"use client";

import { use, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Plus,
  Check,
  X,
  CalendarDays,
  Clock3,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import StatusBadge from "@/components/status-badge";

export default function ProviderDashboard({ params }) {
  const resolvedParams = use(params);
  const providerId = resolvedParams.id;

  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("today");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditHoursDialog, setShowEditHoursDialog] = useState(false);

  const patients = [
    { id: "PAT-001", name: "Emma Thompson", email: "emma@example.com", phone: "+1 (555) 123-4567" },
    { id: "PAT-002", name: "John Davis", email: "john@example.com", phone: "+1 (555) 987-6543" },
    { id: "PAT-003", name: "Sarah Wilson", email: "sarah@example.com", phone: "+1 (555) 456-7890" },
  ];

  const appointments = [
    { id: "APT-0012", patientName: "Emma Thompson", patientAvatar: "/placeholder.svg?height=40&width=40", date: "Jan 15, 2025", time: "09:00 AM", service: "Dental Cleaning", duration: "45 mins", status: "Pending", paymentAmount: 150, paymentStatus: "Unpaid" },
    { id: "APT-0013", patientName: "John Davis", patientAvatar: "/placeholder.svg?height=40&width=40", date: "Jan 15, 2025", time: "10:00 AM", service: "Root Canal", duration: "1.5 hrs", status: "Confirmed", paymentAmount: 450, paymentStatus: "Paid" },
    { id: "APT-0014", patientName: "Sarah Wilson", patientAvatar: "/placeholder.svg?height=40&width=40", date: "Jan 16, 2025", time: "11:00 AM", service: "Teeth Whitening", duration: "1 hr", status: "Pending", paymentAmount: 200, paymentStatus: "Unpaid" },
  ];

  const workingHours = [
    { day: "Monday", hours: "9:00 AM - 5:00 PM" },
    { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
    { day: "Wednesday", hours: "9:00 AM - 5:00 PM" },
    { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
    { day: "Friday", hours: "9:00 AM - 3:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 2:00 PM" },
    { day: "Sunday", hours: "", isClosed: true },
  ];

  const filteredAppointments = appointments.filter((apt) => {
    if (statusFilter !== "all" && apt.status.toLowerCase() !== statusFilter) return false;
    if (dateFilter === "today" && apt.date !== "Jan 15, 2025") return false;
    if (dateFilter === "tomorrow" && apt.date !== "Jan 16, 2025") return false;
    if (searchQuery && !apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) && !apt.service.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const todaysAppointments = appointments.filter((a) => a.date === "Jan 15, 2025").length;
  const completedAppointments = appointments.filter((a) => a.status === "Completed").length;
  const pendingAppointments = appointments.filter((a) => a.status === "Pending").length;
  const todaysEarnings = appointments.filter((a) => a.date === "Jan 15, 2025" && a.paymentStatus === "Paid").reduce((sum, a) => sum + a.paymentAmount, 0);

  const stats = [
    { label: "Today's Appointments", value: todaysAppointments, icon: Calendar, bg: "bg-blue-500/10", color: "text-blue-500" },
    { label: "Completed", value: completedAppointments, icon: CheckCircle, bg: "bg-emerald-500/10", color: "text-emerald-500" },
    { label: "Pending", value: pendingAppointments, icon: AlertCircle, bg: "bg-amber-500/10", color: "text-amber-500" },
    { label: "Today's Earnings", value: `$${todaysEarnings}`, icon: DollarSign, bg: "bg-violet-500/10", color: "text-violet-500" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-[260px] lg:border-r lg:border-border lg:bg-card lg:fixed lg:inset-y-0 lg:z-30">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight">BookPro</h1>
            <p className="text-[11px] text-muted-foreground leading-none">Provider Portal</p>
          </div>
        </div>

        <div className="px-4 py-4">
          <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3 border border-border/50">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-semibold text-sm">
              MB
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Dr. Michael Brown</p>
              <p className="text-[11px] text-muted-foreground">Dental Specialist</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-1">
          {[
            { icon: CalendarDays, label: "Appointments", active: true },
            { icon: Clock3, label: "Availability" },
            { icon: DollarSign, label: "Earnings" },
          ].map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium cursor-pointer transition-all ${
                item.active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="h-[18px] w-[18px]" />
              {item.label}
              {item.active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-[260px]">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 animate-fade-in-up">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Appointments Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-1">Provider ID: {providerId}</p>
            </div>

            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button className="gap-2 h-9 text-sm">
                  <Plus className="h-4 w-4" />
                  Add Offline Booking
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Appointment</DialogTitle>
                </DialogHeader>
                <form className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Patient</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select patient" /></SelectTrigger>
                      <SelectContent>
                        {patients.map((p) => (
                          <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>Time</Label>
                      <Input type="time" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Service</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select service" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cleaning">Dental Cleaning</SelectItem>
                        <SelectItem value="rootcanal">Root Canal</SelectItem>
                        <SelectItem value="whitening">Teeth Whitening</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Notes</Label>
                    <Textarea placeholder="Additional notes..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Payment Status</Label>
                    <RadioGroup defaultValue="unpaid" className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="paid" id="paid" />
                        <Label htmlFor="paid">Paid</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="unpaid" id="unpaid" />
                        <Label htmlFor="unpaid">Unpaid</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" type="button" onClick={() => setShowAddDialog(false)}>Cancel</Button>
                    <Button type="button" onClick={() => setShowAddDialog(false)}>Add Appointment</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <Card key={stat.label} className="border-border/60 animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <CardContent className="p-5 flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${stat.bg}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                    <h3 className="text-xl font-bold">{stat.value}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Table */}
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <h2 className="text-lg font-semibold">Upcoming Appointments</h2>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[130px] h-9 text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-[130px] h-9 text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="tomorrow">Tomorrow</SelectItem>
                    <SelectItem value="all">All Dates</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-lg border border-border/60 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 hover:bg-muted/30">
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Patient</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Date & Time</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Service</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Status</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Payment</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((apt) => (
                      <TableRow key={apt.id} className="hover:bg-muted/20 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 rounded-lg">
                              <Image src={apt.patientAvatar} alt={apt.patientName} width={32} height={32} className="rounded-lg" />
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{apt.patientName}</p>
                              <p className="text-[11px] text-muted-foreground">#{apt.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm">{apt.date}</p>
                          <p className="text-xs text-muted-foreground">{apt.time}</p>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm">{apt.service}</p>
                          <p className="text-xs text-muted-foreground">{apt.duration}</p>
                        </TableCell>
                        <TableCell><StatusBadge status={apt.status} /></TableCell>
                        <TableCell>
                          <p className="text-sm font-semibold">${apt.paymentAmount}</p>
                          <StatusBadge status={apt.paymentStatus} />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="outline" size="icon" className="h-7 w-7 text-emerald-500 border-emerald-200 hover:bg-emerald-50">
                              <Check className="h-3.5 w-3.5" />
                            </Button>
                            <Button variant="outline" size="icon" className="h-7 w-7 text-red-500 border-red-200 hover:bg-red-50">
                              <X className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground text-sm">
                        No appointments found matching your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Working Hours */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Working Hours</h2>
              <Button variant="outline" size="sm" className="text-sm">
                Edit Hours
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1">
              {workingHours.map((day) => (
                <div key={day.day} className="flex justify-between py-3 border-b border-border/40">
                  <span className="text-sm font-medium">{day.day}</span>
                  <span className={`text-sm ${day.isClosed ? "text-destructive font-medium" : "text-muted-foreground"}`}>
                    {day.isClosed ? "Closed" : day.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
