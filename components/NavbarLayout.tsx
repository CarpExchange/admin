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

  return (
    <div className="w-full bg-secondary">
      {/* Navbar */}
      <div className="bg-white fixed w-full flex items-center h-20 px-4 md:px-[1%] justify-between border-b-[0.5px] border-primary z-50">
        <div className="flex items-center space-x-3">
          <Image
            alt="Logo"
            src={"/assets/kript.png"}
            width={40}
            height={40}
            className="size-10"
          />
          <p className="text-2xl font-semibold ">
            Kript <span className="hidden md:block">Technologies</span>
          </p>
        </div>
        <button
          className="md:hidden p-2"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div className="w-full h-full flex">
        {/* Sidebar */}
        <div
          className={`bg-white fixed h-full mt-20 border-r border-primary py-6 px-[1%] z-40 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 md:w-1/6 transition-transform duration-300`}
        >
          <div className="flex flex-col justify-between h-4/5">
            <div className="space-y-2">
              {navbarData.map((link, index) => {
                const isActive = pathname === link.route;
                const icon = isActive ? link.activeIcon : link.inactiveIcon;

                return (
                  <Link
                    href={`${link.route}`}
                    key={index}
                    className={`w-full ${isActive ? "bg-secondary" : "bg-white"
                      }  rounded-md p-4 flex items-center space-x-3`}
                  >
                    {icon}
                    <p
                      className={`${isActive
                        ? "font-bold text-primary"
                        : "text-secondary font-normal"
                        }`}
                    >
                      {link.linkName}
                    </p>
                  </Link>
                );
              })}
            </div>

            <div>
              {navbarDataTwo.map((link, index) => {
                const isActive = pathname.includes(link.route);
                const icon = isActive ? link.activeIcon : link.inactiveIcon;

                return (
                  <Link
                    href={link.route}
                    key={index}
                    className={`w-full ${isActive ? "bg-secondary" : "bg-white"
                      }  rounded-md p-4 flex items-center space-x-3`}
                  >
                    {icon}
                    <p
                      className={`${isActive
                        ? "font-bold text-primary"
                        : "text-secondary font-normal"
                        }`}
                    >
                      {link.linkName}
                    </p>
                  </Link>
                );
              })}
              {/* @ts-ignore */}
              <LogoutBtn />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="w-full md:w-3/4 md:ml-[20%] h-full pt-20">
          {children}
        </div>
      </div>
    </div>
  );
};

export default NavbarLayout;
