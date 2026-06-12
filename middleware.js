import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request) {
  const token = request.cookies.get("auth_token")?.value;
  const pathname = request.nextUrl.pathname;

  // Public routes that don't require auth
  const publicRoutes = ["/signin", "/signup", "/forgot-password", "/reset-password"];
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  // Protected routes
  const protectedRoutes = ["/appointments", "/settings", "/SpDashboard", "/admin"];
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  // Check if user is authenticated
  let isAuthenticated = false;
  let userRole = null;

  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "your-secret-key-change-in-production"
      );
      isAuthenticated = true;
      userRole = decoded.role;
    } catch (error) {
      isAuthenticated = false;
    }
  }

  // Redirect to signin if accessing protected route without auth
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Redirect to home if authenticated user tries to access auth routes
  if (isPublicRoute && isAuthenticated && pathname !== "/signin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Check role-based access
  if (pathname.startsWith("/admin") && userRole !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/SpDashboard") && userRole !== "provider") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
