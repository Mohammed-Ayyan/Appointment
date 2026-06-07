"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  User,
  Calendar,
  BarChart3,
  Settings,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Service Providers", href: "/service-providers", icon: User },
  { title: "Users", href: "/users", icon: Users },
  { title: "Appointments", href: "/admin-appointments", icon: Calendar },
  { title: "Analytics", href: "/analytics", icon: BarChart3 },
  { title: "Settings", href: "/admin-settings", icon: Settings },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-[260px] lg:border-r lg:border-border lg:bg-card lg:fixed lg:inset-y-0 lg:z-30">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight">BookPro</h1>
            <p className="text-[11px] text-muted-foreground leading-none">
              Admin Panel
            </p>
          </div>
        </div>

        <div className="px-4 py-4">
          <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3 border border-border/50">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-semibold text-sm">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Admin</p>
              <p className="text-[11px] text-muted-foreground">
                System Administrator
              </p>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
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

        <div className="p-4 border-t border-border">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to User View
          </Link>
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
        className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-card border-r border-border flex flex-col lg:hidden transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </div>
            <h1 className="text-base font-bold">Admin Panel</h1>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <item.icon className="h-[18px] w-[18px]" />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-[260px] flex flex-col min-h-screen">
        <header className="sticky top-0 z-20 flex items-center gap-4 px-4 sm:px-6 py-3 bg-card/80 backdrop-blur-md border-b border-border">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg hover:bg-muted lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary font-semibold text-sm">
            AD
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
