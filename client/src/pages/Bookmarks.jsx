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
import { AddBookmarkIcon, AddFolderIcon, FolderIcon, StarIcon } from "../components/icons";

const addBookmarkIcon = <AddBookmarkIcon />;
const addFolderIcon = <AddFolderIcon />;
const folderIcon = <FolderIcon />;
const starIcon = <StarIcon />;

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

const EMPTY_FORM = { url: "", title: "", description: "", folder_id: "", is_pinned: false };

export default function Bookmarks() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const isLoggedIn = !!user;

  const [bookmarks, setBookmarks] = useState([]);
  const [folders, setFolders] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

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
      is_pinned: !!bookmark.is_pinned,
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
      is_pinned: bookmarkForm.is_pinned,
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

  const searchedBookmarks = filteredBookmarks.filter((b) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.trim().toLowerCase();
    return (
      (b.title || "").toLowerCase().includes(q) ||
      (b.url || "").toLowerCase().includes(q) ||
      (b.description || "").toLowerCase().includes(q)
    );
  });

  const visibleBookmarks = [...searchedBookmarks].sort((a, b) => {
    switch (sortBy) {
      case "oldest":
        return new Date(a.created_at || 0) - new Date(b.created_at || 0);
      case "most_viewed":
        return (b.view_count || 0) - (a.view_count || 0);
      case "title":
        return (a.title || a.url).localeCompare(b.title || b.url);
      case "newest":
      default:
        return new Date(b.created_at || 0) - new Date(a.created_at || 0);
    }
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
          className={`flex overflow-x-auto whitespace-nowrap space-x-4 px-4 pt-0 pb-10 transition-all duration-200 ${
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

        {bookmarks.length > 0 && (
          <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-card border border-gray-200 mb-6">
            <input
              type="text"
              placeholder="Search bookmarks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border px-3 py-2 rounded-btn w-full max-w-sm text-sm"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border px-2 py-2 text-sm rounded-btn"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="most_viewed">Most Viewed</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>
        )}

        {visibleBookmarks.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">
              {bookmarks.length === 0
                ? "No bookmarks yet."
                : searchQuery.trim()
                ? "No bookmarks match your search."
                : "No bookmarks in this filter."}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {bookmarks.length === 0
                ? "Save a link to see it here."
                : searchQuery.trim()
                ? "Try a different search term."
                : "Try a different folder or clear the filter."}
            </p>
          </div>
        ) : (
          <BookmarkList
            bookmarks={visibleBookmarks}
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
        <label className="flex items-center gap-2 mt-4 pl-3 text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={bookmarkForm.is_pinned}
            onChange={(e) => setBookmarkForm({ ...bookmarkForm, is_pinned: e.target.checked })}
          />
          Add to Favorites
        </label>
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
