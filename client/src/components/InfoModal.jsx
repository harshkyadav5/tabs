import React from "react";

export default function InfoModal({ image, onClose }) {
  const close = <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth={2} d="m18 6l-6 6m0 0l-6 6m6-6l6 6m-6-6L6 6" color="currentColor"/></svg>;

  return (
      <div className="absolute top-9 right-2 bg-white/80 backdrop-blur-lg shadow-[0_8px_32px_#00000029] rounded-xl border border-white overflow-hidden z-30 w-[360px] max-w-full p-5">
        <div className="flex items-center mb-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl font-bold"
            aria-label="Close"
          >
            {close}
          </button>
          <h2 className="flex-grow text-center text-lg font-semibold">
            Info
          </h2>
        </div>

        <div className="text-sm text-gray-600 space-y-4">
          <div>
            <p className="text-xs font-medium text-gray-400">Title</p>
            <p className="text-gray-500">{image.title || "No Title"}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400">Web URL</p>
            <p className="text-gray-500 hover:text-blue-500 truncate transition-all duration-200"><a href={image.web_url} target="blank">{image.web_url || "No URL"}</a></p>
          </div>
          <hr className="border-gray-300" />
          <div>
            <p className="font-medium text-gray-800">
              {new Intl.DateTimeFormat("en-US", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              }).format(new Date(image.created_at))}
            </p>
            <p className="text-gray-400 text-sm mt-1">
              {image.file_name || "Unknown"}
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg bg-slate-100/90 p-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Format</span>
              <span className="text-xs px-2 py-0.5 bg-gray-200 rounded">
                {image.format || "PNG"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Resolution</span>
              <span>{image.resolution || image.dimensions || "Unknown"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">File Size</span>
              <span>{image.size || "Unknown"}</span>
            </div>
          </div>
        </div>
      </div>
  );
}
