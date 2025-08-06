import React, { useState, useRef, useEffect } from "react";
import InfoModal from "../components/InfoModal";

const back = <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth={2} d="M15 6s-6 4.419-6 6s6 6 6 6" color="currentColor"/></svg>;
const ellipsis = <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" strokeWidth={2}><circle cx="12" cy="4" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="20" r="2"/></svg>;
const infoIcon = <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth={2} color="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10s10-4.477 10-10"/><path d="M12.242 17v-5c0-.471 0-.707-.146-.854c-.147-.146-.382-.146-.854-.146m.75-3h.009"/></g></svg>;
const heartIcon = <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth={2} d="M19.463 3.994c-2.682-1.645-5.023-.982-6.429.074c-.576.433-.864.65-1.034.65s-.458-.217-1.034-.65C9.56 3.012 7.219 2.349 4.537 3.994C1.018 6.153.222 13.274 8.34 19.284C9.886 20.427 10.659 21 12 21s2.114-.572 3.66-1.717c8.118-6.008 7.322-13.13 3.803-15.289" color="currentColor"/></svg>;
const downloadIcon = <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth={2} d="m3 14l.234.663c.91 2.578 1.365 3.868 2.403 4.602s2.406.735 5.14.735h2.445c2.735 0 4.102 0 5.14-.735c1.039-.734 1.494-2.024 2.404-4.602L21 14m-9 0V4m0 10c-.7 0-2.008-1.994-2.5-2.5M12 14c.7 0 2.008-1.994 2.5-2.5" color="currentColor"/></svg>;
const trashIcon = <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth={1.5} d="m19.5 5.5l-.62 10.025c-.158 2.561-.237 3.842-.88 4.763a4 4 0 0 1-1.2 1.128c-.957.584-2.24.584-4.806.584c-2.57 0-3.855 0-4.814-.585a4 4 0 0 1-1.2-1.13c-.642-.922-.72-2.205-.874-4.77L4.5 5.5M3 5.5h18m-4.944 0l-.683-1.408c-.453-.936-.68-1.403-1.071-1.695a2 2 0 0 0-.275-.172C13.594 2 13.074 2 12.035 2c-1.066 0-1.599 0-2.04.234a2 2 0 0 0-.278.18c-.395.303-.616.788-1.058 1.757L8.053 5.5m1.447 11v-6m5 6v-6" color="currentColor"/></svg>;

export default function ScreenshotViewer({ image, onBack }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div className="relative w-full h-full font-montserrat tracking-wide">
      
      <div className="flex items-center justify-between px-4 mb-6">
        <div className="flex items-center gap-4 hover:bg-gray-300/70 p-1.5 rounded-full transition-all duration-200">
          <button onClick={onBack} title="Back">
            {back}
          </button>
        </div>

        <div className="text-center text-sm text-gray-600">
          <div className="font-medium text-gray-800">
            {
              new Intl.DateTimeFormat('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
              }).format(new Date(image.created_at))
            }
          </div>
          <div className="text-xs">{image.id} of 5</div>
        </div>

        <div className="flex items-center gap-1 text-gray-800">
          <button className="hover:bg-gray-300/70 p-2 rounded-full transition-all duration-200" title="Info" onClick={() => setShowInfo(true)}>{infoIcon}</button>
          <button className="hover:bg-gray-300/70 p-2 rounded-full transition-all duration-200" title="Favorite">{heartIcon}</button>
          <a href={image.image_url} download title="Download">{downloadIcon}</a>
          <button className="hover:bg-gray-300/70 p-2 rounded-full transition-all duration-200" title="More" onClick={() => setShowMenu(true)}>{ellipsis}</button>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <img
          src={image.image_url}
          alt="Screenshot"
          className="max-h-[80vh] object-contain rounded shadow"
        />
      </div>

      {showInfo && (
        <InfoModal image={image} onClose={() => setShowInfo(false)} />
      )}

      {showMenu && (
        <div
          ref={menuRef}
          className="absolute top-9 right-2 w-60 bg-white shadow-2xl rounded-xl border border-white overflow-hidden z-30"
        >
          <ul className="text-sm p-1">
            {[
              { icon: infoIcon, label: "Info" },
              { icon: heartIcon, label: "Favorite" },
              { icon: downloadIcon, label: "Download" },
            ].map(({ icon, label }, i) => (
              <MenuItem key={i} icon={icon} label={label} />
            ))}
            <MenuItem icon={trashIcon} label="Remove" warning />
          </ul>
        </div>
      )}
    </div>
  );
}

function MenuItem({ icon, label, warning }) {
  return (
    <li
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${
        warning
          ? "text-red-500 hover:bg-red-50"
          : "text-black hover:bg-gray-200"
      }`}
    >
      <div className={`${warning ? "text-red-500" : "text-blue-500"}`}>{icon}</div>
      <span className="truncate">{label}</span>
    </li>
  );
}
