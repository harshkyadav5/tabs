const readLocal = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
};

const matches = (text, term) => (text || "").toLowerCase().includes(term);

export const getLocalSearchStats = () => {
  const bookmarks = readLocal("bookmarks").filter((b) => !b.is_deleted && !b.is_archived);
  const notes = readLocal("notes").filter((n) => !n.is_deleted && !n.is_archived);
  const clipboard = readLocal("tabs_clipboard").filter((c) => !c.is_deleted && !c.is_archived);
  const screenshots = readLocal("screenshots").filter((s) => !s.is_deleted);
  const colors = readLocal("saved_colors").filter((c) => !c.is_archived);

  return {
    total_bookmarks: bookmarks.length,
    total_notes: notes.length,
    total_clipboard: clipboard.length,
    total_screenshots: screenshots.length,
    total_colors: colors.length,
    total_music: 0,
  };
};

export const getLocalSearchSuggestions = (query, limit = 8) => {
  const term = query.trim().toLowerCase();
  if (!term) return [];

  const notes = readLocal("notes").filter((n) => !n.is_deleted && !n.is_archived);
  const bookmarks = readLocal("bookmarks").filter(
    (b) => !b.is_deleted && !b.is_archived && matches(b.title || b.url, term)
  );
  const matchingNotes = notes.filter((n) => matches(n.title, term));

  const tagSet = new Set();
  notes.forEach((n) => (n.tags || []).forEach((t) => matches(t, term) && tagSet.add(t)));

  const suggestions = [
    ...bookmarks.map((b) => ({ type: "bookmark", text: b.title || b.url, category: "Bookmark" })),
    ...matchingNotes.map((n) => ({ type: "note", text: n.title, category: "Note" })),
    ...[...tagSet].map((t) => ({ type: "tag", text: t, category: "Tag" })),
  ];

  return suggestions.slice(0, limit);
};

export const searchLocal = (query, filters = []) => {
  const term = query.trim().toLowerCase();
  const activeFilters =
    filters.length > 0
      ? filters
      : ["bookmarks", "notes", "clipboard", "screenshots", "colors", "music"];

  const results = {};
  let total = 0;

  if (activeFilters.includes("bookmarks")) {
    results.bookmarks = readLocal("bookmarks").filter(
      (b) =>
        !b.is_deleted &&
        !b.is_archived &&
        (matches(b.title, term) || matches(b.url, term) || matches(b.description, term))
    );
    total += results.bookmarks.length;
  }

  if (activeFilters.includes("notes")) {
    results.notes = readLocal("notes").filter(
      (n) => !n.is_deleted && !n.is_archived && (matches(n.title, term) || matches(n.content, term))
    );
    total += results.notes.length;
  }

  if (activeFilters.includes("clipboard")) {
    results.clipboard = readLocal("tabs_clipboard").filter(
      (c) =>
        !c.is_deleted &&
        !c.is_archived &&
        (matches(c.description, term) || matches(c.content, term))
    );
    total += results.clipboard.length;
  }

  if (activeFilters.includes("screenshots")) {
    results.screenshots = readLocal("screenshots").filter(
      (s) => !s.is_deleted && matches(s.web_url, term)
    );
    total += results.screenshots.length;
  }

  if (activeFilters.includes("colors")) {
    results.colors = readLocal("saved_colors").filter(
      (c) =>
        !c.is_archived &&
        (matches(c.label, term) || matches(c.hex_code, term) || (c.tags || []).some((t) => matches(t, term)))
    );
    total += results.colors.length;
  }

  if (activeFilters.includes("music")) {
    results.music = [];
  }

  return { query: query.trim(), filters: activeFilters, total, results };
};
