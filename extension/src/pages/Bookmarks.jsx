import React, { useState, useEffect } from "react";
import { icons } from "../components/icons";
import Navbar from "../components/Navbar";
import Dropdown from "../components/Dropdown";

export default function Bookmarks() {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [favicon, setFavicon] = useState("");
  const [description, setDescription] = useState("");
  const [folder, setFolder] = useState(null);
  const [tagsInput, setTagsInput] = useState("");
  const [tags, setTags] = useState([]);

  const folders = [
    { value: "1", label: "Work" },
    { value: "2", label: "Personal" },
    { value: "3", label: "Read Later" },
  ];

  useEffect(() => {
    if (chrome?.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          setUrl(tabs[0].url || "");
          setTitle(tabs[0].title || "");
          setFavicon(
            tabs[0].favIconUrl ||
              `https://www.google.com/s2/favicons?sz=64&domain_url=${tabs[0].url}`
          );
        }
      });
    }
  }, []);

  const handleAddTag = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = tagsInput.trim().replace(/,$/, "");
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagsInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="bg-slate-100 relative w-[600px] p-5 overflow-hidden font-montserrat">
      <div className="z-10 p-8 rounded-2xl bg-white shadow-lg h-full">
        <Navbar />

        <h2 className="text-lg font-semibold text-slate-800 mb-4">Add Bookmark</h2>

        {/* URL + favicon */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-slate-700">URL</label>
          <div className="flex items-center gap-3 bg-white/70 border border-slate-300 rounded-xl px-3 py-2 focus-within:ring-1 focus-within:ring-indigo-500">
            {favicon && (
              <img
                src={favicon}
                alt={`${title || url} logo`}
                className="w-7 h-7 rounded-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] object-contain"
              />
            )}
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 bg-transparent outline-none text-base"
            />
          </div>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block pl-3 text-sm font-medium mb-1 text-slate-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 text-base rounded-xl border border-slate-300 bg-white/70 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block pl-3 text-sm font-medium mb-1 text-slate-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 text-base rounded-xl border border-slate-300 bg-white/70 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
          />
        </div>

        {/* Folder & Tags */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block pl-3 text-sm font-medium mb-1 text-slate-700">Folder</label>
            <Dropdown
              options={folders}
              selected={folder}
              onSelect={setFolder}
              placeholder="Select folder"
              className="w-full text-base"
            />
          </div>
          <div className="flex-1">
            <label className="block pl-3 text-sm font-medium mb-1 text-slate-700">Tags</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              onKeyDown={handleAddTag}
              className="w-full px-3 py-2 text-base rounded-xl border border-slate-300 bg-white/70 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Tag Chips */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-sm"
              >
                {icons["tags"]}
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="text-indigo-500 hover:text-red-500 text-xs"
                >
                  {icons["cross"]}
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Save button */}
        <div className="flex justify-end">
          <div className="relative group w-fit rounded-3xl">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500 via-blue-400 to-indigo-300 blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300 z-0 pointer-events-none" />
            <button className="relative z-10 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-400 text-indigo-950 hover:text-indigo-200 hover:bg-indigo-500 font-medium text-base tracking-wide rounded-3xl shadow-md border border-indigo-500/50 backdrop-blur-sm transition-all duration-200">
              Save Bookmark
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
