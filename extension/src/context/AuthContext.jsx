import { createContext, useContext } from "react";
import useExtensionAuth from "../hooks/useExtensionAuth";
import { logoutFromExtension } from "../utils/extensionAuth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user, token, loading } = useExtensionAuth();

  const logout = () => {
    logoutFromExtension();
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
