import React, { useRef } from "react";
import useOutsideClick from "../hooks/useOutsideClick";

export default function MenuModal({ isOpen, onClose, items, width = "w-60", position = "top-9 right-2" }) {
  const menuRef = useRef();

  useOutsideClick(menuRef, () => onClose?.(), isOpen);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className={`absolute ${position} ${width} bg-white/80 backdrop-blur-lg shadow-dropdown rounded-btn border border-white overflow-hidden z-30`}
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
                ? "text-danger hover:bg-danger-soft"
                : "text-black hover:bg-gray-300/70"
            }`}
          >
            <div className={warning ? "text-danger" : "text-blue-500"}>
              {icon}
            </div>
            <span className="truncate">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
