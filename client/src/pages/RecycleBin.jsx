import React, { useState } from "react";

const tBin = [
  {
    id: 1,
    type: "note",
    title: "Deleted Note",
    content: "This note was moved to trash.",
    is_trashed: true,
    deleted_at: "2025-08-01T10:30:00Z",
  },
  {
    id: 2,
    type: "clipboard",
    content: "Copied text that was deleted.",
    is_trashed: true,
    deleted_at: "2025-08-01T12:15:00Z",
  },
];

export default function RecycleBin() {
  const [trashedItems, setTrashedItems] = useState(tBin);

  const handleRestore = (id) => {
    const updated = trashedItems.map((item) =>
      item.id === id ? { ...item, is_trashed: false } : item
    );
    setTrashedItems(updated.filter((item) => item.is_trashed));
  };

  const handlePermanentDelete = (id) => {
    const updated = trashedItems.filter((item) => item.id !== id);
    setTrashedItems(updated);
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
        <div className="w-full bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
          
          <div className="bg-gray-100 text-sm text-gray-700 font-medium grid grid-cols-6 gap-4 px-4 py-2">
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
                key={item.id}
                className={`grid grid-cols-6 gap-4 items-start px-4 py-3 text-sm border-t border-gray-200 ${bgColor} hover:bg-gray-100/90 transition-all duration-200`}
              >
                <div className="capitalize font-medium text-gray-800">
                  {item.type}
                </div>

                <div className="text-gray-900 font-semibold">
                  {item.title || "(No title)"}
                </div>

                <div className="text-gray-60 line-clamp-2">
                  {item.content}
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
                    onClick={() => handleRestore(item.id)}
                    className="px-3 py-1 text-xs rounded bg-green-100 text-green-700 hover:bg-green-200"
                  >
                    Restore
                  </button>
                  <button
                    onClick={() => handlePermanentDelete(item.id)}
                    className="px-3 py-1 text-xs rounded bg-red-100 text-red-700 hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
