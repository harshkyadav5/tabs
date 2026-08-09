import { createContext, useContext, useEffect, useState } from "react";
import { notifyExtensionLogin, notifyExtensionLogout, listenForExtensionAuthSync } from "../utils/extensionBridge";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
    setToken(token);
    notifyExtensionLogin(userData, token);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    notifyExtensionLogout();
  };

  useEffect(() => {
    return listenForExtensionAuthSync(({ user: syncedUser, token: syncedToken }) => {
      if (syncedUser === null && syncedToken === null) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
      } else if (syncedUser && syncedToken) {
        localStorage.setItem("user", JSON.stringify(syncedUser));
        localStorage.setItem("token", syncedToken);
        setUser(syncedUser);
        setToken(syncedToken);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
