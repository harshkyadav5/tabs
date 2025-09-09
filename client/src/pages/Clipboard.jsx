import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import axiosInstance from "../utils/axiosInstance";
import MenuModal from "../components/MenuModal";

const pinIcon = <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" width={24} height={24} fill={"none"}><path d="M3 21L8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M13.2585 18.8714C9.51516 18.0215 5.97844 14.4848 5.12853 10.7415C4.99399 10.1489 4.92672 9.85266 5.12161 9.37197C5.3165 8.89129 5.55457 8.74255 6.03071 8.44509C7.10705 7.77265 8.27254 7.55888 9.48209 7.66586C11.1793 7.81598 12.0279 7.89104 12.4512 7.67048C12.8746 7.44991 13.1622 6.93417 13.7376 5.90269L14.4664 4.59604C14.9465 3.73528 15.1866 3.3049 15.7513 3.10202C16.316 2.89913 16.6558 3.02199 17.3355 3.26771C18.9249 3.84236 20.1576 5.07505 20.7323 6.66449C20.978 7.34417 21.1009 7.68401 20.898 8.2487C20.6951 8.8134 20.2647 9.05346 19.4039 9.53358L18.0672 10.2792C17.0376 10.8534 16.5229 11.1406 16.3024 11.568C16.0819 11.9955 16.162 12.8256 16.3221 14.4859C16.4399 15.7068 16.2369 16.88 15.5555 17.9697C15.2577 18.4458 15.1088 18.6839 14.6283 18.8786C14.1477 19.0733 13.8513 19.006 13.2585 18.8714Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>;
const unpinIcon = <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" width={24} height={24} fill={"none"}><path d="M7.5 8C6.95863 8.1281 6.49932 8.14239 5.99268 8.45891C5.07234 9.03388 4.85108 9.71674 5.08821 10.7612C5.94028 14.5139 9.48599 18.0596 13.2388 18.9117C14.2834 19.1489 14.9661 18.928 15.5416 18.0077C15.8411 17.5288 15.8716 17.0081 16 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 7.79915C12.1776 7.77794 12.3182 7.74034 12.4295 7.68235C13.3997 7.17686 13.9291 5.53361 14.4498 4.60009C14.9311 3.73715 15.1718 3.30567 15.7379 3.10227C16.3041 2.89888 16.6448 3.02205 17.3262 3.26839C18.9197 3.8445 20.1555 5.08032 20.7316 6.6738C20.9779 7.35521 21.1011 7.69591 20.8977 8.26204C20.6943 8.82817 20.2628 9.06884 19.3999 9.55018C18.4608 10.074 16.7954 10.6108 16.2905 11.5898C16.2345 11.6983 16.1978 11.8327 16.1769 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3 21L8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3 3L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>;
const copyIcon = (<svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M9 15c0-2.828 0-4.243.879-5.121C10.757 9 12.172 9 15 9h1c2.828 0 4.243 0 5.121.879C22 10.757 22 12.172 22 15v1c0 2.828 0 4.243-.879 5.121C20.243 22 18.828 22 16 22h-1c-2.828 0-4.243 0-5.121-.879C9 20.243 9 18.828 9 16z"/><path d="M17 9c-.003-2.957-.047-4.489-.908-5.538a4 4 0 0 0-.554-.554C14.43 2 12.788 2 9.5 2c-3.287 0-4.931 0-6.038.908a4 4 0 0 0-.554.554C2 4.57 2 6.212 2 9.5c0 3.287 0 4.931.908 6.038a4 4 0 0 0 .554.554c1.05.86 2.58.906 5.538.908"/></g></svg>);
const editIcon = <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="currentColor"><path d="m16.214 4.982l1.402-1.401a1.982 1.982 0 0 1 2.803 2.803l-1.401 1.402m-2.804-2.804l-5.234 5.234c-1.045 1.046-1.568 1.568-1.924 2.205S8.342 14.561 8 16c1.438-.342 2.942-.7 3.579-1.056s1.16-.879 2.205-1.924l5.234-5.234m-2.804-2.804l2.804 2.804"/><path d="M21 12c0 4.243 0 6.364-1.318 7.682S16.242 21 12 21s-6.364 0-7.682-1.318S3 16.242 3 12s0-6.364 1.318-7.682S7.758 3 12 3"/></g></svg>;
const archiveIcon = <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="currentColor"><path d="M2 16c0-2.339 0-3.508.536-4.362a3.5 3.5 0 0 1 1.102-1.101C4.492 10 5.66 10 8 10h8c2.339 0 3.508 0 4.362.537a3.5 3.5 0 0 1 1.102 1.1C22 12.493 22 13.662 22 16s0 3.508-.537 4.362a3.5 3.5 0 0 1-1.1 1.102C19.507 22 18.338 22 16 22H8c-2.339 0-3.508 0-4.362-.537a3.5 3.5 0 0 1-1.102-1.1C2 19.507 2 18.338 2 16m18-6c0-1.4 0-2.1-.273-2.635a2.5 2.5 0 0 0-1.092-1.093C18.1 6 17.4 6 16 6H8c-1.4 0-2.1 0-2.635.272a2.5 2.5 0 0 0-1.093 1.093C4 7.9 4 8.6 4 10m14-4c0-1.886 0-2.828-.586-3.414S15.886 2 14 2h-4c-1.886 0-2.828 0-3.414.586S6 4.114 6 6"/><path d="M15 14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2"/></g></svg>;
const trashIcon = <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m19.5 5.5l-.62 10.025c-.158 2.561-.237 3.842-.88 4.763a4 4 0 0 1-1.2 1.128c-.957.584-2.24.584-4.806.584c-2.57 0-3.855 0-4.814-.585a4 4 0 0 1-1.2-1.13c-.642-.922-.72-2.205-.874-4.77L4.5 5.5M3 5.5h18m-4.944 0l-.683-1.408c-.453-.936-.68-1.403-1.071-1.695a2 2 0 0 0-.275-.172C13.594 2 13.074 2 12.035 2c-1.066 0-1.599 0-2.04.234a2 2 0 0 0-.278.18c-.395.303-.616.788-1.058 1.757L8.053 5.5m1.447 11v-6m5 6v-6" color="currentColor"/></svg>;

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
                      onClick: () => console.log("Archive"),
                    },
                    {
                      icon: trashIcon,
                      label: "Delete",
                      warning: true,
                      onClick: () => handleDelete(item.id),
                    },
                  ]}
                />

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
