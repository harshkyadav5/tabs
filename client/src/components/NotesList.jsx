import React, { useState, useMemo, useEffect, useRef } from "react";
import MenuModal from "./MenuModal";

const tagColors = {
  "#idea": "bg-blue-100 text-blue-800",
  "#todo": "bg-yellow-100 text-yellow-800",
  "#draft": "bg-gray-100 text-gray-700",
};

const pinIcon = <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" width={24} height={24} fill={"none"}><path d="M3 21L8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M13.2585 18.8714C9.51516 18.0215 5.97844 14.4848 5.12853 10.7415C4.99399 10.1489 4.92672 9.85266 5.12161 9.37197C5.3165 8.89129 5.55457 8.74255 6.03071 8.44509C7.10705 7.77265 8.27254 7.55888 9.48209 7.66586C11.1793 7.81598 12.0279 7.89104 12.4512 7.67048C12.8746 7.44991 13.1622 6.93417 13.7376 5.90269L14.4664 4.59604C14.9465 3.73528 15.1866 3.3049 15.7513 3.10202C16.316 2.89913 16.6558 3.02199 17.3355 3.26771C18.9249 3.84236 20.1576 5.07505 20.7323 6.66449C20.978 7.34417 21.1009 7.68401 20.898 8.2487C20.6951 8.8134 20.2647 9.05346 19.4039 9.53358L18.0672 10.2792C17.0376 10.8534 16.5229 11.1406 16.3024 11.568C16.0819 11.9955 16.162 12.8256 16.3221 14.4859C16.4399 15.7068 16.2369 16.88 15.5555 17.9697C15.2577 18.4458 15.1088 18.6839 14.6283 18.8786C14.1477 19.0733 13.8513 19.006 13.2585 18.8714Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>;
const unpinIcon = <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" width={24} height={24} fill={"none"}><path d="M7.5 8C6.95863 8.1281 6.49932 8.14239 5.99268 8.45891C5.07234 9.03388 4.85108 9.71674 5.08821 10.7612C5.94028 14.5139 9.48599 18.0596 13.2388 18.9117C14.2834 19.1489 14.9661 18.928 15.5416 18.0077C15.8411 17.5288 15.8716 17.0081 16 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 7.79915C12.1776 7.77794 12.3182 7.74034 12.4295 7.68235C13.3997 7.17686 13.9291 5.53361 14.4498 4.60009C14.9311 3.73715 15.1718 3.30567 15.7379 3.10227C16.3041 2.89888 16.6448 3.02205 17.3262 3.26839C18.9197 3.8445 20.1555 5.08032 20.7316 6.6738C20.9779 7.35521 21.1011 7.69591 20.8977 8.26204C20.6943 8.82817 20.2628 9.06884 19.3999 9.55018C18.4608 10.074 16.7954 10.6108 16.2905 11.5898C16.2345 11.6983 16.1978 11.8327 16.1769 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3 21L8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3 3L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>;
const editIcon = <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="currentColor"><path d="m16.214 4.982l1.402-1.401a1.982 1.982 0 0 1 2.803 2.803l-1.401 1.402m-2.804-2.804l-5.234 5.234c-1.045 1.046-1.568 1.568-1.924 2.205S8.342 14.561 8 16c1.438-.342 2.942-.7 3.579-1.056s1.16-.879 2.205-1.924l5.234-5.234m-2.804-2.804l2.804 2.804"/><path d="M21 12c0 4.243 0 6.364-1.318 7.682S16.242 21 12 21s-6.364 0-7.682-1.318S3 16.242 3 12s0-6.364 1.318-7.682S7.758 3 12 3"/></g></svg>;
const archiveIcon = <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="currentColor"><path d="M2 16c0-2.339 0-3.508.536-4.362a3.5 3.5 0 0 1 1.102-1.101C4.492 10 5.66 10 8 10h8c2.339 0 3.508 0 4.362.537a3.5 3.5 0 0 1 1.102 1.1C22 12.493 22 13.662 22 16s0 3.508-.537 4.362a3.5 3.5 0 0 1-1.1 1.102C19.507 22 18.338 22 16 22H8c-2.339 0-3.508 0-4.362-.537a3.5 3.5 0 0 1-1.102-1.1C2 19.507 2 18.338 2 16m18-6c0-1.4 0-2.1-.273-2.635a2.5 2.5 0 0 0-1.092-1.093C18.1 6 17.4 6 16 6H8c-1.4 0-2.1 0-2.635.272a2.5 2.5 0 0 0-1.093 1.093C4 7.9 4 8.6 4 10m14-4c0-1.886 0-2.828-.586-3.414S15.886 2 14 2h-4c-1.886 0-2.828 0-3.414.586S6 4.114 6 6"/><path d="M15 14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2"/></g></svg>;
const trashIcon = <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m19.5 5.5l-.62 10.025c-.158 2.561-.237 3.842-.88 4.763a4 4 0 0 1-1.2 1.128c-.957.584-2.24.584-4.806.584c-2.57 0-3.855 0-4.814-.585a4 4 0 0 1-1.2-1.13c-.642-.922-.72-2.205-.874-4.77L4.5 5.5M3 5.5h18m-4.944 0l-.683-1.408c-.453-.936-.68-1.403-1.071-1.695a2 2 0 0 0-.275-.172C13.594 2 13.074 2 12.035 2c-1.066 0-1.599 0-2.04.234a2 2 0 0 0-.278.18c-.395.303-.616.788-1.058 1.757L8.053 5.5m1.447 11v-6m5 6v-6" color="currentColor"/></svg>;

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

  const pinned = filteredNotes.filter((n) => n.is_pinned);
  const others = filteredNotes.filter((n) => !n.is_pinned);

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

            <div className="space-y-4">
              <input
                type="text"
                className="w-full text-xl font-semibold text-gray-900 border-b focus:outline-none pb-1"
                value={selectedNote.title}
                onChange={(e) =>
                  setSelectedNote({ ...selectedNote, title: e.target.value })
                }
              />

              <textarea
                className="w-full min-h-[200px] p-3 border rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800"
                value={selectedNote.content}
                onChange={(e) =>
                  setSelectedNote({ ...selectedNote, content: e.target.value })
                }
              />

              <div className="flex flex-wrap gap-2">
                <input
                  type="text"
                  placeholder="Tags (comma-separated)"
                  className="flex-1 border px-3 py-2 rounded-md text-sm"
                  value={(selectedNote.tags || []).join(", ")}
                  onChange={(e) =>
                    setSelectedNote({
                      ...selectedNote,
                      tags: e.target.value.split(",").map((t) => t.trim()),
                    })
                  }
                />

                <input
                  type="text"
                  placeholder="Folder"
                  className="flex-1 border px-3 py-2 rounded-md text-sm"
                  value={selectedNote.folder || ""}
                  onChange={(e) =>
                    setSelectedNote({ ...selectedNote, folder: e.target.value })
                  }
                />
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
                <span>Created: {selectedNote.createdAt}</span>
                <span>Last Modified: {selectedNote.modifiedAt}</span>
              </div>

              <div className="flex justify-between items-center mt-4">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={selectedNote.is_pinned || false}
                    onChange={(e) =>
                      setSelectedNote({ ...selectedNote, is_pinned: e.target.checked })
                    }
                  />
                  Pin this note
                </label>

                <button
                  onClick={() => {
                    const updatedNote = {
                      ...selectedNote,
                      modifiedAt: new Date().toISOString().slice(0, 16),
                    };
                    const updatedNotes = notes.map((n) =>
                      n.createdAt === selectedNote.createdAt ? updatedNote : n
                    );
                    localStorage.setItem("notes", JSON.stringify(updatedNotes));
                    window.location.reload();
                  }}
                  className="px-5 py-2 text-sm font-medium rounded-md bg-black text-white hover:bg-gray-900 transition"
                >
                  Save Changes
                </button>
              </div>
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

        <div
          className="relative"
          ref={dropdownRef}
          onClick={(e) => e.stopPropagation()}
        >
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

          <MenuModal
            isOpen={dropdownOpen}
            onClose={toggleDropdown}
            width="w-40"
            position="right-0 mt-2"
            items={[
              {
                icon: note.is_pinned ? unpinIcon : pinIcon,
                label: note.is_pinned ? "Unpin" : "Pin",
                // onClick: () => togglePin(item.id),
              },
              {
                icon: editIcon,
                label: "Edit",
                onClick: () => console.log("Edit", note),
              },
              {
                icon: archiveIcon,
                label: "Archive",
                onClick: () => console.log("Archive", note),
              },
              {
                icon: trashIcon,
                label: "Delete",
                warning: true,
                onClick: () => console.log("Delete", note),
              },
            ]}
          />
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
