import React, { useState } from "react";
import MenuModal from "./MenuModal";
import ConfirmDialog from "./ui/ConfirmDialog";
import { EllipsisVerticalIcon, CopyIcon, EditIcon, ArchiveIcon, TrashIcon } from "./icons";

const ellipsis = <EllipsisVerticalIcon className="w-4 h-4" />;
const copy = <CopyIcon className="w-4 h-4 text-gray-500 opacity-0 group-hover/hoverable:opacity-100 transition duration-200" />;
const editIcon = <EditIcon />;
const archiveIcon = <ArchiveIcon />;
const trashIcon = <TrashIcon />;

export default function ColorCard({ color, onDelete, onSaveLabel, onArchive }) {
  const [showMenu, setShowMenu] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(color.label || "");

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="relative group rounded-card border border-gray-300/50 bg-white/50 p-4 shadow-card hover:shadow-card-hover hover:border-gray-300 transition-all duration-200">

      <div
        className="w-full h-24 rounded-card mb-4 border border-gray-200/50"
        style={{ backgroundColor: color.hex_code }}
      />

      <div className="flex flex-col gap-1 text-sm text-gray-700">
        {/* HEX */}
        <div className="flex justify-between items-center">
          <span className="font-semibold">Hex</span>
          <div
            onClick={() => copyToClipboard(color.hex_code)}
            className="flex items-center gap-1 px-2 py-1 rounded-btn cursor-pointer hover:bg-gray-100 transition group/hoverable"
            title="Copy hex"
          >
            {copy}
            <span className="font-mono">{color.hex_code}</span>
          </div>
        </div>

        {/* RGB */}
        <div className="flex justify-between items-center">
          <span className="font-semibold">RGB</span>
          <div
            onClick={() => copyToClipboard(color.rgb_code)}
            className="flex items-center gap-1 px-2 py-1 rounded-btn cursor-pointer hover:bg-gray-100 transition group/hoverable"
            title="Copy RGB"
          >
            {copy}
            <span className="font-mono">{color.rgb_code}</span>
          </div>
        </div>

        {editing ? (
          <div className="mt-2 flex items-center gap-2">
            <input
              autoFocus
              value={editedLabel}
              onChange={(e) => setEditedLabel(e.target.value)}
              placeholder="Label"
              className="min-w-0 flex-1 text-xs px-2 py-1 rounded-btn border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={() => {
                onSaveLabel?.(color.id, editedLabel.trim());
                setEditing(false);
              }}
              className="text-xs font-medium text-primary hover:underline"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="text-xs text-gray-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        ) : (
          color.label && (
            <span className="mt-2 inline-block text-xs px-2 py-0.5 rounded-full bg-white/90 shadow-sm text-gray-800 w-fit">
              #{color.label}
            </span>
          )
        )}

        <div className="text-xs text-gray-500 mt-2">
          <div>Created: {formatDate(color.created_at)}</div>
          <div>Updated: {formatDate(color.modified_at)}</div>
        </div>
      </div>

      <div className="absolute top-4 right-4 z-20">
        <div
          className={`transition-all duration-100 ${
            showMenu ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            title="Options"
            aria-label="Color options"
            className="p-1.5 backdrop-blur-lg bg-white/30 shadow-sm hover:bg-white/50 text-slate-500 hover:text-black rounded-full transition duration-200"
          >
            {ellipsis}
          </button>
        </div>

        <MenuModal
          isOpen={showMenu}
          onClose={() => setShowMenu(false)}
          width="w-40"
          position="right-0 mt-2"
          items={[
            {
              icon: editIcon,
              label: "Edit",
              onClick: () => {
                setEditedLabel(color.label || "");
                setEditing(true);
              },
            },
            {
              icon: archiveIcon,
              label: "Archive",
              onClick: () => onArchive?.(color.id),
            },
            {
              icon: trashIcon,
              label: "Delete",
              warning: true,
              onClick: () => setConfirmOpen(true),
            },
          ]}
        />
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete this color?"
        message="This can't be undone."
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          onDelete?.(color.id);
          setConfirmOpen(false);
        }}
      />
    </div>
  );
}
