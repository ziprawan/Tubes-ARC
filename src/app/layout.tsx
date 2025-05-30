import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import ConnectionStatus from "@/components/ConnectionStatus";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DisasterAlert - Indonesia Disaster Management System",
  description: "Real-time disaster information and management system for Indonesia",
  manifest: "/manifest.json",
  themeColor: "#2d4a3a",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "DisasterAlert",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <ConnectionStatus />
      </body>
    </html>
  );
}
