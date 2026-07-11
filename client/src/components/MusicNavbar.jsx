import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthControls from "./AuthControls";

const icons = {
  search: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.5 17.5L22 22m-2-11a9 9 0 1 0-18 0a9 9 0 0 0 18 0" color="currentColor"/></svg>
  ),
  home: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m7.088 4.764l-1 .78C4.572 6.73 3.813 7.322 3.407 8.157S3 9.956 3 11.885v2.092c0 3.786 0 5.68 1.172 6.855C5.115 21.78 6.52 21.965 9 22v-3.994c0-.932 0-1.398.152-1.766a2 2 0 0 1 1.083-1.082c.367-.152.833-.152 1.765-.152s1.398 0 1.765.152a2 2 0 0 1 1.083 1.082c.152.368.152.834.152 1.766V22c2.48-.036 3.885-.22 4.828-1.168C21 19.657 21 17.764 21 13.978v-2.092c0-1.93 0-2.894-.407-3.729s-1.165-1.427-2.681-2.611l-1-.781C14.552 2.92 13.372 2 12 2s-2.552.921-4.912 2.764" color="currentColor"/></svg>
  ),
};

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
                {icons['home']}
              </button>
            </Link>
          </div>

          <div className="relative group flex">
            <div className="absolute  inset-0 rounded-full bg-gradient-to-r from-music-accent-soft to-music-accent blur-md opacity-0 group-hover:opacity-30 group-focus-within:opacity-30 transition-opacity duration-1000 z-0 pointer-events-none" />

            <div className="z-20 flex bg-gray-200 p-1 max-w-100 w-100 min-w-80 rounded-panel group-hover:bg-white group-focus-within:bg-white focus-within:ring-2 focus-within:ring-music-accent/40 transition-all duration-500">

              <div className="h-full flex items-center justify-center pl-3 group-hover:text-music-accent group-focus-within:text-music-accent transition-all duration-500">
                  {icons['search']}
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
