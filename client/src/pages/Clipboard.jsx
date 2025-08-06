import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import axiosInstance from "../utils/axiosInstance";

const copyIcon = (<svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M9 15c0-2.828 0-4.243.879-5.121C10.757 9 12.172 9 15 9h1c2.828 0 4.243 0 5.121.879C22 10.757 22 12.172 22 15v1c0 2.828 0 4.243-.879 5.121C20.243 22 18.828 22 16 22h-1c-2.828 0-4.243 0-5.121-.879C9 20.243 9 18.828 9 16z"/><path d="M17 9c-.003-2.957-.047-4.489-.908-5.538a4 4 0 0 0-.554-.554C14.43 2 12.788 2 9.5 2c-3.287 0-4.931 0-6.038.908a4 4 0 0 0-.554.554C2 4.57 2 6.212 2 9.5c0 3.287 0 4.931.908 6.038a4 4 0 0 0 .554.554c1.05.86 2.58.906 5.538.908"/></g></svg>);

export default function Clipboard() {
  const { user, token } = useAuth();
  const { showToast } = useToast();
  const isLoggedIn = !!user;

  const [clipboardItems, setClipboardItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedDescription, setEditedDescription] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [columns, setColumns] = useState([]);
  const [showMenuId, setShowMenuId] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });

  const containerRef = useRef(null);
  const menuButtonRef = useRef(null);

  const LOCAL_KEY = "tabs_clipboard";

  const fetchClipboardItems = async () => {
    if (isLoggedIn) {
      try {
        const res = await axiosInstance.get("/clipboard");
        setClipboardItems(res.data || []);
      } catch (err) {
        showToast("Failed to fetch clipboard", "error");
      }
    } else {
      const localData = JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];
      setClipboardItems(localData);
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
      } catch (err) {
        showToast("Failed to save", "error");
      }
    } else {
      const updated = clipboardItems.map((i) => (i.id === item.id ? item : i));
      setClipboardItems(updated);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuButtonRef.current && !menuButtonRef.current.contains(e.target)) {
        setShowMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    }
    const updated = clipboardItems.filter((item) => item.id !== id);
    setClipboardItems(updated);
    if (!isLoggedIn) localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
    setShowMenuId(null);
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
      } catch (err) {
        showToast("Failed to save new item", "error");
      }
    } else {
      const localItem = {
        ...newItem,
        id: Date.now(),
        created_at: new Date().toISOString(),
        modified_at: new Date().toISOString(),
      };
      const updated = [localItem, ...clipboardItems];
      setClipboardItems(updated);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
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
          className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-gray-900 transition"
        >
          + Add Item
        </button>
      </div>

      <div ref={containerRef} className="flex gap-4 px-4">
        {columns.map((col, i) => (
          <div key={i} className="space-y-4" style={{ width: `${100 / columns.length}%` }}>
            {col.map((item) => (
              <div
                key={item.id}
                className="relative bg-white border border-gray-100 hover:border-gray-300 rounded-2xl p-5 group cursor-pointer transition flex flex-col"
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
                    >
                      {copyIcon}
                    </button>
                    <div className="relative z-10" onClick={(e) => e.stopPropagation()}>
                      <button
                        ref={menuButtonRef}
                        onClick={(e) => {
                          e.stopPropagation();
                          const rect = e.currentTarget.getBoundingClientRect();
                          setDropdownPosition({ x: rect.right, y: rect.bottom });
                          setShowMenuId(showMenuId === item.id ? null : item.id);
                        }}
                        className="text-gray-400 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <circle cx="5" cy="12" r="2" />
                          <circle cx="12" cy="12" r="2" />
                          <circle cx="19" cy="12" r="2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {showMenuId === item.id && (
                  <div
                    className="fixed z-50 mt-2 w-36 bg-white rounded-xl shadow-md ring-1 ring-gray-200 overflow-hidden"
                    style={{ top: dropdownPosition.y, left: dropdownPosition.x }}
                  >
                    <ul className="text-sm text-gray-800">
                      <li
                        onClick={() => togglePin(item.id)}
                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                      >
                        {item.is_pinned ? "Unpin" : "Pin"}
                      </li>
                      <li
                        onClick={() =>
                          editingItemId === item.id ? handleSaveEdit() : handleStartEdit(item)
                        }
                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                      >
                        {editingItemId === item.id ? "💾 Save" : "✏️ Edit"}
                      </li>
                      {editingItemId === item.id && (
                        <li
                          onClick={handleCancelEdit}
                          className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                        >
                          ❌ Cancel
                        </li>
                      )}
                      <li
                        onClick={() => handleDelete(item.id)}
                        className="px-4 py-2 hover:bg-gray-50 text-red-500 cursor-pointer"
                      >
                        🗑 Delete
                      </li>
                    </ul>
                  </div>
                )}

                {editingItemId === item.id ? (
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    rows={4}
                    className="text-sm text-gray-600 bg-transparent border border-gray-200 p-2 w-full resize-none rounded-md"
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

      {showNewItemModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Add New Clipboard Item
            </h2>

            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Description"
              className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md bg-transparent text-gray-800 focus:outline-none"
            />

            <textarea
              rows={5}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Paste your content here..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-transparent text-gray-700 focus:outline-none resize-none"
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
                className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-gray-900 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
