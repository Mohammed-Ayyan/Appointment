import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validateProviderForm } from "@/lib/validation";

// GET /api/providers — List all providers
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const location = searchParams.get("location");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "recommended";

    const where = {};

    if (category && category !== "all") {
      where.specialty = { contains: category };
    }

    if (location && location !== "all") {
      where.location = { contains: location };
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { specialty: { contains: search } },
        { location: { contains: search } },
      ];
    }

    let orderBy = {};
    switch (sort) {
      case "rating":
        orderBy = { rating: "desc" };
        break;
      case "price-low":
        orderBy = { price: "asc" };
        break;
      case "price-high":
        orderBy = { price: "desc" };
        break;
      default:
        orderBy = { rating: "desc" };
    }

    const providers = await prisma.serviceProvider.findMany({
      where,
      orderBy,
      select: {
        id: true,
        name: true,
        specialty: true,
        rating: true,
        reviewsCount: true,
        price: true,
        availability: true,
        image: true,
        location: true,
      },
    });

    return NextResponse.json({ 
      success: true,
      data: providers,
      count: providers.length 
    }, { status: 200 });
  } catch (error) {
    console.error("GET /api/providers error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch providers" },
      { status: 500 }
    );
  }
}

// POST /api/providers — Create a new provider
export async function POST(request) {
  try {
    const body = await request.json();

    // Validate input
    const validation = validateProviderForm(body);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: "Validation failed", errors: validation.errors },
        { status: 400 }
      );
    }

    // Check for duplicate email
    const existingProvider = await prisma.serviceProvider.findUnique({
      where: { email: body.email },
    });

    if (existingProvider) {
      return NextResponse.json(
        { success: false, error: "A provider with this email already exists" },
        { status: 409 }
      );
    }

    const provider = await prisma.serviceProvider.create({
      data: {
        name: body.name,
        email: body.email,
        specialty: body.specialty || null,
        specialization: body.specialization || null,
        rating: body.rating || 0,
        reviewsCount: body.reviewsCount || 0,
        price: body.price || null,
        availability: body.availability || null,
        image: body.image || null,
        experience: body.experience || null,
        location: body.location || null,
        avatar: body.avatar || null,
        phone: body.phone || null,
        address: body.address || null,
        about: body.about || null,
      },
    });

    return NextResponse.json({ 
      success: true,
      data: provider 
    }, { status: 201 });
  } catch (error) {
    console.error("POST /api/providers error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create provider" },
      { status: 500 }
    );
  }
}
