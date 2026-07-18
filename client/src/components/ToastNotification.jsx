import React, { useState, useEffect } from "react";
import { ToastSuccessIcon, ToastWarningIcon, ToastErrorIcon, ToastInfoIcon } from "./icons";

const ToastNotification = ({ message, type, onClose }) => {
  const [exiting, setExiting] = useState(false);

  const getToastStyles = (type) => {
    switch (type) {
      case "success":
        return "bg-green-100/50 backdrop-blur-sm min-w-90 max-w-110 min-h-12 text-green-500";
      case "warning":
        return "bg-yellow-100/50 backdrop-blur-sm min-w-90 max-w-110 min-h-12 text-yellow-500";
      case "error":
        return "bg-red-100/50 backdrop-blur-sm min-w-90 max-w-110 min-h-12 text-red-500";
      default:
        return "bg-white/50 backdrop-blur-sm min-w-90 max-w-110 min-h-12 text-gray-500";
    }
  };

  const getToastIcon = (type) => {
    switch (type) {
      case "success":
        return <ToastSuccessIcon className="text-2xl text-green-500 h-6 w-6" />;
      case "warning":
        return <ToastWarningIcon className="text-2xl text-yellow-500 h-6 w-6" />;
      case "error":
        return <ToastErrorIcon className="text-2xl text-red-500 h-6 w-6" />;
      default:
        return <ToastInfoIcon className="text-2xl text-gray-500 h-6 w-6" />;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => {
        onClose();
      }, 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-lg transition-all duration-500 ease-in-out
      ${getToastStyles(type)} ${exiting ? "animate-toast-out" : "animate-toast-in"} flex items-center space-x-3`}
    >

      <div className="flex-shrink-0">
        {getToastIcon(type)}
      </div>

      <div className="flex-grow text-base">
        {message}
      </div>
    </div>
  );
};

export default ToastNotification;
