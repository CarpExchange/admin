'use client';

import React, { useReducer, useMemo, createContext, useEffect } from 'react';


export const AuthContext = createContext<any>({})


export const AuthProvider = ({ children }: any) => {

  const [state, dispatch] = useReducer((prevState: any, action: any) => {
    switch (action.type) {
      case 'RESTORE_TOKEN':
        return {
          ...prevState,
          access_token: action.payload.access_token,
          user_info: action.payload,
        };
      case 'SIGN_IN':
        return {
          ...prevState,
          access_token: action.payload.access_token,
          user_info: action.payload,
        };
      case 'SIGN_OUT':
        return {
          ...prevState,
          access_token: '',
          user_info: {},
        };
    }
  },
    {
      access_token: '',
      user_info: {},
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const user = await localStorage.getItem('user_info');
        if (user) {
          dispatch({ type: 'RESTORE_TOKEN', payload: JSON.parse(user) });
        } else {
          dispatch({ type: 'SIGN_OUT' });
        }
      } catch (e) {
        // Restoring token failed
      }
    }
    bootstrapAsync();
  }, []);
  
  const authContext = useMemo(() => ({
    signIn: async (data: any) => {
      dispatch({ type: 'RESTORE_TOKEN', payload: data });
    },
    signUp: async (data: any) => {
      dispatch({ type: 'SIGN_IN', payload: data });
    },
    signOut: async () => {
      await localStorage.removeItem('user_info');
      dispatch({ type: 'SIGN_OUT' });
    },
  }), [state]);


  return <AuthContext.Provider value={{state, authContext}}>
    {children}
  </AuthContext.Provider>
}

export default AuthProvider

