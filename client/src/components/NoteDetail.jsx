import React, { useState } from "react";
import ConfirmDialog from "./ui/ConfirmDialog";
import { BackIcon, EditIcon, PinIcon, UnpinIcon, TrashIcon } from "./icons";

const tagColors = {
  "#idea": "bg-blue-100 text-blue-800",
  "#todo": "bg-yellow-100 text-yellow-800",
  "#draft": "bg-gray-100 text-gray-700",
};

const normalizeTags = (tagsInput) =>
  tagsInput
    ? tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
        .map((t) => (t.startsWith("#") ? t : `#${t}`))
    : [];

export default function NoteDetail({
  note,
  folders = [],
  startInEdit = false,
  onBack,
  onUpdateNote,
  onDeleteNote,
  onTogglePin,
}) {
  const [isEditing, setIsEditing] = useState(startInEdit);
  const [draft, setDraft] = useState(() =>
    startInEdit ? { ...note, tagsInput: (note.tags || []).join(", ") } : null
  );
  const [confirmOpen, setConfirmOpen] = useState(false);

  const folderName = folders.find((f) => f.id === note.folder_id)?.name;

  const startEditing = () => {
    setDraft({ ...note, tagsInput: (note.tags || []).join(", ") });
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setDraft(null);
    setIsEditing(false);
  };

  const saveEditing = () => {
    const updates = {
      title: draft.title.trim(),
      content: (draft.content || "").trim() || null,
      tags: normalizeTags(draft.tagsInput),
      folder_id: draft.folder_id ? Number(draft.folder_id) : null,
      is_pinned: draft.is_pinned,
    };

    const hasChanges =
      updates.title !== note.title ||
      updates.content !== (note.content || null) ||
      updates.folder_id !== (note.folder_id ?? null) ||
      updates.is_pinned !== !!note.is_pinned ||
      JSON.stringify(updates.tags) !== JSON.stringify(note.tags || []);

    if (hasChanges) {
      onUpdateNote?.(note.id, updates);
    }
    setDraft(null);
    setIsEditing(false);
  };

  return (
    <div className="w-full font-montserrat tracking-wide">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          title="Back"
          aria-label="Back"
          className="p-2 rounded-full text-gray-700 hover:bg-gray-200 transition"
        >
          <BackIcon />
        </button>

        {!isEditing && (
          <div className="flex items-center gap-1 text-gray-700">
            <button
              onClick={() => onTogglePin?.(note)}
              title={note.is_pinned ? "Unpin" : "Pin"}
              aria-label={note.is_pinned ? "Unpin" : "Pin"}
              className="p-2 rounded-full hover:bg-gray-200 transition"
            >
              {note.is_pinned ? <UnpinIcon /> : <PinIcon />}
            </button>
            <button
              onClick={startEditing}
              title="Edit"
              aria-label="Edit"
              className="p-2 rounded-full hover:bg-gray-200 transition"
            >
              <EditIcon />
            </button>
            <button
              onClick={() => setConfirmOpen(true)}
              title="Delete"
              aria-label="Delete"
              className="p-2 rounded-full hover:bg-gray-200 text-danger transition"
            >
              <TrashIcon />
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-card border border-gray-100 shadow-card p-6 max-w-3xl mx-auto">
        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              className="w-full text-xl font-semibold text-gray-900 border-b focus:outline-none pb-1"
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            />

            <textarea
              className="w-full min-h-[200px] p-3 border rounded-btn text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800"
              value={draft.content || ""}
              onChange={(e) => setDraft({ ...draft, content: e.target.value })}
            />

            <div className="flex flex-wrap gap-2">
              <input
                type="text"
                placeholder="Tags (comma-separated)"
                className="flex-1 border px-3 py-2 rounded-btn text-sm"
                value={draft.tagsInput}
                onChange={(e) => setDraft({ ...draft, tagsInput: e.target.value })}
              />

              <select
                className="flex-1 border px-3 py-2 rounded-btn text-sm"
                value={draft.folder_id != null ? String(draft.folder_id) : ""}
                onChange={(e) => setDraft({ ...draft, folder_id: e.target.value })}
              >
                <option value="">No folder</option>
                {folders.map((folder) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
              </select>
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={draft.is_pinned || false}
                onChange={(e) => setDraft({ ...draft, is_pinned: e.target.checked })}
              />
              Pin this note
            </label>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={cancelEditing}
                className="px-5 py-2 text-sm font-medium rounded-btn border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={saveEditing}
                className="px-5 py-2 text-sm font-medium rounded-btn bg-black text-white hover:bg-gray-900 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold text-gray-900">{note.title}</h1>
            <p className="text-gray-800 whitespace-pre-wrap">{note.content}</p>

            {(note.tags?.length > 0 || folderName) && (
              <div className="flex flex-wrap gap-2">
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
            )}

            <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
              <span>Created: {note.created_at ? new Date(note.created_at).toLocaleString() : "—"}</span>
              <span>Last Modified: {note.modified_at ? new Date(note.modified_at).toLocaleString() : "—"}</span>
            </div>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete this note?"
        message="This can't be undone."
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          onDeleteNote?.(note.id);
          setConfirmOpen(false);
          onBack?.();
        }}
      />
    </div>
  );
}
