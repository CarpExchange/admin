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
  // localStorage.removeItem("user_info");
  // router.push("/signin");

  const { user_info, setUserInfo } = useContext(AuthContext);
  // console.log(user_info?.uid, "user info");

  useEffect(() => {
    if (mutationResult.data) {
      const { data } = mutationResult;
      if (data.status === 200 || data.status === 201 || data.status === 202) {
        router.replace("/signin");
        setNotificationPopUp({
          type: "UPDATE_MESSAGE",
          payload: {
            status: true,
            message: "Log out successful",
            type: "success",
          },
        });
      }
    }
  }, [mutationResult, router]);

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
