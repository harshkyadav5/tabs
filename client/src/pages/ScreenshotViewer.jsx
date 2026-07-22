import React, { useState, useRef } from "react";
import InfoModal from "../components/InfoModal";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import useOutsideClick from "../hooks/useOutsideClick";
import { BackIcon, EllipsisVerticalIcon, InfoIcon, HeartIcon, DownloadIcon, TrashIcon } from "../components/icons";

const back = <BackIcon />;
const ellipsis = <EllipsisVerticalIcon className="w-5 h-5" />;
const infoIcon = <InfoIcon />;
const downloadIcon = <DownloadIcon />;
const trashIcon = <TrashIcon />;

export default function ScreenshotViewer({ image, index, total, onBack, onToggleFavorite, onDelete }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const menuRef = useRef();

  useOutsideClick(menuRef, () => setShowMenu(false), showMenu);

  const heartIcon = <HeartIcon className={image.is_favorite ? "text-red-500" : undefined} />;

  return (
    <div className="relative w-full h-full font-montserrat tracking-wide">

      <div className="flex items-center justify-between px-4 mb-6">
        <div className="flex items-center gap-4 hover:bg-gray-300/70 p-1.5 rounded-full transition-all duration-200">
          <button onClick={onBack} title="Back" aria-label="Back">
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
          <div className="text-xs">{index} of {total}</div>
        </div>

        <div className="flex items-center gap-1 text-gray-800">
          <button className="hover:bg-gray-300/70 p-2 rounded-full transition-all duration-200" title="Info" aria-label="Info" onClick={() => setShowInfo(true)}>{infoIcon}</button>
          <button
            className="hover:bg-gray-300/70 p-2 rounded-full transition-all duration-200"
            title="Favorite"
            aria-label="Favorite"
            onClick={onToggleFavorite}
          >
            {heartIcon}
          </button>
          <a href={image.image_url} download title="Download" aria-label="Download">{downloadIcon}</a>
          <button className="hover:bg-gray-300/70 p-2 rounded-full transition-all duration-200" title="More" aria-label="More options" onClick={() => setShowMenu(true)}>{ellipsis}</button>
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
          className="absolute top-9 right-2 w-60 bg-white shadow-dropdown rounded-btn border border-white overflow-hidden z-30"
        >
          <ul className="text-sm p-1">
            <MenuItem icon={infoIcon} label="Info" onClick={() => { setShowInfo(true); setShowMenu(false); }} />
            <MenuItem
              icon={heartIcon}
              label={image.is_favorite ? "Unfavorite" : "Favorite"}
              onClick={() => { onToggleFavorite?.(); setShowMenu(false); }}
            />
            <a href={image.image_url} download onClick={() => setShowMenu(false)}>
              <MenuItem icon={downloadIcon} label="Download" />
            </a>
            <MenuItem
              icon={trashIcon}
              label="Remove"
              warning
              onClick={() => { setConfirmOpen(true); setShowMenu(false); }}
            />
          </ul>
        </div>
      )}

      <ConfirmDialog
        open={confirmOpen}
        title="Remove this screenshot?"
        message="It will be moved to the Recycle Bin."
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          onDelete?.();
          setConfirmOpen(false);
        }}
      />
    </div>
  );
}

function MenuItem({ icon, label, warning, onClick }) {
  return (
    <li
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${
        warning
          ? "text-danger hover:bg-danger-soft"
          : "text-black hover:bg-gray-200"
      }`}
    >
      <div className={`${warning ? "text-danger" : "text-blue-500"}`}>{icon}</div>
      <span className="truncate">{label}</span>
    </li>
  );
}
