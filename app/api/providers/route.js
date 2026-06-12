import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

// GET /api/providers — List all providers
export async function GET(request) {
  const client = await pool.connect();
  try {
    const { searchParams } = new URL(request.url);
    const sort = searchParams.get("sort") || "recommended";

    let query = `
      SELECT id, name, specialty, rating, "reviewsCount", price, availability, image, location
      FROM "service_provider"
      ORDER BY rating DESC
      LIMIT 50
    `;

    const result = await client.query(query);
    return NextResponse.json({
      success: true,
      data: result.rows,
      count: result.rows.length,
    }, { status: 200 });
  } catch (error) {
    console.error("GET /api/providers error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch providers" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}

// POST /api/providers — Create a new provider
export async function POST(request) {
  const client = await pool.connect();
  try {
    const body = await request.json();
    const { name, email, specialty, phone, location } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Check for duplicate email
    const existing = await client.query(
      'SELECT id FROM "service_provider" WHERE email = $1',
      [email]
    );

    if (existing.rows.length > 0) {
      return NextResponse.json(
        { success: false, error: "A provider with this email already exists" },
        { status: 409 }
      );
    }

    const result = await client.query(
      `INSERT INTO "service_provider" (name, email, specialty, phone, location, "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
       RETURNING id, name, email, specialty, phone, location`,
      [name, email, specialty || null, phone || null, location || null]
    );

    return NextResponse.json(
      { success: true, data: result.rows[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/providers error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create provider" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
