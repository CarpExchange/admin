"use client";

import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "./AuthProvider";
import NavbarLayout from "./NavbarLayout";
import { NotificationContext } from "./NotificationProvider";
import RenderPopUp from "./RenderPopUp";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const { state: user_info } = useContext(AuthContext);
  const router = useRouter();

  const { state: notificationPopUp, dispatch: setNotificationPopUp } =
    useContext(NotificationContext);

  useEffect(() => {
    if (notificationPopUp?.status) {
      const notificationTimeout = setTimeout(() => {
        setNotificationPopUp({
          type: "UPDATE_MESSAGE",
          payload: {
            status: false,
            message: "",
            type: "",
          },
        });
      }, 3000);
      return () => clearTimeout(notificationTimeout);
    }
  }, [notificationPopUp?.status]);

  useEffect(() => {
    if (user_info && user_info.access_token) {
      // console.log(user_info, "user info");
      router.push("/");
    } else {
      router.push("/signin");
    }
  }, [router, user_info]);

  const unprotectedRoute = ["/signin"];

  const isProtectedRoute = !unprotectedRoute.includes(usePathname());

  const NavbarLayout = dynamic(() => import("@/components/NavbarLayout"), {
    ssr: false,
  });

  return (
    <div>
      {notificationPopUp?.status && (
        <div className="absolute top-6 w-[300px] mx-auto right-0 left-0 z-20">
          <RenderPopUp />
        </div>
      )}
      {isProtectedRoute && <NavbarLayout children={children} />}
      {!isProtectedRoute && children}
    </div>
  );
};

export default ProtectedRoute;
