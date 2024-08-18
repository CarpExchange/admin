"use client";

import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "./AuthProvider";
import NavbarLayout from "./NavbarLayout";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const { user_info } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user_info && user_info.access_token) {
      router.push("/");
    } else {
      router.push("/signin");
    }
  }, [router, user_info]);

  const unprotectedRoute = ["/signin"];

  const isProtectedRoute = !unprotectedRoute.includes(usePathname());

  // const NavbarLayout = dynamic(() => import("@/components/NavbarLayout"), {
  //   ssr: false,
  // });

  return (
    <div>
      {isProtectedRoute && <NavbarLayout children={children} />}
      {!isProtectedRoute && children}
    </div>
  );
};

export default ProtectedRoute;
