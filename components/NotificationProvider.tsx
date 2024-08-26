'use client'
import React, { useReducer, createContext } from "react";

interface INotification {
  state: any;
  dispatch: any;
}

export const NotificationContext = createContext<INotification>({});

export const NotificationProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case "UPDATE_MESSAGE":
          return {
            ...prevState,
            status: action.payload.status,
            message: action.payload.message,
            type: action.payload.type,
          };
      }
    },
    {
      status: false,
      message: "",
      type: "",
    }
  );

  return (
    <NotificationContext.Provider value={{ dispatch, state}}>
      {children}
    </NotificationContext.Provider>
  )
};

export default NotificationProvider;