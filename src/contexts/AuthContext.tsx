import React, { createContext, useContext, useState, ReactNode } from "react";


interface AuthContextType {
    isLoggin : boolean
    setLoginState: (state : boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggin, setisLoggin] = useState(false);


  const setLoginState = (state : boolean) => {
    setisLoggin(state);
  }
  

  return (
    <AuthContext.Provider value={{isLoggin, setLoginState}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};
