import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/appointments — List appointments with filters
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const providerId = searchParams.get("providerId");
    const date = searchParams.get("date");

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
    });

    return NextResponse.json({ appointments }, { status: 200 });
  } catch (error) {
    console.error("GET /api/appointments error:", error);
    return NextResponse.json(
      { message: "Failed to fetch appointments", error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/appointments — Create a new appointment
export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.patientName || !body.providerId || !body.date || !body.time || !body.service) {
      return NextResponse.json(
        { message: "Missing required fields: patientName, providerId, date, time, service" },
        { status: 400 }
      );
    }

    const provider = await prisma.serviceProvider.findUnique({
      where: { id: parseInt(body.providerId, 10) },
    });

    if (!provider) {
      return NextResponse.json(
        { message: "Provider not found" },
        { status: 404 }
      );
    }

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

    return NextResponse.json({ appointment }, { status: 201 });
  } catch (error) {
    console.error("POST /api/appointments error:", error);
    return NextResponse.json(
      { message: "Failed to create appointment", error: error.message },
      { status: 500 }
    );
  }
}
