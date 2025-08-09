import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ColorInput from "../components/ColorInput";
import { icons } from "../components/icons";
import { useToast } from "../context/ToastContext";

export default function ColorPickerPage() {
  const [color, setColor] = useState("#6d28d9");
  const [history, setHistory] = useState([color]);
  const [isColorInputOpen, setIsColorInputOpen] = useState(false);
  const { showToast } = useToast();

  const hexToRgb = (hex) => {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const handleColorChange = (newColor) => {
    setColor(newColor);
    setHistory((prev) =>
      prev.includes(newColor) ? prev : [newColor, ...prev].slice(0, 8)
    );
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    showToast("Copied to Clipboard!", "success");
  };

  return (
    <div className="bg-slate-100 relative w-[600px] p-5 overflow-hidden font-montserrat">
        <div className="z-10 p-8 rounded-2xl bg-white shadow-lg h-full relative">
        <Navbar />

        <div className="mt-6 flex gap-6">
          <div className="flex flex-col items-center gap-4 flex-1">
            <div className="relative">
              <div
                className="w-44 h-44 rounded-2xl border border-white/40 shadow-lg backdrop-blur-sm transition-all"
                style={{ background: color }}
              />
            </div>

            <button
              onClick={() => setIsColorInputOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-white/60 border border-white/30 rounded-full shadow-md hover:shadow-lg hover:bg-white/80 transition-all backdrop-blur-sm active:scale-95"
            >
              {icons["colorPicker"]}
              <span className="font-medium text-gray-700">Pick Color</span>
            </button>
          </div>

          <div className="flex-1 flex flex-col gap-4">
            {[
              { label: "HEX", value: color },
              { label: "RGB", value: hexToRgb(color) },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between items-center text-base px-5 py-3 rounded-3xl bg-white/50 border border-white/30 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all cursor-pointer active:scale-95"
                onClick={() => handleCopy(value)}
              >
                <span className="text-gray-700 font-medium">{value}</span>
                {icons["copy"]}
              </div>
            ))}

            <div>
              <p className="text-sm font-medium text-gray-600 mb-3 tracking-wide">
                Recent Colors
              </p>
              <div className="grid grid-cols-4 gap-3">
                {history.map((c, i) => (
                  <div
                    key={i}
                    onClick={() => handleColorChange(c)}
                    className="w-12 h-12 rounded-full border border-white/40 cursor-pointer hover:scale-110 transition-transform shadow-md"
                    style={{ background: c }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {isColorInputOpen && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 animate-fadeIn">
            <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-2xl transform scale-95 animate-scaleIn flex flex-col items-center gap-4">
            <ColorInput
                value={color}
                onChange={(newColor) => setColor(newColor)}
                onClose={() => setIsColorInputOpen(false)}
            />
            
            <div className="flex gap-3 mt-2">
                <button
                onClick={() => {
                    handleColorChange(color);
                    setIsColorInputOpen(false);
                }}
                className="px-5 py-2 rounded-full bg-violet-500 text-white font-medium hover:bg-violet-600 active:scale-95 transition-all"
                >
                Add
                </button>
                <button
                onClick={() => setIsColorInputOpen(false)}
                className="px-5 py-2 rounded-full bg-gray-300 text-gray-800 font-medium hover:bg-gray-400 active:scale-95 transition-all"
                >
                Cancel
                </button>
            </div>
            </div>
        </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}
