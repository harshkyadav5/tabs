import React, { useState, useMemo, useEffect, useRef } from "react";

const tagColors = {
  "#idea": "bg-blue-100 text-blue-800",
  "#todo": "bg-yellow-100 text-yellow-800",
  "#draft": "bg-gray-100 text-gray-700",
};

export default function NotesList({ notes }) {
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [folderFilter, setFolderFilter] = useState("");
  const [sortNewest, setSortNewest] = useState(true);
  const [selectedNote, setSelectedNote] = useState(null);
  const [dropdownNoteIndex, setDropdownNoteIndex] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownNoteIndex(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredNotes = useMemo(() => {
    let result = [...notes];

    if (search) {
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(search.toLowerCase()) ||
          n.content.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (tagFilter) {
      result = result.filter((n) => n.tags?.includes(tagFilter));
    }

    if (folderFilter) {
      result = result.filter((n) => n.folder === folderFilter);
    }

    result.sort((a, b) => {
      const dateA = new Date(a.modifiedAt);
      const dateB = new Date(b.modifiedAt);
      return sortNewest ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [notes, search, tagFilter, folderFilter, sortNewest]);

  const pinned = filteredNotes.filter((n) => n.pinned);
  const others = filteredNotes.filter((n) => !n.pinned);

  const allTags = Array.from(new Set(notes.flatMap((n) => n.tags || [])));
  const allFolders = Array.from(new Set(notes.map((n) => n.folder)));

  return (
    <div className="w-full space-y-8">
      <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-xl border border-gray-200">
        <input
          type="text"
          placeholder="Search notes..."
          className="border px-3 py-2 rounded-md w-full max-w-sm text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border px-2 py-2 text-sm rounded-md"
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
        >
          <option value="">All Tags</option>
          {allTags.map((tag, i) => (
            <option key={i} value={tag}>{tag}</option>
          ))}
        </select>
        <select
          className="border px-2 py-2 text-sm rounded-md"
          value={folderFilter}
          onChange={(e) => setFolderFilter(e.target.value)}
        >
          <option value="">All Folders</option>
          {allFolders.map((folder, i) => (
            <option key={i} value={folder}>{folder}</option>
          ))}
        </select>
        <button
          onClick={() => setSortNewest((prev) => !prev)}
          className="text-sm px-3 py-2 border rounded-md"
        >
          {sortNewest ? "Newest First" : "Oldest First"}
        </button>
      </div>

      {pinned.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">📌 Pinned</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {pinned.map((note, i) => (
              <NoteCard
                key={i}
                note={note}
                onClick={() => setSelectedNote(note)}
                dropdownOpen={dropdownNoteIndex === i}
                toggleDropdown={() => setDropdownNoteIndex(dropdownNoteIndex === i ? null : i)}
                dropdownRef={dropdownRef}
              />
            ))}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {others.map((note, i) => (
          <NoteCard
            key={i}
            note={note}
            onClick={() => setSelectedNote(note)}
            dropdownOpen={dropdownNoteIndex === `other-${i}`}
            toggleDropdown={() => setDropdownNoteIndex(dropdownNoteIndex === `other-${i}` ? null : `other-${i}`)}
            dropdownRef={dropdownRef}
          />
        ))}
      </div>

      {selectedNote && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-xl border border-gray-200 p-6 relative">
            <button
              onClick={() => setSelectedNote(null)}
              className="absolute top-3 right-4 text-gray-400 hover:text-black text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {selectedNote.title}
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Created: {selectedNote.createdAt} • Last Modified: {selectedNote.modifiedAt}
            </p>
            <textarea
              className="w-full min-h-[240px] p-3 border rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800"
              defaultValue={selectedNote.content}
            />
            <div className="mt-4 text-right">
              <button className="px-5 py-2 text-sm font-medium rounded-md bg-black text-white hover:bg-gray-900 transition">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NoteCard({ note, onClick, dropdownOpen, toggleDropdown, dropdownRef }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl border border-gray-100 hover:border-gray-300 transition cursor-pointer p-5 relative group"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-base font-semibold text-gray-900 truncate">
          {note.title}
        </h3>
        <div className="relative" ref={dropdownRef} onClick={(e) => e.stopPropagation()}>
          <button
            onClick={toggleDropdown}
            className="text-gray-400 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="5" cy="12" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="19" cy="12" r="2" />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-md ring-1 ring-gray-200 z-50 overflow-hidden">
              <ul className="text-sm text-gray-800">
                <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer">✏️ Edit</li>
                <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer">🗑 Delete</li>
                <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer">📥 Archive</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <p className="text-sm text-gray-600 line-clamp-3 mb-3">
        {note.content}
      </p>
      <div className="flex flex-wrap gap-2 mb-2">
        {note.tags?.map((tag, i) => (
          <span
            key={i}
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              tagColors[tag] || "bg-gray-100 text-gray-700"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="text-[11px] text-gray-400">
        Modified: {note.modifiedAt}
      </div>
    </div>
  );
}
