import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/providers/[id] — Get single provider with all relations
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
      return NextResponse.json(
        { message: "Invalid provider ID" },
        { status: 400 }
      );
    }

    const provider = await prisma.serviceProvider.findUnique({
      where: { id: numericId },
      include: {
        languages: { select: { id: true, language: true } },
        specializations: { select: { id: true, specialization: true } },
        reviewsList: {
          select: {
            id: true,
            name: true,
            rating: true,
            date: true,
            comment: true,
            avatar: true,
          },
          orderBy: { createdAt: "desc" },
        },
        timeSlots: {
          select: { id: true, time: true, day: true },
          orderBy: { time: "asc" },
        },
      },
    });

    if (!provider) {
      return NextResponse.json(
        { message: "Provider not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ provider }, { status: 200 });
  } catch (error) {
    console.error("GET /api/providers/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to fetch provider", error: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/providers/[id] — Update provider
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const numericId = parseInt(id, 10);
    const body = await request.json();

    if (isNaN(numericId)) {
      return NextResponse.json(
        { message: "Invalid provider ID" },
        { status: 400 }
      );
    }

    const provider = await prisma.serviceProvider.update({
      where: { id: numericId },
      data: {
        name: body.name,
        specialty: body.specialty,
        specialization: body.specialization,
        rating: body.rating,
        reviewsCount: body.reviewsCount,
        price: body.price,
        availability: body.availability,
        image: body.image,
        experience: body.experience,
        location: body.location,
        phone: body.phone,
        email: body.email,
        address: body.address,
        about: body.about,
      },
    });

    return NextResponse.json({ provider }, { status: 200 });
  } catch (error) {
    console.error("PUT /api/providers/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to update provider", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/providers/[id] — Delete provider
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
      return NextResponse.json(
        { message: "Invalid provider ID" },
        { status: 400 }
      );
    }

    await prisma.serviceProvider.delete({
      where: { id: numericId },
    });

    return NextResponse.json(
      { message: "Provider deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/providers/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to delete provider", error: error.message },
      { status: 500 }
    );
  }
}
