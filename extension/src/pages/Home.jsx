import React from "react";
import { useNavigate } from "react-router-dom";
import { icons } from "../components/icons";
import Navbar from "../components/Navbar";

const features = [
  { name: "Clipboard", key: "clipboard" },
  { name: "Color Picker", key: "colorPicker" },
  { name: "Notes", key: "notes" },
  { name: "Music", key: "music" },
  { name: "Screenshots", key: "screenshots" },
  { name: "Bookmarks", key: "bookmarks" },
];

export default function Home() {
  const navigate = useNavigate();

  const handleNavigate = (key) => {
    const path = key === "colorPicker" ? "color-picker" : key;
    navigate(`/${path}`);
  };

  return (
    <div className="bg-slate-100 relative w-[600px] p-5 overflow-hidden font-montserrat">
      <div className="z-10 p-8 rounded-2xl bg-white shadow-lg h-full">
        <Navbar />

        <div className="grid grid-cols-2 gap-4">
          {features.map((feature) => (
            <div key={feature.key} className="relative group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-400 blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 z-0 pointer-events-none" />

              <div
                onClick={() => handleNavigate(feature.key)}
                className="relative z-10 cursor-pointer flex items-center gap-3 p-3 bg-slate-100 hover:bg-slate-200/90 text-gray-700 transition-all duration-200 rounded-full shadow-sm border border-slate-300/40 backdrop-blur-sm"
              >
                <div className="w-12 h-12 p-2 flex items-center justify-center border border-slate-300/80 rounded-full bg-white/50">
                  {icons[feature.key]}
                </div>
                <p className="text-base font-medium tracking-wide">{feature.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
