import React, { useState } from "react";
import MenuModal from "./MenuModal";

const ellipsis = <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" width="200" height="200" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="4" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="20" r="2"/></svg>;

const copy = <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500 opacity-0 group-hover/hoverable:opacity-100 transition duration-200" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><path d="M9 15c0-2.828 0-4.243.879-5.121C10.757 9 12.172 9 15 9h1c2.828 0 4.243 0 5.121.879C22 10.757 22 12.172 22 15v1c0 2.828 0 4.243-.879 5.121C20.243 22 18.828 22 16 22h-1c-2.828 0-4.243 0-5.121-.879C9 20.243 9 18.828 9 16z"/><path d="M17 9c-.003-2.957-.047-4.489-.908-5.538a4 4 0 0 0-.554-.554C14.43 2 12.788 2 9.5 2c-3.287 0-4.931 0-6.038.908a4 4 0 0 0-.554.554C2 4.57 2 6.212 2 9.5c0 3.287 0 4.931.908 6.038a4 4 0 0 0 .554.554c1.05.86 2.58.906 5.538.908"/></g></svg>;
const editIcon = <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="currentColor"><path d="m16.214 4.982l1.402-1.401a1.982 1.982 0 0 1 2.803 2.803l-1.401 1.402m-2.804-2.804l-5.234 5.234c-1.045 1.046-1.568 1.568-1.924 2.205S8.342 14.561 8 16c1.438-.342 2.942-.7 3.579-1.056s1.16-.879 2.205-1.924l5.234-5.234m-2.804-2.804l2.804 2.804"/><path d="M21 12c0 4.243 0 6.364-1.318 7.682S16.242 21 12 21s-6.364 0-7.682-1.318S3 16.242 3 12s0-6.364 1.318-7.682S7.758 3 12 3"/></g></svg>;
const archiveIcon = <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="currentColor"><path d="M2 16c0-2.339 0-3.508.536-4.362a3.5 3.5 0 0 1 1.102-1.101C4.492 10 5.66 10 8 10h8c2.339 0 3.508 0 4.362.537a3.5 3.5 0 0 1 1.102 1.1C22 12.493 22 13.662 22 16s0 3.508-.537 4.362a3.5 3.5 0 0 1-1.1 1.102C19.507 22 18.338 22 16 22H8c-2.339 0-3.508 0-4.362-.537a3.5 3.5 0 0 1-1.102-1.1C2 19.507 2 18.338 2 16m18-6c0-1.4 0-2.1-.273-2.635a2.5 2.5 0 0 0-1.092-1.093C18.1 6 17.4 6 16 6H8c-1.4 0-2.1 0-2.635.272a2.5 2.5 0 0 0-1.093 1.093C4 7.9 4 8.6 4 10m14-4c0-1.886 0-2.828-.586-3.414S15.886 2 14 2h-4c-1.886 0-2.828 0-3.414.586S6 4.114 6 6"/><path d="M15 14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2"/></g></svg>;
const trashIcon = <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m19.5 5.5l-.62 10.025c-.158 2.561-.237 3.842-.88 4.763a4 4 0 0 1-1.2 1.128c-.957.584-2.24.584-4.806.584c-2.57 0-3.855 0-4.814-.585a4 4 0 0 1-1.2-1.13c-.642-.922-.72-2.205-.874-4.77L4.5 5.5M3 5.5h18m-4.944 0l-.683-1.408c-.453-.936-.68-1.403-1.071-1.695a2 2 0 0 0-.275-.172C13.594 2 13.074 2 12.035 2c-1.066 0-1.599 0-2.04.234a2 2 0 0 0-.278.18c-.395.303-.616.788-1.058 1.757L8.053 5.5m1.447 11v-6m5 6v-6" color="currentColor"/></svg>;

export default function ColorCard({ color }) {
  const [showMenu, setShowMenu] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="relative group rounded-3xl border border-gray-300/50 bg-white/50 p-4 shadow-sm hover:shadow-[0_4px_22px_#00000029] hover:border-gray-300 transition-all duration-200">
      
      <div
        className="w-full h-24 rounded-2xl mb-4 border border-gray-200/50"
        style={{ backgroundColor: color.hex_code }}
      />

      <div className="flex flex-col gap-1 text-sm text-gray-700">
        {/* HEX */}
        <div className="flex justify-between items-center">
          <span className="font-semibold">Hex</span>
          <div
            onClick={() => copyToClipboard(color.hex_code)}
            className="flex items-center gap-1 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-100 transition group/hoverable"
            title="Copy hex"
          >
            {copy}
            <span className="font-mono">{color.hex_code}</span>
          </div>
        </div>

        {/* RGB */}
        <div className="flex justify-between items-center">
          <span className="font-semibold">RGB</span>
          <div
            onClick={() => copyToClipboard(color.rgb_code)}
            className="flex items-center gap-1 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-100 transition group/hoverable"
            title="Copy RGB"
          >
            {copy}
            <span className="font-mono">{color.rgb_code}</span>
          </div>
        </div>


        {color.label && (
          <span className="mt-2 inline-block text-xs px-2 py-0.5 rounded-full bg-white/90 shadow-sm text-gray-800 w-fit">
            #{color.label}
          </span>
        )}

        <div className="text-xs text-gray-500 mt-2">
          <div>Created: {formatDate(color.created_at)}</div>
          <div>Updated: {formatDate(color.modified_at)}</div>
        </div>
      </div>

      <div className="absolute top-4 right-4 z-20">
        <div
          className={`transition-all duration-100 ${
            showMenu ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            title="Options"
            className="p-1.5 backdrop-blur-lg bg-white/30 shadow-sm hover:bg-white/50 text-slate-500 hover:text-black rounded-full transition duration-200"
          >
            {ellipsis}
          </button>
        </div>

        <MenuModal
          isOpen={showMenu}
          onClose={() => setShowMenu(false)}
          width="w-40"
          position="right-0 mt-2"
          items={[
            {
              icon: editIcon,
              label: "Edit",
              onClick: () => console.log("Edit", color.id),
            },
            {
              icon: archiveIcon,
              label: "Archive",
              onClick: () => console.log("Archive", color.id),
            },
            {
              icon: trashIcon,
              label: "Delete",
              warning: true,
              onClick: () => console.log("Delete", color.id),
            },
          ]}
        />
      </div>
    </div>
  );
}
