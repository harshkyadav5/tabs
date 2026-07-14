import React, { useState } from "react";
import MenuModal from "./MenuModal";
import ConfirmDialog from "./ui/ConfirmDialog";

const pinIcon = <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" width={24} height={24} fill={"none"}><path d="M3 21L8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M13.2585 18.8714C9.51516 18.0215 5.97844 14.4848 5.12853 10.7415C4.99399 10.1489 4.92672 9.85266 5.12161 9.37197C5.3165 8.89129 5.55457 8.74255 6.03071 8.44509C7.10705 7.77265 8.27254 7.55888 9.48209 7.66586C11.1793 7.81598 12.0279 7.89104 12.4512 7.67048C12.8746 7.44991 13.1622 6.93417 13.7376 5.90269L14.4664 4.59604C14.9465 3.73528 15.1866 3.3049 15.7513 3.10202C16.316 2.89913 16.6558 3.02199 17.3355 3.26771C18.9249 3.84236 20.1576 5.07505 20.7323 6.66449C20.978 7.34417 21.1009 7.68401 20.898 8.2487C20.6951 8.8134 20.2647a 9.05346 19.4039 9.53358L18.0672 10.2792C17.0376 10.8534 16.5229 11.1406 16.3024 11.568C16.0819 11.9955 16.162 12.8256 16.3221 14.4859C16.4399 15.7068 16.2369 16.88 15.5555 17.9697C15.2577 18.4458 15.1088 18.6839 14.6283 18.8786C14.1477 19.0733 13.8513 19.006 13.2585 18.8714Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>;
const unpinIcon = <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" width={24} height={24} fill={"none"}><path d="M7.5 8C6.95863 8.1281 6.49932 8.14239 5.99268 8.45891C5.07234 9.03388 4.85108 9.71674 5.08821 10.7612C5.94028 14.5139 9.48599 18.0596 13.2388 18.9117C14.2834 19.1489 14.9661 18.928 15.5416 18.0077C15.8411 17.5288 15.8716 17.0081 16 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 7.79915C12.1776 7.77794 12.3182 7.74034 12.4295 7.68235C13.3997 7.17686 13.9291 5.53361 14.4498 4.60009C14.9311 3.73715 15.1718 3.30567 15.7379 3.10227C16.3041 2.89888 16.6448 3.02205 17.3262 3.26839C18.9197 3.8445 20.1555 5.08032 20.7316 6.6738C20.9779 7.35521 21.1011 7.69591 20.8977 8.26204C20.6943 8.82817 20.2628 9.06884 19.3999 9.55018C18.4608 10.074 16.7954 10.6108 16.2905 11.5898C16.2345 11.6983 16.1978 11.8327 16.1769 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3 21L8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3 3L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>;
const editIcon = <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="currentColor"><path d="m16.214 4.982l1.402-1.401a1.982 1.982 0 0 1 2.803 2.803l-1.401 1.402m-2.804-2.804l-5.234 5.234c-1.045 1.046-1.568 1.568-1.924 2.205S8.342 14.561 8 16c1.438-.342 2.942-.7 3.579-1.056s1.16-.879 2.205-1.924l5.234-5.234m-2.804-2.804l2.804 2.804"/><path d="M21 12c0 4.243 0 6.364-1.318 7.682S16.242 21 12 21s-6.364 0-7.682-1.318S3 16.242 3 12s0-6.364 1.318-7.682S7.758 3 12 3"/></g></svg>;
const trashIcon = <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m19.5 5.5l-.62 10.025c-.158 2.561-.237 3.842-.88 4.763a4 4 0 0 1-1.2 1.128c-.957.584-2.24.584-4.806.584c-2.57 0-3.855 0-4.814-.585a4 4 0 0 1-1.2-1.13c-.642-.922-.72-2.205-.874-4.77L4.5 5.5M3 5.5h18m-4.944 0l-.683-1.408c-.453-.936-.68-1.403-1.071-1.695a2 2 0 0 0-.275-.172C13.594 2 13.074 2 12.035 2c-1.066 0-1.599 0-2.04.234a2 2 0 0 0-.278.18c-.395.303-.616.788-1.058 1.757L8.053 5.5m1.447 11v-6m5 6v-6" color="currentColor"/></svg>;

export default function BookmarkList({ bookmarks, folders = [], onTogglePin, onEdit, onDelete, onOpen }) {
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
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7m0 0v7m0-7L10 14" />
                  </svg>
                </a>

                <div className="relative">
                  <button
                    onClick={() => setOpenMenuId(openMenuId === bookmark.id ? null : bookmark.id)}
                    aria-label="Bookmark options"
                    className="text-gray-400 hover:text-gray-700 rounded-full p-1.5 hover:bg-gray-100"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="5" cy="12" r="2" />
                      <circle cx="12" cy="12" r="2" />
                      <circle cx="19" cy="12" r="2" />
                    </svg>
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
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="currentColor"><path d="M21.544 11.045c.304.426.456.64.456.955c0 .316-.152.529-.456.955C20.178 14.871 16.689 19 12 19c-4.69 0-8.178-4.13-9.544-6.045C2.152 12.529 2 12.315 2 12c0-.316.152-.529.456-.955C3.822 9.129 7.311 5 12 5c4.69 0 8.178 4.13 9.544 6.045"/><path d="M15 12a3 3 0 1 0-6 0a3 3 0 0 0 6 0"/></g></svg>
                <span>{bookmark.view_count ?? 0}</span>
              </div>

              {/* Link icon and domain */}
              <div className="flex items-center space-x-1 min-w-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m9.5 14.5l5-5m2.346 5.11l2.61-2.61A5.272 5.272 0 1 0 12 4.544l-2.61 2.61m5.22 9.692L12 19.456A5.272 5.272 0 1 1 4.544 12l2.61-2.61" color="currentColor"/></svg>
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
