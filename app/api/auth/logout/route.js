import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (token) {
      // Delete session from database
      await prisma.session.deleteMany({
        where: { sessionToken: token },
      });
    }

    const response = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );

    response.cookies.delete("auth_token");

    return response;
  } catch (error) {
    console.error("POST /api/auth/logout error:", error);
    return NextResponse.json(
      { message: "Failed to logout", error: error.message },
      { status: 500 }
    );
  }
}
