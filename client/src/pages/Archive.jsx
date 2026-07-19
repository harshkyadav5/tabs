import React, { useState } from "react";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import { useArchiveTrash } from "../context/ArchiveTrashContext";
import { useToast } from "../context/ToastContext";
import { unarchiveItem, deleteArchivedItem } from "../services/archiveService";

export default function Archive() {
  const { archivedItems: items, refreshArchive } = useArchiveTrash();
  const { showToast } = useToast();
  const [pendingDelete, setPendingDelete] = useState(null);

  const handleUnarchive = async (item) => {
    try {
      await unarchiveItem(item.entity_type, item.id);
      await refreshArchive();
    } catch (err) {
      showToast(err.message || "Failed to unarchive item", "error");
    }
  };

  const handlePermanentDelete = async (item) => {
    try {
      await deleteArchivedItem(item.entity_type, item.id);
      await refreshArchive();
    } catch (err) {
      showToast(err.message || "Failed to delete item", "error");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Archived Items</h1>

      {items.length === 0 ? (
        <div className="text-gray-500">No items in archive.</div>
      ) : (
        <div className="w-full bg-gray-50 border border-gray-200 rounded-card overflow-hidden">

          <div className="hidden md:grid bg-gray-100 text-sm text-gray-700 font-medium grid-cols-5 gap-4 px-4 py-2">
            <div>Type</div>
            <div>Title</div>
            <div>Content</div>
            <div>Archived At</div>
            <div className="text-right">Actions</div>
          </div>

          {items.map((item, index) => {
            const bgColor =
              index % 2 === 0
                ? "bg-white"
                : "bg-gray-50";
            return (
              <div
                key={`${item.entity_type}-${item.id}`}
                className={`flex flex-col gap-2 md:grid md:grid-cols-5 md:gap-4 md:items-start px-4 py-3 text-sm border-t border-gray-200 ${bgColor} hover:bg-gray-100/90 transition-all duration-200`}
              >
                <div className="capitalize font-medium text-gray-800">
                  {item.entity_type}
                </div>

                <div className="text-gray-900 font-semibold">
                  {item.title || "(No title)"}
                </div>

                <div className="text-gray-600 line-clamp-2">
                  {item.content}
                </div>

                <div className="text-gray-500">
                  {new Date(item.archived_at).toLocaleString()}
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleUnarchive(item)}
                    className="px-3 py-1 text-xs rounded-btn bg-blue-100 text-blue-700 hover:bg-blue-200"
                  >
                    Unarchive
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
