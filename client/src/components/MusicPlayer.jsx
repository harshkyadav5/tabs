import React, { useRef, useState, useEffect } from "react";
import ColorThief from "colorthief";
import CustomSlider from "./CustomSlider";
import ScrollingText from "./ScrollingText";
import musicPlaceholder from "../assets/Music.png";
import tabsLogo from "../assets/tabs-logo.png";
import {
  ShuffleIcon,
  RepeatIcon,
  RepeatOneIcon,
  MusicPlayerPlayIcon,
  MusicPlayerPauseIcon,
  PreviousIcon,
  NextIcon,
  VolumeHighIcon,
  VolumeMuteIcon,
  FullScreenIcon,
} from "./icons";

const shuffle = <ShuffleIcon />;
const repeat = <RepeatIcon />;
const repeat_one = <RepeatOneIcon />;
const play = <MusicPlayerPlayIcon />;
const pause = <MusicPlayerPauseIcon />;
const previous = <PreviousIcon />;
const next = <NextIcon />;
const volume_high = <VolumeHighIcon />;
const volume_mute = <VolumeMuteIcon />;
const full_screen = <FullScreenIcon />;

export default function MusicPlayer({ track }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [bgGradient, setBgGradient] = useState(
    "linear-gradient(to bottom, #cfd8dc, #aab6b9)"
  );
  const imgRef = useRef(null);

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
          console.log(gradient);
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
  }, [track]);

  // To handle track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (track) {
      audio.src = track.audioUrl;
      audio.load();
      audio.play();
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [track]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);

    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("ended", () => setIsPlaying(false));
    }

    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("ended", () => setIsPlaying(false));
      }
    };
  }, [volume]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const seekAudio = (e) => {
    const audio = audioRef.current;
    const time = parseFloat(e.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const toggleFullscreen = () => {
    const player = document.getElementById("music-player");
    if (!document.fullscreenElement) {
      player.requestFullscreen().catch((err) => {
        console.error(`Error entering fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  if (!track) {
    return (
      <div
        id="music-player"
        className={`fixed bottom-0 left-0 w-full z-50 bg-white transition-all duration-300 font-montserrat tracking-wide ${
          isFullscreen ? "h-screen flex flex-col items-center justify-center gap-6" : "p-2 flex items-center justify-between border-t border-zinc-200"
        }`}
      >

        {isFullscreen ? (
          <div
            className="flex flex-col justify-center items-center gap-6 w-full h-full"
            style={{
              background: bgGradient,
              transition: "background 0.5s ease",
            }}
          >

            <div className="w-140 h-140 bg-gray-50/30 rounded-panel scale-90 flex justify-center items-center">
              <img src={musicPlaceholder} alt="Music" className="w-80 h-80 opacity-30 rounded-panel object-cover transition-all duration-400 z-10 drop-shadow-[0_0_10px_rgba(0,0,0,0.2)]"/>
            </div>

            <div className="text-center z-10 w-125">
              <ScrollingText
                text="Song Title"
                className="text-2xl font-semibold text-white/80"
                width={500}
              />
              <ScrollingText
                text="Artist"
                className="text-lg font-medium text-white/70"
                width={500}
              />
            </div>

            <div className="max-w-xl z-10 w-125">
              <CustomSlider
                value={0}
                max={100}
              />
              <div className="flex justify-between text-xs mt-1 z-10">
                <span className="text-white/70">--:--</span>
                <span className="text-white/70">--:--</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-4 z-10">
              <button className="hover:bg-white/20 rounded-xl p-2 text-white/70 hover:text-white active:text-white/90 active:scale-85 transition-all duration-200">{shuffle}</button>
              <button className="hover:bg-white/20 rounded-xl p-2 text-white/70 hover:text-white active:text-white/90 active:scale-85 transition-all duration-200">{previous}</button>
              <button onClick={togglePlay} className="hover:bg-white/20 rounded-xl p-2 text-white/70 hover:text-white/90 active:text-white active:scale-105 scale-125 transition-all duration-200">
                {isPlaying ? pause : play}
              </button>
              <button className="hover:bg-white/20 rounded-xl p-2 text-white/70 hover:text-white active:text-white/90 active:scale-85 transition-all duration-200">{next}</button>
              <button className="hover:bg-white/20 rounded-xl p-2 text-white/70 hover:text-white active:text-white/90 active:scale-85 transition-all duration-200">{repeat}</button>
            </div>

            <button onClick={toggleFullscreen} className="text-sm text-white/70 mt-4 z-10 hover:text-white/90 transition-all duration-200">
              Exit Fullscreen
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4 px-4">
              <button className="text-zinc-400">{shuffle}</button>
              <button className="text-zinc-400">{previous}</button>
              <button onClick={togglePlay} className="text-black">
                {isPlaying ? pause : play}
              </button>
              <button className="text-zinc-400">{next}</button>
              <button className="text-zinc-400">{repeat}</button>
            </div>

            <div className="flex items-center w-[500px] max-w-full h-14 bg-white rounded-lg">
              <div className="h-14 w-14 flex justify-center items-center rounded-l-lg bg-[#434343]/20">
                <img src={musicPlaceholder} alt="Tabs Music" className="h-6 w-6 object-cover contrast-10 opacity-85"/>
              </div>

              <div className="flex justify-center items-center w-full h-full bg-[#6f6e6e]/15 rounded-r-lg">
                    <img
                      src={tabsLogo}
                      alt="Tabs Music"
                      className="max-h-full max-w-[60px] object-contain grayscale opacity-80"
                    />
              </div>
            </div>

            <div className="flex items-center gap-3 px-4">
              {volume_mute}
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-[80px] h-1 accent-zinc-500"
              />
              {volume_high}
              <button onClick={toggleFullscreen} className="text-zinc-400">
                {full_screen}
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  const { title, artist, audioUrl, cover } = track;
  const albumCoverUrl = cover?.[0]?.url;

  return (
    <div
      id="music-player"
      className={`fixed bottom-0 left-0 w-full z-50 bg-white transition-all duration-300 font-montserrat tracking-wide ${
        isFullscreen ? "h-screen flex flex-col items-center justify-center gap-6" : "p-2 flex items-center justify-between border-t border-zinc-200"
      }`}
    >
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {albumCoverUrl && (
        <img
          ref={imgRef}
          src={albumCoverUrl}
          crossOrigin="anonymous"
          alt="hidden album art"
          style={{ display: "none" }}
        />
      )}

      {isFullscreen ? (
        <div
          className="flex flex-col justify-center items-center gap-6 w-full h-full"
          style={{
            background: bgGradient,
            transition: "background 0.5s ease",
          }}
        >

          {/* Soft blurred overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${cover?.[0]?.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(50px)",
              opacity: 0.15,
            }}
          ></div>

          <img src={cover?.[0]?.url} alt={title} className={`w-140 h-140 rounded-panel object-cover transition-all duration-400 z-10 ${
                isPlaying
                ? "scale-100 drop-shadow-[0_0_10px_rgba(0,0,0,0.2)]"
                : "scale-90 drop-shadow-[0_0_10px_rgba(0,0,0,0.2)]"
              }`} />

          <div className="text-center z-10 w-125">
            <ScrollingText
              text={title}
              className="text-2xl font-semibold text-white/80"
              width={500}
            />
            <ScrollingText
              text={artist}
              className="text-lg font-medium text-white/70"
              width={500}
            />
          </div>

          <div className="max-w-xl z-10 w-125">
            <CustomSlider
              value={currentTime}
              max={duration}
              onChange={(newValue) => {
                const audio = audioRef.current;
                audio.currentTime = newValue;
                setCurrentTime(newValue);
              }}
            />
            <div className="flex justify-between text-xs mt-1 z-10">
              <span className="text-white/70">{formatTime(currentTime)}</span>
              <span className="text-white/70">{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4 z-10">
            <button className="hover:bg-white/20 rounded-xl p-2 text-white/70 hover:text-white active:text-white/90 active:scale-85 transition-all duration-200">{shuffle}</button>
            <button className="hover:bg-white/20 rounded-xl p-2 text-white/70 hover:text-white active:text-white/90 active:scale-85 transition-all duration-200">{previous}</button>
            <button onClick={togglePlay} className="hover:bg-white/20 rounded-xl p-2 text-white/70 hover:text-white/90 active:text-white active:scale-105 scale-125 transition-all duration-200">
              {isPlaying ? pause : play}
            </button>
            <button className="hover:bg-white/20 rounded-xl p-2 text-white/70 hover:text-white active:text-white/90 active:scale-85 transition-all duration-200">{next}</button>
            <button className="hover:bg-white/20 rounded-xl p-2 text-white/70 hover:text-white active:text-white/90 active:scale-85 transition-all duration-200">{repeat}</button>
          </div>

          <button onClick={toggleFullscreen} className="text-sm text-white/70 mt-4 z-10 hover:text-white/90 transition-all duration-200">
            Exit Fullscreen
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-4 px-4">
            <button className="text-zinc-400">{shuffle}</button>
            <button className="text-zinc-400">{previous}</button>
            <button onClick={togglePlay} className="text-black">
              {isPlaying ? pause : play}
            </button>
            <button className="text-zinc-400">{next}</button>
            <button className="text-zinc-400">{repeat}</button>
          </div>

          <div className="flex items-center w-[500px] max-w-full h-14 bg-white rounded-lg border border-zinc-200">
            <img src={cover?.[2]?.url} alt={title} className="h-14 w-14 rounded-l-lg object-cover" />

            <div className="flex flex-col w-full">
              <div className="flex flex-row justify-between items-end truncate">
                <span className="w-[30px] text-right text-[10px]">{formatTime(currentTime)}</span>
                <div className="flex flex-col items-center truncate">
                  <h3 className="text-sm font-semibold text-black truncate">{title}</h3>
                  <p className="text-xs text-zinc-500 truncate">{artist}</p>
                </div>
                <span className="w-[30px] text-left text-[10px]">{formatTime(duration)}</span>
              </div>

              <div className="flex items-center text-[10px] text-zinc-500">
                <input
                  type="range"
                  min="0"
                  max={duration}
                  step="0.1"
                  value={currentTime}
                  onChange={seekAudio}
                  className="w-full h-[3px] accent-zinc-500"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4">
            {volume_mute}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-[80px] h-1 accent-zinc-500"
            />
            {volume_high}
            <button onClick={toggleFullscreen} className="text-zinc-400">
              {full_screen}
            </button>
          </div>
        </>
      )}
    </div>
  );
}