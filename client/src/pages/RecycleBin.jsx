import React, { useState } from "react";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import { useArchiveTrash } from "../context/ArchiveTrashContext";
import { useToast } from "../context/ToastContext";
import { restoreItem, deleteTrashItem } from "../services/trashService";

const itemTitle = (item) => {
  if (item.entity_type === "color") return item.label || item.hex_code;
  if (item.entity_type === "clipboard") return item.description;
  if (item.entity_type === "screenshot") return item.web_url;
  return item.title;
};

const itemContent = (item) => {
  if (item.entity_type === "color") return item.rgb_code;
  if (item.entity_type === "screenshot") return item.image_url;
  return item.content;
};

export default function RecycleBin() {
  const { trashedItems, refreshTrash } = useArchiveTrash();
  const { showToast } = useToast();
  const [pendingDelete, setPendingDelete] = useState(null);

  const handleRestore = async (item) => {
    try {
      await restoreItem(item.entity_type, item.id);
      await refreshTrash();
    } catch (err) {
      showToast(err.message || "Failed to restore item", "error");
    }
  };

  const handlePermanentDelete = async (item) => {
    try {
      await deleteTrashItem(item.entity_type, item.id);
      await refreshTrash();
    } catch (err) {
      showToast(err.message || "Failed to delete item", "error");
    }
  };

  const getDaysLeft = (deletedAt) => {
    const deletedDate = new Date(deletedAt);
    const now = new Date();
    const daysPassed = Math.floor((now - deletedDate) / (1000 * 60 * 60 * 24));
    return Math.max(0, 30 - daysPassed);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Recycle Bin</h1>

      {trashedItems.length === 0 ? (
        <div className="text-gray-500">No items in the trash.</div>
      ) : (
        <div className="w-full bg-gray-50 border border-gray-200 rounded-card overflow-hidden">
          
          <div className="hidden md:grid bg-gray-100 text-sm text-gray-700 font-medium grid-cols-6 gap-4 px-4 py-2">
            <div>Type</div>
            <div>Title</div>
            <div>Content</div>
            <div>Deleted At</div>
            <div>Days Left</div>
            <div className="text-right">Actions</div>
          </div>

          {trashedItems.map((item, index) => {
            const bgColor =
              index % 2 === 0
                ? "bg-white"
                : "bg-gray-50";
            return (
              <div
                key={`${item.entity_type}-${item.id}`}
                className={`flex flex-col gap-2 md:grid md:grid-cols-6 md:gap-4 md:items-start px-4 py-3 text-sm border-t border-gray-200 ${bgColor} hover:bg-gray-100/90 transition-all duration-200`}
              >
                <div className="capitalize font-medium text-gray-800">
                  {item.entity_type}
                </div>

                <div className="text-gray-900 font-semibold flex items-center gap-2">
                  {item.entity_type === "color" && (
                    <span
                      className="w-4 h-4 rounded-full border border-gray-300 shrink-0"
                      style={{ backgroundColor: item.hex_code }}
                    />
                  )}
                  {itemTitle(item) || "(No title)"}
                </div>

                <div className="text-gray-600 line-clamp-2">
                  {itemContent(item)}
                </div>

                <div className="text-gray-500">
                  {new Date(item.deleted_at).toLocaleString()}
                </div>

                <div
                  className={`font-medium ${
                    getDaysLeft(item.deleted_at) <= 5
                      ? "text-red-500"
                      : "text-gray-700"
                  }`}
                >
                  {getDaysLeft(item.deleted_at)} days left
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleRestore(item)}
                    className="px-3 py-1 text-xs rounded-btn bg-green-100 text-green-700 hover:bg-green-200"
                  >
                    Restore
                  </button>
                  <button
                    onClick={() => setPendingDelete(item)}
                    className="px-3 py-1 text-xs rounded-btn bg-red-100 text-red-700 hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Permanently delete this item?"
        message="This can't be undone."
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          handlePermanentDelete(pendingDelete);
          setPendingDelete(null);
        }}
      />
    </div>
  );
}
