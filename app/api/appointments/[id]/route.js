import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// PUT /api/appointments/[id] — Update appointment status
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const numericId = parseInt(id, 10);
    const body = await request.json();

    if (isNaN(numericId)) {
      return NextResponse.json(
        { message: "Invalid appointment ID" },
        { status: 400 }
      );
    }

    const appointment = await prisma.appointment.update({
      where: { id: numericId },
      data: {
        status: body.status,
        paymentStatus: body.paymentStatus,
        paymentAmount: body.paymentAmount,
        notes: body.notes,
      },
      include: {
        provider: {
          select: { id: true, name: true, specialty: true },
        },
      },
    });

    return NextResponse.json({ appointment }, { status: 200 });
  } catch (error) {
    console.error("PUT /api/appointments/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to update appointment", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/appointments/[id] — Cancel appointment
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
      return NextResponse.json(
        { message: "Invalid appointment ID" },
        { status: 400 }
      );
    }

    await prisma.appointment.delete({
      where: { id: numericId },
    });

    return NextResponse.json(
      { message: "Appointment cancelled successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/appointments/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to cancel appointment", error: error.message },
      { status: 500 }
    );
  }
}
