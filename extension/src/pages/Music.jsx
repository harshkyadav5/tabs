import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ColorThief from "colorthief";
import CustomSlider from "../components/CustomSlider";
import ScrollingText from "../components/ScrollingText";
import { icons } from "../components/icons";

export default function Music() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(240);
  const [bgGradient, setBgGradient] = useState(
    "linear-gradient(to bottom, #000000, #222222)"
  );
  const imgRef = useRef(null);

  // const albumArt = "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  // const albumArt = "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  // const albumArt = "https://images.unsplash.com/photo-1500099817043-86d46000d58f?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  // const albumArt = "https://plus.unsplash.com/premium_photo-1689620817526-4963bfc2bc87?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  // const albumArt = "https://images.unsplash.com/photo-1487260211189-670c54da558d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA3D%3D";
  // const albumArt = "https://images.unsplash.com/photo-1519093560741-46c36f8c65a0?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  // const albumArt = "https://images.unsplash.com/photo-1538113300105-e51e4560b4aa?q=80&w=927&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  // const albumArt = "https://images.unsplash.com/photo-1520262494112-9fe481d36ec3?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const albumArt = "https://plus.unsplash.com/premium_photo-1721310985165-4e6e63d5e7a1?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  // Extract dominant colors when image loads
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    
    const handleLoad = () => {
      try {
        const colorThief = new ColorThief();
        const colors = colorThief.getPalette(img, 2);
        if (colors && colors.length >= 2) {
          const [c1, c2] = colors;
          const gradient = `linear-gradient(135deg, rgba(${c1.join(
            ","
          )}, 0.85), rgba(${c2.join(",")}, 0.85))`;
          setBgGradient(gradient);
        }
      } catch (err) {
        console.error("Color extraction failed:", err);
      }
    };

    if (img.complete) {
      handleLoad();
    } else {
      img.addEventListener("load", handleLoad);
      return () => img.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <div
      className="relative w-[600px] overflow-hidden font-montserrat shadow-xl"
      style={{
        background: bgGradient,
        transition: "background 0.5s ease",
      }}
    >
      {/* Hidden img for color extraction */}
      <img
        ref={imgRef}
        src={albumArt}
        crossOrigin="anonymous"
        alt="hidden album art"
        style={{ display: "none" }}
      />

      {/* Soft blurred overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${albumArt})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(30px)",
          opacity: 0.25,
        }}
      ></div>

      <div className="relative z-10 p-4">
        <div className="flex items-center px-6">
          <button
            onClick={() => navigate("/")}
            className="px-1 py-0.5 text-white hover:bg-black/20 rounded-xl transition-all duration-200"
          >
            {icons["backIcon"]}
          </button>
        </div>

        <div className="flex gap-4 p-4 pb-8">
          {/* Album Art */}
          <div className="w-[200px] h-[200px] flex-shrink-0">
            <img
              src={albumArt}
              alt="Album Art"
              crossOrigin="anonymous"
              className={`w-full h-full object-cover rounded-xl shadow-lg transition-transform duration-300 ${
                isPlaying ? "scale-100" : "scale-90"
              }`}
            />
          </div>

          {/* Info & Controls */}
          <div className="flex flex-col justify-end tracking-wide pl-4 flex-1 text-white">
            <div className="mb-4 flex justify-between items-center">
              <div>
                <ScrollingText
                  // text="Your Idol"
                  text="Song Title"
                  className="text-xl font-semibold"
                  width={240}
                />
                <ScrollingText
                  // text="Saja Boys: Andrew Choi, Neckwav, Danny Chung, Kevin Woo & samUIL Lee"
                  text="Artist"
                  className="text-base font-medium opacity-80"
                  width={240}
                />
              </div>
              <div className="bg-white/20 rounded-full p-1">
                {icons["starIcon"]}
              </div>
            </div>

            {/* Time slider */}
            <div>
              <CustomSlider value={time} max={duration} onChange={setTime} />
              <div className="flex justify-between text-xs opacity-70">
                <span>
                  {Math.floor(time / 60)}:
                  {String(Math.floor(time % 60)).padStart(2, "0")}
                </span>
                <span>
                  {Math.floor(duration / 60)}:
                  {String(Math.floor(duration % 60)).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Playback controls */}
            <div className="flex items-center justify-center gap-4">
              <button className="p-2 hover:bg-black/20 rounded-xl">
                {icons["prevIcon"]}
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-3 hover:bg-black/20 rounded-xl"
              >
                {isPlaying ? icons["pauseIcon"] : icons["playIcon"]}
              </button>
              <button className="p-2 hover:bg-black/20 rounded-xl">
                {icons["nextIcon"]}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
