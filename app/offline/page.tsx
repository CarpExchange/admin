"use client";

import Image from "next/image";

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-gray-50">
      {/* Logo */}
      <div className="mb-6">
        <Image
          src="/icon-192x192.png"
          alt="Kript Logo"
          width={80}
          height={80}
          className="rounded-2xl"
        />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-3 text-[#003399]">You’re Offline</h1>

      {/* Message */}
      <p className="text-gray-600 max-w-md mb-6">
        It looks like you don’t have an internet connection right now.  
        Don’t worry — your Kript account and features will be back once you’re online.
      </p>

      {/* Retry Button */}
      <button
        onClick={() => window.location.reload()}
        className="rounded-2xl bg-[#003399] px-6 py-3 text-white font-semibold shadow-md hover:bg-[#002080] transition"
      >
        Retry Connection
      </button>

      {/* Footer */}
      <p className="mt-10 text-sm text-gray-400">
        © {new Date().getFullYear()} Kript Technology Ltd.
      </p>
    </main>
  );
}
