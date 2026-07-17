const fromLS = (key) => {
  try { return JSON.parse(localStorage.getItem(key)) || []; }
  catch { return []; }
};

export const buildLocalSuggestions = () => {
  const bookmarks = fromLS("bookmarks").filter(b => !b.is_deleted && !b.is_archived);
  const notes = fromLS("notes").filter(n => !n.is_deleted && !n.is_archived);
  const clipboard = fromLS("clipboard_items").filter(c => !c.is_deleted);
  const screenshots = fromLS("screenshots").filter(s => !s.is_deleted);
  const colors = fromLS("saved_colors");
  const music = fromLS("music").filter(m => !m.is_deleted);

  const sortByDate = (arr, k="modified_at") =>
    [...arr].sort((a,b) => new Date(b?.[k] || 0) - new Date(a?.[k] || 0));

  const mostVisited = [...bookmarks]
    .sort((a,b) => (b.view_count||0) - (a.view_count||0))[0] || null;

  const savedButUnopened = bookmarks
    .filter(b => (b.view_count||0) === 0)
    .sort((a,b) => new Date(b.created_at||0) - new Date(a.created_at||0))[0] || null;

  const recentNote = sortByDate(notes)[0] || null;
  const todoNote = notes
    .filter(n => Array.isArray(n.tags) && n.tags.some(t => ["todo","to-do","task"].includes((t||"").replace(/^#/, "").toLowerCase())))
    .sort((a,b) => new Date(b.modified_at||0) - new Date(a.modified_at||0))[0] || null;

  const pinnedClipboard = clipboard.filter(c => c.is_pinned).sort((a,b) =>
    new Date(b.modified_at||0) - new Date(a.modified_at||0))[0] || null;
  const recentClipboard = sortByDate(clipboard)[0] || null;

  const favoriteScreenshot = screenshots.filter(s => s.is_favorite)
    .sort((a,b) => new Date(b.modified_at||0) - new Date(a.modified_at||0))[0] || null;
  const recentScreenshot = [...screenshots]
    .sort((a,b) => new Date(b.created_at||0) - new Date(a.created_at||0))[0] || null;

  const latestColor = [...colors]
    .sort((a,b) => new Date(b.created_at||0) - new Date(a.created_at||0))[0] || null;

  const favoriteMusic = music.filter(m => m.is_favorite)
    .sort((a,b) => new Date(b.created_at||0) - new Date(a.created_at||0))[0] || null;
  const recentMusic = [...music]
    .sort((a,b) => new Date(b.created_at||0) - new Date(a.created_at||0))[0] || null;

  return {
    bookmarks: { mostVisited, savedButUnopened },
    notes: { recent: recentNote, todo: todoNote },
    clipboard: { pinned: pinnedClipboard, recent: recentClipboard },
    screenshots: { favorite: favoriteScreenshot, recent: recentScreenshot },
    colors: { latest: latestColor },
    music: { favorite: favoriteMusic, recent: recentMusic },
  };
};
