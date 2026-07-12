import React, { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export const useSidebar = () => useContext(SidebarContext);

export function SidebarProvider({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ mobileOpen, setMobileOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}
