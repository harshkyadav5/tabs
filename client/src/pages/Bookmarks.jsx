import React, { useState, useEffect } from "react";
import FolderItem from "../components/FolderItem";
import BookmarkList from "../components/BookmarkList";
import Modal from "../components/ui/Modal";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import {
  getBookmarks,
  createBookmark,
  updateBookmark,
  deleteBookmark,
  incrementViewCount,
  togglePin,
  getBookmarkFolders,
  createBookmarkFolder,
} from "../services/bookmarkService";

const addBookmarkIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24">
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
      d="M11 2C7.229 2 5.343 2 4.172 3.129C3 4.257 3 6.074 3 9.708v8.273c0 2.306 0 3.459.773 3.871
         1.496.8 4.304-1.867 5.637-2.67.773-.465 1.16-.698 1.59-.698s.817.233 1.59.698c1.333.803
         4.14 3.47 5.637 2.67c.773-.412.773-1.565.773-3.871V13m-2-3V2m-4 4h8"/>
  </svg>
);

const addFolderIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24">
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
      d="M18 13.5v8m4-4h-8m-7-11h9.75c2.107 0 3.16 0 3.917.506a3 3 0 0 1
         .827.827c.465.695.502 1.851.505 3.667M12 6.5l-.633-1.267c-.525-1.05-1.005-2.106-2.168-2.542C8.69
         2.5 8.108 2.5 6.944 2.5c-1.816 0-2.724 0-3.406.38A3 3 0 0 0 2.38
         4.038C2 4.72 2 5.628 2 7.444V10.5c0 4.714 0 7.071 1.464 8.535C4.822
         20.394 6.944 20.493 11 20.5"/>
  </svg>
);

const folderIcon = (
  <svg viewBox="0 0 24 24" fill="url(#grad)" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#fde68a" />
      </linearGradient>
    </defs>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M7 7h9.75c2.107 0 3.16 0 3.917.506a3 3 0 0 1
         .827.827C22 9.09 22 10.143 22 12.25c0 3.511 0 5.267-.843 6.528a5 5 0 0 1-1.38
         1.38C18.518 21 16.762 21 13.25 21H12c-4.714 0-7.071 0-8.536-1.465C2
         18.072 2 15.715 2 11V7.944c0-1.816 0-2.724.38-3.406A3 3 0 0 1
         3.538 3.38C4.22 3 5.128 3 6.944 3C8.108 3 8.69 3 9.2 3.191c1.163.436
         1.643 1.493 2.168 2.542L12 7"
      fill="url(#grad)"
    />
  </svg>
);

const starIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24">
    <path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
      d="m13.728 3.444l1.76 3.549c.24.494.88.968 1.42 1.058l3.189.535c2.04.343 2.52 1.835
         1.05 3.307l-2.48 2.5c-.42.423-.65 1.24-.52 1.825l.71 3.095c.56 2.45-.73 3.397-2.88
         2.117l-2.99-1.785c-.54-.322-1.43-.322-1.98 0L8.019 21.43c-2.14 1.28-3.44.322-2.88-2.117l.71-3.095c.13-.585-.1-1.402-.52-1.825l-2.48-2.5C1.39 10.42 1.86 8.929 3.899 8.586l3.19-.535c.53-.09
         1.17-.564 1.41-1.058l1.76-3.549c.96-1.925 2.52-1.925 3.47 0"/>
  </svg>
);

const FAVORITES_FILTER = "favorites";
const LOCAL_BOOKMARKS_KEY = "bookmarks";
const LOCAL_FOLDERS_KEY = "bookmark_folders";

const readLocal = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
};

const EMPTY_FORM = { url: "", title: "", description: "", folder_id: "" };

export default function Bookmarks() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const isLoggedIn = !!user;

  const [bookmarks, setBookmarks] = useState([]);
  const [folders, setFolders] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);

  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const folderScrollRef = React.useRef(null);

  const [showBookmarkModal, setShowBookmarkModal] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState(null);
  const [bookmarkForm, setBookmarkForm] = useState(EMPTY_FORM);
  const [bookmarkFormErrors, setBookmarkFormErrors] = useState({});

  const [showFolderModal, setShowFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const handleScroll = () => {
    const el = folderScrollRef.current;
    if (!el) return;

    const scrollLeft = el.scrollLeft;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;

    setAtStart(scrollLeft <= 1);
    setAtEnd(scrollLeft >= maxScrollLeft - 1);
  };

  useEffect(() => {
    const el = folderScrollRef.current;
    if (!el) return;

    handleScroll();
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (isLoggedIn) {
        try {
          const [bookmarkData, folderData] = await Promise.all([
            getBookmarks({ is_deleted: false, is_archived: false }),
            getBookmarkFolders(),
          ]);
          setBookmarks(bookmarkData || []);
          setFolders(folderData || []);
        } catch (err) {
          showToast(err.message || "Failed to load bookmarks", "error");
        }
      } else {
        const localBookmarks = readLocal(LOCAL_BOOKMARKS_KEY).filter(
          (b) => !b.is_deleted && !b.is_archived
        );
        setBookmarks(localBookmarks);
        setFolders(readLocal(LOCAL_FOLDERS_KEY));
      }
    };
    fetchData();
  }, [isLoggedIn]);

  const openAddModal = () => {
    setEditingBookmark(null);
    setBookmarkForm(EMPTY_FORM);
    setBookmarkFormErrors({});
    setShowBookmarkModal(true);
  };

  const openEditModal = (bookmark) => {
    setEditingBookmark(bookmark);
    setBookmarkForm({
      url: bookmark.url || "",
      title: bookmark.title || "",
      description: bookmark.description || "",
      folder_id: bookmark.folder_id != null ? String(bookmark.folder_id) : "",
    });
    setBookmarkFormErrors({});
    setShowBookmarkModal(true);
  };

  const handleSubmitBookmark = async () => {
    if (!bookmarkForm.url.trim()) {
      setBookmarkFormErrors({ url: "URL is required" });
      return;
    }

    const payload = {
      url: bookmarkForm.url.trim(),
      title: bookmarkForm.title.trim() || null,
      description: bookmarkForm.description.trim() || null,
      folder_id: bookmarkForm.folder_id ? Number(bookmarkForm.folder_id) : null,
    };

    setSubmitting(true);
    try {
      if (isLoggedIn) {
        if (editingBookmark) {
          const updated = await updateBookmark(editingBookmark.id, payload);
          setBookmarks((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
        } else {
          const created = await createBookmark(payload);
          setBookmarks((prev) => [created, ...prev]);
        }
      } else {
        const now = new Date().toISOString();
        const all = readLocal(LOCAL_BOOKMARKS_KEY);
        if (editingBookmark) {
          const updatedAll = all.map((b) =>
            b.id === editingBookmark.id ? { ...b, ...payload, modified_at: now } : b
          );
          localStorage.setItem(LOCAL_BOOKMARKS_KEY, JSON.stringify(updatedAll));
          setBookmarks((prev) =>
            prev.map((b) => (b.id === editingBookmark.id ? { ...b, ...payload, modified_at: now } : b))
          );
        } else {
          const newBookmark = {
            id: Date.now(),
            ...payload,
            view_count: 0,
            is_pinned: false,
            is_archived: false,
            is_deleted: false,
            created_at: now,
            modified_at: now,
          };
          localStorage.setItem(LOCAL_BOOKMARKS_KEY, JSON.stringify([newBookmark, ...all]));
          setBookmarks((prev) => [newBookmark, ...prev]);
        }
      }
      showToast(editingBookmark ? "Bookmark updated" : "Bookmark added", "success");
      setShowBookmarkModal(false);
    } catch (err) {
      showToast(err.message || "Failed to save bookmark", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitFolder = async () => {
    if (!newFolderName.trim()) return;

    setSubmitting(true);
    try {
      if (isLoggedIn) {
        const created = await createBookmarkFolder({ name: newFolderName.trim() });
        setFolders((prev) => [...prev, created]);
      } else {
        const all = readLocal(LOCAL_FOLDERS_KEY);
        const newFolder = { id: Date.now(), name: newFolderName.trim() };
        localStorage.setItem(LOCAL_FOLDERS_KEY, JSON.stringify([...all, newFolder]));
        setFolders((prev) => [...prev, newFolder]);
      }
      showToast("Folder created", "success");
      setNewFolderName("");
      setShowFolderModal(false);
    } catch (err) {
      showToast(err.message || "Failed to create folder", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePin = async (bookmark) => {
    const nextPinned = !bookmark.is_pinned;
    try {
      if (isLoggedIn) {
        const updated = await togglePin(bookmark.id, nextPinned);
        setBookmarks((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
      } else {
        const all = readLocal(LOCAL_BOOKMARKS_KEY);
        const updatedAll = all.map((b) =>
          b.id === bookmark.id ? { ...b, is_pinned: nextPinned } : b
        );
        localStorage.setItem(LOCAL_BOOKMARKS_KEY, JSON.stringify(updatedAll));
        setBookmarks((prev) =>
          prev.map((b) => (b.id === bookmark.id ? { ...b, is_pinned: nextPinned } : b))
        );
      }
    } catch (err) {
      showToast(err.message || "Failed to update bookmark", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      if (isLoggedIn) {
        await deleteBookmark(id);
      } else {
        const all = readLocal(LOCAL_BOOKMARKS_KEY);
        const updatedAll = all.map((b) => (b.id === id ? { ...b, is_deleted: true } : b));
        localStorage.setItem(LOCAL_BOOKMARKS_KEY, JSON.stringify(updatedAll));
      }
      setBookmarks((prev) => prev.filter((b) => b.id !== id));
      showToast("Bookmark deleted", "success");
    } catch (err) {
      showToast(err.message || "Failed to delete bookmark", "error");
    }
  };

  const handleOpenBookmark = (bookmark) => {
    if (isLoggedIn) {
      incrementViewCount(bookmark.id)
        .then((updated) => {
          setBookmarks((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
        })
        .catch(() => {});
    } else {
      const all = readLocal(LOCAL_BOOKMARKS_KEY);
      const updatedAll = all.map((b) =>
        b.id === bookmark.id ? { ...b, view_count: (b.view_count || 0) + 1 } : b
      );
      localStorage.setItem(LOCAL_BOOKMARKS_KEY, JSON.stringify(updatedAll));
      setBookmarks((prev) =>
        prev.map((b) => (b.id === bookmark.id ? { ...b, view_count: (b.view_count || 0) + 1 } : b))
      );
    }
  };

  const toggleFilter = (value) => {
    setActiveFilter((prev) => (prev === value ? null : value));
  };

  const filteredBookmarks = bookmarks.filter((b) => {
    if (activeFilter === FAVORITES_FILTER) return b.is_pinned;
    if (activeFilter != null) return b.folder_id === activeFilter;
    return true;
  });

  return (
    <aside className="w-full font-montserrat">

      {/* Top bar with buttons */}
      <div className="w-full rounded-panel mb-8">
        <div className="px-4 w-full flex justify-end">
          <div className="flex items-center border border-gray-400 bg-white/70 rounded-full p-3">
            <button
              onClick={openAddModal}
              aria-label="Add bookmark"
              className="p-2 hover:bg-black/85 text-gray-800 hover:text-white rounded-full transition duration-200"
            >
              {addBookmarkIcon}
            </button>
            <div className="h-6 w-px bg-gray-300 mx-2" />
            <button
              onClick={() => {
                setNewFolderName("");
                setShowFolderModal(true);
              }}
              aria-label="Add folder"
              className="p-2 hover:bg-black/85 text-gray-800 hover:text-white rounded-full transition duration-200"
            >
              {addFolderIcon}
            </button>
          </div>
        </div>
      </div>

      {/* Folders Section */}
      <div className="w-full rounded-panel mb-8 p-4 bg-white shadow-card">
        <div className="pb-4 flex justify-end">
          <button
            onClick={() => setActiveFilter(null)}
            className="px-4 py-2 text-sm font-medium rounded-full text-gray-800 hover:bg-black/85 hover:text-white transition duration-200"
          >
            View All
          </button>
        </div>

        <div
          ref={folderScrollRef}
          className={`flex overflow-x-auto whitespace-nowrap space-x-4 p-4 pt-0 transition-all duration-200 ${
            !atStart && !atEnd
              ? "mask-to-l-r"
              : !atStart
              ? "mask-to-r"
              : !atEnd
              ? "mask-to-l"
              : ""
          }`}
        >

          {/* Favorite Folder */}
          <FolderItem
            icon={folderIcon}
            overlay={starIcon}
            label="Favorite"
            tooltip="Pinned bookmarks"
            active={activeFilter === FAVORITES_FILTER}
            onClick={() => toggleFilter(FAVORITES_FILTER)}
          />

          {/* Real Folders */}
          {folders.map((folder) => (
            <FolderItem
              key={folder.id}
              icon={folderIcon}
              overlay={folder.name.charAt(0).toUpperCase()}
              label={folder.name}
              tooltip={folder.name}
              active={activeFilter === folder.id}
              onClick={() => toggleFilter(folder.id)}
            />
          ))}

        </div>
      </div>

      <div className="p-4">
        <h1 className="text-lg font-bold mb-4">Bookmarks</h1>
        {filteredBookmarks.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">
              {bookmarks.length === 0 ? "No bookmarks yet." : "No bookmarks in this filter."}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {bookmarks.length === 0
                ? "Save a link to see it here."
                : "Try a different folder or clear the filter."}
            </p>
          </div>
        ) : (
          <BookmarkList
            bookmarks={filteredBookmarks}
            folders={folders}
            onTogglePin={handleTogglePin}
            onEdit={openEditModal}
            onDelete={handleDelete}
            onOpen={handleOpenBookmark}
          />
        )}
      </div>

      {/* Add / Edit Bookmark Modal */}
      <Modal
        open={showBookmarkModal}
        onClose={() => setShowBookmarkModal(false)}
        title={editingBookmark ? "Edit Bookmark" : "Add Bookmark"}
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowBookmarkModal(false)}>
              Cancel
            </Button>
            <Button loading={submitting} onClick={handleSubmitBookmark}>
              {editingBookmark ? "Save Changes" : "Add Bookmark"}
            </Button>
          </>
        }
      >
        <Input
          label="URL"
          type="url"
          placeholder="https://example.com"
          value={bookmarkForm.url}
          onChange={(e) => setBookmarkForm({ ...bookmarkForm, url: e.target.value })}
          error={bookmarkFormErrors.url}
        />
        <Input
          label="Title"
          type="text"
          placeholder="Optional title"
          value={bookmarkForm.title}
          onChange={(e) => setBookmarkForm({ ...bookmarkForm, title: e.target.value })}
        />
        <div className="mb-4">
          <label htmlFor="bookmark-description" className="block pl-3 text-sm font-medium text-black mb-1">
            Description
          </label>
          <textarea
            id="bookmark-description"
            rows={3}
            placeholder="Optional description"
            value={bookmarkForm.description}
            onChange={(e) => setBookmarkForm({ ...bookmarkForm, description: e.target.value })}
            className="w-full px-4 py-3 rounded-card tracking-wider border border-gray-300 bg-white text-black outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>
        <div className="mb-1">
          <label htmlFor="bookmark-folder" className="block pl-3 text-sm font-medium text-black mb-1">
            Folder
          </label>
          <select
            id="bookmark-folder"
            value={bookmarkForm.folder_id}
            onChange={(e) => setBookmarkForm({ ...bookmarkForm, folder_id: e.target.value })}
            className="w-full px-4 py-3 rounded-card tracking-wider border border-gray-300 bg-white text-black outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">No folder</option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>
      </Modal>

      {/* Add Folder Modal */}
      <Modal
        open={showFolderModal}
        onClose={() => setShowFolderModal(false)}
        title="Create Folder"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowFolderModal(false)}>
              Cancel
            </Button>
            <Button loading={submitting} onClick={handleSubmitFolder}>
              Create
            </Button>
          </>
        }
      >
        <Input
          label="Folder name"
          type="text"
          placeholder="Enter folder name"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
      </Modal>
    </aside>
  );
}
