import React from "react";
import { HexColorPicker, RgbColorPicker } from "react-colorful";

export default function ColorInput({
  color,
  onChange,
  format = "hex",
  showInputs = true
}) {
  return (
    <div className="w-full max-w-sm rounded-2xl bg-white/10 backdrop-blur-lg p-4 shadow-lg border border-white/20">
      <div className="mb-4">
        {format === "hex" ? (
          <HexColorPicker color={color} onChange={onChange} />
        ) : (
          <RgbColorPicker color={color} onChange={onChange} />
        )}
      </div>

      <div
        className="h-12 w-full rounded-lg border border-white/30"
        style={{ backgroundColor: format === "hex" ? color : `rgb(${color.r},${color.g},${color.b})` }}
      ></div>

      {showInputs && format === "hex" && (
        <input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="mt-3 w-full rounded-lg border border-white/30 bg-white/10 p-2 text-center text-white placeholder-white/60 focus:outline-none"
          placeholder="#FFFFFF"
        />
      )}
      {showInputs && format === "rgb" && (
        <div className="flex gap-2 mt-3">
          {["r", "g", "b"].map((key) => (
            <input
              key={key}
              type="number"
              value={color[key]}
              min="0"
              max="255"
              onChange={(e) => onChange({ ...color, [key]: parseInt(e.target.value) || 0 })}
              className="w-1/3 rounded-lg border border-white/30 bg-white/10 p-2 text-center text-white focus:outline-none"
              placeholder={key.toUpperCase()}
            />
          ))}
        </div>
      )}
    </div>
  );
}
