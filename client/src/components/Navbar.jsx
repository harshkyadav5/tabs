import React from "react";
import { Link } from "react-router-dom";
import AuthControls from "./AuthControls";

export default function Navbar() {
  return (
    <>
      <div className="fixed inset-0 select-none bg-gradient-to-br from-slate-50 to-gray-200 -z-10" />
      <nav aria-label="Main" className="fixed top-0 left-0 right-0 z-50 select-none bg-white/30 backdrop-blur-md border-b border-gray-300 flex items-center justify-between px-8 h-16">
        <div className="p-2 flex items-center">
          <Link to="/">
            <img
              src="./src/assets/tabs-logo-light-1.svg"
              alt="logo"
              className="max-h-full max-w-[120px] object-contain"
            />
          </Link>
        </div>

        <AuthControls />
      </nav>
    </>
  );
}
