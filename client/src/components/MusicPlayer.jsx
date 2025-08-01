import React, { useRef, useState, useEffect } from "react";

const shuffle = <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m19.558 4l.897.976c.401.436.602.654.531.839S20.632 6 20.065 6c-1.27 0-2.788-.205-3.954.473c-.72.42-1.223 1.152-2.072 2.527M3 18h1.58c1.929 0 2.893 0 3.706-.473c.721-.42 1.223-1.152 2.072-2.527m9.2 5l.897-.976c.401-.436.602-.654.531-.839S20.632 18 20.065 18c-1.27 0-2.788.205-3.954-.473c-.813-.474-1.348-1.346-2.418-3.09l-2.99-4.875C9.635 7.82 9.1 6.947 8.287 6.473S6.51 6 4.581 6H3" color="currentColor"/></svg>;

const repeat = <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m16.388 3l1.003.976c.448.436.672.654.593.839C17.906 5 17.59 5 16.955 5h-7.76C5.22 5 2 8.134 2 12c0 1.487.477 2.866 1.29 4m4.322 5l-1.003-.976c-.448-.436-.672-.654-.593-.839C6.094 19 6.41 19 7.045 19h7.76C18.78 19 22 15.866 22 12a6.84 6.84 0 0 0-1.29-4" color="currentColor"/></svg>;

const repeat_one = <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M22 10V3.369c0-.304-.282-.477-.48-.295L20 4.474M14.388 3l1.003.976c.448.436.672.654.593.839C15.906 5 15.59 5 14.955 5h-5.76C5.22 5 2 8.134 2 12c0 1.487.477 2.866 1.29 4m4.322 5l-1.003-.976c-.448-.436-.672-.654-.593-.839C6.094 19 6.41 19 7.045 19h7.76c3.445 0 6.49-2.355 7.195-5.5" color="currentColor"/></svg>;

const play = <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M18.89 12.846c-.353 1.343-2.023 2.292-5.364 4.19c-3.23 1.835-4.845 2.752-6.146 2.384a3.25 3.25 0 0 1-1.424-.841C5 17.614 5 15.743 5 12s0-5.614.956-6.579a3.25 3.25 0 0 1 1.424-.84c1.301-.37 2.916.548 6.146 2.383c3.34 1.898 5.011 2.847 5.365 4.19a3.3 3.3 0 0 1 0 1.692"/></svg>;

const pause = <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24"><path fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 7c0-1.414 0-2.121.44-2.56C4.878 4 5.585 4 7 4s2.121 0 2.56.44C10 4.878 10 5.585 10 7v10c0 1.414 0 2.121-.44 2.56C9.122 20 8.415 20 7 20s-2.121 0-2.56-.44C4 19.122 4 18.415 4 17zm10 0c0-1.414 0-2.121.44-2.56C14.878 4 15.585 4 17 4s2.121 0 2.56.44C20 4.878 20 5.585 20 7v10c0 1.414 0 2.121-.44 2.56c-.439.44-1.146.44-2.56.44s-2.121 0-2.56-.44C14 19.122 14 18.415 14 17z" color="currentColor"/></svg>;

const previous = <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24"><g fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><path d="M2.163 12.918c.282.77 1.136 1.387 2.842 2.62c2.327 1.68 3.49 2.52 4.464 2.459a2.7 2.7 0 0 0 1.909-.965C12 16.286 12 14.858 12 12s0-4.286-.622-5.032a2.7 2.7 0 0 0-1.91-.965c-.972-.061-2.136.779-4.463 2.46c-1.706 1.232-2.56 1.849-2.842 2.62a2.67 2.67 0 0 0 0 1.835"/><path d="M12.163 12.918c.282.77 1.136 1.387 2.842 2.62c2.327 1.68 3.49 2.52 4.464 2.459a2.7 2.7 0 0 0 1.909-.965C22 16.286 22 14.858 22 12s0-4.286-.622-5.032a2.7 2.7 0 0 0-1.91-.965c-.972-.061-2.136.779-4.463 2.46c-1.706 1.232-2.56 1.849-2.842 2.62a2.67 2.67 0 0 0 0 1.835"/></g></svg>;

const next = <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24"><g fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><path d="M2.163 12.918c.282.77 1.136 1.387 2.842 2.62c2.327 1.68 3.49 2.52 4.464 2.459a2.7 2.7 0 0 0 1.909-.965C12 16.286 12 14.858 12 12s0-4.286-.622-5.032a2.7 2.7 0 0 0-1.91-.965c-.972-.061-2.136.779-4.463 2.46c-1.706 1.232-2.56 1.849-2.842 2.62a2.67 2.67 0 0 0 0 1.835"/><path d="M12.163 12.918c.282.77 1.136 1.387 2.842 2.62c2.327 1.68 3.49 2.52 4.464 2.459a2.7 2.7 0 0 0 1.909-.965C22 16.286 22 14.858 22 12s0-4.286-.622-5.032a2.7 2.7 0 0 0-1.91-.965c-.972-.061-2.136.779-4.463 2.46c-1.706 1.232-2.56 1.849-2.842 2.62a2.67 2.67 0 0 0 0 1.835"/></g></svg>;

const volume_high = <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14 14.814V9.186c0-3.145 0-4.717-.925-5.109c-.926-.391-2.015.72-4.193 2.945c-1.128 1.152-1.771 1.407-3.376 1.407c-1.403 0-2.105 0-2.61.344C1.85 9.487 2.01 10.882 2.01 12s-.159 2.513.888 3.227c.504.344 1.206.344 2.609.344c1.605 0 2.248.255 3.376 1.407c2.178 2.224 3.267 3.336 4.193 2.945c.925-.392.925-1.964.925-5.11M17 9c.625.82 1 1.863 1 3s-.375 2.18-1 3m3-8c1.25 1.366 2 3.106 2 5s-.75 3.634-2 5" color="currentColor"/></svg>;

const volume_mute = <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 14.814V9.186c0-3.145 0-4.717-.926-5.109c-.926-.391-2.016.72-4.195 2.945c-1.13 1.152-1.773 1.407-3.379 1.407c-1.112 0-2.473-.148-3.163.907C6 9.85 6 10.566 6 12c0 1.433 0 2.15.337 2.664c.69 1.055 2.05.907 3.163.907c1.606 0 2.25.255 3.379 1.407c2.18 2.224 3.27 3.336 4.195 2.945c.926-.392.926-1.964.926-5.11" color="currentColor"/></svg>;

const full_screen = <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"> <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.984 2c-2.807.064-4.446.331-5.566 1.447C2.438 4.424 2.11 5.797 2 8m13.017-6c2.806.064 4.445.331 5.566 1.447c.98.977 1.308 2.35 1.417 4.553m-6.983 14c2.806-.064 4.445-.331 5.566-1.447c.98-.977 1.308-2.35 1.417-4.553M8.984 22c-2.807-.064-4.446-.331-5.566-1.447C2.438 19.576 2.11 18.203 2 16" /></svg>;

export default function MusicPlayer({ track }) {
  const { title, artist, audioUrl, cover } = track;
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
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

  return (
    <div
      id="music-player"
      className={`fixed bottom-0 left-0 w-full z-50 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-700 transition-all duration-300 ${
        isFullscreen ? "h-screen flex flex-col items-center justify-center gap-6 p-6" : "p-2 flex items-center justify-between"
      }`}
    >
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {isFullscreen ? (
        <>
          <img src={cover} alt={title} className="w-64 h-64 rounded-xl object-cover shadow-lg" />

          <div className="text-center">
            <h2 className="text-2xl font-semibold text-black dark:text-white">{title}</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">{artist}</p>
          </div>

          <div className="w-full max-w-xl">
            <input
              type="range"
              min="0"
              max={duration}
              step="0.1"
              value={currentTime}
              onChange={seekAudio}
              className="w-full h-[6px] accent-zinc-500 dark:accent-white"
            />
            <div className="flex justify-between text-xs mt-1 text-zinc-500 dark:text-zinc-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-6 mt-4">
            <button className="text-zinc-400">{shuffle}</button>
            <button className="text-zinc-400">{previous}</button>
            <button onClick={togglePlay} className="text-black dark:text-white scale-125">
              {isPlaying ? pause : play}
            </button>
            <button className="text-zinc-400">{next}</button>
            <button className="text-zinc-400">{repeat}</button>
          </div>

          <div className="flex items-center gap-4 mt-4">
            {volume_mute}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-[100px] accent-zinc-500 dark:accent-white"
            />
            {volume_high}
          </div>

          <button onClick={toggleFullscreen} className="text-sm text-zinc-500 dark:text-zinc-400 mt-4">
            Exit Fullscreen
          </button>
        </>
      ) : (
        <>
          <div className="flex items-center gap-4 px-4">
            <button className="text-zinc-400">{shuffle}</button>
            <button className="text-zinc-400">{previous}</button>
            <button onClick={togglePlay} className="text-black dark:text-white">
              {isPlaying ? pause : play}
            </button>
            <button className="text-zinc-400">{next}</button>
            <button className="text-zinc-400">{repeat}</button>
          </div>

          <div className="flex items-center w-[500px] max-w-full h-14 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <img src={cover} alt={title} className="h-14 w-14 rounded-l object-cover" />

            <div className="flex flex-col w-full">
              <div className="flex flex-row justify-between items-end truncate">
                <span className="w-[30px] text-right text-[10px]">{formatTime(currentTime)}</span>
                <div className="flex flex-col items-center truncate">
                  <h3 className="text-sm font-semibold text-black dark:text-white truncate">{title}</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{artist}</p>
                </div>
                <span className="w-[30px] text-left text-[10px]">{formatTime(duration)}</span>
              </div>

              <div className="flex items-center text-[10px] text-zinc-500 dark:text-zinc-400">
                <input
                  type="range"
                  min="0"
                  max={duration}
                  step="0.1"
                  value={currentTime}
                  onChange={seekAudio}
                  className="w-full h-[3px] accent-zinc-500 dark:accent-white"
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
              className="w-[80px] h-1 accent-zinc-500 dark:accent-white"
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