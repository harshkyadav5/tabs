import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <>
      <div
        className="
          fixed inset-0 select-none
          bg-gradient-to-br
          from-slate-50 to-gray-200
          dark:from-neutral-900 dark:to-slate-800
          -z-10
        "
      ></div>

      <nav
        className="
          fixed top-0 left-0 right-0 z-50 select-none
          bg-white/30 dark:bg-black/30
          backdrop-blur-md
          border-b border-gray-300 dark:border-gray-700
          flex items-center justify-between
          px-8 h-16
        "
      >
        <div className="p-2 flex items-center">
          <Link to="/">
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
          </Link>
        </div>

        <div className="flex items-center">
          {user ? (
            <>
              <span className="text-sm mr-2 font-medium text-gray-700 dark:text-gray-200">
                {user.username}
              </span>
              <button
                onClick={logout}
                className="
                  font-montserrat text-sm font-semibold
                  px-4 py-2
                  bg-red-600 text-white
                  rounded-lg shadow-sm
                  hover:bg-red-700
                  transition-colors duration-200
                "
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin">
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
                  Sign In
                </button>
              </Link>
              <Link to="/signup">
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
              </Link>
            </>
          )}

          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-3" />

          <ThemeToggle />
        </div>
      </nav>
    </>
  );
}
