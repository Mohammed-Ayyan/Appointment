"use client"

import React from "react"

import { useState } from "react"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Plus,
  Check,
  X,
  Settings,
  User,
  BarChart3,
  CalendarDays,
  Clock3,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Types
const AppointmentStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled"
const PaymentStatus = "Paid" | "Unpaid" | "Partial"

// interface Appointment {
//   id: string
//   patientId: string
//   patientName: string
//   patientAvatar: string
//   date: string
//   time: string
//   service: string
//   duration: string
//   status: AppointmentStatus
//   paymentAmount: number
//   paymentStatus: PaymentStatus
// }

// interface Patient {
//   id: string
//   name: string
//   avatar: string
//   email: string
//   phone: string
// }

// interface WorkingHours {
//   day: string
//   hours: string
//   isClosed?: boolean
// }

export default function AppointmentsDashboard({params}) {
  // State for filters
  console.log(params.params)
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("today")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddAppointmentDialog, setShowAddAppointmentDialog] = useState(false)
  const [showEditHoursDialog, setShowEditHoursDialog] = useState(false)

  // Sample data
  const patients= [
    {
      id: 'a',
      name: params.params,
      avatar: "/placeholder.svg?height=40&width=40",
      email: "emma.thompson@example.com",
      phone: "+1 (555) 123-4567",
    },
    {
      id: "PAT-002",
      name: "John Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "john.davis@example.com",
      phone: "+1 (555) 987-6543",
    },
    {
      id: "PAT-003",
      name: "Sarah Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "sarah.wilson@example.com",
      phone: "+1 (555) 456-7890",
    },
  ]

  const appointments = [
    {
      id: "APT-0012",
      patientId: "PAT-001",
      patientName: "Emma Thompson",
      patientAvatar: "/placeholder.svg?height=40&width=40",
      date: "Jan 15, 2025",
      time: "09:00 AM",
      service: "Dental Cleaning",
      duration: "45 mins",
      status: "Pending",
      paymentAmount: 150,
      paymentStatus: "Unpaid",
    },
    {
      id: "APT-0013",
      patientId: "PAT-002",
      patientName: "John Davis",
      patientAvatar: "/placeholder.svg?height=40&width=40",
      date: "Jan 15, 2025",
      time: "10:00 AM",
      service: "Root Canal",
      duration: "1.5 hrs",
      status: "Confirmed",
      paymentAmount: 450,
      paymentStatus: "Paid",
    },
    {
      id: "APT-0014",
      patientId: "PAT-003",
      patientName: "Sarah Wilson",
      patientAvatar: "/placeholder.svg?height=40&width=40",
      date: "Jan 16, 2025",
      time: "11:00 AM",
      service: "Teeth Whitening",
      duration: "1 hr",
      status: "Pending",
      paymentAmount: 200,
      paymentStatus: "Unpaid",
    },
  ]

  const workingHours = [
    { day: "Monday", hours: "9:00 AM - 5:00 PM" },
    { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
    { day: "Wednesday", hours: "9:00 AM - 5:00 PM" },
    { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
    { day: "Friday", hours: "9:00 AM - 3:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 2:00 PM" },
    { day: "Sunday", hours: "", isClosed: true },
  ]

  // Filter appointments based on selected filters
  const filteredAppointments = appointments.filter((appointment) => {
    // Filter by status
    if (statusFilter !== "all" && appointment.status.toLowerCase() !== statusFilter.toLowerCase()) {
      return false
    }

    // Filter by date
    if (dateFilter === "today" && appointment.date !== "Jan 15, 2025") {
      return false
    } else if (dateFilter === "tomorrow" && appointment.date !== "Jan 16, 2025") {
      return false
    } else if (dateFilter === "thisWeek") {
      // This would need more complex logic in a real app
    }

    // Filter by search query
    if (
      searchQuery &&
      !appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !appointment.service.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    return true
  })

  // Stats calculations
  const todaysAppointments = appointments.filter((a) => a.date === "Jan 15, 2025").length
  const completedAppointments = appointments.filter((a) => a.status === "Completed").length
  const pendingAppointments = appointments.filter((a) => a.status === "Pending").length
  const todaysEarnings = appointments
    .filter((a) => a.date === "Jan 15, 2025" && a.paymentStatus === "Paid")
    .reduce((sum, a) => sum + a.paymentAmount, 0)

  // Handle adding a new appointment
//   const handleAddAppointment = (e: React.FormEvent) => {
//     e.preventDefault()
//     // In a real app, this would add the appointment to the database
//     setShowAddAppointmentDialog(false)
//     // You would then refresh the appointments list
//   }

//   // Handle updating working hours
//   const handleUpdateHours = (e: React.FormEvent) => {
//     e.preventDefault()
//     // In a real app, this would update the working hours in the database
//     setShowEditHoursDialog(false)
//   }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="w-[208px] border-r bg-card p-4 flex flex-col gap-4">
        <div className="flex items-center gap-3 p-2">
          <Avatar className="h-10 w-10">
            <Image src="/placeholder.svg?height=40&width=40" alt="Dr. Michael Brown" width={40} height={40} />
          </Avatar>
          <div>
            <p className="text-sm font-medium">Dr. Michael Brown</p>
            <p className="text-xs text-muted-foreground">Dental Specialist</p>
          </div>
        </div>

        <nav className="space-y-1">
          <Link href="#" className="flex items-center gap-3 rounded-md bg-primary/10 px-3 py-2 text-sm text-primary">
            <CalendarDays className="h-4 w-4" />
            Appointments
          </Link>

          <Link
            href="#"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Clock3 className="h-4 w-4" />
            Availability
          </Link>

          <Link
            href="#"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <BarChart3 className="h-4 w-4" />
            Earnings
          </Link>

          <Link
            href="#"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <User className="h-4 w-4" />
            Profile
          </Link>

          <Link
            href="#"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Appointments Dashboard</h1>

            <Dialog open={showAddAppointmentDialog} onOpenChange={setShowAddAppointmentDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Offline Booking
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Appointment</DialogTitle>
                </DialogHeader>
                <form 
                // onSubmit={handleAddAppointment}
                 className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient">Patient</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select patient" />
                      </SelectTrigger>
                      <SelectContent>
                        {patients.map((patient) => (
                          <SelectItem key={patient.id} value={patient.id}>
                            {patient.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input type="date" id="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input type="time" id="time" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service">Service</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cleaning">Dental Cleaning</SelectItem>
                        <SelectItem value="rootcanal">Root Canal</SelectItem>
                        <SelectItem value="whitening">Teeth Whitening</SelectItem>
                        <SelectItem value="extraction">Tooth Extraction</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea id="notes" placeholder="Add any additional notes" />
                  </div>

                  <div className="space-y-2">
                    <Label>Payment Status</Label>
                    <RadioGroup defaultValue="unpaid" className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="paid" id="paid" />
                        <Label htmlFor="paid">Paid</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="unpaid" id="unpaid" />
                        <Label htmlFor="unpaid">Unpaid</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" type="button" onClick={() => setShowAddAppointmentDialog(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Add Appointment</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Today&apos;s Appointments</p>
                  <h3 className="text-2xl font-bold">{todaysAppointments}</h3>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <h3 className="text-2xl font-bold">{completedAppointments}</h3>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <AlertCircle className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <h3 className="text-2xl font-bold">{pendingAppointments}</h3>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Today&apos;s Earnings</p>
                  <h3 className="text-2xl font-bold">${todaysEarnings}</h3>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Appointments table */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Upcoming Appointments</h2>

              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="tomorrow">Tomorrow</SelectItem>
                    <SelectItem value="thisWeek">This Week</SelectItem>
                    <SelectItem value="all">All Dates</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <Image
                                src={appointment.patientAvatar || "/placeholder.svg"}
                                alt={appointment.patientName}
                                width={32}
                                height={32}
                              />
                            </Avatar>
                            <div>
                              <p className="font-medium">{appointment.patientName}</p>
                              <p className="text-xs text-muted-foreground">#{appointment.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p>{appointment.date}</p>
                            <p className="text-sm text-muted-foreground">{appointment.time}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p>{appointment.service}</p>
                            <p className="text-sm text-muted-foreground">{appointment.duration}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`
                              ${appointment.status === "Pending" ? "border-yellow-500 text-yellow-500" : ""}
                              ${appointment.status === "Confirmed" ? "border-green-500 text-green-500" : ""}
                              ${appointment.status === "Completed" ? "border-blue-500 text-blue-500" : ""}
                              ${appointment.status === "Cancelled" ? "border-red-500 text-red-500" : ""}
                            `}
                          >
                            {appointment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">${appointment.paymentAmount}</p>
                            <p
                              className={`text-sm ${appointment.paymentStatus === "Paid" ? "text-green-500" : "text-red-500"}`}
                            >
                              {appointment.paymentStatus}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="icon" className="h-8 w-8 text-green-500">
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="h-8 w-8 text-red-500">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                        No appointments found matching your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Working hours */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Working Hours</h2>

              <Dialog open={showEditHoursDialog} onOpenChange={setShowEditHoursDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline">Edit Hours</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Edit Working Hours</DialogTitle>
                  </DialogHeader>
                  <form 
                //   onSubmit={handleUpdateHours}
                   className="space-y-4 mt-4">
                    {workingHours.map((day, index) => (
                      <div key={day.day} className="grid grid-cols-3 gap-4 items-center">
                        <Label className="font-medium">{day.day}</Label>
                        <div className="col-span-2 flex items-center gap-2">
                          <Select defaultValue={day.isClosed ? "closed" : "open"}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="open">Open</SelectItem>
                              <SelectItem value="closed">Closed</SelectItem>
                            </SelectContent>
                          </Select>

                          {!day.isClosed && (
                            <>
                              <Input type="time" defaultValue="09:00" className="w-24" disabled={day.isClosed} />
                              <span>to</span>
                              <Input type="time" defaultValue="17:00" className="w-24" disabled={day.isClosed} />
                            </>
                          )}
                        </div>
                      </div>
                    ))}

                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline" type="button" onClick={() => setShowEditHoursDialog(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Save Changes</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {workingHours.slice(0, 4).map((day) => (
                <div key={day.day} className="flex justify-between py-2 border-b">
                  <span className="font-medium">{day.day}</span>
                  <span className="text-muted-foreground">{day.isClosed ? "Closed" : day.hours}</span>
                </div>
              ))}

              {workingHours.slice(4).map((day) => (
                <div key={day.day} className="flex justify-between py-2 border-b">
                  <span className="font-medium">{day.day}</span>
                  <span className={day.isClosed ? "text-red-500" : "text-muted-foreground"}>
                    {day.isClosed ? "Closed" : day.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

