import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ClipboardItem from "../components/ClipboardItem";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import axiosInstance from "../utils/axiosInstance";
import { notifyDataChange } from "../utils/notifyDataChange";

export default function Clipboard() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    axiosInstance
      .get("/clipboard", { params: { is_deleted: false, is_archived: false } })
      .then((res) => setItems(res.data || []))
      .catch(() => showToast("Failed to load clipboard", "error"))
      .finally(() => setLoading(false));
  }, [user]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    showToast("Copied to Clipboard!", "success");
  };

  const handleEditDescription = async (id, newDescription) => {
    const original = items.find((item) => item.id === id);
    if (!original || newDescription === original.description) return;

    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, description: newDescription } : item))
    );

    try {
      await axiosInstance.put(`/clipboard/${id}`, {
        description: newDescription,
        content: original.content,
        is_pinned: original.is_pinned,
      });
      notifyDataChange("clipboard");
    } catch {
      showToast("Failed to save", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/clipboard/${id}`);
      setItems((prev) => prev.filter((item) => item.id !== id));
      notifyDataChange("clipboard");
      showToast("Item deleted", "success");
    } catch {
      showToast("Failed to delete", "error");
    }
  };

  if (!user) {
    return (
      <div className="bg-slate-100 relative w-[600px] p-5 overflow-hidden font-montserrat">
        <div className="p-8 rounded-2xl bg-white shadow-lg h-full">
          <Navbar />
          <p className="text-slate-600 text-base text-center py-10">
            Sign in on the Tabs website to view your clipboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 relative w-[600px] p-5 overflow-hidden font-montserrat">
      <div className="p-8 rounded-2xl bg-white shadow-lg h-full">
        <Navbar />

        {!loading && items.length === 0 ? (
          <p className="text-slate-500 text-base text-center py-10">No clipboard items yet.</p>
        ) : (
          <div className="mt-4 columns-3 gap-3 space-y-3">
            {items.map((item) => (
              <ClipboardItem
                key={item.id}
                item={item}
                onCopy={handleCopy}
                onEditDescription={handleEditDescription}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
