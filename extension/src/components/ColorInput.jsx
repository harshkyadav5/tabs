import React, { useState, useEffect } from "react";
import { HexColorPicker, RgbColorPicker } from "react-colorful";
import { icons } from "./icons";

export default function ColorInput({
  color,
  onChange,
  format = "hex",
  showInputs = true
}) {
  const isPartialHex = (str) => /^#?[0-9A-Fa-f]{0,6}$/i.test(str);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if ('EyeDropper' in window) {
      setIsSupported(true);
    }
  }, []);

  const handleEyeDropper = async () => {
    try {
      const eyeDropper = new EyeDropper();
      const result = await eyeDropper.open();
      if (result && result.sRGBHex) {
        onChange(result.sRGBHex);
      }
    } catch (e) {
      console.error("EyeDropper API failed:", e);
    }
  };

  return (
    <div className="flex w-full max-w-xl gap-4 items-center rounded-2xl bg-white backdrop-blur-lg p-4 text-gray-700">
      <div className="flex-1">
        {format === "hex" ? (
          <HexColorPicker color={color} onChange={onChange} />
        ) : (
          <RgbColorPicker color={color} onChange={onChange} />
        )}
      </div>

      <div className="flex-1 flex flex-col justify-center items-center gap-8">
        <div className="flex items-center p-1 border border-gray-300 rounded-full w-full">
          <div
            className="h-12 w-18 rounded-full border border-black/30"
            style={{ backgroundColor: format === "hex" ? color : `rgb(${color.r},${color.g},${color.b})` }}
          ></div>
          
          {showInputs && (
            <div className="flex flex-1 tracking-wider">
              {format === "hex" ? (
                <input
                  type="text"
                  value={color}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    if (isPartialHex(inputValue)) {
                      onChange(inputValue);
                    }
                  }}
                  className="border-0 w-full text-base text-center text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent"
                  placeholder="#FFFFFF"
                />
              ) : (
                <div className="flex gap-2 w-full">
                  {["r", "g", "b"].map((key) => (
                    <input
                      key={key}
                      type="number"
                      value={color[key]}
                      min="0"
                      max="255"
                      onChange={(e) => {
                        const inputValue = parseInt(e.target.value, 10);
                        if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 255) {
                          onChange({ ...color, [key]: inputValue });
                        }
                      }}
                      className="flex-1 rounded-lg border-0 p-2 text-center text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent"
                      placeholder={key.toUpperCase()}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div>
            <div className="flex gap-2 items-center">
              {isSupported && (
                <div className="relative group">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-400 blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 z-0 pointer-events-none" />
                
                  <button
                    onClick={handleEyeDropper}
                    className="flex items-center gap-2 px-4 py-3 bg-white/60 border border-slate-300/40 rounded-full shadow-md hover:shadow-lg hover:bg-white/80 transition-all backdrop-blur-sm active:scale-95"
                    title="Pick color from screen"
                  >
                    {icons["colorPicker"]}
                    <span className="font-medium text-gray-700 text-base">EyeDropper</span>
                  </button>
                </div>
              )}
            </div>
        </div>
      </div>
    </div>
  );
}
