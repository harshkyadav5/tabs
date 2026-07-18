import React, { useState, useEffect } from "react";
import FolderItem from "../components/FolderItem";
import NotesList from "../components/NotesList";
import Modal from "../components/ui/Modal";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  togglePin,
  getNoteFolders,
  createNoteFolder,
} from "../services/noteService";
import { AddNoteIcon, AddFolderIcon, FolderIcon, StarIcon } from "../components/icons";

const addNoteIcon = <AddNoteIcon />;
const addFolderIcon = <AddFolderIcon />;
const folderIcon = <FolderIcon />;
const starIcon = <StarIcon />;

const FAVORITES_FILTER = "favorites";
const LOCAL_NOTES_KEY = "notes";
const LOCAL_NOTE_FOLDERS_KEY = "note_folders";

const readLocal = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
};

const normalizeTags = (tagsInput) =>
  tagsInput
    ? tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
        .map((t) => (t.startsWith("#") ? t : `#${t}`))
    : [];

const EMPTY_FORM = { title: "", content: "", tagsInput: "", folder_id: "", is_pinned: false };

export default function Notes() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const isLoggedIn = !!user;

  const [notes, setNotes] = useState([]);
  const [folders, setFolders] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);

  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const folderScrollRef = React.useRef(null);

  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteForm, setNoteForm] = useState(EMPTY_FORM);
  const [noteFormErrors, setNoteFormErrors] = useState({});

  const [showFolderModal, setShowFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const handleScroll = () => {
    const el = folderScrollRef.current;
    if (!el) return;

    const scrollLeft = el.scrollLeft;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;

    setAtStart(scrollLeft <= 1);
    setAtEnd(scrollLeft >= maxScrollLeft - 1);
  };

  useEffect(() => {
    const el = folderScrollRef.current;
    if (!el) return;

    handleScroll();
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (isLoggedIn) {
        try {
          const [noteData, folderData] = await Promise.all([
            getNotes({ is_deleted: false, is_archived: false }),
            getNoteFolders(),
          ]);
          setNotes(noteData || []);
          setFolders(folderData || []);
        } catch (err) {
          showToast(err.message || "Failed to load notes", "error");
        }
      } else {
        const localNotes = readLocal(LOCAL_NOTES_KEY).filter(
          (n) => !n.is_deleted && !n.is_archived
        );
        setNotes(localNotes);
        setFolders(readLocal(LOCAL_NOTE_FOLDERS_KEY));
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const openAddNoteModal = () => {
    setNoteForm(EMPTY_FORM);
    setNoteFormErrors({});
    setShowNoteModal(true);
  };

  const handleSubmitNote = async () => {
    if (!noteForm.title.trim()) {
      setNoteFormErrors({ title: "Title is required" });
      return;
    }

    const payload = {
      title: noteForm.title.trim(),
      content: noteForm.content.trim() || null,
      folder_id: noteForm.folder_id ? Number(noteForm.folder_id) : null,
      tags: normalizeTags(noteForm.tagsInput),
      is_pinned: noteForm.is_pinned,
    };

    setSubmitting(true);
    try {
      if (isLoggedIn) {
        const created = await createNote(payload);
        setNotes((prev) => [created, ...prev]);
      } else {
        const now = new Date().toISOString();
        const all = readLocal(LOCAL_NOTES_KEY);
        const newNote = {
          id: Date.now(),
          ...payload,
          is_archived: false,
          is_deleted: false,
          created_at: now,
          modified_at: now,
        };
        localStorage.setItem(LOCAL_NOTES_KEY, JSON.stringify([newNote, ...all]));
        setNotes((prev) => [newNote, ...prev]);
      }
      showToast("Note added", "success");
      setShowNoteModal(false);
    } catch (err) {
      showToast(err.message || "Failed to save note", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitFolder = async () => {
    if (!newFolderName.trim()) return;

    setSubmitting(true);
    try {
      if (isLoggedIn) {
        const created = await createNoteFolder({ name: newFolderName.trim() });
        setFolders((prev) => [...prev, created]);
      } else {
        const all = readLocal(LOCAL_NOTE_FOLDERS_KEY);
        const newFolder = { id: Date.now(), name: newFolderName.trim() };
        localStorage.setItem(LOCAL_NOTE_FOLDERS_KEY, JSON.stringify([...all, newFolder]));
        setFolders((prev) => [...prev, newFolder]);
      }
      showToast("Folder created", "success");
      setNewFolderName("");
      setShowFolderModal(false);
    } catch (err) {
      showToast(err.message || "Failed to create folder", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePin = async (note) => {
    const nextPinned = !note.is_pinned;
    try {
      if (isLoggedIn) {
        const updated = await togglePin(note.id, nextPinned);
        setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
      } else {
        const now = new Date().toISOString();
        const all = readLocal(LOCAL_NOTES_KEY);
        const updatedAll = all.map((n) =>
          n.id === note.id ? { ...n, is_pinned: nextPinned, modified_at: now } : n
        );
        localStorage.setItem(LOCAL_NOTES_KEY, JSON.stringify(updatedAll));
        setNotes((prev) =>
          prev.map((n) => (n.id === note.id ? { ...n, is_pinned: nextPinned, modified_at: now } : n))
        );
      }
    } catch (err) {
      showToast(err.message || "Failed to update note", "error");
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      if (isLoggedIn) {
        await deleteNote(id);
      } else {
        const all = readLocal(LOCAL_NOTES_KEY);
        const updatedAll = all.map((n) => (n.id === id ? { ...n, is_deleted: true } : n));
        localStorage.setItem(LOCAL_NOTES_KEY, JSON.stringify(updatedAll));
      }
      setNotes((prev) => prev.filter((n) => n.id !== id));
      showToast("Note deleted", "success");
    } catch (err) {
      showToast(err.message || "Failed to delete note", "error");
    }
  };

  const handleUpdateNote = async (id, updates) => {
    try {
      if (isLoggedIn) {
        const updated = await updateNote(id, updates);
        setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
      } else {
        const now = new Date().toISOString();
        const all = readLocal(LOCAL_NOTES_KEY);
        const updatedAll = all.map((n) =>
          n.id === id ? { ...n, ...updates, modified_at: now } : n
        );
        localStorage.setItem(LOCAL_NOTES_KEY, JSON.stringify(updatedAll));
        setNotes((prev) =>
          prev.map((n) => (n.id === id ? { ...n, ...updates, modified_at: now } : n))
        );
      }
      showToast("Note updated", "success");
    } catch (err) {
      showToast(err.message || "Failed to update note", "error");
    }
  };

  const toggleFilter = (value) => {
    setActiveFilter((prev) => (prev === value ? null : value));
  };

  const filteredNotes = notes.filter((n) => {
    if (activeFilter === FAVORITES_FILTER) return n.is_pinned;
    if (activeFilter != null) return n.folder_id === activeFilter;
    return true;
  });

  return (
    <aside className="w-full font-montserrat">
      <div className="w-full rounded-panel mb-8">
        <div className="px-4 w-full flex justify-end">
          <div className="flex items-center border border-gray-400 bg-white/70 rounded-full p-3">
            <button
              className="p-2 hover:bg-black/85 text-gray-800 hover:text-white rounded-full transition duration-200"
              onClick={openAddNoteModal}
              aria-label="Add note"
            >
              {addNoteIcon}
            </button>
            <div className="h-6 w-px bg-gray-300 mx-2" />
            <button
              className="p-2 hover:bg-black/85 text-gray-800 hover:text-white rounded-full transition duration-200"
              onClick={() => {
                setNewFolderName("");
                setShowFolderModal(true);
              }}
              aria-label="Add folder"
            >
              {addFolderIcon}
            </button>
          </div>
        </div>
      </div>

      <div className="w-full rounded-panel mb-8 p-4 bg-white shadow-card">
        <div className="pb-4 flex justify-end">
          <button
            onClick={() => setActiveFilter(null)}
            className="px-4 py-2 text-sm font-medium rounded-full text-gray-800 hover:bg-black/85 hover:text-white transition duration-200"
          >
            View All
          </button>
        </div>

        <div
          ref={folderScrollRef}
          className={`flex overflow-x-auto whitespace-nowrap space-x-4 px-4 pt-0 pb-10 transition-all duration-200 ${
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
            icon={folderIcon}
            overlay={starIcon}
            label="Favorite"
            tooltip="Pinned notes"
            active={activeFilter === FAVORITES_FILTER}
            onClick={() => toggleFilter(FAVORITES_FILTER)}
          />
          {folders.map((folder) => (
            <FolderItem
              key={folder.id}
              icon={folderIcon}
              overlay={folder.name.charAt(0).toUpperCase()}
              label={folder.name}
              tooltip={folder.name}
              active={activeFilter === folder.id}
              onClick={() => toggleFilter(folder.id)}
            />
          ))}
        </div>
      </div>

      <NotesList
        notes={filteredNotes}
        folders={folders}
        onDeleteNote={handleDeleteNote}
        onTogglePin={handleTogglePin}
        onUpdateNote={handleUpdateNote}
        emptyAtAll={notes.length === 0}
      />

      {/* Add Folder Modal */}
      <Modal
        open={showFolderModal}
        onClose={() => setShowFolderModal(false)}
        title="Create Folder"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowFolderModal(false)}>
              Cancel
            </Button>
            <Button loading={submitting} onClick={handleSubmitFolder}>
              Create
            </Button>
          </>
        }
      >
        <Input
          label="Folder name"
          type="text"
          placeholder="Enter folder name"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
      </Modal>

      {/* Add Note Modal */}
      <Modal
        open={showNoteModal}
        onClose={() => setShowNoteModal(false)}
        title="New Note"
        className="max-w-2xl"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowNoteModal(false)}>
              Cancel
            </Button>
            <Button loading={submitting} onClick={handleSubmitNote}>
              Add Note
            </Button>
          </>
        }
      >
        <Input
          label="Title"
          type="text"
          placeholder="Note title"
          value={noteForm.title}
          onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
          error={noteFormErrors.title}
        />
        <div className="mb-4">
          <label htmlFor="note-content" className="block pl-3 text-sm font-medium text-black mb-1">
            Content
          </label>
          <textarea
            id="note-content"
            rows={5}
            placeholder="Write your note here..."
            value={noteForm.content}
            onChange={(e) => setNoteForm({ ...noteForm, content: e.target.value })}
            className="w-full px-4 py-3 rounded-card tracking-wider border border-gray-300 bg-white text-black outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>
        <Input
          label="Tags"
          type="text"
          placeholder="Comma separated, e.g. idea, todo"
          value={noteForm.tagsInput}
          onChange={(e) => setNoteForm({ ...noteForm, tagsInput: e.target.value })}
        />
        <div className="mb-1">
          <label htmlFor="note-folder" className="block pl-3 text-sm font-medium text-black mb-1">
            Folder
          </label>
          <select
            id="note-folder"
            value={noteForm.folder_id}
            onChange={(e) => setNoteForm({ ...noteForm, folder_id: e.target.value })}
            className="w-full px-4 py-3 rounded-card tracking-wider border border-gray-300 bg-white text-black outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">No folder</option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>
        <label className="flex items-center gap-2 mt-4 pl-3 text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={noteForm.is_pinned}
            onChange={(e) => setNoteForm({ ...noteForm, is_pinned: e.target.checked })}
          />
          Pin this note
        </label>
      </Modal>
    </aside>
  );
}
