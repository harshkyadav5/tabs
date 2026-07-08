import React from "react";

export default function Input({ label, error, id, className = "", ...props }) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block pl-3 text-sm font-medium text-black mb-1">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full px-4 py-3.5 rounded-card tracking-wider border border-gray-300 bg-white text-black outline-none focus:ring-2 focus:ring-primary ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-danger mt-1">{error}</p>}
    </div>
  );
}
