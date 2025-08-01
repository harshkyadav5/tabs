import React, { useState, useEffect, useRef } from "react";
import GlowingBackground from "../components/GlowingBackground";
import MusicCard from "../components/MusicCard";
import MusicPlayer from "../components/MusicPlayer";

const useHorizontalScroll = () => {
  const scrollRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const maxScrollLeft = el.scrollWidth - el.clientWidth;

      setAtStart(scrollLeft <= 1);
      setAtEnd(scrollLeft >= maxScrollLeft - 1);
    };

    handleScroll();
    el.addEventListener("scroll", handleScroll);

    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrollRef, atStart, atEnd };
};

export default function Music() {
  const trendingScroll = useHorizontalScroll();
  const recentsScroll = useHorizontalScroll();
  const playlistsScroll = useHorizontalScroll();

  return (
    <div className="flex flex-col min-h-screen px-4 sm:px-8 py-6 space-y-6">
      <GlowingBackground />

      <div className="z-10 justify-center w-full">
        <input
          type="text"
          placeholder="Search songs and albums"
          className="w-full font-montserrat sm:max-w-md px-5 py-3 rounded-full text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-red-400 backdrop-blur-md border border-gray-400 focus:border-red-400 bg-white/80 p-3 transition-all duration-200 focus:bg-white"
        />
      </div>

      <section className="z-10">
        <h2 className="text-xl font-montserrat font-semibold text-gray-700 mb-4">Trending Now</h2>
        <div
          ref={trendingScroll.scrollRef}
          className={`flex overflow-x-auto whitespace-nowrap space-x-4 p-4 pt-0 transition-all duration-200 ${
            !trendingScroll.atStart && !trendingScroll.atEnd
              ? "mask-to-l-r"
              : !trendingScroll.atStart
              ? "mask-to-r"
              : !trendingScroll.atEnd
              ? "mask-to-l"
              : ""
          }`}
        >
          <MusicCard title="Sunflower" artist="Post Malone, Swae Lee" image="./src/assets/song1.jpg" />
          <MusicCard title="Blinding Lights" artist="The Weeknd" image="./src/assets/song2.jpg" />
          <MusicCard title="Blinding Lights" artist="The Weeknd" image="./src/assets/song4.jpg" />
          <MusicCard title="Sunflower" artist="Post Malone, Swae Lee" image="./src/assets/song3.jpg" />
          <MusicCard title="Sunflower" artist="Post Malone, Swae Lee" image="./src/assets/song1.jpg" />
          <MusicCard title="Blinding Lights" artist="The Weeknd" image="./src/assets/song2.jpg" />
          <MusicCard title="Blinding Lights" artist="The Weeknd" image="./src/assets/song4.jpg" />
          <MusicCard title="Sunflower" artist="Post Malone, Swae Lee" image="./src/assets/song3.jpg" />
        </div>
      </section>

      <section className="z-10">
        <h2 className="text-xl font-montserrat font-semibold text-gray-700 mb-4">Recents</h2>
        <div
          ref={recentsScroll.scrollRef}
          className={`flex overflow-x-auto whitespace-nowrap space-x-4 p-4 pt-0 transition-all duration-200 ${
            !recentsScroll.atStart && !recentsScroll.atEnd
              ? "mask-to-l-r"
              : !recentsScroll.atStart
              ? "mask-to-r"
              : !recentsScroll.atEnd
              ? "mask-to-l"
              : ""
          }`}
        >
          <MusicCard title="Sunflower" artist="Post Malone, Swae Lee" image="./src/assets/song5.jpg" />
          <MusicCard title="Blinding Lights" artist="The Weeknd" image="./src/assets/song6.jpg" />
          <MusicCard title="Blinding Lights" artist="The Weeknd" image="./src/assets/song7.jpg" />
          <MusicCard title="Sunflower" artist="Post Malone, Swae Lee" image="./src/assets/song8.jpg" />
          <MusicCard title="Sunflower" artist="Post Malone, Swae Lee" image="./src/assets/song5.jpg" />
          <MusicCard title="Blinding Lights" artist="The Weeknd" image="./src/assets/song6.jpg" />
          <MusicCard title="Blinding Lights" artist="The Weeknd" image="./src/assets/song7.jpg" />
          <MusicCard title="Sunflower" artist="Post Malone, Swae Lee" image="./src/assets/song8.jpg" />
        </div>
      </section>

      <section className="z-10">
        <h2 className="text-xl font-montserrat font-semibold text-gray-700 mb-4">Playlists</h2>
        <div
          ref={playlistsScroll.scrollRef}
          className={`flex overflow-x-auto whitespace-nowrap space-x-4 p-4 pt-0 transition-all duration-200 ${
            !playlistsScroll.atStart && !playlistsScroll.atEnd
              ? "mask-to-l-r"
              : !playlistsScroll.atStart
              ? "mask-to-r"
              : !playlistsScroll.atEnd
              ? "mask-to-l"
              : ""
          }`}
        >
          <MusicCard title="Focus Flow" artist="Instrumental Vibes" image="./src/assets/song9.jpg" />
          <MusicCard title="Feel Good Piano" artist="Relax Tunes" image="./src/assets/song2.jpg" />
          <MusicCard title="Peaceful Piano" artist="Calm Keys" image="./src/assets/song4.jpg" />
          <MusicCard title="Jazz in Back" artist="Smooth Jazz" image="./src/assets/song6.jpg" />
          <MusicCard title="Focus Flow" artist="Instrumental Vibes" image="./src/assets/song9.jpg" />
          <MusicCard title="Feel Good Piano" artist="Relax Tunes" image="./src/assets/song2.jpg" />
          <MusicCard title="Peaceful Piano" artist="Calm Keys" image="./src/assets/song4.jpg" />
          <MusicCard title="Jazz in Back" artist="Smooth Jazz" image="./src/assets/song6.jpg" />
        </div>
      </section>

      <MusicPlayer
        track={{
          title: "Sunflower",
          artist: "Post Malone, Swae Lee",
          audioUrl: "/audio/sunflower.mp3",
          cover: "./src/assets/song2.jpg"
        }}
      />
    </div>
  );
}