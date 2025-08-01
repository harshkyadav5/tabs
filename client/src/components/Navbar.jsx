import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const icons = {
  profile: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.578 15.482c-1.415.842-5.125 2.562-2.865 4.715C4.816 21.248 6.045 22 7.59 22h8.818c1.546 0 2.775-.752 3.878-1.803c2.26-2.153-1.45-3.873-2.865-4.715a10.66 10.66 0 0 0-10.844 0M16.5 6.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0" color="currentColor"/></svg>
  ),
  logout: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m11 3l-.663.234c-2.578.91-3.868 1.365-4.602 2.403S5 8.043 5 10.777v2.445c0 2.735 0 4.102.735 5.14c.734 1.039 2.024 1.494 4.602 2.404L11 21m10-9H11m10 0c0-.7-1.994-2.008-2.5-2.5M21 12c0 .7-1.994 2.008-2.5 2.5" color="currentColor"/></svg>
  ),
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { showToast } = useToast();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="fixed inset-0 select-none bg-gradient-to-br from-slate-50 to-gray-200 dark:from-neutral-900 dark:to-slate-800 -z-10" />
      <nav className="fixed top-0 left-0 right-0 z-50 select-none bg-white/30 dark:bg-black/30 backdrop-blur-md border-b border-gray-300 dark:border-gray-700 flex items-center justify-between px-8 h-16">
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

        <div className="flex items-center relative" ref={dropdownRef}>
          {user ? (
            <>
              <div className="relative group">
                <img
                  src={`/profile-pics/${user.profilePicture}`}
                  alt="Profile"
                  className="h-10 w-10 rounded-full border-2 border-gray-400 dark:border-gray-500 cursor-pointer"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                />
                
                <div className="absolute left-[-8px] -translate-x-full top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200">
                  <div className="bg-black text-white text-xs rounded px-2 py-1 shadow-lg">
                    {user.username}
                  </div>
                </div>
              </div>

              {dropdownOpen && (
                <div className="absolute top-12 right-0 mt-2 w-40 bg-white dark:bg-gray-700 p-2 border border-white/20 dark:border-white/10 ring-1 ring-white dark:ring-black ring-opacity-5 focus:outline-none rounded-xl shadow-xl z-50 flex flex-col gap-y-1">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/profile");
                    }}
                    className="w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <div className="flex items-center space-x-2 dark:text-white">
                      {icons['profile']}
                      <span className="capitalize">Profile</span>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      logout();
                      showToast("Logged out successfully", "success");
                    }}
                    className="w-full text-left px-4 py-2 text-sm rounded-lg text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900"
                  >
                    <div className="flex items-center space-x-2 dark:text-white">
                      {icons['logout']}
                      <span className="capitalize">Logout</span>
                    </div>
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <Link to="/signin">
                <button className="font-montserrat text-sm font-semibold px-4 py-2 bg-gray-900 text-white border border-black dark:border-gray-100 dark:bg-gray-100 dark:text-black rounded-lg shadow-sm hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors duration-200">
                  Sign In
                </button>
              </Link>
              <Link to="/signup">
                <button className="ml-2 font-montserrat text-sm font-semibold px-4 py-2 border border-gray-900 text-gray-900 dark:border-gray-100 dark:text-gray-100 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200">
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
