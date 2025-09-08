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
          <body className={inter.className}>
            <ProtectedRoute>{children}</ProtectedRoute>
            <Toaster />
          </body>
        </html>
      </AuthProvider>
    </QueryProvider>
  );
}
