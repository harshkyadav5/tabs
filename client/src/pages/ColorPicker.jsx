import React, { useState } from "react";
import ColorCard from "../components/ColorCard";

const colors = [
  {
    id: 1,
    hex_code: "#FF6B6B",
    rgb_code: "rgb(255,107,107)",
    label: "error",
    created_at: "2025-07-25",
    modified_at: "2025-07-28",
  },
  {
    id: 2,
    hex_code: "#4ECDC4",
    rgb_code: "rgb(78,205,196)",
    label: "primary",
    created_at: "2025-07-20",
    modified_at: "2025-07-29",
  },
  {
    id: 3,
    hex_code: "#F7FFF7",
    rgb_code: "rgb(247,255,247)",
    label: "background",
    created_at: "2025-07-22",
    modified_at: "2025-07-27",
  },
];

export default function ColorPicker() {
  const [savedColors, setSavedColors] = useState(colors);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Saved Colors</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {savedColors.map((color) => (
          <ColorCard key={color.id} color={color} />
        ))}
      </div>
    </div>
  );
}
