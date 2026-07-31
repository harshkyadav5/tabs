const readLocal = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
};

const writeLocal = (key, items) => localStorage.setItem(key, JSON.stringify(items));

// Mirrors the entity types the real archive/trash backend supports.
// Screenshots have no archive feature (matching ScreenshotGallery.jsx / the
// backend, which never sets is_archived on screenshots), only trash.
const ENTITY_KEYS = {
  bookmark: { key: "bookmarks", supportsArchive: true },
  note: { key: "notes", supportsArchive: true },
  clipboard: { key: "tabs_clipboard", supportsArchive: true },
  color: { key: "saved_colors", supportsArchive: true },
  screenshot: { key: "screenshots", supportsArchive: false },
};

export const getLocalArchivedItems = () => {
  const items = [];
  for (const [entity_type, { key, supportsArchive }] of Object.entries(ENTITY_KEYS)) {
    if (!supportsArchive) continue;
    readLocal(key)
      .filter((item) => item.is_archived)
      .forEach((item) => items.push({ ...item, entity_type }));
  }
  return items.sort((a, b) => new Date(b.archived_at || 0) - new Date(a.archived_at || 0));
};

export const getLocalTrashedItems = () => {
  const items = [];
  for (const [entity_type, { key }] of Object.entries(ENTITY_KEYS)) {
    readLocal(key)
      .filter((item) => item.is_deleted)
      .forEach((item) => items.push({ ...item, entity_type }));
  }
  return items.sort((a, b) => new Date(b.deleted_at || 0) - new Date(a.deleted_at || 0));
};

export const localUnarchiveItem = (entityType, id) => {
  const { key } = ENTITY_KEYS[entityType];
  const all = readLocal(key).map((item) =>
    item.id === id ? { ...item, is_archived: false } : item
  );
  writeLocal(key, all);
};

export const localRestoreItem = (entityType, id) => {
  const { key } = ENTITY_KEYS[entityType];
  const all = readLocal(key).map((item) =>
    item.id === id ? { ...item, is_deleted: false } : item
  );
  writeLocal(key, all);
};

export const localDeleteForever = (entityType, id) => {
  const { key } = ENTITY_KEYS[entityType];
  const all = readLocal(key).filter((item) => item.id !== id);
  writeLocal(key, all);
};
