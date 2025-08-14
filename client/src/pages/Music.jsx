import React, { useState, useEffect, useRef } from "react";
import GlowingBackground from "../components/GlowingBackground";
import MusicCard from "../components/MusicCard";
import ArtistCard from "../components/ArtistCard";
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

export default function Music({ query }) {
  const trendingScroll = useHorizontalScroll();

  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [newReleases, setNewReleases] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingNewReleases, setLoadingNewReleases] = useState(false);

  const [activeTrack, setActiveTrack] = useState(null);

  const handlePlayTrack = (track) => {
    setActiveTrack({
      title: track.name,
      artist: track.artists?.map((a) => a.name).join(", "),
      audioUrl: track.preview_url,
      cover: track.album?.images,
      // cover: track.album?.images?.[0]?.url,
    });
  };

  // Fetch search results
  useEffect(() => {
    if (!query) return;
    const timeout = setTimeout(() => {
      setLoading(true);
      fetch(`http://localhost:5000/api/music?q=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => {
          setTracks(data.tracks?.items || []);
          setArtists(data.artists?.items || []);
          setPlaylists(data.playlists?.items || []);
          setAlbums(data.albums?.items || []);
          console.log(data);
        })
        .catch((err) => console.error("Error fetching music:", err))
        .finally(() => setLoading(false));
    }, 500);
    return () => clearTimeout(timeout);
  }, [query]);

  // Fetch New Releases
  useEffect(() => {
    if (query) return;
    setLoadingNewReleases(true);
    fetch("http://localhost:5000/api/music/new-releases")
      .then((res) => res.json())
      .then((data) => {
        setNewReleases(data.albums?.items || []);
      })
      .catch((err) => console.error("Error fetching new releases:", err))
      .finally(() => setLoadingNewReleases(false));
  }, [query]);

  return (
    <>
    <div className="flex flex-col h-[calc(100vh-145px)] py-2 pt-8 mx-3 rounded-t-4xl space-y-6 bg-gradient-to-br from-slate-100 to-slate-200 shadow-[-8px_-4px_20px_rgba(0,0,0,0.1)] overflow-auto">
      <GlowingBackground />

      {/* Search Results */}
      {query && (
        <>
          {/* Tracks */}
          <section className="z-10 mask-to-l">
            <h2 className="text-xl pl-8 font-montserrat font-semibold text-gray-700 mb-4">Tracks</h2>
            <div
              ref={trendingScroll.scrollRef}
              className="flex overflow-x-auto whitespace-nowrap space-x-4 p-4 pt-0"
            >
              {loading && <p className="text-gray-500">Loading...</p>}
              {!loading &&
                tracks.map((track) => (
                  <MusicCard
                    key={track.id}
                    title={track.name}
                    artist={track.artists?.map((a) => a.name).join(", ")}
                    image={track.album?.images?.[0]?.url}
                    onPlay={() => handlePlayTrack(track)}
                  />
                  // <div className="flex flex-col">
                  //   <MusicCard
                  //       key={track.id}
                  //       title={track.name}
                  //       artist={track.artists?.map((a) => a.name).join(", ")}
                  //       image={track.album?.images?.[0]?.url}
                  //     />
                  //   <audio src={track.preview_url} controls></audio>
                  // </div>
                ))}
            </div>
          </section>

          {/* Artists */}
          <section className="z-10 mask-to-l">
            <h2 className="text-xl pl-8 font-montserrat font-semibold text-gray-700 mb-4">Artists</h2>
            <div
              ref={trendingScroll.scrollRef}
              className="flex overflow-x-auto whitespace-nowrap space-x-4 p-4 pt-0"
            >
              {artists.map((artist) => (
                <ArtistCard
                  key={artist.id}
                  name={artist.name}
                  image={artist.images?.[0]?.url}
                />
              ))}
            </div>
          </section>

          {/* Albums */}
          <section className="z-10 mask-to-l">
            <h2 className="text-xl pl-8 font-montserrat font-semibold text-gray-700 mb-4">Albums</h2>
            <div
              ref={trendingScroll.scrollRef}
              className="flex overflow-x-auto whitespace-nowrap space-x-4 p-4 pt-0"
            >
              {albums.map((album) => (
                <MusicCard
                  key={album.id}
                  title={album.name}
                  artist={album.artists?.map((a) => a.name).join(", ")}
                  image={album.images?.[0]?.url}
                />
              ))}
            </div>
          </section>

          {/* Playlists */}
          <section className="z-10 mask-to-l">
            <h2 className="text-xl pl-8 font-montserrat font-semibold text-gray-700 mb-4">Playlists</h2>
            <div
              ref={trendingScroll.scrollRef}
              className="flex overflow-x-auto whitespace-nowrap space-x-4 p-4 pt-0"
            >
              {playlists.map((playlist) => (
                <MusicCard
                  key={playlist.id}
                  title={playlist.name}
                  artist={playlist.owner?.display_name}
                  image={playlist.images?.[0]?.url}
                />
              ))}
            </div>
          </section>
        </>
      )}

      {/* Default New Releases */}
      {!query && (
        <section className="z-10">
          <h2 className="text-xl pl-8 font-montserrat font-semibold text-gray-700 mb-4">New Releases</h2>
          <div
            ref={trendingScroll.scrollRef}
            className="flex overflow-x-auto whitespace-nowrap space-x-4 p-4 pt-0 mask-to-l"
          >
            {loadingNewReleases && <p className="text-gray-500">Loading...</p>}
            {!loadingNewReleases &&
              newReleases.map((album) => (
                <MusicCard
                  key={album.id}
                  title={album.name}
                  artist={album.artists?.map((a) => a.name).join(", ")}
                  image={album.images?.[0]?.url}
                />
              ))}
          </div>
        </section>
      )}

    </div>
    {/* Player */}
    <MusicPlayer
      track={activeTrack}
    />
    </>
  );
}
