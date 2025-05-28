import React from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <>
      <div
        className="
          fixed inset-0
          bg-gradient-to-br
          from-slate-50 to-gray-200
          dark:from-neutral-900 dark:to-slate-800
          -z-10
        "
      ></div>

      <nav
        className="
          fixed top-0 left-0 right-0 z-50
          bg-white/30 dark:bg-black/30
          backdrop-blur-md
          border-b border-gray-300 dark:border-gray-700
          flex items-center justify-between
          px-8 h-16
        "
      >
        <div className="p-2 flex items-center">
          <img
            src="./src/assets/tabs-logo-light-1.svg"
            alt="logo"
            className="max-h-full max-w-[120px] object-contain dark:hidden"
          />
          <img
            src="./src/assets/tabs-logo-dark-1.svg"
            alt="logo"
            className="max-h-full max-w-[120px] object-contain hidden dark:block"
          />
        </div>

        <div className="flex items-center">
          <div className="flex items-center space-x-4">
            <button
              className="
                font-montserrat text-sm font-semibold
                px-4 py-2
                bg-gray-900 text-white
                border border-black dark:border-gray-100
                dark:bg-gray-100 dark:text-black
                rounded-lg shadow-sm
                hover:bg-gray-700 dark:hover:bg-gray-300
                transition-colors duration-200
              "
            >
              Login
            </button>
          </div>

          <button
            className="
              ml-2
              font-montserrat text-sm font-semibold
              px-4 py-2
              border border-gray-900 text-gray-900
              dark:border-gray-100 dark:text-gray-100
              rounded-lg
              hover:bg-gray-200 dark:hover:bg-gray-800
              transition-colors duration-200
            "
          >
            Sign Up
          </button>

          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-3" />

          <ThemeToggle />
        </div>
      </nav>
    </>
  );
}
