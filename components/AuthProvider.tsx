"use client";
import {
  useContext,
  createContext,
  useState,
  useCallback,
  useEffect,
} from "react";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user_info, setUserInfo] = useState<any>({});

  const fetchLocalStorage = useCallback(() => {
    const user = JSON.parse(localStorage.getItem("user_info"));
    // console.log(user);
    if (user && user.access_token) {
      setUserInfo(user);
    }
  }, []);

  useEffect(() => {
    fetchLocalStorage();
  }, [fetchLocalStorage]);

  return (
    <AuthContext.Provider value={{ user_info }}>{children}</AuthContext.Provider>
  );
};
