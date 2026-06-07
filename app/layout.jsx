import "@/app/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata = {
  title: "BookPro — Service Booking Platform",
  description:
    "Book appointments with top-rated service providers. Find doctors, dentists, therapists and more.",
  keywords: ["booking", "appointments", "healthcare", "service providers"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
