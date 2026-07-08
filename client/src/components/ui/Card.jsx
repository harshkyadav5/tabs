import React from "react";

export default function Card({ children, className = "", hoverable = true, ...props }) {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-card p-5 shadow-card ${hoverable ? "hover:shadow-card-hover transition" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
