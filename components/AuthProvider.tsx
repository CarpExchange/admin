"use client";
import {
  useContext,
  createContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user_info, setUserInfo] = useState<any>({});

  const router = useRouter();

  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem("user_info"));
    if (user_info && user_info.access_token) {
      router.replace("/dashboard");
    } else {
      router.replace("/signin");
    }
  }, []);

  // console.log(localStorage.getItem("user_info"))

  const fetchLocalStorage = useCallback(() => {
    const user =   JSON.parse(localStorage.getItem("user_info"));
    if (user && user.access_token) {
      setUserInfo(user);
    }
  }, []);

  useEffect(() => {
    fetchLocalStorage();
  }, [fetchLocalStorage]);

  return (
    <AuthContext.Provider value={{ user_info, setUserInfo }}>{children}</AuthContext.Provider>
  );
};
