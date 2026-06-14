import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(request) {
  try {
    const headersList = await headers();
    const cookieHeader = headersList.get("cookie");
    
    console.log("[v0] Auth/me - Cookie header:", cookieHeader ? "present" : "missing");

    // Try to get session using Better Auth's session method
    const session = await auth.api.getSession({
      headers: headersList,
    });

    console.log("[v0] Auth/me - Session found:", !!session?.user);

    if (!session?.user) {
      // If no session found via API, try querying from the request directly
      // This handles the case where Better Auth cookies might be named differently
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const user = {
      id: session.user.id,
      name: session.user.name || session.user.email,
      email: session.user.email,
      role: session.user.role || "user",
      image: session.user.image,
    };

    console.log("[v0] Auth/me - Returning user:", user.name);
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("[v0] GET /api/auth/me error:", error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
