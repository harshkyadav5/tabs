import React, { useState } from "react";
import { icons } from "../components/icons";
import Navbar from "../components/Navbar";
import Dropdown from "../components/Dropdown";

export default function Notes() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [tagsInput, setTagsInput] = useState("");
  const [tags, setTags] = useState([]);

  const folders = [
    { value: "1", label: "Work" },
    { value: "2", label: "Personal" },
    { value: "3", label: "dsfvdf" },
    { value: "4", label: "Persdfvonal" },
    { value: "5", label: "b" },
    { value: "6", label: "hjmhmj" },
    { value: "7", label: "hjmgh" },
    { value: "8", label: "rtgvrve" },
    { value: "9", label: "tytyr" },
  ];

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

        <h2 className="text-lg font-semibold text-slate-800 mb-4">Create Note</h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block pl-3 text-sm font-medium mb-1 text-slate-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="w-full px-3 py-2 text-base rounded-xl border border-slate-300 bg-white/70 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        {/* Content */}
        <div className="mb-4">
          <label className="block pl-3 text-sm font-medium mb-1 text-slate-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter note content..."
            rows={4}
            className="w-full px-3 py-2 text-base rounded-xl border border-slate-300 bg-white/70 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
          />
        </div>

        {/* Folder & Tags Row */}
        <div className="flex gap-4 mb-4">
          {/* Folder */}
          <div className="flex-1">
            <label className="block pl-3 text-sm font-medium mb-1 text-slate-700">Folder</label>
            <Dropdown
              options={folders}
              selected={selectedFolder}
              onSelect={setSelectedFolder}
              placeholder="Select folder"
              className="w-full text-base"
            />
          </div>

          {/* Tags */}
          <div className="flex-1">
            <label className="block pl-3 text-sm font-medium mb-1 text-slate-700">Tags</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Type and press Enter"
              className="w-full px-3 py-2 text-base rounded-xl border border-slate-300 bg-white/70 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Tag Chips */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-sm"
              >
                {icons['tags']}
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="text-amber-500 hover:text-red-500 text-xs"
                >
                  {icons['cross']}
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Submit (disabled for now) */}
        <div className="flex justify-end">
          <div className="relative group w-fit rounded-3xl">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400 via-orange-400 to-amber-500 blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-0 pointer-events-none" />

            <button
              className="relative z-10 w-full cursor-not-allowed flex items-center justify-center gap-2 px-4 py-2 bg-amber-200 text-amber-950 hover:bg-amber-300 font-medium text-base tracking-wide rounded-3xl shadow-md border border-yellow-300/50 backdrop-blur-sm transition-all duration-200"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}