import React from "react";
import Spinner from "./Spinner";

const VARIANT_CLASSES = {
  primary: "bg-primary text-white hover:bg-primary-hover",
  secondary: "border border-gray-900 text-gray-900 hover:bg-gray-200",
  danger: "bg-danger text-white hover:bg-danger-hover",
  ghost: "text-primary hover:bg-primary-soft",
};

export default function Button({
  variant = "primary",
  loading = false,
  disabled = false,
  className = "",
  children,
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-btn transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed ${VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary} ${className}`}
      {...props}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}
