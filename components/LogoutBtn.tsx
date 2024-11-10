"use client";
import React, { useEffect, useContext } from "react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { withLogoutMutation } from "@/hooks/mutations/LogoutMutation";
import { NotificationContext } from "./NotificationProvider";
import { AuthContext } from "./AuthProvider";

const LogoutBtn = ({ mutationResult }: any) => {
  const router = useRouter();
  const { dispatch: setNotificationPopUp } = useContext(NotificationContext);

  const {
    state: { user_info },
    authContext: { signOut },
  } = useContext(AuthContext);
  // console.log(user_info?.uid, "user info");

  const handleLogoutTwo = async () => {
    await signOut();
    router.push("/signin");
  };

  useEffect(() => {
    if (!user_info && user_info.access_token) {
      router.push('/signin');
    }
  }, [router, user_info]);

  useEffect(() => {
    if (mutationResult?.data?.status === "success") {
      handleLogoutTwo();
      setNotificationPopUp({
        type: "UPDATE_MESSAGE",
        payload: {
          status: true,
          message: "Log out successful",
          type: "success",
        },
      });
    }
  }, [mutationResult]);

  const handleLogout = async () => {
    try {
      await mutationResult.mutateAsync(user_info?.uid);
    } catch (error: any) {
      console.log(error);
      setNotificationPopUp({
        type: "UPDATE_MESSAGE",
        payload: {
          status: true,
          message: "Error occured during logout",
          type: "error",
        },
      });
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={`w-full 'bg-white' rounded-md p-4 flex items-center space-x-3`}
    >
      <LogOut size={24} color="#000" />
      <p className="text-secondary font-normal">Logout</p>
    </button>
  );
};

export default withLogoutMutation(LogoutBtn);
