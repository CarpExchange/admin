"use client";
import React, { useEffect, useContext } from "react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { withLogoutMutation } from "@/hooks/mutations/LogoutMutation";
import { AuthContext } from "./AuthProvider";
import { useToast } from "@/hooks/use-toast";

const LogoutBtn = ({ mutationResult }: any) => {
  const router = useRouter();
  const { toast } = useToast()

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
      toast({
        description: "Log out successful",
        variant: "success",
      });
      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutationResult, toast]);

  const handleLogout = async () => {
    try {
      await mutationResult.mutateAsync(user_info?.uid);
    } catch (error: any) {
      console.log(error);
      toast({
        description: error?.data?.message || "Error occured during logout",
        variant: "destructive",
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
