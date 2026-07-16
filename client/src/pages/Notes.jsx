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

const addNoteIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24">
    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
      d="M16 2v2m-5-2v2M6 2v2m13.5 6c0-3.3 0-4.95-1.025-5.975S15.8 3 12.5 3h-3C6.2 3 4.55 3 3.525 4.025S2.5 6.7 2.5 10v5c0 3.3 0 4.95 1.025 5.975S6.2 22 9.5 22h3m5-8v8m4-4h-8M7 15h4m-4-5h8" color="currentColor"/>
  </svg>
);

const addFolderIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24">
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
      d="M18 13.5v8m4-4h-8m-7-11h9.75c2.107 0 3.16 0 3.917.506a3 3 0 0 1
         .827.827c.465.695.502 1.851.505 3.667M12 6.5l-.633-1.267c-.525-1.05-1.005-2.106-2.168-2.542C8.69
         2.5 8.108 2.5 6.944 2.5c-1.816 0-2.724 0-3.406.38A3 3 0 0 0 2.38
         4.038C2 4.72 2 5.628 2 7.444V10.5c0 4.714 0 7.071 1.464 8.535C4.822
         20.394 6.944 20.493 11 20.5"/>
  </svg>
);

const folderIcon = (
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

const starIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24">
    <path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
      d="m13.728 3.444l1.76 3.549c.24.494.88.968 1.42 1.058l3.189.535c2.04.343 2.52 1.835
         1.05 3.307l-2.48 2.5c-.42.423-.65 1.24-.52 1.825l.71 3.095c.56 2.45-.73 3.397-2.88
         2.117l-2.99-1.785c-.54-.322-1.43-.322-1.98 0L8.019 21.43c-2.14 1.28-3.44.322-2.88-2.117l.71-3.095c.13-.585-.1-1.402-.52-1.825l-2.48-2.5C1.39 10.42 1.86 8.929 3.899 8.586l3.19-.535c.53-.09
         1.17-.564 1.41-1.058l1.76-3.549c.96-1.925 2.52-1.925 3.47 0"/>
  </svg>
);

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
