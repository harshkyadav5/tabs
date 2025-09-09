import React, { useState } from "react";

const archivedItems = [
  {
    id: 1,
    type: "note",
    title: "Old Project Notes",
    content: "This is an archived note about the old project.",
    is_archived: true,
    archived_at: "2025-07-15T09:20:00Z",
  },
  {
    id: 2,
    type: "clipboard",
    content: "Some useful copied text saved for later.",
    is_archived: true,
    archived_at: "2025-07-20T14:10:00Z",
  },
];

export default function Archive() {
  const [items, setItems] = useState(archivedItems);

  const handleUnarchive = (id) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, is_archived: false } : item
    );
    setItems(updated.filter((item) => item.is_archived));
  };

  const handlePermanentDelete = (id) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Archived Items</h1>

      {items.length === 0 ? (
        <div className="text-gray-500">No items in archive.</div>
      ) : (
        <div className="w-full bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
          
          <div className="bg-gray-100 text-sm text-gray-700 font-medium grid grid-cols-5 gap-4 px-4 py-2">
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
                key={item.id}
                className={`grid grid-cols-5 gap-4 items-start px-4 py-3 text-sm border-t border-gray-200 ${bgColor} hover:bg-gray-100/90 transition-all duration-200`}
              >
                <div className="capitalize font-medium text-gray-800">
                  {item.type}
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
                    onClick={() => handleUnarchive(item.id)}
                    className="px-3 py-1 text-xs rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
                  >
                    Unarchive
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
