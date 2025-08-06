import React, { useState } from "react";
import ScreenshotGridItem from "../components/ScreenshotGridItem";
import ScreenshotViewer from "./ScreenshotViewer";

const dummyScreenshots = [
  {
    id: 1,
    web_url: "https://unsplash.com/photos/twitter-website-on-desktop-2Bdyxgz3OM0",
    image_url: "https://images.unsplash.com/photo-1566241477600-ac026ad43874?q=80&w=2046&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    created_at: "2025-08-01T10:30:00Z",
    modified_at: "2025-08-01T10:30:00Z",
    size: "1.2 MB",
    resolution: "600 x 400",
  },
  {
    id: 2,
    web_url: "https://unsplash.com/photos/github-website-on-desktop-LG8ToawE8WQ",
    image_url: "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?q=80&w=2216&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    created_at: "2025-08-02T12:00:00Z",
    modified_at: "2025-08-02T12:00:00Z",
    size: "980 KB",
    resolution: "500 x 300",
  },
  {
    id: 3,
    web_url: "https://unsplash.com/photos/persons-eye-in-grayscale-zdiMKVb5fl0",
    image_url: "https://images.unsplash.com/photo-1602738328654-51ab2ae6c4ff?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    created_at: "2025-08-02T12:00:00Z",
    modified_at: "2025-08-02T12:00:00Z",
    size: "980 KB",
    resolution: "500 x 300",
  },
  {
    id: 4,
    web_url: "https://unsplash.com/photos/person-standing-on-desert-land-6kbFSu5EvU0",
    image_url: "https://images.unsplash.com/photo-1519093560741-46c36f8c65a0?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    created_at: "2025-08-02T12:00:00Z",
    modified_at: "2025-08-02T12:00:00Z",
    size: "980 KB",
    resolution: "500 x 300",
    device: "Samsung SM-A528B",
  },
  {
    id: 5,
    web_url: "https://unsplash.com/photos/photography-of-tree-Jrl_UQcZqOc",
    image_url: "https://images.unsplash.com/photo-1520262494112-9fe481d36ec3?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    created_at: "2025-08-02T12:00:00Z",
    modified_at: "2025-08-02T12:00:00Z",
    size: "980 KB",
    resolution: "500 x 300",
    device: "Samsung SM-A528B",
  },
];

export default function ScreenshotGallery() {
  const [objectFit, setObjectFit] = useState("contain");
  const [activeImage, setActiveImage] = useState(null);

  const toggleFit = () => {
    setObjectFit((prev) => (prev === "contain" ? "cover" : "contain"));
  };

  return (
  <div className="max-w-6xl mx-auto">
    {activeImage ? (
      <ScreenshotViewer image={activeImage} onBack={() => setActiveImage(null)} />
    ) : (
      <>
        {/* Header + toggle */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Screenshots</h1>
          <button
            onClick={toggleFit}
            className="px-4 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300"
          >
            Switch to {objectFit === "contain" ? "Cover" : "Contain"}
          </button>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {dummyScreenshots.map((screenshot) => (
            <ScreenshotGridItem
              key={screenshot.id}
              screenshot={screenshot}
              objectFit={objectFit}
              onClick={() => setActiveImage(screenshot)}
            />
          ))}
        </div>
      </>
    )}
  </div>
);

}
