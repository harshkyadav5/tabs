import React, { useState, useRef, useEffect } from "react";

const ellipsis = <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" width="200" height="200" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="4" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="20" r="2"/></svg>;

const copy = <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500 opacity-0 group-hover/hoverable:opacity-100 transition duration-200" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><path d="M9 15c0-2.828 0-4.243.879-5.121C10.757 9 12.172 9 15 9h1c2.828 0 4.243 0 5.121.879C22 10.757 22 12.172 22 15v1c0 2.828 0 4.243-.879 5.121C20.243 22 18.828 22 16 22h-1c-2.828 0-4.243 0-5.121-.879C9 20.243 9 18.828 9 16z"/><path d="M17 9c-.003-2.957-.047-4.489-.908-5.538a4 4 0 0 0-.554-.554C14.43 2 12.788 2 9.5 2c-3.287 0-4.931 0-6.038.908a4 4 0 0 0-.554.554C2 4.57 2 6.212 2 9.5c0 3.287 0 4.931.908 6.038a4 4 0 0 0 .554.554c1.05.86 2.58.906 5.538.908"/></g></svg>;

export default function ColorCard({ color }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="relative group rounded-3xl border border-gray-300/50 bg-white/50 p-4 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200">
      
      <div
        className="w-full h-24 rounded-2xl mb-4 border border-gray-200/50"
        style={{ backgroundColor: color.hex_code }}
      ></div>

      
      <div className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-200">
        {/* HEX */}
        <div className="flex justify-between items-center">
          <span className="font-semibold">Hex</span>
          <div
            onClick={() => copyToClipboard(color.hex_code)}
            className="flex items-center gap-1 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition group/hoverable"
            title="Copy hex"
          >
            { copy }
            <span className="font-mono">{color.hex_code}</span>
          </div>
        </div>
        
        {/* RGB */}
        <div className="flex justify-between items-center">
          <span className="font-semibold">RGB</span>
          <div
            onClick={() => copyToClipboard(color.rgb_code)}
            className="flex items-center gap-1 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition group/hoverable"
            title="Copy RGB"
          >
            { copy }
            <span className="font-mono">{color.rgb_code}</span>
          </div>
        </div>

        {color.label && (
          <span className="mt-2 inline-block text-xs px-2 py-0.5 rounded-full bg-white/90 shadow-sm text-gray-800 w-fit">
            #{color.label}
          </span>
        )}

        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          <div>Created: {formatDate(color.created_at)}</div>
          <div>Updated: {formatDate(color.modified_at)}</div>
        </div>
      </div>

      <div
        className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-100"
        ref={menuRef}
      >
        <button
          onClick={() => setShowMenu((prev) => !prev)}
          title="Options"
          className="p-1.5 backdrop-blur-lg bg-white/30 shadow-sm hover:bg-white/50 text-slate-500 hover:text-black rounded-full transition duration-200"
        >
          { ellipsis }
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 w-36 bg-white border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-md z-30 text-sm overflow-hidden">
            <button className="w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 text-left">
              Edit
            </button>
            <button className="w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 text-left">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
