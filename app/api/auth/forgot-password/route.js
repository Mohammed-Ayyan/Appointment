import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import crypto from "crypto";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Always return success message for security (don't reveal if email exists)
    if (!user) {
      return NextResponse.json(
        {
          message:
            "If an account exists with that email, you will receive a password reset link",
        },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Store reset token in database with expiration
    await prisma.user.update({
      where: { id: user.id },
      data: {
        // Note: You'll need to add these fields to the User model
        // resetToken: resetTokenHash,
        // resetTokenExpires: new Date(Date.now() + 3600000), // 1 hour
      },
    });

    // In production, send this link via email
    const resetLink = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`;

    console.log("[v0] Password reset link:", resetLink);

    return NextResponse.json(
      {
        message:
          "If an account exists with that email, you will receive a password reset link",
        // For demo purposes only - never return token in production
        resetLink: process.env.NODE_ENV === "development" ? resetLink : undefined,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST /api/auth/forgot-password error:", error);
    return NextResponse.json(
      { message: "Failed to process request", error: error.message },
      { status: 500 }
    );
  }
}
