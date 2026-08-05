import React, { useState, useMemo, useRef } from "react";
import MenuModal from "./MenuModal";
import useOutsideClick from "../hooks/useOutsideClick";
import ConfirmDialog from "./ui/ConfirmDialog";
import { PinIcon, UnpinIcon, EditIcon, ArchiveIcon, TrashIcon, EllipsisHorizontalIcon } from "./icons";

const tagColors = {
  "#idea": "bg-blue-100 text-blue-800",
  "#todo": "bg-yellow-100 text-yellow-800",
  "#draft": "bg-gray-100 text-gray-700",
};

const pinIcon = <PinIcon />;
const unpinIcon = <UnpinIcon />;
const editIcon = <EditIcon />;
const archiveIcon = <ArchiveIcon />;
const trashIcon = <TrashIcon />;

export default function NotesList({ notes, folders = [], onDeleteNote, onTogglePin, onOpenNote, onEditNote, emptyAtAll = false }) {
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [sortNewest, setSortNewest] = useState(true);
  const [dropdownNoteIndex, setDropdownNoteIndex] = useState(null);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const dropdownRef = useRef(null);

  useOutsideClick(dropdownRef, () => setDropdownNoteIndex(null));

  const filteredNotes = useMemo(() => {
    let result = [...notes];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          (n.content || "").toLowerCase().includes(q)
      );
    }

    if (tagFilter) {
      result = result.filter((n) => n.tags?.includes(tagFilter));
    }

    result.sort((a, b) => {
      const dateA = new Date(a.modified_at || 0);
      const dateB = new Date(b.modified_at || 0);
      return sortNewest ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [notes, search, tagFilter, sortNewest]);

  const pinned = filteredNotes.filter((n) => n.is_pinned);
  const others = filteredNotes.filter((n) => !n.is_pinned);

  const allTags = Array.from(new Set(notes.flatMap((n) => n.tags || [])));
  const folderName = (folderId) => folders.find((f) => f.id === folderId)?.name;

  return (
    <div className="w-full space-y-8">
      {notes.length > 0 && (
        <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-card border border-gray-200">
          <input
            type="text"
            placeholder="Search notes..."
            className="border px-3 py-2 rounded-btn w-full max-w-sm text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border px-2 py-2 text-sm rounded-btn"
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
          >
            <option value="">All Tags</option>
            {allTags.map((tag, i) => (
              <option key={i} value={tag}>{tag}</option>
            ))}
          </select>
          <button
            onClick={() => setSortNewest((prev) => !prev)}
            className="text-sm px-3 py-2 border rounded-btn"
          >
            {sortNewest ? "Newest First" : "Oldest First"}
          </button>
        </div>
      )}

      {filteredNotes.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500">
            {emptyAtAll
              ? "No notes yet."
              : notes.length === 0
              ? "No notes in this filter."
              : "No notes match your search."}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            {emptyAtAll
              ? "Create your first note to see it here."
              : notes.length === 0
              ? "Try a different folder or clear the filter."
              : "Try a different search term."}
          </p>
        </div>
      )}

      {pinned.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">📌 Pinned</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {pinned.map((note, i) => (
              <NoteCard
                key={note.id}
                note={note}
                folderName={folderName(note.folder_id)}
                onClick={() => onOpenNote?.(note)}
                onEdit={() => onEditNote?.(note)}
                onTogglePin={() => onTogglePin?.(note)}
                onRequestDelete={() => setNoteToDelete(note)}
                dropdownOpen={dropdownNoteIndex === i}
                toggleDropdown={() => setDropdownNoteIndex(dropdownNoteIndex === i ? null : i)}
                dropdownRef={dropdownRef}
              />
            ))}
          </div>
        </div>
      )}

      {others.length > 0 && (
      <div className="grid md:grid-cols-2 gap-4">
        {others.map((note, i) => (
          <NoteCard
            key={note.id}
            note={note}
            folderName={folderName(note.folder_id)}
            onClick={() => onOpenNote?.(note)}
            onEdit={() => onEditNote?.(note)}
            onTogglePin={() => onTogglePin?.(note)}
            onRequestDelete={() => setNoteToDelete(note)}
            dropdownOpen={dropdownNoteIndex === `other-${i}`}
            toggleDropdown={() => setDropdownNoteIndex(dropdownNoteIndex === `other-${i}` ? null : `other-${i}`)}
            dropdownRef={dropdownRef}
          />
        ))}
      </div>
      )}

      <ConfirmDialog
        open={noteToDelete !== null}
        title="Delete this note?"
        message="This can't be undone."
        onCancel={() => setNoteToDelete(null)}
        onConfirm={() => {
          onDeleteNote?.(noteToDelete.id);
          setNoteToDelete(null);
        }}
      />
    </div>
  );
}

function NoteCard({ note, folderName, onClick, onEdit, onTogglePin, onRequestDelete, dropdownOpen, toggleDropdown, dropdownRef }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-card border border-gray-100 shadow-card hover:shadow-card-hover hover:border-gray-300 transition cursor-pointer p-5 relative group"
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
            aria-label="Note options"
            className="text-gray-400 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100"
          >
            <EllipsisHorizontalIcon />
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
                onClick: onTogglePin,
              },
              {
                icon: editIcon,
                label: "Edit",
                onClick: onEdit,
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
                onClick: onRequestDelete,
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
        {folderName && (
          <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-600">
            {folderName}
          </span>
        )}
      </div>
      <div className="text-[11px] text-gray-400">
        Modified: {note.modified_at ? new Date(note.modified_at).toLocaleDateString() : "—"}
      </div>
    </div>
  );
}
