import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/QueryClientProvider";
import { AuthProvider } from "@/components/AuthProvider";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kript Admin",
  description: "Kript Admin App to manage activities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
        <AuthProvider>
          <html lang="en">
            <body className={inter.className}>
              <ProtectedRoute children={children} />
              <Toaster />
            </body>
          </html>
        </AuthProvider>
    </QueryProvider>
  );
}
