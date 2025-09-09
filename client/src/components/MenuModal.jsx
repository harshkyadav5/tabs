import React, { useEffect, useRef } from "react";

export default function MenuModal({ isOpen, onClose, items, width = "w-60", position = "top-9 right-2" }) {
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose?.();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className={`absolute ${position} ${width} bg-white shadow-2xl rounded-xl border border-white overflow-hidden z-30`}
    >
      <ul className="text-sm p-1">
        {items.map(({ icon, label, warning, onClick }, i) => (
          <li
            key={i}
            onClick={() => {
              onClick?.();
              onClose?.();
            }}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition ${
              warning
                ? "text-red-500 hover:bg-red-50"
                : "text-black hover:bg-gray-200"
            }`}
          >
            <div className={warning ? "text-red-500" : "text-blue-500"}>
              {icon}
            </div>
            <span className="truncate">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
