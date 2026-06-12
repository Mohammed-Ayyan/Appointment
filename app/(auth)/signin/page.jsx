"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Sparkles, Eye, EyeOff, CheckCircle } from "lucide-react";

function SignInForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success")) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Sign in failed");
      }

      const data = await response.json();

      // Redirect based on user role
      if (data.user.role === "provider") {
        router.push(`/SpDashboard/${data.user.id}`);
      } else if (data.user.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-muted/50 p-4">
      <Card className="w-full max-w-md border-border/60">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">BookPro</h1>
              <p className="text-xs text-muted-foreground">Service Platform</p>
            </div>
          </div>

          {/* Title */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-1">Welcome Back</h2>
            <p className="text-sm text-muted-foreground">
              Sign in to your account
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-50 text-emerald-700 text-sm flex items-center gap-2">
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
              Account created successfully! Please sign in.
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-10 text-base font-medium"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Don&apos;t have an account?
              </span>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-muted-foreground">
            <Link
              href="/signup"
              className="text-primary hover:underline font-medium"
            >
              Create one here
            </Link>
          </p>

          {/* Demo Credentials */}
          <div className="mt-6 p-3 rounded-lg bg-muted/50 border border-border/50">
            <p className="text-xs font-semibold text-muted-foreground mb-2">
              Demo Credentials:
            </p>
            <p className="text-xs text-muted-foreground">
              Email: <code className="bg-background px-1">demo@example.com</code>
            </p>
            <p className="text-xs text-muted-foreground">
              Password: <code className="bg-background px-1">demo123</code>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInForm />
    </Suspense>
  );
}
