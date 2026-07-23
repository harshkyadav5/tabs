import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useArchiveTrash } from "../context/ArchiveTrashContext";
import axiosInstance from "../utils/axiosInstance";
import { archiveItem } from "../services/archiveService";
import MenuModal from "../components/MenuModal";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import { PinIcon, UnpinIcon, CopyIcon, EditIcon, ArchiveIcon, TrashIcon, EllipsisHorizontalIcon } from "../components/icons";

const pinIcon = <PinIcon />;
const unpinIcon = <UnpinIcon />;
const copyIcon = <CopyIcon />;
const editIcon = <EditIcon />;
const archiveIcon = <ArchiveIcon />;
const trashIcon = <TrashIcon />;

export default function Clipboard() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { refreshArchive } = useArchiveTrash();
  const isLoggedIn = !!user;

  const [clipboardItems, setClipboardItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedDescription, setEditedDescription] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [columns, setColumns] = useState([]);
  const [showMenuId, setShowMenuId] = useState(null);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const containerRef = useRef(null);

  const LOCAL_KEY = "tabs_clipboard";

  const readLocal = () => {
    try {
      return JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];
    } catch {
      return [];
    }
  };

  const fetchClipboardItems = async () => {
    if (isLoggedIn) {
      try {
        const res = await axiosInstance.get("/clipboard", {
          params: { is_deleted: false, is_archived: false },
        });
        setClipboardItems(res.data || []);
      } catch {
        showToast("Failed to fetch clipboard", "error");
      }
    } else {
      setClipboardItems(readLocal().filter((i) => !i.is_deleted && !i.is_archived));
    }
  };

  const saveClipboardItem = async (item) => {
    if (isLoggedIn) {
      try {
        await axiosInstance.put(`/clipboard/${item.id}`, {
          description: item.description,
          content: item.content,
          is_pinned: item.is_pinned,
        });
      } catch {
        showToast("Failed to save", "error");
      }
    } else {
      const all = readLocal().map((i) => (i.id === item.id ? item : i));
      localStorage.setItem(LOCAL_KEY, JSON.stringify(all));
    }
  };

  const distributeItems = () => {
    const width = window.innerWidth;
    const numCols = width < 640 ? 1 : width < 1024 ? 2 : width < 1280 ? 3 : 4;
    const sorted = [...clipboardItems].sort((a, b) => b.is_pinned - a.is_pinned);
    const newCols = Array.from({ length: numCols }, () => []);
    sorted.forEach((item, i) => newCols[i % numCols].push(item));
    setColumns(newCols);
  };

  useEffect(() => {
    fetchClipboardItems();
  }, [isLoggedIn]);

  useEffect(() => {
    distributeItems();
    const resize = () => distributeItems();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [clipboardItems]);

  const [showNewItemModal, setShowNewItemModal] = useState(false);
  const [newDescription, setNewDescription] = useState("");
  const [newContent, setNewContent] = useState("");

  const togglePin = (id) => {
    const item = clipboardItems.find((i) => i.id === id);
    if (!item) return;

    const updatedItem = { ...item, is_pinned: !item.is_pinned };
    const updated = clipboardItems.map((i) => (i.id === id ? updatedItem : i));

    setClipboardItems(updated);
    saveClipboardItem(updatedItem);
    setShowMenuId(null);
  };

  const handleDelete = async (id) => {
    if (isLoggedIn) {
      try {
        await axiosInstance.delete(`/clipboard/${id}`);
      } catch {
        showToast("Failed to delete", "error");
      }
    } else {
      const all = readLocal().map((i) => (i.id === id ? { ...i, is_deleted: true } : i));
      localStorage.setItem(LOCAL_KEY, JSON.stringify(all));
    }
    setClipboardItems((prev) => prev.filter((item) => item.id !== id));
    setShowMenuId(null);
  };

  const handleArchive = async (id) => {
    try {
      if (isLoggedIn) {
        await archiveItem("clipboard", id);
        await refreshArchive();
      } else {
        const all = readLocal().map((i) => (i.id === id ? { ...i, is_archived: true } : i));
        localStorage.setItem(LOCAL_KEY, JSON.stringify(all));
      }
      setClipboardItems((prev) => prev.filter((item) => item.id !== id));
      showToast("Item archived", "success");
    } catch (err) {
      showToast(err.message || "Failed to archive item", "error");
    } finally {
      setShowMenuId(null);
    }
  };

  const handleStartEdit = (item) => {
    setEditingItemId(item.id);
    setEditedDescription(item.description);
    setEditedContent(item.content);
    setShowMenuId(null);
  };

  const handleSaveEdit = () => {
    const updated = clipboardItems.map((item) =>
      item.id === editingItemId
        ? { ...item, description: editedDescription, content: editedContent, modified_at: new Date().toISOString() }
        : item
    );
    const edited = updated.find((item) => item.id === editingItemId);
    setClipboardItems(updated);
    saveClipboardItem(edited);
    setEditingItemId(null);
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast("Copied!", "success");
    } catch {
      showToast("Failed to copy", "error");
    }
  };

  const handleAddItem = async () => {
    const newItem = {
      description: newDescription || "Untitled",
      content: newContent || "",
      is_pinned: false,
    };

    if (isLoggedIn) {
      try {
        const res = await axiosInstance.post("/clipboard", newItem);
        const saved = res.data; // contains id, created_at, etc.
        setClipboardItems([saved, ...clipboardItems]);
      } catch {
        showToast("Failed to save new item", "error");
      }
    } else {
      const localItem = {
        ...newItem,
        id: Date.now(),
        is_deleted: false,
        is_archived: false,
        created_at: new Date().toISOString(),
        modified_at: new Date().toISOString(),
      };
      const all = readLocal();
      localStorage.setItem(LOCAL_KEY, JSON.stringify([localItem, ...all]));
      setClipboardItems((prev) => [localItem, ...prev]);
    }

    setNewDescription("");
    setNewContent("");
    setShowNewItemModal(false);
  };
  
  const handleCancelEdit = () => {
    setEditingItemId(null);
  };

  return (
    <div className="w-full space-y-8">
      <div className="flex justify-between items-center py-6 px-4">
        <h1 className="text-xl font-semibold text-gray-800">Clipboard</h1>
        <button
          onClick={() => setShowNewItemModal(true)}
          className="px-4 py-2 text-sm bg-black text-white rounded-btn hover:bg-gray-900 transition"
        >
          + Add Item
        </button>
      </div>

      {clipboardItems.length === 0 ? (
        <div className="text-center py-16 px-4">
          <p className="text-gray-500">No clipboard items yet.</p>
          <p className="text-sm text-gray-400 mt-1">Copy something and add it to see it here.</p>
        </div>
      ) : (
      <div ref={containerRef} className="flex gap-4 px-4">
        {columns.map((col, i) => (
          <div key={i} className="space-y-4" style={{ width: `${100 / columns.length}%` }}>
            {col.map((item) => (
              <div
                key={item.id}
                className="relative bg-white border border-gray-100 hover:border-gray-300 rounded-card shadow-card hover:shadow-card-hover p-5 group cursor-pointer transition flex flex-col"
              >
                <div className="flex justify-between items-start mb-2">
                  {editingItemId === item.id ? (
                    <input
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      className="text-base font-semibold text-gray-900 bg-transparent border-b border-gray-300 focus:outline-none w-full"
                    />
                  ) : (
                    <h3 className="text-base font-semibold text-gray-900 truncate">
                      {item.description || "Untitled"}
                    </h3>
                  )}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(item.content)}
                      className="opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-black p-1.5 rounded-full hover:bg-gray-100"
                      title="Copy"
                      aria-label="Copy content"
                    >
                      {copyIcon}
                    </button>
                    <div className="relative z-10" onClick={(e) => e.stopPropagation()}>
                      <button
                        aria-label="Item options"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowMenuId(showMenuId === item.id ? null : item.id);
                        }}
                        className="text-gray-400 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100"
                      >
                        <EllipsisHorizontalIcon />
                      </button>
                    </div>
                  </div>
                </div>

                <MenuModal
                  isOpen={showMenuId === item.id}
                  onClose={() => setShowMenuId(null)}
                  width="w-40"
                  position="right-4 mt-8"
                  items={[
                    {
                      icon: item.is_pinned ? unpinIcon : pinIcon,
                      label: item.is_pinned ? "Unpin" : "Pin",
                      onClick: () => togglePin(item.id),
                    },
                    {
                      icon: editIcon,
                      label: editingItemId === item.id ? "💾 Save" : "Edit",
                      onClick: () =>
                        editingItemId === item.id ? handleSaveEdit() : handleStartEdit(item),
                    },
                    ...(editingItemId === item.id
                      ? [
                          {
                            icon: "❌",
                            label: "Cancel",
                            onClick: handleCancelEdit,
                          },
                        ]
                      : []),
                    {
                      icon: archiveIcon,
                      label: "Archive",
                      onClick: () => handleArchive(item.id),
                    },
                    {
                      icon: trashIcon,
                      label: "Delete",
                      warning: true,
                      onClick: () => setPendingDeleteId(item.id),
                    },
                  ]}
                />

                {editingItemId === item.id ? (
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    rows={4}
                    className="text-sm text-gray-600 bg-transparent border border-gray-200 p-2 w-full resize-none rounded-btn"
                  />
                ) : (
                  <p className="text-sm text-gray-600 mb-3 overflow-hidden line-clamp-6">
                    {item.content}
                  </p>
                )}

                <div className="text-[11px] text-gray-400 space-y-1 mt-auto">
                  <div>Created: {new Date(item.created_at).toLocaleString()}</div>
                  <div>Modified: {new Date(item.modified_at).toLocaleString()}</div>
                </div>

                {item.is_pinned && (
                  <span className="absolute top-2 left-2 w-2.5 h-2.5 rounded-full bg-yellow-400" />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      )}

      {showNewItemModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-clipboard-item-title"
            className="bg-white rounded-card shadow-dropdown p-6 w-[90%] max-w-md"
          >
            <h2 id="add-clipboard-item-title" className="text-lg font-semibold text-gray-800 mb-4">
              Add New Clipboard Item
            </h2>

            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Description"
              className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-btn bg-transparent text-gray-800 focus:outline-none"
            />

            <textarea
              rows={5}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Paste your content here..."
              className="w-full px-4 py-2 border border-gray-300 rounded-btn bg-transparent text-gray-700 focus:outline-none resize-none"
            />

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowNewItemModal(false)}
                className="px-4 py-2 text-sm text-gray-700s hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handleAddItem}
                className="px-4 py-2 text-sm bg-black text-white rounded-btn hover:bg-gray-900 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={pendingDeleteId !== null}
        title="Delete clipboard item?"
        message="This can't be undone."
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={() => {
          handleDelete(pendingDeleteId);
          setPendingDeleteId(null);
        }}
      />
    </div>
  );
}
