import React from "react";
import { Link, useLocation } from "react-router-dom";
import AuthControls from "./AuthControls";
import { useSidebar } from "../context/SidebarContext";

const menuIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export default function Navbar() {
  const location = useLocation();
  const { setMobileOpen } = useSidebar();
  const hasSidebar = location.pathname !== "/profile";

  return (
    <>
      <div className="fixed inset-0 select-none bg-gradient-to-br from-slate-50 to-gray-200 -z-10" />
      <nav aria-label="Main" className="fixed top-0 left-0 right-0 z-50 select-none bg-white/30 backdrop-blur-md border-b border-gray-300 flex items-center justify-between px-4 md:px-8 h-16">
        <div className="flex items-center gap-2">
          {hasSidebar && (
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="md:hidden p-2 -ml-2 text-gray-700 hover:bg-gray-200/60 rounded-full transition"
            >
              {menuIcon}
            </button>
          )}
          <div className="p-2 flex items-center">
            <Link to="/">
              <img
                src="./src/assets/tabs-logo-light-1.svg"
                alt="logo"
                className="max-h-full max-w-[120px] object-contain"
              />
            </Link>
          </div>
        </div>

        <AuthControls />
      </nav>
    </>
  );
}
