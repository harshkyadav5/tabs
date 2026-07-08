import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { ProfileIcon, LogoutIcon } from "./icons";
import useOutsideClick from "../hooks/useOutsideClick";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { showToast } = useToast();

  useOutsideClick(dropdownRef, () => setDropdownOpen(false));

  return (
    <>
      <div className="fixed inset-0 select-none bg-gradient-to-br from-slate-50 to-gray-200 -z-10" />
      <nav className="fixed top-0 left-0 right-0 z-50 select-none bg-white/30 backdrop-blur-md border-b border-gray-300 flex items-center justify-between px-8 h-16">
        <div className="p-2 flex items-center">
          <Link to="/">
            <img
              src="./src/assets/tabs-logo-light-1.svg"
              alt="logo"
              className="max-h-full max-w-[120px] object-contain"
            />
          </Link>
        </div>

        <div className="flex items-center relative" ref={dropdownRef}>
          {user ? (
            <>
              <div className="relative group pr-2">
                <img
                  src={`/profile-pics/${user.profilePicture}`}
                  alt="Profile"
                  className="h-10 w-10 rounded-full border-2 border-gray-400 cursor-pointer"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                />
                
                <div className="absolute left-[-8px] -translate-x-full top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200">
                  <div className="bg-black text-white text-xs rounded px-2 py-1 shadow-lg">
                    {user.username}
                  </div>
                </div>
              </div>

              {dropdownOpen && (
                <div className="absolute top-12 right-0 mt-2 w-40 bg-white p-2 border border-white/20 ring-1 ring-white ring-opacity-5 focus:outline-none rounded-xl shadow-[0_8px_32px_#00000029] z-50 flex flex-col gap-y-1">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/profile");
                    }}
                    className="w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-2">
                      <ProfileIcon />
                      <span className="capitalize">Profile</span>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      logout();
                      showToast("Logged out successfully", "success");
                    }}
                    className="w-full text-left px-4 py-2 text-sm rounded-lg text-red-600 hover:bg-red-100"
                  >
                    <div className="flex items-center space-x-2">
                      <LogoutIcon />
                      <span className="capitalize">Logout</span>
                    </div>
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <Link to="/signin">
                <button className="font-montserrat text-sm font-semibold px-4 py-2 bg-gray-900 text-white border border-black rounded-lg shadow-sm hover:bg-gray-700 transition-colors duration-200">
                  Sign In
                </button>
              </Link>
              <Link to="/signup">
                <button className="ml-2 font-montserrat text-sm font-semibold px-4 py-2 border border-gray-900 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
