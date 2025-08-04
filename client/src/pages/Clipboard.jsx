import React, { useState, useRef, useEffect } from "react";

const copy = <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><path d="M9 15c0-2.828 0-4.243.879-5.121C10.757 9 12.172 9 15 9h1c2.828 0 4.243 0 5.121.879C22 10.757 22 12.172 22 15v1c0 2.828 0 4.243-.879 5.121C20.243 22 18.828 22 16 22h-1c-2.828 0-4.243 0-5.121-.879C9 20.243 9 18.828 9 16z"/><path d="M17 9c-.003-2.957-.047-4.489-.908-5.538a4 4 0 0 0-.554-.554C14.43 2 12.788 2 9.5 2c-3.287 0-4.931 0-6.038.908a4 4 0 0 0-.554.554C2 4.57 2 6.212 2 9.5c0 3.287 0 4.931.908 6.038a4 4 0 0 0 .554.554c1.05.86 2.58.906 5.538.908"/></g></svg>;

export default function Clipboard() {
    const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
    const menuButtonRef = useRef(null);

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
      content: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\neyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\neyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\neyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\neyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\neyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\neyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\neyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\neyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\neyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..",
      is_pinned: false,
      created_at: "2025-07-11T09:20:00",
      modified_at: "2025-07-11T09:20:00",
    },
    {
      id: 3,
      description: "JWT Token",
      content: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\neyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\neyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\neyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      is_pinned: false,
      created_at: "2025-07-11T09:20:00",
      modified_at: "2025-07-11T09:20:00",
    },
    {
      id: 4,
      description: "JWT Token",
      content: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      is_pinned: false,
      created_at: "2025-07-11T09:20:00",
      modified_at: "2025-07-11T09:20:00",
    },
    {
      id: 5,
      description: "JWT Token",
      content: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      is_pinned: false,
      created_at: "2025-07-11T09:20:00",
      modified_at: "2025-07-11T09:20:00",
    },
    {
      id: 6,
      description: "JWT Token",
      content: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      is_pinned: false,
      created_at: "2025-07-11T09:20:00",
      modified_at: "2025-07-11T09:20:00",
    },
  ]);

  const [showMenuId, setShowMenuId] = useState(null);
  const [columns, setColumns] = useState([]);
  const containerRef = useRef(null);

  const calculateColumnCount = () => {
    const width = window.innerWidth;
    if (width < 640) return 1;
    if (width < 1024) return 2;
    if (width < 1280) return 3;
    return 4;
  };

  const distributeItems = () => {
    const numCols = calculateColumnCount();
    const newColumns = Array.from({ length: numCols }, () => []);
    const sorted = [...clipboardItems].sort((a, b) => b.is_pinned - a.is_pinned);

    sorted.forEach((item, idx) => {
      newColumns[idx % numCols].push(item);
    });

    setColumns(newColumns);
  };

  useEffect(() => {
    const handleResize = () => {
      distributeItems();
    };
  
    distributeItems();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [clipboardItems]);
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target)
      ) {
        setShowMenuId(null);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

      <div ref={containerRef} className="flex gap-4 px-4">
        {columns.map((col, colIndex) => (
          <div
            key={colIndex}
            className="space-y-4"
            style={{ width: `${100 / columns.length}%` }}
          >
            {col.map((item) => (
              <div
                key={item.id}
                className="relative bg-white border border-gray-100 hover:border-gray-300 rounded-2xl p-5 group cursor-pointer transition overflow-hidden flex flex-col"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-base font-semibold text-gray-900 truncate">
                    {item.description || "Untitled"}
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(item.content)}
                      className="opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-black p-1.5 rounded-full hover:bg-gray-100"
                      title="Copy"
                    >
                      {copy}
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

                {showMenuId && (
                  <div
                    className="fixed z-50 mt-2 w-36 bg-white rounded-xl shadow-md ring-1 ring-gray-200 overflow-hidden"
                    style={{ top: dropdownPosition.y, left: dropdownPosition.x }}
                  >
                    <ul className="text-sm text-gray-800">
                      <li
                        onClick={() => {
                          togglePin(showMenuId);
                        }}
                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                      >
                        {clipboardItems.find((item) => item.id === showMenuId)?.is_pinned
                          ? "Unpin"
                          : "Pin"}
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer">✏️ Edit</li>
                      <li
                        onClick={() => handleDelete(showMenuId)}
                        className="px-4 py-2 hover:bg-gray-50 text-red-500 cursor-pointer"
                      >
                        🗑 Delete
                      </li>
                    </ul>
                  </div>
                )}

                <p className="text-sm text-gray-600 mb-3 overflow-hidden line-clamp-6">
                  {item.content}
                </p>

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
    </div>
  );
}
