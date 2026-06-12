import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import AuthForm from "@/components/auth-form";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Sign In | BookPro",
  description: "Sign in to your BookPro account to book appointments",
};

export default async function SignInPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  
  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Branding */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">BookPro</h1>
          <p className="text-muted-foreground">Schedule with the best service providers</p>
        </div>

        {/* Auth Card */}
        <Card className="border-border/60 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/70 shadow-lg">
          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight">Welcome Back</h2>
              <p className="text-sm text-muted-foreground">Sign in to your account to continue</p>
            </div>

            <AuthForm mode="sign-in" />

            <Separator className="my-6" />

            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link 
                  href="/sign-up" 
                  className="text-primary hover:underline font-medium"
                >
                  Sign up
                </Link>
              </p>
              <p className="text-xs text-muted-foreground/70">
                <Link 
                  href="/" 
                  className="hover:underline"
                >
                  Back to home
                </Link>
              </p>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground/60">
          By signing in, you agree to our{" "}
          <Link href="#" className="hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
