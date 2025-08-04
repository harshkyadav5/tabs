import React, { useState } from "react";

export default function BookmarkList({ bookmarks }) {
  const [showAll, setShowAll] = useState(false);
  const visibleBookmarks = showAll ? bookmarks : bookmarks.slice(0, 10);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {visibleBookmarks.map((bookmark, i) => (
        <div
          key={i}
          className="border-b pb-5 flex items-start space-x-4 transition duration-200 px-2 py-2"
        >
          <img
            src={`https://www.google.com/s2/favicons?sz=64&domain_url=${bookmark.url}`}
            alt={`${bookmark.title} logo`}
            className="w-6 h-6 mt-1 rounded-sm"
          />

          {/* Bookmark Content */}
          <div className="flex-1">
            {/* Title + Open Link Icon */}
            <div className="flex items-center justify-between mb-1">
              <h2 className="pt-1 text-md font-semibold text-gray-900">{bookmark.title}</h2>
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 transition flex items-center"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7m0 0v7m0-7L10 14" />
                </svg>
              </a>
            </div>

            {/* Views + URL */}
            <div className="flex items-center text-xs text-gray-500 space-x-4">
              {/* Eye icon */}
              <div className="flex items-center space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="currentColor"><path d="M21.544 11.045c.304.426.456.64.456.955c0 .316-.152.529-.456.955C20.178 14.871 16.689 19 12 19c-4.69 0-8.178-4.13-9.544-6.045C2.152 12.529 2 12.315 2 12c0-.316.152-.529.456-.955C3.822 9.129 7.311 5 12 5c4.69 0 8.178 4.13 9.544 6.045"/><path d="M15 12a3 3 0 1 0-6 0a3 3 0 0 0 6 0"/></g></svg>
                <span>{bookmark.views}</span>
              </div>

              {/* Link icon and domain */}
              <div className="flex items-center space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m9.5 14.5l5-5m2.346 5.11l2.61-2.61A5.272 5.272 0 1 0 12 4.544l-2.61 2.61m5.22 9.692L12 19.456A5.272 5.272 0 1 1 4.544 12l2.61-2.61" color="currentColor"/></svg>
                <a href={bookmark.url} className="hover:underline">
                  {bookmark.url}
                </a>
              </div>
            </div>

            {/* Optional Description */}
            {bookmark.description && (
              <p className="text-sm text-gray-600 mt-2">{bookmark.description}</p>
            )}
          </div>
        </div>
      ))}

      {/* View All Toggle */}
      {bookmarks.length > 10 && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="text-sm font-medium text-gray-700 hover:underline"
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        </div>
      )}
    </div>
  );
}
