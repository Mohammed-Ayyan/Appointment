"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const { user, loading } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/sign-in");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span>📅</span>
            <span className="hidden sm:inline">BookPro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/browse" className="text-sm text-muted-foreground hover:text-foreground transition">
              Browse Providers
            </Link>
            <Link href="/appointments" className="text-sm text-muted-foreground hover:text-foreground transition">
              My Appointments
            </Link>
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center gap-4">
            {loading ? (
              <div className="h-10 w-24 bg-muted rounded animate-pulse" />
            ) : user ? (
              <>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-foreground font-medium">{user.name}</span>
                  <Link href="/settings" className="text-muted-foreground hover:text-foreground">
                    Settings
                  </Link>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-border/40">
            <Link
              href="/browse"
              className="block text-sm py-2 px-4 rounded-lg hover:bg-muted transition"
            >
              Browse Providers
            </Link>
            <Link
              href="/appointments"
              className="block text-sm py-2 px-4 rounded-lg hover:bg-muted transition"
            >
              My Appointments
            </Link>

            {user ? (
              <>
                <Link
                  href="/settings"
                  className="block text-sm py-2 px-4 rounded-lg hover:bg-muted transition"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-sm py-2 px-4 rounded-lg hover:bg-muted transition text-destructive"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button variant="outline" size="sm" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button size="sm" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
