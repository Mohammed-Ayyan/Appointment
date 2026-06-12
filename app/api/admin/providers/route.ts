import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { pool } from "@/lib/db";
import { authClient } from "@/lib/auth-client";

// Helper function to verify admin access
async function verifyAdmin() {
  const headersList = await headers();
  const session = await auth.api.getSession({ headers: headersList });
  
  if (!session?.user) {
    return { isAdmin: false, error: "Not authenticated" };
  }
  
  // Check if user has admin role
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT role FROM "user" WHERE id = $1',
      [session.user.id]
    );
    
    const isAdmin = result.rows.length > 0 && result.rows[0].role === "admin";
    return { isAdmin, error: isAdmin ? null : "Admin access required" };
  } finally {
    client.release();
  }
}

// POST /api/admin/providers - Create a new service provider
export async function POST(request: Request) {
  const { isAdmin, error: adminError } = await verifyAdmin();
  
  if (!isAdmin) {
    return NextResponse.json(
      { error: adminError || "Unauthorized" },
      { status: 401 }
    );
  }

  const client = await pool.connect();
  try {
    const body = await request.json();
    const { name, email, specialty, phone, location } = body;

    if (!name || !email || !specialty) {
      return NextResponse.json(
        { error: "Name, email, and specialty are required" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existing = await client.query(
      'SELECT id FROM "user" WHERE email = $1',
      [email]
    );

    if (existing.rows.length > 0) {
      return NextResponse.json(
        { error: "A user with this email already exists" },
        { status: 409 }
      );
    }

    // Generate a temporary password (8-12 character random string)
    const tempPassword = Math.random().toString(36).slice(2, 12) + 
                        Math.random().toString(36).slice(2, 4).toUpperCase();

    // Create user account via Better Auth
    const authResult = await authClient.signUp.email({
      email,
      password: tempPassword,
      name,
    });

    if (!authResult) {
      return NextResponse.json(
        { error: "Failed to create user account" },
        { status: 500 }
      );
    }

    // Get the user ID that was just created
    const userQuery = await client.query(
      'SELECT id FROM "user" WHERE email = $1',
      [email]
    );

    const userId = userQuery.rows[0]?.id;

    // Create service provider record
    const providerResult = await client.query(
      `INSERT INTO "service_provider" (
        "userId", name, email, specialty, phone, location, rating, "reviewsCount", verified,
        "createdAt", "updatedAt"
      ) VALUES ($1, $2, $3, $4, $5, $6, 0, 0, false, NOW(), NOW())
       RETURNING id, name, email, specialty, phone, location`,
      [userId, name, email, specialty, phone || null, location || null]
    );

    return NextResponse.json(
      {
        success: true,
        data: providerResult.rows[0],
        message: `Service provider "${name}" created. Temporary password: ${tempPassword}. Provider should change password on first login.`,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[v0] Admin provider creation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create service provider" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}

// GET /api/admin/providers - List all service providers
export async function GET() {
  const { isAdmin, error: adminError } = await verifyAdmin();
  
  if (!isAdmin) {
    return NextResponse.json(
      { error: adminError || "Unauthorized" },
      { status: 401 }
    );
  }

  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT sp.id, sp.name, sp.email, sp.specialty, sp.phone, sp.location, 
              sp.rating, sp."reviewsCount", sp.verified, sp."createdAt"
       FROM "service_provider" sp
       ORDER BY sp."createdAt" DESC`
    );

    return NextResponse.json({
      success: true,
      data: result.rows,
      count: result.rows.length,
    });
  } catch (error: any) {
    console.error("[v0] Admin get providers error:", error);
    return NextResponse.json(
      { error: "Failed to fetch providers" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
