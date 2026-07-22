import React from "react";
import { HeartIcon } from "./icons";

export default function ScreenshotGridItem({ screenshot, objectFit, onClick }) {
  return (
    <div
    className="relative w-full aspect-square overflow-hidden rounded"
    >
      {screenshot.is_favorite && (
        <HeartIcon className="absolute top-2 right-2 w-4 h-4 text-red-500 drop-shadow" />
      )}
      <img
        src={screenshot.image_url}
        alt="Screenshot"
        className={`w-full h-full object-${objectFit} transition-all duration-200 cursor-pointer h-fit w-fit`}
        onClick={onClick}
      />
    </div>
  );
}
