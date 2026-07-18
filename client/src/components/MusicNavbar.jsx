import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthControls from "./AuthControls";
import { MusicNavSearchIcon, MusicNavHomeIcon } from "./icons";

export default function MusicNavbar() {
  const navigate = useNavigate();
  const [localSearchQuery, setLocalSearchQuery] = useState("");

  useEffect(() => {
    if (!localSearchQuery) {
      navigate('/music');
      return;
    }

    const delaySearch = setTimeout(() => {
      navigate(`/music/search/${encodeURIComponent(localSearchQuery)}`);
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [localSearchQuery, navigate]);

  return (
    <>
      <nav aria-label="Music" className="fixed top-0 left-0 right-0 z-50 select-none border-gray-300 flex items-center justify-between px-8 h-16">
        <div className="p-2 flex items-center">
          <Link to="/">
            <img
              src="./src/assets/tabs-logo-light-1.svg"
              alt="logo"
              className="max-h-full max-w-[120px] object-contain"
            />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-1 flex justify-center px-4">
          <div className="flex justify-center items-center mr-2">
            <Link to="/music">
              <button
                aria-label="Go to home"
                className="p-3 bg-gray-200 border border-gray-200 hover:border-white hover:text-music-accent rounded-full hover:shadow-lg hover:bg-white hover:scale-105 transition-all duration-400"
              >
                <MusicNavHomeIcon />
              </button>
            </Link>
          </div>

          <div className="relative group flex">
            <div className="absolute  inset-0 rounded-full bg-gradient-to-r from-music-accent-soft to-music-accent blur-md opacity-0 group-hover:opacity-30 group-focus-within:opacity-30 transition-opacity duration-1000 z-0 pointer-events-none" />

            <div className="z-20 flex bg-gray-200 p-1 w-full min-w-0 sm:min-w-80 sm:w-100 max-w-100 rounded-panel group-hover:bg-white group-focus-within:bg-white focus-within:ring-2 focus-within:ring-music-accent/40 transition-all duration-500">

              <div className="h-full flex items-center justify-center pl-3 group-hover:text-music-accent group-focus-within:text-music-accent transition-all duration-500">
                  <MusicNavSearchIcon />
              </div>
              <input
                type="text"
                aria-label="Search songs, artists, playlists"
                placeholder="Search songs, artists, playlists..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                className="w-full max-w-md px-5 py-2 font-medium rounded-full text-gray-700 tracking-wider placeholder-gray-400 focus:outline-none border-transparent p-3 group-hover:text-music-accent group-focus-within:text-music-accent transition-all duration-500"
              />
            </div>
          </div>
        </div>

        <AuthControls className="flex justify-end items-center relative" />
      </nav>
    </>
  );
}
