import React, { useEffect } from "react";

const ToastNotification = ({ message, type, onClose }) => {
  const getToastStyles = (type) => {
    switch (type) {
      case "success":
        return "bg-gradient-to-r from-green-400 via-teal-500 to-blue-600 bg-opacity-80 text-white";
      case "warning":
        return "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 bg-opacity-80 text-black";
      case "error":
        return "bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 bg-opacity-80 text-white";
      default:
        return "bg-white/40 backdrop-blur-sm w-70 h-12 text-white";
    }
  };

  const getToastIcon = (type) => {
    switch (type) {
      case "success":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-2xl text-green-500"
          >
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12H3" />
          </svg>
        );
      case "warning":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-2xl text-yellow-500"
          >
            <path d="M12 9v4m0 4h.01M2 12l10-9 10 9-10 9L2 12z" />
          </svg>
        );
      case "error":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-2xl text-red-500"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12" y2="16" />
          </svg>
        );
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-2xl text-gray-500"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12" y2="16" />
          </svg>
        );
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-lg transition-all duration-500 ease-in-out
      ${getToastStyles(type)} animate-toast-in flex items-center space-x-3`}
    >

      <div className="flex-shrink-0">
        {getToastIcon(type)}
      </div>

      <div className="flex-grow text-sm">
        {/* {message} */}
        Demo messagex
      </div>
    </div>
  );
};

export default ToastNotification;
