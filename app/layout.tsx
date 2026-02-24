import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/QueryClientProvider";
import { AuthProvider } from "@/components/AuthProvider";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kript",
  description:
    "Kript makes crypto simple — buy, sell, swap, and spend crypto instantly.",
  manifest: "/manifest.json",
  themeColor: "#0d0d2b",
  icons: {
    icon: "/icon-192x192.png",
    apple: "/icon-192x192.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Kript",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <QueryProvider>
      <AuthProvider>
        <html lang="en">
        <head>
        <title>Kript Admin</title>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#003399" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </head>
          <body className={inter.className}>
            <ProtectedRoute>{children}</ProtectedRoute>
            <Toaster />
          </body>
        </html>
      </AuthProvider>
    </QueryProvider>
  );
}
