import React, { useRef, useState, useEffect } from "react";
import ColorThief from "colorthief";
import CustomSlider from "./CustomSlider";
import ScrollingText from "./ScrollingText";
import musicPlaceholder from "../assets/Music.png";
import tabsLogo from "../assets/tabs-logo.png";

const shuffle = <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m19.558 4l.897.976c.401.436.602.654.531.839S20.632 6 20.065 6c-1.27 0-2.788-.205-3.954.473c-.72.42-1.223 1.152-2.072 2.527M3 18h1.58c1.929 0 2.893 0 3.706-.473c.721-.42 1.223-1.152 2.072-2.527m9.2 5l.897-.976c.401-.436.602-.654.531-.839S20.632 18 20.065 18c-1.27 0-2.788.205-3.954-.473c-.813-.474-1.348-1.346-2.418-3.09l-2.99-4.875C9.635 7.82 9.1 6.947 8.287 6.473S6.51 6 4.581 6H3" color="currentColor"/></svg>;

const repeat = <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m16.388 3l1.003.976c.448.436.672.654.593.839C17.906 5 17.59 5 16.955 5h-7.76C5.22 5 2 8.134 2 12c0 1.487.477 2.866 1.29 4m4.322 5l-1.003-.976c-.448-.436-.672-.654-.593-.839C6.094 19 6.41 19 7.045 19h7.76C18.78 19 22 15.866 22 12a6.84 6.84 0 0 0-1.29-4" color="currentColor"/></svg>;

const repeat_one = <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M22 10V3.369c0-.304-.282-.477-.48-.295L20 4.474M14.388 3l1.003.976c.448.436.672.654.593.839C15.906 5 15.59 5 14.955 5h-5.76C5.22 5 2 8.134 2 12c0 1.487.477 2.866 1.29 4m4.322 5l-1.003-.976c-.448-.436-.672-.654-.593-.839C6.094 19 6.41 19 7.045 19h7.76c3.445 0 6.49-2.355 7.195-5.5" color="currentColor"/></svg>;

const play = <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M5.669 4.76a1.469 1.469 0 0 1 2.04-1.177c1.062.454 3.442 1.533 6.462 3.276c3.021 1.744 5.146 3.267 6.069 3.958c.788.591.79 1.763.001 2.356c-.914.687-3.013 2.19-6.07 3.956c-3.06 1.766-5.412 2.832-6.464 3.28c-.906.387-1.92-.2-2.038-1.177c-.138-1.142-.396-3.735-.396-7.237c0-3.5.257-6.092.396-7.235Z"/></g></svg>;

const pause = <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24"><path fill="currentColor" d="M4 7c0-1.414 0-2.121.44-2.56C4.878 4 5.585 4 7 4s2.121 0 2.56.44C10 4.878 10 5.585 10 7v10c0 1.414 0 2.121-.44 2.56C9.122 20 8.415 20 7 20s-2.121 0-2.56-.44C4 19.122 4 18.415 4 17zm10 0c0-1.414 0-2.121.44-2.56C14.878 4 15.585 4 17 4s2.121 0 2.56.44C20 4.878 20 5.585 20 7v10c0 1.414 0 2.121-.44 2.56c-.439.44-1.146.44-2.56.44s-2.121 0-2.56-.44C14 19.122 14 18.415 14 17z" color="currentColor"/></svg>;

const previous = <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M19.788 5.627c.777-.359 1.68.204 1.783 1.114l.027.25l.062.653l.065.845l.044.751l.026.554l.02.593l.016.631l.008.667v.683l-.008.647l-.023.907l-.022.56l-.04.767l-.062.88l-.062.705l-.054.517c-.1.866-.943 1.372-1.714 1.018l-.608-.29l-.315-.157l-.545-.28l-.408-.218l-.442-.242l-.474-.267l-.503-.292l-.532-.318l-.558-.344l-.69-.439l-.635-.42l-.58-.397l-.525-.37l-.24-.174l-.04.86l-.049.755l-.067.835l-.062.62l-.013.12c-.1.866-.943 1.372-1.714 1.018l-.608-.29l-.315-.157l-.545-.28l-.408-.218l-.442-.242l-.722-.41l-.518-.305a47.459 47.459 0 0 1-.27-.162l-.557-.344l-.58-.368l-.275-.179l-.523-.348l-.485-.331l-.446-.314l-.594-.43l-.344-.258l-.562-.435l-.308-.247c-.67-.546-.686-1.592-.042-2.117l.432-.345l.607-.465l.367-.271l.407-.294l.684-.479l.503-.34l.54-.353l.575-.366l.573-.353l.277-.166l.533-.313l.503-.286l.47-.26l.436-.234l.757-.39l.589-.287l.225-.105c.777-.359 1.68.204 1.783 1.114l.045.427l.051.558l.052.68l.048.797l.028.592l.492-.353c.173-.123.356-.25.547-.38l.599-.403a46.8 46.8 0 0 1 .992-.638l.573-.353l.277-.166l.533-.313l.503-.286l.47-.26l.436-.234l.757-.39l.589-.287l.225-.105Z"/></g></svg>;

const next = <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="m13.212 5.627l.356.168l.458.224l.553.283l.417.22l.693.38l.503.287l.533.313l.56.34c.096.058.192.118.29.179l.575.366l.54.353l.503.34l.466.324l.625.449l.367.27l.607.466l.432.345c.644.525.627 1.57-.043 2.117l-.307.247l-.562.435l-.73.54l-.426.302l-.465.323l-.505.34a47.21 47.21 0 0 1-.266.176l-.56.362l-.295.185l-.558.344l-.532.318l-.503.292l-.474.267l-.442.242l-.599.317l-.354.181l-.712.348l-.21.099c-.772.354-1.616-.152-1.715-1.018l-.075-.74l-.068-.834l-.032-.492l-.03-.54l-.026-.583l-.496.355l-.269.189l-.58.396l-.636.42l-.689.44l-.558.343l-.787.467l-.722.41l-.442.242l-.599.317l-.354.181l-.712.348l-.21.099c-.772.354-1.616-.152-1.715-1.018l-.054-.517l-.062-.705l-.061-.88l-.04-.768l-.023-.56l-.023-.906l-.008-.647v-.683l.008-.667l.015-.631l.034-.875l.042-.783l.064-.891l.048-.546l.044-.433l.013-.118c.103-.91 1.006-1.473 1.783-1.114l.356.168l.458.224l.553.283l.417.22l.454.247l.487.274l.255.146l.533.313l.56.34a46.884 46.884 0 0 1 1.588 1.021l.574.392l.52.368l.24.173l.027-.592l.03-.544l.052-.72l.068-.772l.045-.427c.103-.91 1.006-1.473 1.783-1.114Z"/></g></svg>;

const volume_high = <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14 14.814V9.186c0-3.145 0-4.717-.925-5.109c-.926-.391-2.015.72-4.193 2.945c-1.128 1.152-1.771 1.407-3.376 1.407c-1.403 0-2.105 0-2.61.344C1.85 9.487 2.01 10.882 2.01 12s-.159 2.513.888 3.227c.504.344 1.206.344 2.609.344c1.605 0 2.248.255 3.376 1.407c2.178 2.224 3.267 3.336 4.193 2.945c.925-.392.925-1.964.925-5.11M17 9c.625.82 1 1.863 1 3s-.375 2.18-1 3m3-8c1.25 1.366 2 3.106 2 5s-.75 3.634-2 5" color="currentColor"/></svg>;

const volume_mute = <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 14.814V9.186c0-3.145 0-4.717-.926-5.109c-.926-.391-2.016.72-4.195 2.945c-1.13 1.152-1.773 1.407-3.379 1.407c-1.112 0-2.473-.148-3.163.907C6 9.85 6 10.566 6 12c0 1.433 0 2.15.337 2.664c.69 1.055 2.05.907 3.163.907c1.606 0 2.25.255 3.379 1.407c2.18 2.224 3.27 3.336 4.195 2.945c.926-.392.926-1.964.926-5.11" color="currentColor"/></svg>;

const full_screen = <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"> <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.984 2c-2.807.064-4.446.331-5.566 1.447C2.438 4.424 2.11 5.797 2 8m13.017-6c2.806.064 4.445.331 5.566 1.447c.98.977 1.308 2.35 1.417 4.553m-6.983 14c2.806-.064 4.445-.331 5.566-1.447c.98-.977 1.308-2.35 1.417-4.553M8.984 22c-2.807-.064-4.446-.331-5.566-1.447C2.438 19.576 2.11 18.203 2 16" /></svg>;

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

            <div className="w-140 h-140 bg-gray-50/30 rounded-3xl scale-90 flex justify-center items-center">
              <img src={musicPlaceholder} alt="Music" className="w-80 h-80 opacity-30 rounded-3xl object-cover transition-all duration-400 z-10 drop-shadow-[0_0_10px_rgba(0,0,0,0.2)]"/>
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

          <img src={cover?.[0]?.url} alt={title} className={`w-140 h-140 rounded-3xl object-cover transition-all duration-400 z-10 ${
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