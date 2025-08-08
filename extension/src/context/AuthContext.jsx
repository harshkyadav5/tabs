import { createContext, useContext, useEffect, useState } from "react";
import useExtensionAuth from "../hooks/useExtensionAuth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user, token } = useExtensionAuth();

  return (
    <AuthContext.Provider value={{ user, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
