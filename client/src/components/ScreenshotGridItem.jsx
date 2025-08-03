import React from "react";

export default function ScreenshotGridItem({ screenshot, objectFit, onClick }) {
  return (
    <div
    className="relative w-full aspect-square overflow-hidden rounded"
    >
      <img
        src={screenshot.image_url}
        alt="Screenshot"
        className={`w-full h-full object-${objectFit} transition-all duration-200 cursor-pointer h-fit w-fit`}
        onClick={onClick}
      />
    </div>
  );
}
