import React, { useState, useEffect } from "react";

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
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="text-2xl text-green-500 h-6 w-6" width="200" height="200" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10s10-4.477 10-10"/><path d="m8 12.5l2.5 2.5L16 9"/></g></svg>
        );
      case "warning":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="text-2xl text-yellow-500 h-6 w-6" width="200" height="200" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.322 9.683c2.413-4.271 3.62-6.406 5.276-6.956a4.45 4.45 0 0 1 2.804 0c1.656.55 2.863 2.685 5.276 6.956c2.414 4.27 3.62 6.406 3.259 8.146c-.2.958-.69 1.826-1.402 2.48C19.241 21.5 16.827 21.5 12 21.5s-7.241 0-8.535-1.19a4.66 4.66 0 0 1-1.402-2.48c-.362-1.74.845-3.876 3.259-8.147M11.992 16h.009M12 13V9" color="currentColor"/></svg>
        );
      case "error":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="text-2xl text-red-500 h-6 w-6" width="200" height="200" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><path d="M15.5 8.5L12 12m0 0l-3.5 3.5M12 12l3.5 3.5M12 12L8.5 8.5"/><circle cx="12" cy="12" r="10"/></g></svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="text-2xl text-gray-500 h-6 w-6" width="200" height="200" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><circle cx="12" cy="12" r="10"/><path d="M11.992 15h.009M12 12V8"/></g></svg>
        );
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
