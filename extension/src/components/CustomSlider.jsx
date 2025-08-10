import React, { useRef, useState } from "react";

export default function CustomSlider({
  value,
  max,
  onChange,
  showThumb = true
}) {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (e) => {
    const rect = sliderRef.current.getBoundingClientRect();
    const percent = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    onChange(percent * max);
  };

  const startDrag = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const moveHandler = (ev) => handleMove(ev);
    const upHandler = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", upHandler);
    };
    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", upHandler);
    handleMove(e);
  };

  return (
    <div
      ref={sliderRef}
      onMouseDown={startDrag}
      className="group relative font-montserrat cursor-pointer"
      style={{
        height: "1.2rem",
        display: "flex",
        alignItems: "center"
      }}
    >
      {/* Track background */}
      <div
        className="w-full bg-white/20 rounded-full relative transition-[height] duration-200"
        style={{
          height: isDragging ? "6px" : "4px", // inner growth instead of outer container
        }}
      >
        {/* Filled track */}
        <div
          className="h-full rounded-full transition-[height,background-color] duration-200"
          style={{
            width: `${(value / max) * 100}%`,
            background: "rgba(255,255,255,0.6)"
          }}
        />
    
        {/* Thumb */}
        {showThumb && (
          <div
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-1 h-3 bg-white rounded-full shadow-lg 
                       ${isDragging ? "opacity-100 scale-100" : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"} 
                       transition-[opacity,transform] duration-200`}
            style={{
              left: `${(value / max) * 100}%`,
            }}
          />
        )}
      </div>
    </div>
  );
}
