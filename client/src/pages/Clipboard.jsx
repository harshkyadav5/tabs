import React, { useState } from "react";

export default function Clipboard() {
  const [clipboardItems, setClipboardItems] = useState([
    {
      id: 1,
      description: "Link to dashboard",
      content: "https://example.com/dashboard",
      is_pinned: true,
      created_at: "2025-07-10T12:00:00",
      modified_at: "2025-07-12T15:32:00",
    },
    {
      id: 2,
      description: "JWT Token",
      content: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      is_pinned: false,
      created_at: "2025-07-11T09:20:00",
      modified_at: "2025-07-11T09:20:00",
    },
  ]);

  const [showMenuId, setShowMenuId] = useState(null);

  const togglePin = (id) => {
    setClipboardItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, is_pinned: !item.is_pinned } : item
      )
    );
    setShowMenuId(null);
  };

  const handleDelete = (id) => {
    setClipboardItems((prev) => prev.filter((item) => item.id !== id));
    setShowMenuId(null);
  };

  const handleCopy = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
    } catch {
      alert("Failed to copy.");
    }
  };

  return (
    <div className="w-full space-y-8">
      <div className="flex justify-between items-center py-6 px-4">
        <h1 className="text-xl font-semibold text-gray-800">Clipboard</h1>
        <button className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-gray-900 transition">
          + Add Item
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4 px-4">
        {clipboardItems
          .sort((a, b) => b.is_pinned - a.is_pinned)
          .map((item) => (
            <div
              key={item.id}
              className="relative bg-white border border-gray-100 hover:border-gray-300 rounded-2xl p-5 group cursor-pointer transition"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-base font-semibold text-gray-900 truncate">
                  {item.description || "Untitled"}
                </h3>
                <div className="relative z-10" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() =>
                      setShowMenuId(showMenuId === item.id ? null : item.id)
                    }
                    className="text-gray-400 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="5" cy="12" r="2" />
                      <circle cx="12" cy="12" r="2" />
                      <circle cx="19" cy="12" r="2" />
                    </svg>
                  </button>
                  {showMenuId === item.id && (
                    <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-md ring-1 ring-gray-200 z-50 overflow-hidden">
                      <ul className="text-sm text-gray-800">
                        <li
                          onClick={() => togglePin(item.id)}
                          className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                        >
                          {item.is_pinned ? "Unpin" : "Pin"}
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                          ✏️ Edit
                        </li>
                        <li
                          onClick={() => handleDelete(item.id)}
                          className="px-4 py-2 hover:bg-gray-50 text-red-500 cursor-pointer"
                        >
                          🗑 Delete
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                {item.content}
              </p>

              <div className="text-[11px] text-gray-400 space-y-1">
                <div>Created: {new Date(item.created_at).toLocaleString()}</div>
                <div>Modified: {new Date(item.modified_at).toLocaleString()}</div>
              </div>

              {item.is_pinned && (
                <span className="absolute top-2 left-2 w-2.5 h-2.5 rounded-full bg-yellow-400" />
              )}

              <button
                onClick={() => handleCopy(item.content)}
                className="absolute top-2 right-10 opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-black text-sm"
                title="Copy"
              >
                📋
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}