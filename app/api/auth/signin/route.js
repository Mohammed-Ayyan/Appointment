import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

/**
 * This endpoint is deprecated. Use Better Auth client directly instead.
 * Kept for backwards compatibility with existing integrations.
 * @deprecated Use /auth/sign-in through Better Auth instead
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Use Better Auth's sign-in endpoint
    const response = await auth.api.signInEmail(
      {
        email,
        password,
      },
      {
        headers: await headers(),
      }
    );

    if (!response) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Get session to return user data
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        { message: "Sign in failed" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        user: {
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          role: session.user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST /api/auth/signin error:", error);
    return NextResponse.json(
      { message: "Failed to sign in" },
      { status: 500 }
    );
  }
}
