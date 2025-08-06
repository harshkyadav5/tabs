import React, { useState, useEffect } from "react";
import FolderItem from "../components/FolderItem";
import NotesList from "../components/NotesList";

const addNote = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24">
    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
      d="M16 2v2m-5-2v2M6 2v2m13.5 6c0-3.3 0-4.95-1.025-5.975S15.8 3 12.5 3h-3C6.2 3 4.55 3 3.525 4.025S2.5 6.7 2.5 10v5c0 3.3 0 4.95 1.025 5.975S6.2 22 9.5 22h3m5-8v8m4-4h-8M7 15h4m-4-5h8" color="currentColor"/>
  </svg>
);

const addFolder = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24">
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
      d="M18 13.5v8m4-4h-8m-7-11h9.75c2.107 0 3.16 0 3.917.506a3 3 0 0 1 
         .827.827c.465.695.502 1.851.505 3.667M12 6.5l-.633-1.267c-.525-1.05-1.005-2.106-2.168-2.542C8.69 
         2.5 8.108 2.5 6.944 2.5c-1.816 0-2.724 0-3.406.38A3 3 0 0 0 2.38 
         4.038C2 4.72 2 5.628 2 7.444V10.5c0 4.714 0 7.071 1.464 8.535C4.822 
         20.394 6.944 20.493 11 20.5"/>
  </svg>
);

const folderi = (
  <svg viewBox="0 0 24 24" fill="url(#grad)" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#fde68a" />
      </linearGradient>
    </defs>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M7 7h9.75c2.107 0 3.16 0 3.917.506a3 3 0 0 1 
         .827.827C22 9.09 22 10.143 22 12.25c0 3.511 0 5.267-.843 6.528a5 5 0 0 1-1.38 
         1.38C18.518 21 16.762 21 13.25 21H12c-4.714 0-7.071 0-8.536-1.465C2 
         18.072 2 15.715 2 11V7.944c0-1.816 0-2.724.38-3.406A3 3 0 0 1 
         3.538 3.38C4.22 3 5.128 3 6.944 3C8.108 3 8.69 3 9.2 3.191c1.163.436 
         1.643 1.493 2.168 2.542L12 7"
      fill="url(#grad)"
    />
  </svg>
);

const star = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24">
    <path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
      d="m13.728 3.444l1.76 3.549c.24.494.88.968 1.42 1.058l3.189.535c2.04.343 2.52 1.835 
         1.05 3.307l-2.48 2.5c-.42.423-.65 1.24-.52 1.825l.71 3.095c.56 2.45-.73 3.397-2.88 
         2.117l-2.99-1.785c-.54-.322-1.43-.322-1.98 0L8.019 21.43c-2.14 1.28-3.44.322-2.88-2.117l.71-3.095c.13-.585-.1-1.402-.52-1.825l-2.48-2.5C1.39 10.42 1.86 8.929 3.899 8.586l3.19-.535c.53-.09 
         1.17-.564 1.41-1.058l1.76-3.549c.96-1.925 2.52-1.925 3.47 0"/>
  </svg>
);

export default function Notes() {
  const [showAddFolder, setShowAddFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const [showAddNote, setShowAddNote] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", content: "", folder: "" });

  const [showFolderPicker, setShowFolderPicker] = useState(false);

  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const folderScrollRef = React.useRef(null);

  const handleScroll = () => {
    const el = folderScrollRef.current;
    if (!el)
      return;

    const scrollLeft = el.scrollLeft;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;

    setAtStart(scrollLeft <= 1);
    setAtEnd(scrollLeft >= maxScrollLeft - 1);
  };

  useEffect(() => {
    const el = folderScrollRef.current;
    if (!el)
      return;

    handleScroll();
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);


  const [folders, setFolders] = useState([
    { name: "Work" },
    { name: "Personal" },
    { name: "Projects" },
    { name: "Ideas" },
    { name: "Research" },
    { name: "Reading List" },
    { name: "Design" },
  ]);

  const [notes, setNotes] = useState([
    {
      title: "API Integration Checklist",
      content: "Ensure all endpoints return proper status codes. Validate request/response schemas using Zod. Set up retry logic for 5xx failures. Document each route in Swagger.",
      createdAt: "2025-06-30",
      modifiedAt: "2025-07-04",
      tags: ["#backend", "#api", "#todo"],
      pinned: false,
      folder: "Development"
    },
    {
      title: "React Performance Tips",
      content: "Use React.memo for functional components. Avoid anonymous functions in props. Use useCallback/useMemo for expensive operations. Consider virtualization for large lists.",
      createdAt: "2025-07-01",
      modifiedAt: "2025-07-05",
      tags: ["#react", "#optimization"],
      pinned: true,
      folder: "Frontend"
    },
    {
      title: "Docker Setup for Node.js",
      content: "Create a multi-stage Dockerfile. Use Alpine as base image. Set NODE_ENV to production. Bind mount volumes in dev mode to persist changes without rebuild.",
      createdAt: "2025-06-25",
      modifiedAt: "2025-07-03",
      tags: ["#devops", "#docker"],
      pinned: false,
      folder: "Deployment"
    },
    {
      title: "AI Features Brainstorm",
      content: "Add GPT-powered summarization for meeting notes. Integrate image generation for dashboard mockups. Use vector DB for semantic search of documents.",
      createdAt: "2025-07-02",
      modifiedAt: "2025-07-06",
      tags: ["#ai", "#idea"],
      pinned: false,
      folder: "R&D"
    },
    {
      title: "Bug Fix Log - July",
      content: "Fixed login loop caused by missing cookie header. Resolved race condition in chat fetch handler. Patched XSS in markdown previewer.",
      createdAt: "2025-07-03",
      modifiedAt: "2025-07-05",
      tags: ["#bugfix", "#log"],
      pinned: false,
      folder: "QA"
    },
  ]);

  return (
    <aside className="w-full font-montserrat">
      <div className="w-full rounded-4xl mb-8">
        <div className="px-4 w-full flex justify-end">
          <div className="flex items-center border border-gray-400 bg-white/70 rounded-full p-3">
            <button
              className="p-2 hover:bg-black/85 text-gray-800 hover:text-white rounded-full transition duration-200"
              onClick={() => setShowAddNote(true)}
            >
              {addNote}
            </button>
            <div className="h-6 w-px bg-gray-300 mx-2" />
            <button
              className="p-2 hover:bg-black/85 text-gray-800 hover:text-white rounded-full transition duration-200"
              onClick={() => setShowAddFolder(true)}
            >
              {addFolder}
            </button>
          </div>
        </div>
      </div>

      <div className="w-full rounded-4xl mb-8 p-4 bg-white shadow-[0_3px_25px_rgba(0,0,0,0.15)]">
        <div className="pb-4 flex justify-end">
          <button className="px-4 py-2 text-sm font-medium rounded-full text-gray-800 hover:bg-black/85 hover:text-white transition duration-200">
            View All
          </button>
        </div>

        <div
          ref={folderScrollRef}
          className={`flex overflow-x-auto whitespace-nowrap space-x-4 p-4 pt-0 transition-all duration-200 ${
            !atStart && !atEnd
              ? "mask-to-l-r"
              : !atStart
              ? "mask-to-r"
              : !atEnd
              ? "mask-to-l"
              : ""
          }`}
        >
          <FolderItem
            icon={folderi}
            overlay={star}
            label="Favorite"
            tooltip="Favorite Bookmarks"
            onClick={() => console.log("Clicked: Favorite")}
          />
          {folders.map((folder, i) => (
            <FolderItem
              key={i}
              icon={folderi}
              overlay={folder.name.charAt(0).toUpperCase()}
              label={folder.name}
              tooltip={folder.name}
              onClick={() => console.log("Clicked folder:", folder.name)}
            />
          ))}
        </div>
      </div>

      <NotesList notes={notes} />

      {/* Add Folder Modal */}
      {showAddFolder && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-sm rounded-xl shadow-xl p-6 relative border border-gray-100">
            <button
              onClick={() => setShowAddFolder(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-800 text-xl"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Create Folder</h2>
            <input
              type="text"
              placeholder="Enter folder name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/80"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowAddFolder(false)}
                className="px-4 py-2 text-sm rounded-md text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (newFolderName.trim()) {
                    setFolders([...folders, { name: newFolderName.trim() }]);
                    setNewFolderName("");
                    setShowAddFolder(false);
                  }
                }}
                className="px-4 py-2 text-sm font-medium rounded-md bg-black text-white hover:bg-gray-900 transition"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Note Modal */}
      {showAddNote && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl p-8 relative border border-gray-100">
            <button
              onClick={() => setShowAddNote(false)}
              className="absolute top-4 right-6 text-gray-400 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-6">New Note</h2>

            <div className="grid gap-4">
              <input
                type="text"
                placeholder="Note title"
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/80"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              />

              <textarea
                placeholder="Write your note here..."
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm min-h-[160px] focus:outline-none focus:ring-2 focus:ring-black/80"
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              />

              <div className="relative">
                <button
                  onClick={() => setShowFolderPicker(true)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm text-left text-gray-700 hover:border-black focus:outline-none focus:ring-2 focus:ring-black/80"
                >
                  {newNote.folder ? `Folder: ${newNote.folder}` : "Select folder (optional)"}
                </button>

                {showFolderPicker && (
                  <div className="absolute z-30 mt-2 w-full bg-white border border-gray-200 shadow-xl rounded-lg">
                    <div className="max-h-64 overflow-y-auto p-2">
                      {folders.length === 0 && (
                        <div className="text-sm text-gray-500 px-3 py-2">
                          No folders available.
                        </div>
                      )}
                      {folders.map((f, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setNewNote({ ...newNote, folder: f.name });
                            setShowFolderPicker(false);
                          }}
                          className={`w-full text-left px-4 py-2 rounded-md text-sm hover:bg-black/5 ${
                            newNote.folder === f.name ? "bg-black/10 font-medium" : ""
                          }`}
                        >
                          {f.name}
                        </button>
                      ))}
                    </div>
                    <div className="p-2 border-t border-gray-100 text-right">
                      <button
                        onClick={() => setShowFolderPicker(false)}
                        className="text-xs text-gray-500 hover:text-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <input
                type="text"
                placeholder="Add tags (comma separated, e.g. idea, todo)"
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/80"
                value={newNote.tagsInput || ""}
                onChange={(e) =>
                  setNewNote({ ...newNote, tagsInput: e.target.value })
                }
              />

              <div className="text-xs text-gray-500">
                Created at: {new Date().toLocaleString()}
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowAddNote(false)}
                className="px-5 py-2 text-sm rounded-md text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (newNote.title && newNote.content) {
                    const now = new Date().toISOString();
                    const tags = newNote.tagsInput
                      ? newNote.tagsInput
                          .split(",")
                          .map((t) => t.trim())
                          .filter((t) => t)
                      : [];
                    setNotes([
                      ...notes,
                      {
                        title: newNote.title.trim(),
                        content: newNote.content.trim(),
                        createdAt: now,
                        modifiedAt: now,
                        tags: tags,
                        pinned: false,
                        folder: newNote.folder || "",
                      },
                    ]);
                    setNewNote({
                      title: "",
                      content: "",
                      folder: "",
                      tagsInput: "",
                    });
                    setShowAddNote(false);
                  }
                }}
                className="px-6 py-2 text-sm font-medium rounded-md bg-black text-white hover:bg-gray-900 transition"
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
