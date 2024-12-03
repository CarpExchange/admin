import { navbarData, navbarDataTwo } from "@/data/NavbarData";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "./AuthProvider";
import Link from "next/link";
import LogoutBtn from "./LogoutBtn";

type Props = {
  children: React.ReactNode;
};

const NavbarLayout = ({ children }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const { state: {user_info} } = useContext(AuthContext);

  useEffect(() => {
    if (!user_info && !user_info.access_token) {
      router.push("/signin");
    }
  }, [router, user_info]);


  return (
    <div className="w-full bg-secondary">
      {/* Navbar */}
      <div className="bg-white fixed w-full flex items-center h-20 px-[1%] space-x-3 border-b-[0.5px] border-primary">
        <Image
          alt="Logo"
          src={"/assets/kript.png"}
          width={40}
          height={40}
          className="size-10"
        />
        <p className="text-2xl font-semibold">Kript Technologies</p>
      </div>
      <div className="w-full h-full flex">
        {/* Sidebar */}
        <div className="bg-white w-1/4 fixed h-full mt-20 border-r border-primary py-6 px-[1%]">
          <div className="flex flex-col justify-between h-4/5">
            <div className="space-y-2">
              {navbarData.map((link, index) => {
                const isActive = pathname === link.route;
                const icon = isActive ? link.activeIcon : link.inactiveIcon;

                return (
                  <Link
                    href={link.route}
                    key={index}
                    className={`w-full ${
                      isActive ? "bg-secondary" : "bg-white"
                    }  rounded-md p-4 flex items-center space-x-3`}
                  >
                    {icon}
                    <p
                      className={`${
                        isActive
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
                    className={`w-full ${
                      isActive ? "bg-secondary" : "bg-white"
                    }  rounded-md p-4 flex items-center space-x-3`}
                  >
                    {icon}
                    <p
                      className={`${
                        isActive
                          ? "font-bold text-primary"
                          : "text-secondary font-normal"
                      }`}
                    >
                      {link.linkName}
                    </p>
                  </Link>
                );
              })}

              <LogoutBtn />              
              
            </div>
          </div>
        </div>
        {/* Body */}
        <div className="w-3/4 ml-[25%] h-full pt-20">{children}</div>
      </div>
    </div>
  );
};

export default NavbarLayout;
