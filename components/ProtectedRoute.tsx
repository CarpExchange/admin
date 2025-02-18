// 'use client';

// import dynamic from 'next/dynamic';
// import { usePathname, useRouter } from 'next/navigation';
// import React, { useContext, useEffect } from 'react';
// import { AuthContext } from './AuthProvider';

// type Props = {
//   children: React.ReactNode;
// };

// const ProtectedRoute = ({ children }: Props) => {
//   const { state: { user_info } } = useContext(AuthContext);
//   const router = useRouter();

//   useEffect(() => {
//     if (!user_info.access_token) {
//       router.replace('/signin');
//     }
//   }, [router, user_info]);

//   const unprotectedRoute = ['/signin'];

//   const isProtectedRoute = !unprotectedRoute.includes(usePathname());

//   const NavbarLayout = dynamic(() => import('@/components/NavbarLayout'), {
//     ssr: false,
//   });

//   return (
//     <div>
//       {isProtectedRoute && <NavbarLayout>{children}</NavbarLayout>}
//       {!isProtectedRoute && children}
//     </div>
//   );
// };

// export default ProtectedRoute;

"use client";

import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { LoaderCircle } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const {
    state: { user_info },
    authContext: { signIn },
  } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  // List of unprotected routes
  const unprotectedRoutes = ["/signin"];

  // Determine if the route is protected
  const isProtectedRoute = !unprotectedRoutes.includes(pathname);

  // Rehydrate user_info from localStorage before checking authentication
  useEffect(() => {
    const storedUser = localStorage.getItem("user_info");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.access_token) {
          signIn(parsedUser);
        }
      } catch (error) {
        console.error("Error parsing stored user info:", error);
      }
    }
    setIsAuthLoaded(true);
  }, []);

  // Redirect only after auth state is fully loaded
  useEffect(() => {
    if (isAuthLoaded && isProtectedRoute && !user_info.access_token) {
      router.replace("/signin");
    }
  }, [router, user_info, isAuthLoaded, isProtectedRoute]);

  // Dynamically load NavbarLayout to disable SSR
  const NavbarLayout = dynamic(() => import("@/components/NavbarLayout"), {
    ssr: false,
  });

  // Prevent rendering before authentication state is fully loaded
  if (!isAuthLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle color="#039" size={28} />
      </div>
    );
  }

  return (
    <div>
      {isProtectedRoute ? (
        <NavbarLayout>{children}</NavbarLayout>
      ) : (
        <div className="w-full h-full bg-[#F9F9FB]">{children}</div>
      )}
    </div>
  );
};

export default ProtectedRoute;
