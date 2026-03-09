"use client";

import { navbarData, navbarDataTwo } from "@/data/NavbarData";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import LogoutBtn from "./LogoutBtn";

type Props = {
  children: React.ReactNode;
};

const NavbarLayout = ({ children }: Props) => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="w-full min-h-screen bg-secondary">
      {/* Navbar */}
      <div className="bg-white fixed top-0 w-full flex items-center h-20 px-4 md:px-6 justify-between border-b border-primary z-50">
        <Link href="/" className="flex items-center space-x-3">
          <Image
            alt="Logo"
            src={"/assets/kript.png"}
            width={40}
            height={40}
          />
          <p className="flex gap-2 text-xl md:text-2xl font-semibold">
            Kript <span className="hidden md:block">Technologies</span>
          </p>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsSidebarOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full bg-white border-r border-primary pt-24 px-4 z-40
          w-[260px] transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:w-[250px]`}
        >
          <div className="flex flex-col justify-between h-full pb-10 overflow-y-auto">
            {/* Main Links */}
            <div className="space-y-2">
              {navbarData.map((link, index) => {
                const isActive = pathname === link.route;
                const icon = isActive
                  ? link.activeIcon
                  : link.inactiveIcon;

                return (
                  <Link
                    href={link.route}
                    key={index}
                    onClick={closeSidebar}
                    className={`flex items-center gap-3 p-3 rounded-lg transition
                    ${
                      isActive
                        ? "bg-gray-200 text-primary font-semibold"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {icon}
                    <span>{link.linkName}</span>
                  </Link>
                );
              })}
            </div>

            {/* Bottom Links */}
            <div className="space-y-2 mt-10">
              {navbarDataTwo.map((link, index) => {
                const isActive = pathname.includes(link.route);
                const icon = isActive
                  ? link.activeIcon
                  : link.inactiveIcon;

                return (
                  <Link
                    href={link.route}
                    key={index}
                    onClick={closeSidebar}
                    className={`flex items-center gap-3 p-3 rounded-lg transition
                    ${
                      isActive
                        ? "bg-gray-200 text-primary font-semibold"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {icon}
                    <span>{link.linkName}</span>
                  </Link>
                );
              })}

              {/* Logout */}
             {/* @ts-ignore */} 
             <LogoutBtn />
            </div>
          </div>
        </aside>

        {/* Page Content */}
        <main className="flex-1 pt-24 px-4 md:px-8 md:ml-[250px]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default NavbarLayout;