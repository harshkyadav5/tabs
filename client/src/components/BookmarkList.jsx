import React, { useState } from "react";
import MenuModal from "./MenuModal";
import ConfirmDialog from "./ui/ConfirmDialog";
import { PinIcon, UnpinIcon, EditIcon, ArchiveIcon, TrashIcon, OpenInNewTabIcon, EllipsisHorizontalIcon, EyeIcon, LinkIcon } from "./icons";

const pinIcon = <PinIcon />;
const unpinIcon = <UnpinIcon />;
const editIcon = <EditIcon />;
const archiveIcon = <ArchiveIcon />;
const trashIcon = <TrashIcon />;

export default function BookmarkList({ bookmarks, folders = [], onTogglePin, onEdit, onArchive, onDelete, onOpen }) {
  const [showAll, setShowAll] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const visibleBookmarks = showAll ? bookmarks : bookmarks.slice(0, 10);

  const folderName = (folderId) => folders.find((f) => f.id === folderId)?.name;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {visibleBookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="border-b pb-5 flex items-start space-x-4 transition duration-200 px-2 py-2"
        >
          <img
            src={`https://www.google.com/s2/favicons?sz=64&domain_url=${bookmark.url}`}
            alt=""
            className="w-6 h-6 mt-1 rounded-sm"
          />

          {/* Bookmark Content */}
          <div className="flex-1 min-w-0">
            {/* Title + Open Link Icon + Menu */}
            <div className="flex items-center justify-between mb-1 gap-2">
              <h2 className="pt-1 text-md font-semibold text-gray-900 truncate flex items-center gap-2">
                {bookmark.is_pinned && (
                  <span className="w-2 h-2 rounded-full bg-yellow-400 shrink-0" title="Pinned" />
                )}
                {bookmark.title || bookmark.url}
              </h2>
              <div className="flex items-center gap-1 shrink-0">
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onOpen?.(bookmark)}
                  aria-label="Open bookmark in new tab"
                  className="text-gray-500 hover:text-gray-700 transition flex items-center p-1.5 rounded-full hover:bg-gray-100"
                >
                  <OpenInNewTabIcon />
                </a>

                <div className="relative">
                  <button
                    onClick={() => setOpenMenuId(openMenuId === bookmark.id ? null : bookmark.id)}
                    aria-label="Bookmark options"
                    className="text-gray-400 hover:text-gray-700 rounded-full p-1.5 hover:bg-gray-100"
                  >
                    <EllipsisHorizontalIcon />
                  </button>

                  <MenuModal
                    isOpen={openMenuId === bookmark.id}
                    onClose={() => setOpenMenuId(null)}
                    width="w-40"
                    position="right-0 mt-2"
                    items={[
                      {
                        icon: bookmark.is_pinned ? unpinIcon : pinIcon,
                        label: bookmark.is_pinned ? "Unpin" : "Pin",
                        onClick: () => onTogglePin?.(bookmark),
                      },
                      {
                        icon: editIcon,
                        label: "Edit",
                        onClick: () => onEdit?.(bookmark),
                      },
                      {
                        icon: archiveIcon,
                        label: "Archive",
                        onClick: () => onArchive?.(bookmark),
                      },
                      {
                        icon: trashIcon,
                        label: "Delete",
                        warning: true,
                        onClick: () => setPendingDeleteId(bookmark.id),
                      },
                    ]}
                  />
                </div>
              </div>
            </div>

            {/* Views + URL + Folder */}
            <div className="flex items-center flex-wrap text-xs text-gray-500 gap-x-4 gap-y-1">
              {/* Eye icon */}
              <div className="flex items-center space-x-1">
                <EyeIcon className="w-4 h-4" />
                <span>{bookmark.view_count ?? 0}</span>
              </div>

              {/* Link icon and domain */}
              <div className="flex items-center space-x-1 min-w-0">
                <LinkIcon />
                <a href={bookmark.url} className="hover:underline truncate">
                  {bookmark.url}
                </a>
              </div>

              {folderName(bookmark.folder_id) && (
                <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                  {folderName(bookmark.folder_id)}
                </span>
              )}
            </div>

            {/* Optional Description */}
            {bookmark.description && (
              <p className="text-sm text-gray-600 mt-2">{bookmark.description}</p>
            )}
          </div>
        </div>
      ))}

      {/* View All Toggle */}
      {bookmarks.length > 10 && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="text-sm font-medium text-gray-700 hover:underline"
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        </div>
      )}

      <ConfirmDialog
        open={pendingDeleteId !== null}
        title="Delete this bookmark?"
        message="This can't be undone."
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={() => {
          onDelete?.(pendingDeleteId);
          setPendingDeleteId(null);
        }}
      />
    </div>
  );
}
