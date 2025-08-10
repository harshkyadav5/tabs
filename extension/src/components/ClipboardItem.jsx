import React, { useState, useRef } from "react";
import { icons } from "./icons";

export default function ClipboardItem({ item, onCopy, onEditDescription }) {
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedDescription, setEditedDescription] = useState(item.description);
  const [showMenuId, setShowMenuId] = useState(null);
  const menuButtonRef = useRef(null);

  const handleSaveEdit = () => {
    onEditDescription(item.id, editedDescription);
    setEditingItemId(null);
  };

  return (
    <div className="break-inside-avoid group relative rounded-xl bg-gray-100 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 p-4">
      
      <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => onCopy(item.content)}
          className="p-1.5 rounded-full bg-white/70 hover:bg-white shadow-sm text-gray-500 hover:text-black transition"
          title="Copy"
        >
          {icons['copy']}
        </button>
        <div className="relative z-10" onClick={(e) => e.stopPropagation()}>
          <button
            ref={menuButtonRef}
            onClick={(e) => {
              e.stopPropagation();
              setShowMenuId(showMenuId === item.id ? null : item.id);
            }}
            className="p-1.5 rounded-full bg-white/70 hover:bg-white shadow-sm text-gray-500 hover:text-black transition"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="5" cy="12" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="19" cy="12" r="2" />
            </svg>
          </button>
          {showMenuId === item.id && (
            <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-lg overflow-hidden border border-slate-200">
              <button
                onClick={() => setEditingItemId(item.id)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100 w-full text-left"
              >
                Edit
              </button>
              <button
                onClick={() => console.log("Delete", item.id)}
                className="block px-4 py-2 text-sm text-red-500 hover:bg-red-50 w-full text-left"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {editingItemId === item.id ? (
        <input
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          onBlur={handleSaveEdit}
          className="mb-2 text-base font-semibold text-gray-900 bg-transparent border-b border-gray-300 focus:outline-none w-full"
        />
      ) : (
        <h3
          className="mb-2 text-base font-semibold text-gray-900 break-words"
          onDoubleClick={() => setEditingItemId(item.id)}
        >
          {item.description || "Untitled"}
        </h3>
      )}

      <div className="relative overflow-hidden">
        <p className="text-sm text-gray-600 mb-3 overflow-hidden line-clamp-7">
          {item.content}
        </p>
      </div>
    </div>
  );
}
