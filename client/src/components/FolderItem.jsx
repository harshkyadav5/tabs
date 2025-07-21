import React from "react";

export default function FolderItem({ icon, overlay, label, tooltip, onClick }) {
  return (
    <div
      className="shrink-0 w-28 h-28 flex flex-col items-center justify-center rounded-3xl text-sm font-semibold text-gray-800 duration-300 relative group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative w-24 h-24 mb-1">
        <div className="w-full h-full relative backdrop-blur-sm flex items-center justify-center text-2xl font-bold drop-shadow-sm">
          {icon}
        </div>
        <span className="absolute pt-2 inset-0 flex items-center justify-center text-yellow-600/90 text-3xl font-bold pointer-events-none drop-shadow-sm">
          {overlay}
        </span>
      </div>
      <span className="text-[13px] tracking-wide truncate">{label}</span>
      <div className="absolute bottom-0 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-400">
        {tooltip}
      </div>
    </div>
  );
}
