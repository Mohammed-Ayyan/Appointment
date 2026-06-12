"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  Search,
  Settings,
  User,
  Home,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useUser } from "@/hooks/useUser";

const navItems = [
  { title: "Browse", href: "/", icon: Home },
  { title: "Appointments", href: "/appointments", icon: Calendar },
  { title: "Settings", href: "/settings", icon: Settings },
];

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const { user, loading } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-[260px] lg:border-r lg:border-border lg:bg-card lg:fixed lg:inset-y-0 lg:z-30">
        {/* Brand */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight">BookPro</h1>
            <p className="text-[11px] text-muted-foreground leading-none">
              Service Platform
            </p>
          </div>
        </div>

        {/* User Card */}
        <div className="px-4 py-4">
          <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3 border border-border/50">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-semibold text-sm">
              {loading ? "?" : (user?.name?.split(" ").map(n => n[0]).join("").toUpperCase() || "U")}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{loading ? "Loading..." : (user?.name || "Guest")}</p>
              <p className="text-[11px] text-muted-foreground">{user?.role === "admin" ? "Admin" : "Premium Member"}</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 text-primary shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-[18px] w-[18px]" />
                {item.title}
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <p className="text-[11px] text-muted-foreground text-center">
            © 2025 BookPro
          </p>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-card border-r border-border flex flex-col lg:hidden transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </div>
            <h1 className="text-base font-bold tracking-tight">BookPro</h1>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-4 py-4">
          <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3 border border-border/50">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-semibold text-sm">
              {loading ? "?" : (user?.name?.split(" ").map(n => n[0]).join("").toUpperCase() || "U")}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{loading ? "Loading..." : (user?.name || "Guest")}</p>
              <p className="text-[11px] text-muted-foreground">{user?.role === "admin" ? "Admin" : "Premium Member"}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-[18px] w-[18px]" />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-[260px] flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-20 flex items-center gap-4 px-4 sm:px-6 py-3 bg-card/80 backdrop-blur-md border-b border-border">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg hover:bg-muted transition-colors lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 border border-border/50">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Quick search..."
                className="bg-transparent text-sm outline-none w-[180px] placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary font-semibold text-sm lg:hidden">
              SA
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
