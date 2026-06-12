import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validateAppointmentForm } from "@/lib/validation";

// GET /api/appointments — List appointments with filters
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const providerId = searchParams.get("providerId");
    const date = searchParams.get("date");
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    const where = {};

    if (status && status !== "all") {
      where.status = status;
    }

    if (providerId) {
      where.providerId = parseInt(providerId, 10);
    }

    if (date) {
      const startOfDay = new Date(date);
      const endOfDay = new Date(date);
      endOfDay.setDate(endOfDay.getDate() + 1);
      where.date = { gte: startOfDay, lt: endOfDay };
    }

    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        provider: {
          select: { id: true, name: true, specialty: true, avatar: true },
        },
      },
      orderBy: [{ date: "asc" }, { time: "asc" }],
      take: limit,
    });

    return NextResponse.json({ 
      success: true,
      data: appointments,
      count: appointments.length 
    }, { status: 200 });
  } catch (error) {
    console.error("GET /api/appointments error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}

// POST /api/appointments — Create a new appointment
export async function POST(request) {
  try {
    const body = await request.json();

    // Validate input using centralized validation
    const validation = validateAppointmentForm(body);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: "Validation failed", errors: validation.errors },
        { status: 400 }
      );
    }

    // Verify provider exists
    const provider = await prisma.serviceProvider.findUnique({
      where: { id: parseInt(body.providerId, 10) },
    });

    if (!provider) {
      return NextResponse.json(
        { success: false, error: "Provider not found" },
        { status: 404 }
      );
    }

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        patientName: body.patientName,
        patientEmail: body.patientEmail || null,
        patientPhone: body.patientPhone || null,
        date: new Date(body.date),
        time: body.time,
        service: body.service,
        duration: body.duration || null,
        status: body.status || "Pending",
        paymentAmount: body.paymentAmount || 0,
        paymentStatus: body.paymentStatus || "Unpaid",
        notes: body.notes || null,
        providerId: parseInt(body.providerId, 10),
      },
      include: {
        provider: {
          select: { id: true, name: true, specialty: true },
        },
      },
    });

    return NextResponse.json({ 
      success: true, 
      data: appointment 
    }, { status: 201 });
  } catch (error) {
    console.error("POST /api/appointments error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create appointment" },
      { status: 500 }
    );
  }
}
