import React, { useState, useRef, useEffect } from "react";

export default function Dropdown({ options, selected, onSelect, placeholder = "Select", className = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-all duration-200"
      >
        {selected ? selected.label : placeholder}
      </button>
      {isOpen && (
        <ul className="absolute bottom-12 z-20 p-1 w-full bg-white border border-slate-300 rounded-xl shadow-md max-h-60 overflow-auto">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className="px-4 py-2 rounded-lg hover:bg-slate-200 cursor-pointer"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
